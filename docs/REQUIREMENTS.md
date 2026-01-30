# Danh sách Yêu cầu Hệ thống (System Requirements)

Tài liệu này liệt kê các yêu cầu chức năng (Functional Requirements) để nhập vào file `Requirement management sheet.xlsx`.

## 1. Phân hệ Xác thực (Authentication)
| ID | Tên chức năng | Mô tả | Mức độ ưu tiên |
|----|---------------|-------|----------------|
| AUTH-001 | Đăng ký tài khoản | Người dùng có thể đăng ký bằng Email/Password | Cao |
| AUTH-002 | Đăng nhập | Đăng nhập vào hệ thống để sử dụng tính năng | Cao |
| AUTH-003 | Đăng xuất | Kết thúc phiên làm việc an toàn | Trung bình |

## 2. Phân hệ Marketplace (Trao đổi thực phẩm)
| ID | Tên chức năng | Mô tả | Mức độ ưu tiên |
|----|---------------|-------|----------------|
| MKT-001 | Xem danh sách | Hiển thị danh sách thực phẩm đang có sẵn | Cao |
| MKT-002 | Chi tiết món ăn | Xem thông tin chi tiết (ảnh, hạn trang, địa điểm) | Cao |
| MKT-003 | Tìm kiếm & Lọc | Lọc theo khoảng cách, loại thực phẩm | Trung bình |

## 3. Phân hệ Cứu trợ (Food Rescue)
| ID | Tên chức năng | Mô tả | Mức độ ưu tiên |
|----|---------------|-------|----------------|
| RES-001 | Đăng bài cứu trợ | Người dùng đăng thông tin thực phẩm dư thừa | Cao |
| RES-002 | Bản đồ cứu trợ | Xem vị trí các điểm cứu trợ trên bản đồ | Cao |

## 4. Phân hệ Hỗ trợ & Liên hệ (Supports)
| ID | Tên chức năng | Mô tả | Mức độ ưu tiên |
|----|---------------|-------|----------------|
| SUP-001 | Gửi yêu cầu hỗ trợ | Form liên hệ cho người dùng gặp sự cố | Trung bình |
| SUP-002 | Liên hệ đối tác | Form chuyên biệt cho doanh nghiệp hợp tác | Trung bình |
| SUP-003 | FAQ | Trang câu hỏi thường gặp | Thấp |

## 5. Yêu cầu Phi chức năng (Non-Functional)
- **Hiệu năng:** Trang tải dưới 2 giây.
- **Bảo mật:** Mật khẩu được mã hóa (bcrypt), API có xác thực.
- **Giao diện:** Responsive trên Mobile và Desktop.
