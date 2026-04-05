# Manual Test Plan - Create Post -> Marketplace -> Order

## 1. Muc tieu
Xay dung bo manual test plan cho luong:
1. Tao bai dang mon an
2. Hien thi tren Marketplace
3. Dat don giai cuu
4. Kiem tra lich su don hang

Tai lieu nay duoc viet de dev/QA co the chay lai doc lap, khong can giai thich them.

## 2. Pham vi
- In scope:
  - Frontend pages: /rescue/create, /marketplace, /rescue/confirm/[id], /rescue/success/[id], /orders
  - Backend APIs: POST /api/posts, GET /api/posts, GET /api/posts/:id, POST /api/donations, GET /api/donations/my-orders, GET /api/donations/:id
  - Auth + ownership behavior lien quan den luong tren
- Out of scope:
  - Payment gateway that su
  - Email/contact flow
  - QR verify boi donor sau khi receiver nhan hang

## 3. Tai lieu tham chieu
- README.md
- Backend/src/routes/post.routes.ts
- Backend/src/routes/donation.routes.ts
- Backend/src/services/FoodPostService.ts
- Backend/src/services/DonationService.ts
- Backend/src/lib/validators/posts.ts
- Backend/src/lib/validators/donations.ts
- Frontend/src/app/rescue/create/page.tsx
- Frontend/src/app/rescue/create/RescueFormProvider.tsx
- Frontend/src/actions/post-actions.ts
- Frontend/src/actions/upload-actions.ts
- Frontend/src/lib/validators/posts.ts
- Frontend/src/app/marketplace/page.tsx
- Frontend/src/components/features/marketplace/MarketplaceClient.tsx
- Frontend/src/components/features/FoodCard.tsx
- Frontend/src/app/rescue/confirm/[id]/page.tsx
- Frontend/src/app/rescue/confirm/[id]/RescueConfirmForm.tsx
- Frontend/src/lib/actions/rescue.ts
- Frontend/src/app/rescue/success/[id]/page.tsx
- Frontend/src/app/orders/page.tsx

## 4. Muc do uu tien
- P0: Critical business flow, blocker release
- P1: Quan trong, can cover trong regression chinh
- P2: Bo sung, nen cover khi co thoi gian

## 5. Preconditions

### 5.1 Moi truong
- Backend va Frontend chay thanh cong.
- Database co schema moi nhat (Prisma migrate/push da hoan tat).
- Co du lieu user test theo file qa/manual/test-data.md.

### 5.2 Tai khoan test bat buoc
- Donor account (role = DONOR)
- Receiver account (role = RECEIVER)
- Account khac khong lien quan don de test ownership

### 5.3 Luu y hien trang san pham
- Trang /rescue/create dung `RescueFormProvider`: goi server action `createFoodPost` (va upload anh len Cloudinary neu co chon file).
- Khi backend + auth on, submit thanh cong se tao post that; sau thanh cong dieu huong ve `/marketplace` (theo code hien tai).
- Van nen giu test API POST /api/posts de regression nhanh va doi chieu status/message voi tai lieu.

## 6. Role-based behavior matrix

| Chuc nang | Guest | Receiver | Donor | Ghi chu |
|---|---|---|---|---|
| Xem marketplace | Cho phep | Cho phep | Cho phep | GET /api/posts khong can auth |
| Vao /rescue/confirm/[id] | Redirect /login | Cho phep | Cho phep | Auth bat buoc |
| Tao donation | Khong | Cho phep | Cho phep | API chi check auth, KHONG check role |
| Xem /orders | Redirect /login | Cho phep | Cho phep | Hien don theo receiverId cua user dang nhap |
| Xem /rescue/success/[id] | Redirect /login | Chi receiver cua don duoc xem | Donor khong xem duoc | Co ownership check phia frontend + backend |
| Tao post qua API /api/posts | Khong | Cho phep (hien trang) | Cho phep | API gan donorId = req.user.id, KHONG khoa role DONOR |

## 7. Test checklist theo trang/chuc nang

## A. Create Post UI (/rescue/create)

### TC-CP-001 - Wizard 4 buoc hien thi dung
- Priority: P1
- Precondition: Mo /rescue/create
- Steps:
  1. Kiem tra progress bar va noi dung step 1.
  2. Bam "Tiep tuc" de di step 2, 3, 4.
  3. Bam "Quay lai" de quay nguoc cac step.
- Expected:
  - Progress bar cap nhat theo step hien tai.
  - Du lieu nhap o cac step duoc giu nguyen khi quay lai.

### TC-CP-002 - Validate gia cuu nho hon gia goc (UI local)
- Priority: P1
- Precondition: Dang o step cuoi
- Steps:
  1. Nhap originalPrice = 50000, rescuePrice = 50000.
  2. Bam "Dang bai".
- Expected:
  - Hien alert loi gia cuu phai nho hon gia goc.

### TC-CP-003 - Validate expiryDate phai lon hon hien tai (UI local)
- Priority: P1
- Steps:
  1. Nhap expiryDate <= hien tai.
  2. Bam "Dang bai".
- Expected:
  - Hien alert loi thoi gian het han khong hop le.

### TC-CP-004 - Tao post that tu UI (happy path)
- Priority: P0
- Precondition: Dang nhap user hop le, backend chay, co the dung tai khoan DONOR theo test-data.md
- Steps:
  1. Nhap day du thong tin hop le tren wizard (step 1-4).
  2. (Tuy chon) chon anh de upload Cloudinary.
  3. Bam "Dang bai".
  4. Mo /marketplace tim post vua tao (title hoac mo ta).
- Expected:
  - Hien thi loi ro rang neu validate fail hoac API/Cloudinary loi.
  - Thanh cong: redirect ve `/marketplace`; post moi xuat hien khi con AVAILABLE va chua het han.

## B. Create Post API (POST /api/posts)

### TC-API-POST-001 - Tao post hop le
- Priority: P0
- Precondition: Dang nhap bang account hop le (token co san)
- Steps:
  1. Goi POST /api/posts voi payload hop le (xem test-data.md).
  2. Kiem tra response.
  3. Goi GET /api/posts tim post vua tao.
- Expected:
  - HTTP 200.
  - Response co id, title, quantity, status = AVAILABLE.
  - Post xuat hien trong GET /api/posts khi expiryDate > now.

### TC-API-POST-002 - Khong auth
- Priority: P0
- Steps:
  1. Goi POST /api/posts khong kem token.
- Expected:
  - HTTP 401 Unauthorized.

### TC-API-POST-003 - rescuePrice >= originalPrice
- Priority: P0
- Steps:
  1. Goi POST /api/posts voi rescuePrice >= originalPrice.
- Expected:
  - HTTP 400.
  - Message loi: Gia giai cuu phai nho hon gia goc.

### TC-API-POST-004 - quantity = 0
- Priority: P0
- Steps:
  1. Goi POST /api/posts voi quantity = 0.
- Expected:
  - HTTP 400.
  - Message loi: So luong it nhat la 1.

### TC-API-POST-005 - expiryDate trong qua khu
- Priority: P0
- Steps:
  1. Goi POST /api/posts voi expiryDate <= now.
- Expected:
  - HTTP 400.
  - Message loi thoi gian het han.

### TC-API-POST-006 - Role behavior create post
- Priority: P1
- Steps:
  1. Dung account RECEIVER goi POST /api/posts payload hop le.
  2. Dung account DONOR goi POST /api/posts payload hop le.
- Expected theo hien trang code:
  - Ca 2 request deu thanh cong neu da auth.
- Luu y:
  - Neu product requirement muon chi DONOR tao post, case nay se expose gap authorization.

## C. Marketplace (/marketplace)

### TC-MP-001 - Hien thi bai dang AVAILABLE + chua het han
- Priority: P0
- Precondition: Co it nhat 1 post hop le va 1 post het han
- Steps:
  1. Mo /marketplace.
- Expected:
  - Chi thay post co status AVAILABLE va expiryDate > now.
  - Post het han khong hien thi.

### TC-MP-002 - Search theo ten mon hoac ten donor
- Priority: P1
- Steps:
  1. Nhap tu khoa theo title.
  2. Nhap tu khoa theo donor name.
- Expected:
  - Ket qua loc dung theo title/donor.

### TC-MP-003 - Filter category
- Priority: P1
- Steps:
  1. Chuyen filter all -> MYSTERY_BOX -> INDIVIDUAL.
- Expected:
  - Danh sach cap nhat dung theo type.

### TC-MP-004 - List/Map toggle
- Priority: P1
- Steps:
  1. Chuyen qua lai giua Danh sach va Ban do.
- Expected:
  - UI chuyen dung che do, khong crash.

### TC-MP-005 - Nut "Giai cuu ngay"
- Priority: P0
- Steps:
  1. Bam nut "Giai cuu ngay" tren post con hang.
- Expected:
  - Dieu huong den /rescue/confirm/[id].

### TC-MP-006 - Post quantity = 0
- Priority: P1
- Precondition: Co post quantity = 0 (hoac sau khi dat het)
- Steps:
  1. Kiem tra card cua post.
- Expected:
  - Nut bi disable, hien "Da het".

## D. Confirm Order (/rescue/confirm/[id]) va tao donation

### TC-OD-001 - Chua dang nhap truy cap confirm
- Priority: P0
- Steps:
  1. Dang xuat.
  2. Mo truc tiep /rescue/confirm/[id].
- Expected:
  - Redirect /login.

### TC-OD-002 - Happy path PICKUP
- Priority: P0
- Precondition: Dang nhap receiver, post con it nhat 1 suat
- Steps:
  1. Mo /rescue/confirm/[id].
  2. De method = PICKUP.
  3. quantity = 1.
  4. Bam "Xac nhan giai cuu".
- Expected:
  - Tao donation thanh cong.
  - Redirect /rescue/success/[donationId].
  - Quantity tren marketplace giam di.

### TC-OD-003 - Happy path DELIVERY
- Priority: P0
- Steps:
  1. Chon DELIVERY.
  2. Nhap address + phone hop le.
  3. Bam "Xac nhan giai cuu".
- Expected:
  - Tao donation thanh cong.
  - /rescue/success/[id] hien thong tin van chuyen (khong hien QR pickup).

### TC-OD-004 - DELIVERY thieu address/phone
- Priority: P0
- Steps:
  1. Chon DELIVERY.
  2. De trong address hoac phone.
  3. Bam xac nhan.
- Expected:
  - Hien loi tren form: yeu cau nhap day du dia chi va sdt.
  - Khong tao donation.

### TC-OD-005 - Phone sai dinh dang (API validate)
- Priority: P0
- Steps:
  1. DELIVERY voi phone khong dung regex (vi du: 12345).
  2. Bam xac nhan.
- Expected:
  - API tra 400 voi loi so dien thoai khong hop le.
  - UI hien error.

### TC-OD-006 - quantity vuot ton kho
- Priority: P0
- Steps:
  1. Chon quantity > so luong con lai (co the tao race giua 2 users).
  2. Bam xac nhan.
- Expected:
  - API tra loi "khong du so luong" hoac "vua het hang".
  - Khong tao donation.

### TC-OD-007 - Post het han
- Priority: P0
- Steps:
  1. Dung post da qua expiryDate.
  2. Thu tao donation.
- Expected:
  - API tu choi voi thong bao bai dang da het han.

### TC-OD-008 - Not found post
- Priority: P1
- Steps:
  1. Truy cap /rescue/confirm/{id-khong-ton-tai}.
- Expected:
  - Hien trang not found.

## E. Success page + Orders

### TC-OR-001 - Success page ownership
- Priority: P0
- Precondition: Da co donation A cua receiver R1
- Steps:
  1. Dang nhap R1 -> mo /rescue/success/A (duoc).
  2. Dang nhap R2 hoac donor khac -> mo /rescue/success/A.
- Expected:
  - R1 xem duoc.
  - User khac bi not found/forbidden theo flow hien tai.

### TC-OR-002 - Orders page login gate
- Priority: P0
- Steps:
  1. Dang xuat.
  2. Mo /orders.
- Expected:
  - Redirect /login.

### TC-OR-003 - Orders page hien dung du lieu
- Priority: P0
- Precondition: Receiver co >= 1 order
- Steps:
  1. Dang nhap receiver.
  2. Mo /orders.
- Expected:
  - Hien danh sach order cua chinh receiver do.
  - Co thong tin title, donor, so luong, method, expiry.

### TC-OR-004 - Empty orders state
- Priority: P1
- Precondition: Receiver chua co order
- Steps:
  1. Dang nhap account chua dat don.
  2. Mo /orders.
- Expected:
  - Hien empty state va nut quay lai marketplace.

### TC-OR-005 - GET /api/donations/:id ownership
- Priority: P0
- Steps:
  1. Dung user khong phai receiver va cung khong phai donor cua donation.
  2. Goi GET /api/donations/:id.
- Expected:
  - HTTP 403 Forbidden.

## 8. Regression checklist (copy nhanh)

- [ ] P0 - CP/API-POST: Tao post hop le thanh cong qua API
- [ ] P0 - CP/API-POST: Khong auth bi 401
- [ ] P0 - CP/API-POST: Validate rescuePrice/originalPrice/quantity/expiryDate
- [ ] P0 - MP: Post moi hien thi tren marketplace
- [ ] P0 - OD: PICKUP dat don thanh cong, redirect success
- [ ] P0 - OD: DELIVERY dat don thanh cong voi address+phone hop le
- [ ] P0 - OD: DELIVERY thieu thong tin bi chan
- [ ] P0 - OD: Phone sai format bi chan
- [ ] P0 - OD: Vuot ton kho/het han bi chan
- [ ] P0 - OR: /orders can login
- [ ] P0 - OR: /rescue/success/[id] chi receiver dung owner xem duoc
- [ ] P0 - API ownership: /api/donations/:id tra 403 voi user la nguoi la
- [ ] P1 - CP UI: Wizard step navigation hoat dong dung
- [ ] P1 - MP: Search/filter/list-map hoat dong
- [ ] P1 - OR: Empty state don hang dung
- [ ] P0 - /rescue/create: submit UI tao post that + post hien tren marketplace (khi backend/auth OK)

## 9. Team review truoc khi dong task

### 9.1 Danh sach review
- [ ] QA confirm test case bao phu happy path + negative path
- [ ] Dev backend confirm expected API status/message khop implementation
- [ ] Dev frontend confirm expected UI behavior va redirect
- [ ] Product owner confirm role policy (receiver co duoc create post hay khong)
- [ ] Team thong nhat hanh vi upload anh (Cloudinary) va thong bao loi tren /rescue/create

### 9.2 De xuat nghi thuc review
1. QA chay P0 truoc, ghi pass/fail + evidence (screenshot/log API).
2. Dev review cac fail case va xac nhan bug hay expected.
3. Chot regression subset (P0 bat buoc + P1 can cover theo release).
4. Ky xac nhan dong task sau khi cap nhat ket qua vao ticket.

## 10. Exit criteria
- Toan bo P0 da duoc chay va co ket qua ro rang (Pass/Fail/Blocked).
- Co test data dung chung cho team trong qa/manual/test-data.md.
- Co danh sach bug/known gap duoc log, co owner xu ly.
- Checklist regression co the copy va tai su dung cho sprint tiep theo.
