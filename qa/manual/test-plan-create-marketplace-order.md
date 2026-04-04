# Manual Test Plan - Create Post -> Marketplace -> Order

## 1) Muc tieu
Tai lieu manual test cho luong:
1. Create post
2. Marketplace listing/filter/view
3. Create order (donation)
4. Orders/success ownership check

Muc tieu la de dev/QA khac co the chay lai ngay, khong can giai thich them.

## 2) Pham vi
- In-scope:
	- Pages: /rescue/create, /marketplace, /rescue/confirm/[id], /rescue/success/[id], /orders
	- APIs: POST /api/posts, GET /api/posts, GET /api/posts/:id, POST /api/donations, GET /api/donations/my-orders, GET /api/donations/:id
	- Auth + role/ownership behavior lien quan den flow tren
- Out-of-scope:
	- Payment gateway
	- Contact/Email flow
	- Donor QR verify sau khi giao/nhan

## 3) Preconditions
### 3.1 Moi truong
- Backend va Frontend chay thanh cong.
- DB da migrate/push schema moi nhat.
- Co tai khoan test va data theo qa/manual/test-data.md.

### 3.2 Tai khoan can co
- donor01 (DONOR)
- receiver01 (RECEIVER)
- receiver02 (RECEIVER)

### 3.3 Luu y hien trang can biet truoc khi test
- /rescue/create hien tai la mock form: bam "Dang bai" chua call API tao post that.
- Vi vay checklist duoc tach:
	- UI behavior cho create page
	- API behavior cho create post (de tao data that cho marketplace/order)

## 4) Priority definition
- P0: Blocker/business critical
- P1: Important
- P2: Nice-to-have

## 5) Role-based matrix
| Chuc nang | Guest | Receiver | Donor | Ghi chu |
|---|---|---|---|---|
| Xem marketplace | Co | Co | Co | GET /api/posts public |
| Vao /rescue/confirm/[id] | Redirect /login | Co | Co | Auth required |
| Tao donation | Khong | Co | Co | API check auth, khong khoa role |
| Xem /orders | Redirect /login | Co | Co | Hien theo receiverId cua nguoi dang nhap |
| Xem /rescue/success/[id] | Redirect /login | Chi owner receiver | Khong | Co ownership check |
| POST /api/posts | Khong | Co (hien trang) | Co | Hien tai chua enforce chi DONOR |

## 6) Checklist theo chuc nang

## A. Create Post UI - /rescue/create

### TC-CP-001 (P1) Wizard 4 step
- Precondition: Mo /rescue/create
- Steps:
	1. Kiem tra step 1 va progress bar.
	2. Bam "Tiep tuc" den step 2,3,4.
	3. Bam "Quay lai" de quay nguoc.
- Expected:
	- Step chuyen dung.
	- Data nhap duoc giu khi quay lai.

### TC-CP-002 (P1) UI validate gia
- Steps:
	1. originalPrice = 50000, rescuePrice = 50000.
	2. Bam "Dang bai".
- Expected: alert loi gia cuu phai nho hon gia goc.

### TC-CP-003 (P1) UI validate expiry
- Steps:
	1. expiryDate <= hien tai.
	2. Bam "Dang bai".
- Expected: alert loi thoi gian het han khong hop le.

### TC-CP-004 (P0) End-to-end create post from UI
- Steps:
	1. Nhap data hop le va bam "Dang bai".
	2. Mo /marketplace tim post vua tao.
- Expected theo requirement business: post moi phai xuat hien.
- Expected theo hien trang code: chi alert mock, khong tao post that.
- Action: log defect P0 neu release can luong tao post that tren UI.

## B. Create Post API - POST /api/posts

### TC-API-POST-001 (P0) Create post hop le
- Precondition: co token user dang nhap
- Steps:
	1. POST /api/posts payload valid.
	2. GET /api/posts de doi chieu.
- Expected:
	- HTTP 200.
	- Co id, title, quantity, status AVAILABLE.
	- Post hien tren marketplace (neu chua het han).

### TC-API-POST-002 (P0) No auth
- Steps: POST /api/posts khong token
- Expected: HTTP 401 Unauthorized.

### TC-API-POST-003 (P0) rescuePrice >= originalPrice
- Steps: POST payload invalid gia
- Expected: HTTP 400 + message validate.

### TC-API-POST-004 (P0) quantity = 0
- Steps: POST payload quantity=0
- Expected: HTTP 400 + message quantity toi thieu.

### TC-API-POST-005 (P0) expiryDate qua khu
- Steps: POST payload expiry <= now
- Expected: HTTP 400 + message expiry invalid.

### TC-API-POST-006 (P1) Role behavior create post
- Steps:
	1. Receiver tao post.
	2. Donor tao post.
- Expected hien trang:
	- Ca 2 deu tao duoc neu da auth.
- Note: neu product muon chi DONOR tao post -> log gap authorization.

## C. Marketplace - /marketplace

### TC-MP-001 (P0) Listing condition
- Precondition: co 1 post AVAILABLE + 1 post expired
- Steps: mo /marketplace
- Expected:
	- Chi hien post AVAILABLE va expiryDate > now.
	- Post expired khong hien.

### TC-MP-002 (P1) Search title/donor
- Steps: nhap keyword title va donor
- Expected: ket qua filter dung.

### TC-MP-003 (P1) Filter type
- Steps: all -> MYSTERY_BOX -> INDIVIDUAL
- Expected: danh sach doi dung theo type.

### TC-MP-004 (P1) View mode list/map
- Steps: toggle list/map
- Expected: chuyen view dung, khong crash.

### TC-MP-005 (P0) CTA "Giai cuu ngay"
- Steps: bam nut tren post con hang
- Expected: di den /rescue/confirm/[id].

### TC-MP-006 (P1) Sold-out button state
- Precondition: post quantity = 0
- Steps: xem card post
- Expected: button disabled, label "Da het".

## D. Confirm Order - /rescue/confirm/[id] + POST /api/donations

### TC-OD-001 (P0) Guest access
- Steps: logout -> vao /rescue/confirm/[id]
- Expected: redirect /login.

### TC-OD-002 (P0) Happy path PICKUP
- Precondition: receiver01 dang nhap, post con hang
- Steps:
	1. Chon quantity=1, method PICKUP.
	2. Bam "Xac nhan giai cuu".
- Expected:
	- Tao donation thanh cong.
	- Redirect /rescue/success/[donationId].
	- So luong post giam.

### TC-OD-003 (P0) Happy path DELIVERY
- Steps:
	1. Chon DELIVERY.
	2. Nhap address + phone hop le.
	3. Submit.
- Expected:
	- Tao donation thanh cong.
	- Success page hien trang thai van chuyen (khong QR pickup).

### TC-OD-004 (P0) DELIVERY thieu data
- Steps: DELIVERY nhung bo trong address hoac phone
- Expected: hien loi, khong tao donation.

### TC-OD-005 (P0) Phone invalid format
- Steps: DELIVERY voi phone=12345
- Expected: HTTP 400, thong bao phone invalid.

### TC-OD-006 (P0) Quantity vuot ton
- Steps: dat quantity > ton kho
- Expected: loi khong du so luong/het hang, khong tao donation.

### TC-OD-007 (P0) Post expired
- Steps: dat don voi post da qua han
- Expected: API reject voi message post expired.

### TC-OD-008 (P1) Post not found
- Steps: mo /rescue/confirm/{id-khong-ton-tai}
- Expected: not found page.

## E. Orders + Success ownership

### TC-OR-001 (P0) /orders login gate
- Steps: logout -> mo /orders
- Expected: redirect /login.

### TC-OR-002 (P0) /orders data correctness
- Precondition: receiver01 da co don
- Steps: login receiver01 -> mo /orders
- Expected: hien dung danh sach order cua receiver01.

### TC-OR-003 (P1) Empty state
- Precondition: account chua co don
- Steps: login account do -> mo /orders
- Expected: hien empty state + CTA ve marketplace.

### TC-OR-004 (P0) Success page ownership
- Precondition: donation A cua receiver01
- Steps:
	1. receiver01 vao /rescue/success/A
	2. receiver02 vao /rescue/success/A
- Expected:
	- receiver01 xem duoc.
	- receiver02 khong xem duoc (not found/forbidden behavior).

### TC-OR-005 (P0) GET /api/donations/:id ownership
- Steps: user la nguoi la goi API donation cua user khac
- Expected: HTTP 403 Forbidden.

## 7) Regression copy checklist
- [ ] P0 - Create post API valid
- [ ] P0 - Create post API unauthorized = 401
- [ ] P0 - Create post API validation (price/quantity/expiry)
- [ ] P0 - Marketplace hien post hop le
- [ ] P0 - Pickup order happy path
- [ ] P0 - Delivery order happy path
- [ ] P0 - Delivery missing fields bi chan
- [ ] P0 - Phone invalid bi chan
- [ ] P0 - Over-quantity/expired bi chan
- [ ] P0 - Orders page login gate
- [ ] P0 - Success ownership check
- [ ] P0 - Donation API ownership 403
- [ ] P1 - Marketplace search/filter/list-map
- [ ] P1 - Orders empty state
- [ ] P0 bug check - Create page dang mock, chua tao post that

## 8) Team review truoc khi dong task
1. QA run toan bo P0, attach screenshot/log API.
2. Dev backend confirm status code/message cho cac case fail.
3. Dev frontend confirm UI flow va redirect behavior.
4. Product confirm role policy create post (chi DONOR hay ca RECEIVER).
5. Chot bug list + owner + due date, sau do moi close task.

## 9) Acceptance criteria mapping
- Co happy path + negative path day du: Dat
- Co role-based behavior: Dat
- Co test data dung chung: Dat (xem qa/manual/test-data.md)
- Co the copy lam regression checklist: Dat
