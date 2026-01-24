# 🥗 Food Rescue - Trao đi món ngon, Nhận lại nụ cười

**Food Rescue** là một nền tảng công nghệ giúp kết nối các nhà hàng, cửa hàng thực phẩm có thực phẩm dư thừa với những người cần giải cứu món ngon với giá cực kỳ ưu đãi. Chúng tôi hướng tới mục tiêu giảm thiểu lãng phí thực phẩm và bảo vệ môi trường.

![Marketplace Preview](/C:/Users/nguye/.gemini/antigravity/brain/47ca618c-183c-41fb-88a7-fefd8744e804/marketplace_new_layout_1769260855205.png)

---

## 🚀 Tính năng nổi bật

- **Khám phá Đa năng**: Chế độ xem Danh sách (List) và Bản đồ (Map) trực quan giúp bạn dễ dàng tìm thấy món ngon quanh mình.
- **Dòng thực phẩm "Giải cứu"**: Hỗ trợ nhiều loại hình như Combo, Món đơn lẻ và đặc biệt là **Hộp Mystery** đầy bất ngờ.
- **Quy trình Thông minh**: Hệ thống chọn món, xác nhận và nhận hàng qua mã QR cực kỳ bảo mật và tiện lợi.
- **Bảo mật tối thượng**: Tích hợp các lớp kiểm tra quyền sở hữu (Ownership check) và bảo mật Server-side.
- **Giao diện Minimalist-Pro**: Thiết kế tinh gọn, hiện đại, tập trung vào trải nghiệm người dùng.

## 🛠 Kiến trúc Công nghệ (Stack)

- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4, Lucide Icons.
- **Backend & DB**: Prisma ORM, PostgreSQL (Supabase).
- **Xác thực**: NextAuth.js v5 (Auth.js).
- **Bản đồ**: Leaflet.js.
- **UI/UX**: Framer Motion (micro-animations), Bento Grid Layout.

## 📦 Hướng dẫn Cài đặt

1. **Clone dự án**:
   ```bash
   git clone https://github.com/nguyen-duc-thanh/Food-Recuse.git
   cd Food-Recuse
   ```

2. **Cài đặt phụ thuộc**:
   ```bash
   npm install
   ```

3. **Cấu hình môi trường**:
   Tạo tệp `.env` và cấu hình các biến môi trường sau:
   ```env
   DATABASE_URL="..."
   AUTH_SECRET="..."
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Khởi chạy cơ sở dữ liệu**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Chạy Production/Development**:
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment (Khuyến nghị cho Team)

### Chạy với Docker Compose (Cách dễ nhất)

1. **Tạo file `.env`** (copy từ `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Chỉnh sửa `.env`** với các giá trị phù hợp:
   ```env
   DATABASE_URL="postgresql://fooduser:foodpassword@db:5432/food_rescue"
   AUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Build và chạy tất cả services**:
   ```bash
   docker-compose up --build
   ```

4. **Chạy Prisma migrations** (lần đầu tiên):
   ```bash
   docker-compose exec app npx prisma db push
   ```

5. **Truy cập ứng dụng**:
   - App: http://localhost:3000
   - Database: localhost:5555
   - Redis: localhost:6379

### Các lệnh Docker hữu ích

```bash
# Dừng tất cả services
docker-compose down

# Xem logs
docker-compose logs -f app

# Rebuild chỉ app service
docker-compose up --build app

# Xóa volumes (reset database)
docker-compose down -v
```

## 🏗 Quy trình Quản lý Dự án (Git Strategy)

Dự án áp dụng mô hình **GitHub Flow** chuyên nghiệp để đảm bảo tính ổn định của mã nguồn:

- **Branch `main`**: Chứa phiên bản ổn định nhất của sản phẩm.
- **Branch `develop`**: Nơi tích hợp và kiểm thử các tính năng mới.
- **Nhánh phụ**: Luôn được đặt tên theo chuẩn `/`:
  - `feature/` : Phát triển tính năng mới.
  - `bugfix/` : Sửa các lỗi được phát triển trong giai đoạn dev.
  - `hotfix/` : Sửa lỗi khẩn cấp trên Production.

## 🤝 Đóng góp

Mọi ý kiến đóng góp và Pull Request luôn được hoan nghênh. Hãy tham khảo tệp [CONTRIBUTING.md] hoặc liên hệ trực tiếp với chúng tôi.

---

*Hành động nhỏ, tác động lớn. Cùng Food Rescue bảo vệ hành tinh của chúng ta!* nội dung chính
