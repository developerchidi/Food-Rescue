# Báo cáo QA Implementation - Food Rescue

Date: 2026-04-06
Workspace: `D:\Food-Rescue-main\Food-Rescue-main`

## 1. Chi tiết thực hiện

### a. Môi trường kiểm thử

- Môi trường: local workspace hiện tại
- Branch Git: `brand`
- Commit/hash: `bdce5e981baaa2a5ae6018c8454f8dd47d086bbe`
- Frontend: Next.js `16.1.4`, React `19.2.3`, NextAuth v5
- Có Playwright: `@playwright/test`
- Backend hiện đang bị thiếu/blocked trong checkout này
  - Repo khai báo `Backend` là submodule Git tới `https://github.com/developerchidi/Food-Rescue-Core.git`, nhưng nội dung submodule không có trong checkout.
  - Frontend phụ thuộc backend qua endpoint `http://localhost:3001` và `http://localhost:3001/api`.

Tài liệu tham chiếu:
- `D:\Food-Rescue-main\Food-Rescue-main\.gitmodules`
- `D:\Food-Rescue-main\Food-Rescue-main\Frontend\package.json`
- `D:\Food-Rescue-main\Food-Rescue-main\playwright-mobile\package.json`

Bằng chứng:
- `.gitmodules` xác định backend submodule bị thiếu.
- `Frontend/src/auth.ts` có URL đăng nhập về `http://localhost:3001`.
- `Frontend/src/lib/proxy.ts` truyền request đến `http://localhost:3001/api`.

### b. Tài khoản Donor

Trạng thái: Blocked

Đã kiểm tra:
- Form đăng ký frontend chỉ gửi `name`, `email`, `password`.
- UI đăng ký không có trường lựa chọn role donor/receiver.
- Luồng tạo bài cứu trợ (rescue/create) trong code tồn tại, nhưng phần auth gate đang bị comment/không buộc login rõ ràng.

Kết luận:
- Không thể xác thực tài khoản donor end-to-end tại workspace này vì backend và cơ chế cấp role không có sẵn.

Tham chiếu:
- `D:\Food-Rescue-main\Food-Rescue-main\Frontend\src\app\(auth)\register\page.tsx`
- `D:\Food-Rescue-main\Food-Rescue-main\Frontend\src\app\rescue\create\page.tsx`

### c. Tài khoản Receiver

Trạng thái: Blocked

Đã kiểm tra:
- Code có xuất hiện logic cho receiver, ví dụ check `receiverId` trên trang rescue success.
- Các luồng login/order/history yêu cầu token/session từ backend.

Kết luận:
- Không thể tạo hoặc xác thực tài khoản receiver end-to-end vì backend auth/data chưa có.

Tham chiếu:
- `D:\Food-Rescue-main\Food-Rescue-main\Frontend\src\auth.ts`
- `D:\Food-Rescue-main\Food-Rescue-main\Frontend\src\app\rescue\success\[id]\page.tsx`
- `D:\Food-Rescue-main\Food-Rescue-main\Frontend\src\app\orders\page.tsx`

### d. Phân biệt role và dữ liệu

Quan sát:
- Backend session model hỗ trợ `role` trả về từ auth.
- UI đăng ký không chọn role rõ ràng.
- Code đã phân biệt donor/receiver trong một số luồng bài đăng và đơn hàng.
- Tuy nhiên, `rescue/create` không ép buộc login ở component, nên quyền truy cập chưa được kiểm soát hoàn chỉnh.

Đánh giá:
- Donor và receiver được phân biệt ở mức code, nhưng không thể xác thực hoàn chỉnh do thiếu backend.
- Nếu yêu cầu QA là mỗi email map 1 role, thì phải dùng seed data/backend admin chứ frontend register hiện tại không đủ.

### e. Bảo mật

- Không đưa mật khẩu thật hoặc thông tin bí mật vào báo cáo này.
- Không trích xuất credential từ workspace.
- Nếu cần lưu credential, phải dùng kênh nội bộ an toàn (password manager / Confluence restricted / file team).
- Chỉ ghi email/username và role trong ticket.

## 2. Báo cáo bao gồm

### a. Bảng tài khoản test

| STT | Email/Username | Role | Mục đích QA | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| 1 | N/A | donor | Smoke/regression luồng donor | Blocked | Backend chưa có, không thể tạo account |
| 2 | N/A | receiver | Smoke/regression luồng receiver | Blocked | Backend chưa có, không thể tạo account |

### b. Checklist smoke

| Bước | Kỳ vọng | Thực tế | Trạng thái | Thời điểm test |
|---|---|---|---|---|
| Mở trang đăng ký | UI đăng ký hiển thị | UI đăng ký hiển thị | Pass (evidence-only) | 2026-04-04 |
| Mở trang profile | UI profile hiển thị | UI profile hiển thị | Pass (evidence-only) | 2026-04-04 |
| Đăng nhập donor | Donor login thành công | Chưa thực thi, backend chưa sẵn sàng | Blocked | 2026-04-06 |
| Tạo bài rescue | Donor tạo bài rescue | Chưa thực thi end-to-end | Blocked | 2026-04-06 |
| Đăng xuất donor | Logout thành công | Chưa thực thi | Blocked | 2026-04-06 |
| Đăng nhập receiver | Receiver login thành công | Chưa thực thi, backend chưa sẵn sàng | Blocked | 2026-04-06 |
| Luồng receiver | Receiver xem/nhận món | Chưa thực thi end-to-end | Blocked | 2026-04-06 |
| Đăng xuất receiver | Logout thành công | Chưa thực thi | Blocked | 2026-04-06 |

### c. Evidence

- Ảnh màn hình register mobile:
  - `D:\Food-Rescue-main\Food-Rescue-main\playwright-mobile\screenshots\register.png`
- Ảnh màn hình profile mobile:
  - `D:\Food-Rescue-main\Food-Rescue-main\playwright-mobile\screenshots\profile.png`
- Báo cáo Playwright HTML:
  - `D:\Food-Rescue-main\Food-Rescue-main\playwright-mobile\playwright-report\index.html`
- Test spec hiện có:
  - `D:\Food-Rescue-main\Food-Rescue-main\playwright-mobile\tests\register.spec.ts`
  - `D:\Food-Rescue-main\Food-Rescue-main\playwright-mobile\tests\profile.spec.ts`

### d. Blocker / issue

1. Thiếu backend trong checkout hiện tại
   - Ảnh hưởng: không thể tạo tài khoản, đăng nhập, lấy dữ liệu bài đăng/đơn hàng.
   - Bằng chứng: `.gitmodules` chỉ định backend submodule nhưng nội dung không có; frontend gọi `localhost:3001`.

2. Form đăng ký không có lựa chọn role
   - Ảnh hưởng: không thể tạo riêng Donor/Receiver từ frontend.
   - Bằng chứng: register page chỉ gửi `name`, `email`, `password`.

3. `rescue/create` không ép buộc auth rõ ràng
   - Ảnh hưởng: quyền truy cập donor chưa được đảm bảo.
   - Bằng chứng: auth redirect gate trong page bị comment.

4. Playwright hiện tại chưa ổn định cho test tự động hoàn chỉnh
   - Ảnh hưởng: bằng chứng tự động không đầy đủ.
   - Bằng chứng: test chứa `page.pause()` và log lỗi `browserContext.close: Target page, context or browser has been closed`.

## 3. Kết luận

Workspace này đủ để mô tả môi trường QA, xác định các điểm evidence hiện có và ghi nhận blockers chính, nhưng chưa đủ để hoàn tất kiểm thử donor/receiver end-to-end như yêu cầu.

Để hoàn thành QA đúng yêu cầu cần:
- Lấy hoặc khởi tạo submodule `Backend` đầy đủ.
- Cấu hình backend `.env` và quyền truy cập database.
- Seed hoặc cấp sẵn 1 tài khoản donor và 1 tài khoản receiver.
- Chạy lại các bước login/post/order/logout và ghi lại evidence mới.
