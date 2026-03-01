# Cơ chế Giữ chỗ (Reservation) trên Redis

Tài liệu mô tả kiến trúc và **lợi ích hệ thống** của cơ chế giữ chỗ dùng Redis trong luồng Giải cứu (Rescue).

---

## 1. Tổng quan luồng

- **Bước 1 – Giữ chỗ**: Người dùng nhấn xác nhận/Checkout → hệ thống **không trừ DB ngay** mà tạo bản ghi tạm giữ trên Redis (TTL 10 phút).
- **Bước 2 – Hoàn tất**: Trong thời hạn 10 phút, người dùng nhấn "Hoàn tất đơn" → hệ thống tạo `Donation`, trừ `FoodPost.quantity` trên PostgreSQL và xóa reservation trên Redis.

---

## 2. Lợi ích hệ thống

### 2.1. Tránh lock Database do quá nhiều transaction cùng lúc

- **Trước**: Mỗi lần "Giải cứu" đều mở transaction DB (tạo Donation + cập nhật quantity). Nhiều request đồng thời → tranh chấp lock trên cùng bản ghi `FoodPost`, dễ nghẽn hoặc timeout.
- **Sau**: Phần "có đủ hàng hay không" và "trừ kho ảo" được xử lý **trên Redis** bằng Lua script nguyên tử. Chỉ khi người dùng thực sự hoàn tất đơn mới ghi DB (một transaction ngắn gọn). Giảm tải và thời gian giữ lock trên PostgreSQL.

### 2.2. Đảm bảo trải nghiệm người dùng: Đã vào Checkout là chắc chắn có hàng

- **Trước**: Có thể xảy ra: người dùng chọn món, vào trang xác nhận, nhấn "Xác nhận" nhưng lúc đó đơn khác vừa trừ kho → "Hết hàng" sau khi đã chuẩn bị thanh toán/đi lấy hàng.
- **Sau**: Khi tạo reservation thành công (Redis chấp nhận), số lượng tương ứng đã được **giữ ảo** (atomic). Trong 10 phút, không ai khác có thể giữ hoặc "chiếm" phần đó. Người dùng đã vào bước Checkout và thấy "Đã giữ chỗ" thì khi hoàn tất đơn sẽ có hàng, tránh tình trạng "vừa xác nhận xong báo hết hàng".

### 2.3. Tự động trả lại kho khi hết thời gian

- Nếu sau **10 phút** người dùng không hoàn tất (không nhấn "Hoàn tất đơn" / không quét QR), key Redis hết TTL → bản ghi giữ chỗ mất hiệu lực. Số lượng đó được coi là **trả lại kho ảo**, người khác có thể thấy và đặt tiếp. Không cần job dọn dẹp DB vì DB chỉ bị trừ khi đã hoàn tất.

---

## 3. Kỹ thuật tóm tắt

| Thành phần | Mô tả |
|------------|--------|
| **Atomic** | Lua script trên Redis: trong một lệnh thực hiện kiểm tra (dbQuantity − reserved ≥ quantity), trừ kho ảo (thêm reservation), set TTL. Tránh race condition khi nhiều request cùng lúc. |
| **TTL** | Mỗi reservation có `EX 600` (10 phút). Hết hạn → key mất → không đếm vào `reserved`; sorted set được dọn theo score (expiresAt) khi tính lại reserved. |
| **Lưu trữ** | `reservation:{id}` = số lượng (để tính tổng nhanh), `reservation_meta:{id}` = JSON đầy đủ (để hiển thị / hoàn tất). Set `reservations:post:{postId}` lưu danh sách reservation theo post. |

---

## 4. Tài liệu liên quan

- Logic triển khai: `src/lib/redis-reservation.ts`
- Server actions: `src/lib/actions/rescue.ts` (`rescueFood`, `completeReservation`)
