# Professional Team Setup & Jira Task Distribution 📋

Chào **Chidi (Leader)**! Để quản lý team 7 người cho dự án **Food Rescue** một cách chuyên nghiệp, chúng ta sẽ áp dụng mô hình **Agile/Scrum** kết hợp với Jira để quản lý luồng công việc từ **Figma -> Dev -> Test**.

## 1. Phân chia vai trò (Roles & Responsibilities)

| Thành viên | Vai trò | Trách nhiệm chính |
| :--- | :--- | :--- |
| **Chidi** | **Leader / BE / DevOps** | Nắm kiến trúc tổng thể, phát triển Backend (API, DB), quản lý DevOps (Docker, CI/CD), Review PR. |
| **Toàn** | **Designer (Figma)** | Thiết kế UI/UX hệ thống Marketplace, Dashboard, đảm bảo phong cách Bento đồng nhất. |
| **Nghi** | **Designer (Figma)** | Phối hợp thiết kế các luồng người dùng (User flows), Landing page, và hệ thống Design System. |
| **Kiên** | **Frontend Lead** | Chịu trách nhiệm chính logic Map, Marketplace Client, và các tính năng tương tác phức tạp. |
| **Mẫn** | **Frontend Dev** | Xây dựng hệ thống Component Bento, trang Landing và tối ưu hóa CSS/Layout. |
| **Cơ** | **Frontend Dev** | Phát triển các trang Login, Register, Profile và xử lý form validation. |
| **Kiệt** | **QA / Tester** | Kiểm thử sản phẩm, viết test case, giả lập lỗi và báo cáo Bug lên Jira. |

---

## 2. Quy trình làm việc (Figma-First Workflow)

Luồng trạng thái:
`Backlog` -> `To Do` -> `In Design (Toàn/Nghi)` -> `Design Review (Chidi)` -> `In Progress (Dev)` -> `QA (Kiệt)` -> `Done`

---

## 3. Phân chia Task chi tiết (Story & Subtasks)

Để chuyên nghiệp và dễ quản lý, chúng ta sẽ chia theo **Tính năng (Story)**, sau đó tách nhỏ thành các **Sub-task** cho từng người. Cách này giúp anh biết một tính năng đang kẹt ở khâu Design, Dev hay Test.

### Story 1: Xác thực người dùng (Authentication)
*Tính năng đăng nhập, đăng ký cho người dùng.*
- [ ] **Sub-task** (Design): Thiết kế UI trang Login & Register trên Figma **(Nghi)**
- [ ] **Sub-task** (Frontend): Cắt HTML/CSS và ghép Logic trang Login/Register **(Cơ)**
- [ ] **Sub-task** (Backend): Viết API Login/Register (JWT Auth) **(Chidi)**
- [ ] **Sub-task** (QA): Test luồng đăng ký/đăng nhập và bắt lỗi form **(Kiệt)**

### Story 2: Trang chủ & Tìm kiếm (Landing & Search)
*Giao diện đầu tiên người dùng thấy.*
- [ ] **Sub-task** (Design): Thiết kế Landing Page & Banner **(Nghi)**
- [ ] **Sub-task** (Frontend): Code UI Landing Page theo chuẩn Bento **(Mẫn)**
- [ ] **Sub-task** (Frontend): Tối ưu thanh tìm kiếm và bộ lọc món ăn **(Kiên)**
- [ ] **Sub-task** (QA): Test hiển thị trên Mobile/Desktop **(Kiệt)**

### Story 3: Quy trình đặt món (Order Flow)
*Người dùng chọn món và đặt hàng.*
- [ ] **Sub-task** (Design): Thiết kế Flow đặt hàng (Cart, Checkout) **(Toàn)**
- [ ] **Sub-task** (Frontend): Làm tính năng "Thêm vào giỏ" và Popup xác nhận **(Kiên)**
- [ ] **Sub-task** (Backend): Tạo bảng Orders trong Database & API tạo đơn **(Chidi)**
- [ ] **Sub-task** (QA): Test luồng đặt hàng từ đầu đến cuối **(Kiệt)**

### Story 4: Hồ sơ người dùng (User Profile)
*Trang quản lý thông tin và lịch sử đơn hàng.*
- [ ] **Sub-task** (Design): Thiết kế trang Profile & History **(Toàn)**
- [ ] **Sub-task** (Frontend): Code giao diện Profile & Lịch sử đơn hàng **(Cơ)**
- [ ] **Sub-task** (Backend): API lấy thông tin User & Order History **(Chidi)**

---

## 4. Cách nhập vào Jira chuẩn Professional

1.  **Tạo Story trước**: Bấm **Create** -> Chọn Issue Type là **Story** -> Gõ tên tính năng (ví dụ: "Xác thực người dùng").
2.  **Tạo Sub-task**:
    - Bấm vào cái Story vừa tạo.
    - Tìm nút **Add child issue** (hoặc icon hình nhánh cây con).
    - Nhập từng đầu việc nhỏ (ví dụ: "Thiết kế UI Login").
    - **Assign** ngay cho người phụ trách (ví dụ: Nghi).
3.  **Lợi ích**: Khi nhìn vào Board, anh sẽ thấy Story to nằm ngang, và các Sub-task nhỏ chạy dọc theo các cột. Story chỉ **Done** khi tất cả Sub-task đã **Done**.

---
> [!IMPORTANT]
> **Chidi** là người nắm "trái tim" của hệ thống (Backend & DevOps). Hãy giao bớt phần UI cho các bạn Frontend và Designer để tập trung tối ưu luồng dữ liệu nhé!

Chúc team của Chidi giải cứu thật nhiều thực phẩm! 🚀
