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
- **Cache / Giữ chỗ**: Upstash Redis (reservation TTL 10 phút, atomic trừ kho ảo).
- **UI/UX**: Framer Motion (micro-animations), Bento Grid Layout.

> **Cơ chế Giữ chỗ (Reservation)**: Luồng Giải cứu dùng Redis để giữ chỗ tạm thời trước khi trừ DB, tránh lock DB và đảm bảo "vào Checkout là có hàng". Xem chi tiết: [docs/redis-reservation.md](docs/redis-reservation.md).

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

> **Lưu ý**: Dự án sử dụng **Supabase** cho database, nên bạn cần có sẵn Supabase project trước khi chạy Docker.

### Quy trình Setup cho Team Members

#### Bước 1: Clone Repository
```bash
git clone https://github.com/nguyen-duc-thanh/Food-Recuse.git
cd Food-Recuse
```

#### Bước 2: Tạo file `.env`
```bash
cp .env.example .env
```

Sau đó chỉnh sửa `.env` với thông tin Supabase của bạn:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres"
AUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

#### Bước 3: Setup Database (Chỉ lần đầu tiên)
Trước khi chạy Docker, cần setup database schema trên Supabase:
```bash
# Cài dependencies local (chỉ để chạy Prisma)
npm install

# Generate Prisma Client
npx prisma generate

# Push schema lên Supabase
npx prisma db push
```

#### Bước 4: Build và Chạy Docker
```bash
docker-compose up --build
```

#### Bước 5: Truy cập ứng dụng
- App: http://localhost:3000

### Các lệnh Docker hữu ích

```bash
# Dừng container
docker-compose down

# Xem logs
docker-compose logs -f app

# Rebuild app
docker-compose up --build

# Chạy ở background
docker-compose up -d
```

### Development Local (Không dùng Docker)

Nếu bạn muốn chạy development server local:

```bash
# Cài dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Chạy dev server
npm run dev
```

## 🏗 Quy trình Quản lý Dự án (Git Strategy)

Dự án áp dụng mô hình **GitHub Flow** chuyên nghiệp để đảm bảo tính ổn định của mã nguồn:

- **Branch `main`**: Chứa phiên bản ổn định nhất của sản phẩm.
- **Branch `develop`**: Nơi tích hợp và kiểm thử các tính năng mới.
- **Nhánh phụ**: Luôn được đặt tên theo chuẩn `/`:
  - `feature/` : Phát triển tính năng mới.
  - `bugfix/` : Sửa các lỗi được phát triển trong giai đoạn dev.
  - `hotfix/` : Sửa lỗi khẩn cấp trên Production.

## 👥 Đội ngũ Phát triển (The Team)

Dự án được thực hiện bởi nhóm 7 thành viên đầy nhiệt huyết:

| Thành viên | GitHub | Vai trò | Trách nhiệm chính |
| :--- | :--- | :--- | :--- |
| **Nguyễn Thành Lộc (Chidi)** | [@developerchidi](https://github.com/developerchidi) | **Architect / Lead** | Security, Middleware, System Design, Core Backend Logic. |
| **Trần Thị Kim Nghi** | [@TranThiKimNghi](https://github.com/TranThiKimNghi) | **Frontend Lead** | UI/UX Standards, Component Library, SEO. |
| **Nguyễn Trung Kiên** | [@TrungKevin](https://github.com/TrungKevin) | **Backend Dev** | DB, API, Concurrency, Redis, Cron. |
| **Hà Thái Cơ** | [@hathaico](https://github.com/hathaico) | **Frontend Dev** | Feature Development (Profile, Stats), Web Client. |
| **Minh Mẫn** | [@minhman010104](https://github.com/minhman010104) | **Frontend Dev** | Feature Development (Dashboard, Scanner), Web Client. |
| **Huỳnh Toàn** | [@toanhuynh110804](https://github.com/toanhuynh110804) | **QA / Tester** | API Testing, Unit Testing. |
| **Anh Kiệt** | [@AnhKiet0212](https://github.com/AnhKiet0212) | **QA / Tester** | UI/UX Testing, Compatibility Testing. |

## 🤝 Đóng góp

Mọi ý kiến đóng góp và Pull Request luôn được hoan nghênh. Hãy tham khảo tệp [CONTRIBUTING.md] hoặc liên hệ trực tiếp với chúng tôi.

---

*Hành động nhỏ, tác động lớn. Cùng Food Rescue bảo vệ hành tinh của chúng ta!* nội dung chính
<!-- Jira Sync Test SCRUM-3 -->
<!-- Jira Sync Test SCRUM-8 -->
<!-- Jira Sync Test SCRUM-6 -->
<!-- Jira Final Sync Test SCRUM-6 Pattern 2 -->
