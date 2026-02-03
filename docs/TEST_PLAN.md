# Kế hoạch Kiểm thử (Test Plan) - Food Rescue Project

## 1. Giới thiệu
- **Mục tiêu:** Đảm bảo hệ thống Food Rescue hoạt động ổn định, đáp ứng đúng yêu cầu nghiệp vụ về giải cứu thực phẩm và kết nối cộng đồng.
- **Phạm vi:** Kiểm thử toàn bộ các phân hệ: Authentication, Marketplace, Contact, và API.
- **Nhân sự:** 7 thành viên (phân chia vai trò Dev/Tester).

## 2. Chiến lược Kiểm thử (Test Strategy)

### 2.1 Các cấp độ kiểm thử
1.  **Unit Testing:** Do Developer thực hiện trong quá trình code (sử dụng Jest/Vitest).
2.  **Integration Testing:** Kiểm tra tích hợp giữa Frontend (Next.js) và Backend API, Database (Prisma/Postgres).
3.  **System Testing:** Kiểm thử toàn bộ luồng nghiệp vụ trên môi trường Staging.
4.  **UAT (User Acceptance Testing):** Kiểm thử chấp nhận dựa trên kịch bản người dùng thật.

### 2.2 Môi trường kiểm thử
- **OS:** Windows / MacOS.
- **Browser:** Chrome, Firefox, Safari (Latest versions).
- **Network:** Wifi / 4G.

## 3. Thiết kế Kiểm thử (Test Design)

### Ví dụ cho chức năng: Đăng ký Đối tác (Contact Page)

**Mục tiêu:** Xác minh luồng gửi form hợp tác hoạt động đúng và gửi đúng template email.

| Test Case ID | Mục tiêu Test | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected) |
|--------------|---------------|----------------------------|-------------------------|-----------------------------|
| TC-PART-01 | Gửi thành công | 1. Vào trang /contact<br>2. Nhập form<br>3. Bấm Gửi | Name: ABC<br>Type: Đối tác nhà hàng<br>Msg: Test | Thông báo thành công + Admin nhận email mẫu Partnership |
| TC-PART-02 | Bỏ trống bắt buộc | 1. Vào trang /contact<br>2. Bấm Gửi ngay | (Không nhập gì) | Hiển thị lỗi validation ở các trường bắt buộc |
| TC-PART-03 | Email sai định dạng| 1. Nhập email "abc"<br>2. Bấm Gửi | Email: "abc" | Báo lỗi email không hợp lệ |

## 4. Quản lý Lỗi (Defect Management)
Sử dụng file Excel `Q_A Making Guideline.xlsx` hoặc GitHub Issues để log lỗi.

**Quy trình:**
1. Tester phát hiện lỗi -> Log vào file/Issue.
2. Gán Priority (Cao/Trung bình/Thấp).
3. Dev fix lỗi -> Cập nhật trạng thái "Fixed".
4. Tester Retest -> Đóng Issue nếu OK.
