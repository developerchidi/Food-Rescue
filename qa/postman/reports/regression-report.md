# Báo Cáo Regression Testing - Food Rescue API

## 1. Chi Tiết Thực Hiện (Implementation Details)

### a. Môi Trường (Environment)
- **Công cụ chính:** Postman + Newman CLI.
- **Collection:** `qa/postman/FoodRescue.postman_collection.json`
- **Environment:** `qa/postman/FoodRescue.postman_environment.json`
- **Base URL:** `http://localhost:3001` (dev environment)
- **Branch:** `feature/qa-postman-regression-posts-donations`
- **OS / Browser:** Windows 11, Chrome 124 (ghi nhận cho test frontend nếu cần).
- **Ghi chú:** Đây là regression API; ma trận browser chỉ dùng cho báo cáo chung. Kiểm thử frontend cross-browser cần thực hiện sau khi backend và giao diện hoạt động.

### b. Full Regression
- **Phạm vi ưu tiên:** các luồng critical path đã chốt:
  - Đăng ký / đăng nhập.
  - Tạo và xem bài đăng.
  - Tạo donation và xử lý donation.
- **Requests đã chạy:**
  - Auth: register, login, invalid login.
  - Posts: list posts, create unauthorized, create success, invalid payload, get by ID.
  - Donations: create unauthorized, validation fail, create success, conflict/oversell.
- **Kết quả:** tất cả kịch bản đều dừng ở bước backend không khả dụng.

### c. Cross-browser
- **Ghi chú:** ở tầng API, không có ảnh hưởng trực tiếp từ browser. Nếu test giao diện, cần lặp lại các kịch bản critical trên:
  - Chrome (bắt buộc)
  - Edge hoặc Firefox
  - Safari/WebKit nếu team yêu cầu
- **Quan sát cần chú ý:** layout/spacing, modal, validation form, console errors, request failures.

### d. Hiệu năng cảm quan
- **Kết quả:** không xác định được thông số load do backend trả lỗi kết nối.
- **Khuyến nghị:** khi backend hoạt động, kiểm tra cảm nhận load chậm và UI freeze nếu có.

### e. Dữ liệu & tài khoản
- **Dữ liệu sử dụng:** biến môi trường trong `qa/postman/FoodRescue.postman_environment.json`.
- **Tài khoản test:** donor, receiver, admin (nếu cần) trong môi trường dev.
- **Lưu ý:** tránh dùng dữ liệu production và thông tin nhạy cảm.

### f. Các bước thực hiện
1. Xác thực backend service đang chạy trên `http://localhost:3001`.
2. Mở Postman/Newman với collection và environment đã chuẩn bị.
3. Chạy toàn bộ regression collection.
4. Lưu logs và xuất báo cáo JSON/JUnit.
5. Ghi lại lỗi, defect, và bước retest.
6. Nếu cần kiểm thử frontend, chạy lại trên ma trận browser đã định.

## 2. Báo Cáo Kết Quả

### a. Kết quả chạy
- **Công cụ:** Newman CLI
- **Lệnh chạy:**
  ```bash
  npx newman run qa/postman/FoodRescue.postman_collection.json -e qa/postman/FoodRescue.postman_environment.json -r cli,json,junit --reporter-json-export qa/postman/reports/newman-report.json --reporter-junit-export qa/postman/reports/newman-report.xml
  ```
- **Tổng quan:**
  - Iterations: 1
  - Requests: 20
  - Tests: 20
  - Assertions: 33
- **Kết quả:** Tất cả failed
- **Files export:**
  - `qa/postman/reports/newman-report.json`
  - `qa/postman/reports/newman-report.xml`

### b. Ma trận kết quả
| Feature/Test Case | Expected | Actual | Pass/Fail | Defect / Ghi chú |
|-------------------|----------|--------|-----------|------------------|
| Auth - Register Donor | 201 | Connection refused | Fail | Backend not running |
| Auth - Register Receiver | 201 | Connection refused | Fail | Backend not running |
| Auth - Login Donor | 200 | Connection refused | Fail | Backend not running |
| Auth - Login Receiver | 200 | Connection refused | Fail | Backend not running |
| Auth - Login Wrong Password | 401 | Connection refused | Fail | Backend not running |
| Posts - Get Available | 200 | Connection refused | Fail | Backend not running |
| Posts - Create Unauthorized | 401 | Connection refused | Fail | Backend not running |
| Posts - Create Success | 201 | Connection refused | Fail | Backend not running |
| Posts - Invalid Payload | 400 | Connection refused | Fail | Backend not running |
| Posts - Get By ID | 200 | Connection refused | Fail | Backend not running |
| Donations - Create Unauthorized | 401 | Connection refused | Fail | Backend not running |
| Donations - Validation Fail | 400 | Connection refused | Fail | Backend not running |
| Donations - Create Success | 201 | Connection refused | Fail | Backend not running |
| Donations - Conflict/Oversell | 409 | Connection refused | Fail | Backend not running |

### c. Visual evidence
- **Screenshot / Video:** không có vì quy trình hiện là API regression qua Newman.
- **Bằng chứng:** Newman logs và file `qa/postman/reports/newman-report.json` chứa response lỗi kết nối.
- **Ghi chú browser/version:** Windows 11 + Chrome 124 (đã ghi nhận cho báo cáo cross-browser chung).

### d. Tóm tắt chung
- **Tỷ lệ pass theo module:**
  - Auth: 0/5
  - Posts: 0/5
  - Donations: 0/4
- **Blocker:** backend service không chạy.
- **Ready to ship?:** **NO-GO**
- **Lý do:** không thể xác thực các endpoint do lỗi kết nối backend.

### e. Defect chính
- **Mã defect:** FOODRESCUE-REG-001
- **Tiêu đề:** Backend Service Not Running During Regression
- **Mô tả:** tất cả API requests trả lỗi `ECONNREFUSED` tại `http://localhost:3001`.
- **Bước tái hiện:** chạy Newman collection trên môi trường hiện tại.
- **Ghi chú:** cần khởi động backend và xác thực lại bộ test.

### f. Console / Network (tùy chọn)
- **Trace ngắn:** Newman log ghi lại `ECONNREFUSED` cho tất cả request.
- **Ẩn token/cookie:** không áp dụng do không có session thành công.

### g. Khuyến nghị
- **Kết luận:** Regression chưa hoàn thành do backend không ready.
- **Cần làm:**
  1. Khởi động backend service (Docker / npm start).
  2. Đảm bảo database và environment hoạt động.
  3. Chạy lại collection.
  4. Nếu cần kiểm thử frontend, mở thêm ma trận browser Chrome + Edge/Firefox.
  5. Cập nhật report với screenshots/ghi chú browser nếu phát hiện lỗi giao diện.
- **Khuyến nghị release:** hiện tại chưa thể đánh giá, cần fix blocker backend trước.
</content>
<parameter name="filePath">c:\Users\ASUS\Food-Rescue\qa\postman\reports\regression-report.md