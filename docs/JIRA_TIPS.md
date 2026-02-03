# HƯỚNG DẪN QUẢN TRỊ JIRA (ADMIN TIPS)

Tài liệu này ghi lại các mẹo xử lý tình huống thường gặp khi quản trị dự án trên Jira, phục vụ cho quá trình bảo vệ đồ án.

## 1. Cách Reset số thứ tự Sprint (Về Sprint 1)
*Tình huống: Đã lỡ tạo/xóa nhiều Sprint nên Jira tự động đếm nhảy lên Sprint 6, 7... Muốn quay về Sprint 1 cho đẹp.*

**Giải pháp 1: Đổi tên thủ công (Nhanh nhất)**
1.  Vào màn hình **Backlog**.
2.  Tìm sprint đang chưa bắt đầu (Future Sprint) hoặc đang chạy.
3.  Click vào dấu **...** (3 chấm) bên phải tên Sprint -> Chọn **Edit sprint**.
4.  Ở ô **Sprint Name**: Sửa thành `Sprint 1` (hoặc `Sprint 01`).
5.  *Lưu ý:* Nếu Jira báo lỗi "Sprint with this name already exists" (do bạn đã có Sprint 1 trong quá khứ và đã đóng nó), hãy đặt tên khác một chút như `Sprint 1 - Phase 2` hoặc `Sprint #1`.

**Giải pháp 2: Xóa hoàn toàn Sprint cũ**
*Chỉ dùng khi bạn muốn dọn sạch sẽ dữ liệu cũ.*
1.  Vào mục **Reports** (Báo cáo).
2.  Chọn **Velocity Chart** hoặc **Sprint Report**.
3.  Tìm các sprint cũ đã đóng (Completed Sprints).
4.  Mở từng cái ra -> Reopen (Mở lại) -> Rồi Delete (Xóa).
    *(Cách này rất tốn công, không khuyến khích).*

## 2. Quy tắc đặt tên Sprint chuyên nghiệp
Thay vì để "Board Sprint 1", hãy đặt theo công thức:
`[Tên Dự Án] Sprint [Số] - [Mục tiêu chính]`

**Ví dụ:**
- `FR Sprint 1 - Setup Environment` (Tuần 1-2)
- `FR Sprint 2 - Authentication & Database` (Tuần 3-4)
- `FR Sprint 3 - Core Features (Contact/Rescue)` (Tuần 5-6)

*Cách đặt tên này giúp GVHD nhìn vào là biết ngay lộ trình (Milestone) của nhóm.*
