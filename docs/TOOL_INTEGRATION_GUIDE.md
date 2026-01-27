# HƯỚNG DẪN TÍCH HỢP CÔNG CỤ (TOOL INTEGRATION GUIDE)

Tài liệu này hướng dẫn cách kết nối các công cụ trong hệ sinh thái dự án Food Rescue để tạo thành luồng làm việc tự động (Automation Workflow).

## 1. Tích hợp Figma vào Jira (Figma for Jira)
*Mục đích: Hiển thị bản thiết kế Design ngay trong ticket Jira để Dev và Tester tiện theo dõi.*

**Các bước thực hiện:**
1.  **Truy cập Jira:** Vào Project Jira của nhóm.
2.  **Mở Marketplace:**
    - Trên thanh menu trên cùng, chọn **Apps** -> **Explore more apps**.
3.  **Tìm kiếm:** Gõ từ khóa `Figma` vào ô tìm kiếm.
4.  **Cài đặt:** Chọn ứng dụng **"Figma for Jira"** (Official) -> Nhấn **Get app** -> **Get it now**.
5.  **Cấu hình (Configuration):**
    - Sau khi cài xong, vào một Ticket bất kỳ.
    - Sẽ thấy nút **"Open Figma"** hoặc mục **"Direct Link"**.
    - Nhập Access Token của tài khoản Figma (nếu được hỏi) để cấp quyền.
6.  **Sử dụng:**
    - Designer copy link file Figma (hoặc link frame cụ thể).
    - Dán vào mục "Figma" trong Jira issue.
    - **Kết quả:** Hình ảnh bản thiết kế hiện preview ngay trong Jira.

---

## 2. Tích hợp GitHub vào Jira
*Mục đích: Khi Dev commit code có kèm mã ticket (ví dụ: `PROJ-01`), Jira tự động cập nhật trạng thái.*

1.  **Vào Apps:** Tìm `GitHub for Jira`.
2.  **Cài đặt:** Nhấn **Get app**.
3.  **Kết nối Organization:**
    - Chọn **Get Started**.
    - Đăng nhập GitHub và chọn Organization/Repo của nhóm (`food-rescue`).
4.  **Sử dụng:**
    - Dev commit: `git commit -m "KB-123 Fix login error"`
    - Trên Jira ticket `KB-123`, sẽ hiện thông tin: "1 commit", "1 pull request" ở cột bên phải (Development panel).

---

## 3. Tích hợp Slack/Discord (Thông báo tự động)
*Mục đích: Bắn thông báo về nhóm chat khi có biến động.*

1.  **Slack:** Cài app **"Jira Cloud"** trên Slack.
2.  **Discord:** Dùng Webhook.
    - Vào Discord Server -> Server Settings -> Integrations -> Webhooks -> Copy URL.
    - Vào Jira -> System -> Webhooks -> Dán URL Discord (thêm `/jira` hoặc dùng bot trung gian như Zapier/n8n).
