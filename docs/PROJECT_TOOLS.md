# ĐỒ ÁN CUỐI KỲ: LỰA CHỌN MÔI TRƯỜNG & CÔNG CỤ (Tech Stack)

Dựa trên danh sách gợi ý của GVHD (Slide HUTECH), nhóm quyết định lựa chọn bộ công cụ (Stack) chuyên nghiệp nhất để triển khai dự án **Food Rescue**.

Sự lựa chọn này đảm bảo tính tương thích cao, hỗ trợ quy trình Agile/Scrum cho team 7 thành viên và đáp ứng tiêu chuẩn CI/CD hiện đại.

---

## 1. PHÂN HỆ UI/UX (Thiết kế)
**Lựa chọn: Figma**
- **Lý do:** Là tiêu chuẩn công nghiệp hiện nay. Hỗ trợ làm việc nhóm (Real-time collaboration) – cả 7 thành viên có thể xem thiết kế cùng lúc.
- **Ứng dụng:** Vẽ Wireframe, Mockup giao diện, và tạo Prototype để kiểm thử luồng nghiệp vụ trước khi code.

## 2. PHÂN HỆ AI AGENT (Hỗ trợ lập trình)
**Lựa chọn: Antigravity**
- **Lý do:** AI Agent mạnh mẽ được tích hợp để Pair Programming.
- **Ứng dụng:**
    - Tự động refactor code clean hơn.
    - Viết Unit Test tự động cho môn Kiểm thử.
    - Soát lỗi logic và bảo mật trong code.

## 3. PHÂN HỆ TEAMWORK (Quản lý dự án)
**Lựa chọn: Jira Software**
- **Lý do:** Chuyên nghiệp hơn Trello/Asana trong việc quản lý quy trình Scrum (Sprint, Backlog, Story Point).
- **Ứng dụng:**
    - **Quản lý toàn diện:** Giao việc cho cả team Dev, **Team Design (Figma)**, và Team Test.
    - **Liên kết Figma:** Đính kèm trực tiếp link bản vẽ Figma vào task Jira để Dev không phải đi tìm.
    - Quản lý User Stories (Yêu cầu người dùng).
    - Theo dõi Bug (Defect tracking) cho môn Kiểm thử.
    - Báo cáo tiến độ (Burndown Chart).

## 4. PHÂN HỆ GIT GUI (Quản lý mã nguồn)
**Lựa chọn: GitHub Desktop / Sourcetree**
- **Lý do:** Trực quan hóa lịch sử commit, giúp các thành viên ít kinh nghiệm về dòng lệnh (CLI) vẫn thao tác Git chuẩn xác, tránh conflict code.

## 5. PHÂN HỆ CI/CD (Tích hợp & Triển khai liên tục)
**Lựa chọn: GitHub Actions**
- **Lý do:** Tích hợp sâu với GitHub Repo.
- **Ứng dụng:**
    - Tự động chạy Linter kiểm tra lỗi cú pháp mỗi khi Push.
    - Tự động Build thử để đảm bảo code không làm sập hệ thống.
    - Chặn Merge nếu Test thất bại (Quality Gate).

## 6. PHÂN HỆ CLOUD (Hạ tầng)
**Lựa chọn: Vercel**
- **Lý do:** Nền tảng tối ưu nhất cho Next.js (Framework nhóm đang dùng).
- **Ứng dụng:**
    - Deploy tự động bản Production.
    - Tạo môi trường Preview cho từng tính năng mới để Tester kiểm tra.

## 7. PHÂN HỆ CONTAINER (Môi trường)
**Lựa chọn: Docker**
- **Lý do:** "Build once, run anywhere".
- **Ứng dụng:** Đóng gói Database (PostgreSQL) và Redis để đảm bảo môi trường dev của 7 máy thành viên giống hệt nhau, không lỗi vặt do khác hệ điều hành.

## 8. PHÂN HỆ AUTOMATION (Tự động hóa quy trình)
**Lựa chọn: n8n (hoặc Zapier)**
- **Ứng dụng:**
    - Tự động bắn thông báo về Slack/Discord khi có Bug mới trên Jira.
    - Tự động gửi email cảm ơn khi có người điền form khảo sát.

---

## TỔNG KẾT QUY TRÌNH (Workflow)

1.  **Idea & Design:** Figma.
2.  **Plan:** Jira.
3.  **Code:** VS Code + Antigravity.
4.  **Commit:** GitHub Desktop -> GitHub.
5.  **Test & Build:** GitHub Actions (CI).
6.  **Deploy:** Vercel (CD).
7.  **Monitor:** n8n (Automation).
