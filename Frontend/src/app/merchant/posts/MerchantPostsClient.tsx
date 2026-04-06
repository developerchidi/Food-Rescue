"use client";

import { useState, useTransition } from "react";
import {
  deleteMerchantPost,
  updateMerchantPost,
  type MerchantPostUpdate,
} from "@/lib/actions/merchant-posts";
import { Pencil, Trash2, X } from "lucide-react";

export type MinePostRow = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  type: string;
  originalPrice: number | null;
  rescuePrice: number | null;
  quantity: number;
  expiryDate: string;
  status: string;
  _count: { donations: number };
};

const statusLabels: Record<string, string> = {
  AVAILABLE: "Đang bán",
  PENDING: "Chờ xử lý",
  TAKEN: "Hết hàng",
  EXPIRED: "Hết hạn",
};

function toLocalInputValue(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function MerchantPostsClient({ posts }: { posts: MinePostRow[] }) {
  const [editing, setEditing] = useState<MinePostRow | null>(null);
  const [form, setForm] = useState<MerchantPostUpdate>({});
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const openEdit = (p: MinePostRow) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description ?? "",
      type: p.type as MerchantPostUpdate["type"],
      originalPrice: p.originalPrice ?? undefined,
      rescuePrice: p.rescuePrice ?? undefined,
      quantity: p.quantity,
      expiryDate: p.expiryDate,
      imageUrl: p.imageUrl,
      status: p.status as MerchantPostUpdate["status"],
    });
    setMessage(null);
  };

  const closeEdit = () => {
    setEditing(null);
    setForm({});
    setMessage(null);
  };

  const submitEdit = () => {
    if (!editing) return;
    startTransition(async () => {
      const patch: MerchantPostUpdate = { ...form };
      if (patch.expiryDate && typeof patch.expiryDate === "string") {
        const dt = new Date(patch.expiryDate);
        if (!Number.isNaN(dt.getTime())) {
          patch.expiryDate = dt.toISOString();
        }
      }
      const res = await updateMerchantPost(editing.id, patch);
      if ("error" in res && res.error) {
        setMessage(res.error);
        return;
      }
      closeEdit();
    });
  };

  const onDelete = (id: string) => {
    if (!confirm("Xóa bài đăng này? Các đơn liên quan cũng sẽ bị xóa.")) {
      return;
    }
    startTransition(async () => {
      const res = await deleteMerchantPost(id);
      if ("error" in res && res.error) {
        setMessage(res.error);
        return;
      }
      setMessage(null);
    });
  };

  return (
    <div className="space-y-6">
      {message && (
        <p
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {message}
        </p>
      )}

      <div className="overflow-x-auto rounded-3xl border border-emerald-100 bg-white shadow-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-emerald-100 bg-emerald-50/80 text-[#4f6b62]">
            <tr>
              <th className="px-4 py-3 font-bold">Món</th>
              <th className="px-4 py-3 font-bold">SL</th>
              <th className="px-4 py-3 font-bold">Trạng thái</th>
              <th className="px-4 py-3 font-bold">Đơn</th>
              <th className="px-4 py-3 font-bold w-28">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#6a877d]">
                  Chưa có bài đăng. Tạo món mới từ trang đăng bài (/rescue/create).
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-emerald-100" />
                      )}
                      <div>
                        <p className="font-bold text-[#1f2d2a]">{p.title}</p>
                        <p className="text-xs text-[#6a877d] line-clamp-1">
                          {p.description || "—"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{p.quantity}</td>
                  <td className="px-4 py-3">
                    {statusLabels[p.status] ?? p.status}
                  </td>
                  <td className="px-4 py-3">{p._count.donations}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        disabled={pending}
                        className="rounded-xl p-2 text-[#009975] hover:bg-emerald-100 disabled:opacity-50"
                        aria-label="Sửa"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(p.id)}
                        disabled={pending}
                        className="rounded-xl p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        aria-label="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#1f2d2a]">Sửa bài đăng</h2>
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-full p-2 hover:bg-emerald-50"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-bold uppercase text-[#6a877d]">
                  Tiêu đề
                </span>
                <input
                  className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                  value={form.title ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase text-[#6a877d]">
                  Mô tả
                </span>
                <textarea
                  className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2 min-h-[80px]"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-bold uppercase text-[#6a877d]">
                    Giá gốc
                  </span>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                    value={form.originalPrice ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        originalPrice: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-[#6a877d]">
                    Giá giải cứu
                  </span>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                    value={form.rescuePrice ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        rescuePrice: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-bold uppercase text-[#6a877d]">
                  Số lượng
                </span>
                <input
                  type="number"
                  min={0}
                  className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                  value={form.quantity ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      quantity: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase text-[#6a877d]">
                  Hết hạn
                </span>
                <input
                  type="datetime-local"
                  className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                  value={
                    form.expiryDate
                      ? toLocalInputValue(form.expiryDate)
                      : ""
                  }
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expiryDate: e.target.value }))
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase text-[#6a877d]">
                  Trạng thái
                </span>
                <select
                  className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                  value={form.status ?? "AVAILABLE"}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      status: e.target.value as MerchantPostUpdate["status"],
                    }))
                  }
                >
                  <option value="AVAILABLE">Đang bán</option>
                  <option value="PENDING">Chờ xử lý</option>
                  <option value="TAKEN">Hết hàng</option>
                  <option value="EXPIRED">Hết hạn</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase text-[#6a877d]">
                  Ảnh (URL)
                </span>
                <input
                  className="mt-1 w-full rounded-2xl border border-emerald-100 px-4 py-2"
                  value={form.imageUrl ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value || null }))
                  }
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-full px-5 py-2 font-bold text-[#6a877d] hover:bg-emerald-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={submitEdit}
                disabled={pending}
                className="rounded-full bg-[#009975] px-6 py-2 font-bold text-white shadow-lg hover:shadow-[#009975]/25 disabled:opacity-50"
              >
                {pending ? "Đang lưu…" : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
