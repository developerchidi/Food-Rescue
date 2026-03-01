import { redis } from "./redis";

/**
 * Module giữ chỗ (Reservation) trên Redis.
 * - Atomic: dùng Lua script để kiểm tra + trừ kho ảo trong một lệnh (tránh race).
 * - TTL: key reservation có EX 600; hết hạn thì GET trả null → không đếm vào reserved;
 *   ZREMRANGEBYSCORE xóa member đã hết score → số lượng tự trả lại kho ảo cho người khác.
 */
/** Thời gian giữ chỗ mặc định: 10 phút (giây) */
export const RESERVATION_TTL_SEC = 600;

const RESERVATION_KEY_PREFIX = "reservation:";
const RESERVATION_META_PREFIX = "reservation_meta:";
const RESERVATIONS_POST_PREFIX = "reservations:post:";

/**
 * Lua script: kiểm tra kho ảo (dbQty - reserved) >= qty, rồi tạo reservation trong một lệnh nguyên tử.
 * KEYS[1] = reservations:post:{postId}
 * ARGV[1]=nowSec, [2]=dbQty, [3]=qty, [4]=reservationId, [5]=expiryScore, [6]=qtyStr, [7]=recordJson
 */
const ATOMIC_RESERVE_SCRIPT = `
  local setKey = KEYS[1]
  local nowSec = tonumber(ARGV[1])
  local dbQty = tonumber(ARGV[2])
  local qty = tonumber(ARGV[3])
  local resId = ARGV[4]
  local expiry = tonumber(ARGV[5])
  local qtyVal = ARGV[6]
  local recordJson = ARGV[7]
  redis.call('ZREMRANGEBYSCORE', setKey, '-inf', nowSec)
  local members = redis.call('ZRANGE', setKey, 0, -1)
  local sum = 0
  for i = 1, #members do
    local v = redis.call('GET', 'reservation:' .. members[i])
    if v then
      sum = sum + tonumber(v)
    end
  end
  if dbQty - sum < qty then
    return 0
  end
  redis.call('ZADD', setKey, expiry, resId)
  redis.call('SET', 'reservation:' .. resId, qtyVal, 'EX', 600)
  redis.call('SET', 'reservation_meta:' .. resId, recordJson, 'EX', 600)
  return 1
`;

export type ReservationRecord = {
  postId: string;
  userId: string;
  quantity: number;
  expiresAt: number;
  fulfillmentMethod: "PICKUP" | "DELIVERY";
  deliveryAddress?: string;
  deliveryPhone?: string;
};

function reservationKey(id: string): string {
  return `${RESERVATION_KEY_PREFIX}${id}`;
}

function reservationMetaKey(id: string): string {
  return `${RESERVATION_META_PREFIX}${id}`;
}

function reservationsPostKey(postId: string): string {
  return `${RESERVATIONS_POST_PREFIX}${postId}`;
}

/**
 * Lấy tổng số lượng đang được giữ chỗ của một bài đăng (kho ảo).
 * Tự động xóa các reservation đã hết hạn khỏi sorted set (TTL hết → không đếm → coi như trả lại kho).
 */
export async function getReservedQuantity(postId: string): Promise<number> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return 0;
  }
  try {
    const nowSec = Math.floor(Date.now() / 1000);
    const setKey = reservationsPostKey(postId);
    await redis.zremrangebyscore(setKey, "-inf", nowSec);
    const memberIds = (await redis.zrange(setKey, 0, -1)) as string[] | null;
    if (!memberIds?.length) return 0;
    let sum = 0;
    for (const id of memberIds) {
      const raw = await redis.get(reservationKey(String(id)));
      if (raw != null) {
        const n = Number(raw);
        if (!Number.isNaN(n)) {
          sum += n;
        } else {
          try {
            const data = typeof raw === "string" ? JSON.parse(raw) : raw;
            sum += Number((data as { quantity?: number }).quantity) || 0;
          } catch {
            // bỏ qua bản ghi lỗi
          }
        }
      }
    }
    return sum;
  } catch (e) {
    console.error("getReservedQuantity error:", e);
    return 0;
  }
}

/**
 * Tạo bản ghi giữ chỗ trên Redis (không trừ DB).
 * Dùng Lua script nguyên tử: kiểm tra và trừ kho ảo trong một lệnh, tránh race condition.
 * Trả về reservationId và thời điểm hết hạn.
 */
export async function createReservation(
  postId: string,
  userId: string,
  quantity: number,
  dbQuantity: number,
  fulfillmentMethod: "PICKUP" | "DELIVERY" = "PICKUP",
  deliveryAddress?: string,
  deliveryPhone?: string
): Promise<{ reservationId: string; expiresAt: number } | { error: string }> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return { error: "Hệ thống giữ chỗ chưa sẵn sàng." };
  }
  if (quantity < 1 || dbQuantity < quantity) {
    return { error: "Sản phẩm không đủ số lượng." };
  }
  try {
    const reservationId = crypto.randomUUID();
    const nowSec = Math.floor(Date.now() / 1000);
    const expiresAt = nowSec + RESERVATION_TTL_SEC;
    const record: ReservationRecord = {
      postId,
      userId,
      quantity,
      expiresAt,
      fulfillmentMethod,
      deliveryAddress,
      deliveryPhone,
    };
    const recordJson = JSON.stringify(record);
    const setKey = reservationsPostKey(postId);
    const result = await redis.eval(
      ATOMIC_RESERVE_SCRIPT,
      [setKey],
      [
        String(nowSec),
        String(dbQuantity),
        String(quantity),
        reservationId,
        String(expiresAt),
        String(quantity),
        recordJson,
      ]
    );
    if (result !== 1) {
      return { error: "Sản phẩm không đủ số lượng (đã có người giữ chỗ)." };
    }
    return { reservationId, expiresAt };
  } catch (e) {
    console.error("createReservation error:", e);
    return { error: "Không thể giữ chỗ. Vui lòng thử lại." };
  }
}

/**
 * Lấy thông tin reservation (để hoàn tất đơn hoặc hiển thị).
 * Ưu tiên đọc từ reservation_meta (format mới), fallback reservation (JSON cũ).
 */
export async function getReservation(reservationId: string): Promise<ReservationRecord | null> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  try {
    let raw = await redis.get(reservationMetaKey(reservationId));
    if (!raw) raw = await redis.get(reservationKey(reservationId));
    if (!raw) return null;
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    return data as ReservationRecord;
  } catch {
    return null;
  }
}

/**
 * Xóa reservation sau khi hoàn tất đơn (tạo Donation và trừ DB).
 * Gọi sau khi đã tạo Donation thành công. Xóa cả key quantity và meta.
 */
export async function releaseReservation(reservationId: string): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return;
  }
  try {
    const record = await getReservation(reservationId);
    if (record) {
      await redis.zrem(reservationsPostKey(record.postId), reservationId);
      await redis.del(reservationKey(reservationId));
      await redis.del(reservationMetaKey(reservationId));
    }
  } catch (e) {
    console.error("releaseReservation error:", e);
  }
}
