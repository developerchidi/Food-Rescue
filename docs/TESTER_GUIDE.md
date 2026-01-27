# SỔ TAY KIỂM THỬ VIÊN (TESTER GUIDE) - FOOD RESCUE PROJECT

Tài liệu này định nghĩa chi tiết công việc của Tester trong dự án. Bạn có thể dùng nội dung này để đưa vào báo cáo môn học hoặc phân chia công việc trong nhóm.

---

## 1. TỔNG QUAN VAI TRÒ (Review)
Tester không chỉ là "người tìm lỗi" (bug hunter) mà là người **đảm bảo chất lượng** (Quality Assurance).
Trong đồ án này, Tester chịu trách nhiệm:
1.  Soát lỗi tính năng (Functional).
2.  Soát lỗi hiệu năng & trải nghiệm (Non-Functional).
3.  Viết báo cáo lỗi (Bug Report).

---

## 2. KIỂM THỬ CHỨC NĂNG (FUNCTIONAL TESTING)
*Đảm bảo phần mềm chạy đúng như thiết kế/yêu cầu.*

### 2.1. Phân hệ User (Người dùng thường)
- **Đăng ký / Đăng nhập:**
    - Test case 1: Đăng nhập đúng email/pass -> Vào trang chủ.
    - Test case 2: Sai pass -> Báo lỗi đỏ.
    - Test case 3: Email chưa đăng ký -> Báo lỗi.
    - Test case 4: "Quên mật khẩu" có gửi email thật không?
- **Trang chủ & Tìm kiếm:**
    - Tìm kiếm món ăn có ra kết quả đúng không?
    - Lọc theo "Khoảng cách" hoặc "Giá" có chạy không?
- **Đặt hàng (Rescue):**
    - Quy trình: Chọn món -> Thêm vào giỏ -> Checkout -> Nhận mã QR.
    - Test case: Hủy đơn hàng thì trạng thái đơn có đổi thành "Cancelled" không?

### 2.2. Phân hệ Partner (Đối tác/Nhà hàng)
- **Đăng bài (Post Food):**
    - Form nhập liệu: Bỏ trống "Tên món" có báo lỗi không?
    - Upload ảnh: Ảnh quá nặng (>5MB) hệ thống xử lý sao?
    - Map: Chọn vị trí trên bản đồ có lưu đúng tọa độ không?

### 2.3. Phân hệ Admin
- **Quản lý User:** Thử khóa (Ban) 1 user -> User đó có đăng nhập được nữa không?
- **Duyệt bài:** Bài đăng mới có hiện ở trạng thái "Pending" không?

---

## 3. KIỂM THỬ PHI CHỨC NĂNG (NON-FUNCTIONAL TESTING)
*Đảm bảo phần mềm chạy NHANH, ĐẸP và AN TOÀN.*

### 3.1. Hiệu năng (Performance)
- **Tốc độ tải trang:** Dùng Google Lighthouse đo.
    - Yêu cầu: Điểm Performance > 80 (xanh lá).
    - Thời gian phản hồi API (API Response Time): Dưới 1 giây.
- **Chịu tải (Load Test):** (Nâng cao) Giả lập 100 người bấm "Đặt hàng" cùng lúc xem server có sập không (Dùng tools như JMeter hoặc k6).

### 3.2. Giao diện (UI/UX & Responsiveness)
- **Mobile Test:** Mở web trên điện thoại (hoặc F12 -> Mobile Mode).
    - Menu có bị vỡ không?
    - Nút bấm có quá nhỏ không?
    - Chữ có bị tràn màn hình không?
- **Dark Mode:** (Nếu có) Chuyển sang giao diện tối xem màu chữ có đọc được không?

### 3.3. Bảo mật (Security)
- **SQL Injection:** Nhập `' OR 1=1 --` vào ô đăng nhập xem có hack được không.
- **XSS:** Nhập `<script>alert('hacked')</script>` vào ô Comment/Tên món ăn xem nó có hiện popup không.
- **Phân quyền (Broken Access Control):**
    - User thường cố truy cập vào link `/admin` -> Phải bị đá ra trang 403 hoặc Login.
    - User A cố xem đơn hàng của User B (đổi ID trên URL) -> Phải chặn.

### 3.4. Tương thích (Compatibility)
- Test trên Chrome, Edge, Firefox, Safari (nếu có Mac).
- Test trên Android (Chrome) và iOS (Safari).

---

## 4. QUY TRÌNH BÁO CÁO LỖI (BUG REPORTING)
Khi tìm thấy lỗi, Tester phải log vào Excel hoặc Jira theo mẫu sau:

| ID | Tiêu đề Lỗi | Các bước tái hiện (Steps to Reproduce) | Kết quả thực tế | Mức độ (Severity) |
|----|-------------|----------------------------------------|-----------------|-------------------|
| BUG-01 | Không đăng nhập được khi pass có ký tự lạ | 1. Vào trang Login<br>2. Nhập pass: "P@ssw0rd!"<br>3. Bấm Submit | Báo lỗi 500 Server Error | High (Cao) |
| BUG-02 | Ảnh món ăn bị méo trên iPhone 12 | 1. Vào trang chi tiết món ăn bằng iPhone 12 | Ảnh bị kéo giãn ngang | Low (Thấp) |

---

## 5. CÔNG CỤ DÀNH CHO TESTER (TOOLKIT)
1.  **Chụp ảnh/Quay màn hình:** ShareX hoặc Snipaste.
2.  **Test API:** Postman (để test backend khi chưa có giao diện).
3.  **Đo hiệu năng:** Google Lighthouse (có sẵn trong Chrome F12).
4.  **Quản lý lỗi:** Google Sheets hoặc Jira.
