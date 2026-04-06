# Báo Cáo Regression Testing - Food Rescue API

## Chi Tiết Thực Hiện (Implementation Details)

### a. Môi Trường (Environment)
- **Công cụ:** Postman (qua Newman CLI)
- **Collection:** `qa/postman/FoodRescue.postman_collection.json`
- **Environment:** `qa/postman/FoodRescue.postman_environment.json`
- **Base URL:** `http://localhost:3001` (dev environment)
- **Branch:** `feature/qa-postman-regression-posts-donations`
- **Trạng thái:** Environment trùng với dev/staging cho sprint Merchant. Backend không chạy được qua docker compose (command not found), dẫn đến tất cả requests failed.

### b. Regression — Posts (Bài Đăng)
- Chạy tuần tự 5 requests liên quan Posts:
  - Get Available Posts - Public
  - Create Post - Unauthorized
  - Create Post - Success
  - Create Post - Invalid Payload
  - Get Post By ID - Success
- **Kết quả:** Tất cả failed do backend không available.
- **Tiền điều kiện:** Cần đăng nhập cho một số requests (Create Post), cần ID hợp lệ cho Get Post By ID.

### c. Regression — Donations (Quyên Góp)
- Chạy 7 requests liên quan Donations:
  - Create Donation - Unauthorized
  - Create Donation - Validation Fail (Delivery Missing Info)
  - Create Donation - Success
  - Create Donation - Conflict/Oversell
  - (Các requests khác nếu có)
- **Kết quả:** Tất cả failed do backend không available.
- **Luồng phụ thuộc:** Cần postId, user hợp lệ; xử lý lỗi 4xx/5xx.

### d. Dữ Liệu Test
- Sử dụng dữ liệu mẫu từ environment variables (donorEmail, receiverEmail, defaultPassword, etc.).
- Không chạy trên production; chỉ dev environment.

### e. Đồng Bộ Với Dev
- API contract không thể verify do backend không chạy.
- Cần cập nhật collection nếu contract thay đổi.

## Báo Cáo Kết Quả

### a. Kết Quả Chạy
- **Công cụ:** Newman CLI
- **Lệnh chạy:**
  ```
  npx newman run qa/postman/FoodRescue.postman_collection.json -e qa/postman/FoodRescue.postman_environment.json -r cli,json,junit --reporter-json-export qa/postman/reports/newman-report.json --reporter-junit-export qa/postman/reports/newman-report.xml
  ```
- **Tổng quan:**
  - Iterations: 1
  - Requests: 20 (tất cả failed)
  - Tests: 20 (tất cả failed)
  - Assertions: 33 (tất cả failed)
- **Files export:**
  - `qa/postman/reports/newman-report.json`
  - `qa/postman/reports/newman-report.xml`

### b. Bảng Tổng Hợp

| Endpoint/Method | Kỳ Vọng (Status + Ý Nghĩa) | Thực Tế | Pass/Fail | Ghi Chú |
|----------------|----------------------------|---------|-----------|---------|
| POST /api/auth/register (Donor) | 201 - User created | Connection refused | Fail | Backend not running |
| POST /api/auth/register (Receiver) | 201 - User created | Connection refused | Fail | Backend not running |
| POST /api/auth/register (Intruder) | 201 - User created | Connection refused | Fail | Backend not running |
| POST /api/auth/register (Duplicate) | 409 - Conflict | Connection refused | Fail | Backend not running |
| POST /api/auth/login (Donor) | 200 - Token returned | Connection refused | Fail | Backend not running |
| POST /api/auth/login (Receiver) | 200 - Token returned | Connection refused | Fail | Backend not running |
| POST /api/auth/login (Intruder) | 200 - Token returned | Connection refused | Fail | Backend not running |
| POST /api/auth/login (Wrong Password) | 401 - Unauthorized | Connection refused | Fail | Backend not running |
| GET /api/posts (Available) | 200 - Array of posts | Connection refused | Fail | Backend not running |
| POST /api/posts (Unauthorized) | 401 - Unauthorized | Connection refused | Fail | Backend not running |
| POST /api/posts (Success) | 201 - Post created | Connection refused | Fail | Backend not running |
| POST /api/posts (Invalid Payload) | 400 - Bad Request | Connection refused | Fail | Backend not running |
| GET /api/posts/{id} | 200 - Post details | Connection refused | Fail | Backend not running |
| POST /api/donations (Unauthorized) | 401 - Unauthorized | Connection refused | Fail | Backend not running |
| POST /api/donations (Validation Fail) | 400 - Bad Request | Connection refused | Fail | Backend not running |
| POST /api/donations (Success) | 201 - Donation created | Connection refused | Fail | Backend not running |
| POST /api/donations (Conflict) | 409 - Conflict | Connection refused | Fail | Backend not running |
| (Các requests khác nếu có) | ... | ... | ... | ... |

### c. Defect
- **Defect nghiêm trọng:** Không thể kết nối đến backend API (localhost:3001).
  - **Mô tả:** Tất cả requests trả về connection refused, cho thấy backend service không đang chạy. Docker compose failed (command not found).
  - **Bước tái hiện:** Chạy bất kỳ request nào trong collection.
  - **Response mẫu:** ECONNREFUSED hoặc tương tự.
  - **Khuyến nghị:** Cài đặt Docker hoặc khởi động backend bằng cách khác (npm start nếu có).
- **Jira Bug:** FOODRESCUE-REG-001 - Backend Service Not Running During Regression

### d. Khuyến Nghị
- **Mức độ sẵn sàng release:** **KHÔNG SẴN SÀNG** cho khối Posts + Donations.
- **Lý do:** Không thể verify bất kỳ endpoint nào do backend không available.
- **Hành động cần thiết:**
  1. Cài đặt Docker hoặc chạy backend trực tiếp (nếu có code trong Backend/).
  2. Khởi động backend service.
  3. Đảm bảo database và Redis sẵn sàng.
  4. Chạy lại regression testing.
  5. Nếu contract API thay đổi, cập nhật collection và environment.
- **Ghi chú thêm:** Regression testing cần được thực hiện trên môi trường dev/staging với backend hoạt động bình thường.</content>
<parameter name="filePath">c:\Users\ASUS\Food-Rescue\qa\postman\reports\regression-report.md