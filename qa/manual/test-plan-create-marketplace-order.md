# Manual Test Plan - Create Post -> Marketplace -> Order

## 1) Muc tieu
Xac minh end-to-end flow nghiep vu:
1. Tao bai dang thuc pham
2. Hien thi tren Marketplace
3. Dat don (pickup/delivery)
4. Hien thi don trong Orders va trang success

Tai lieu nay duoc viet de Dev/QA khac co the chay lai khong can giai thich them.

## 2) Pham vi
- Bao gom happy-path va negative-path.
- Bao gom role-based behavior (guest, receiver, donor, admin).
- Manual test cho web app frontend va API behavior lien quan.
- Khong bao gom backend unit test.

## 3) Tai lieu lien quan
- Test data: qa/manual/test-data.md
- Route lien quan:
  - Frontend: /rescue/create, /marketplace, /rescue/confirm/:id, /rescue/success/:id, /orders
  - API: /api/posts, /api/donations, /api/donations/my-orders, /api/donations/:id

## 4) Precondition
- App frontend/backend dang chay.
- DB + Redis san sang.
- Da tao san cac user trong qa/manual/test-data.md.
- Browser da clear cache/cookie truoc khi chay full regression (khuyen nghi).

## 5) Checklist theo muc uu tien

### P0 - Bat buoc pass

#### TC-P0-01 - Create post thanh cong (happy path)
- Priority: P0
- Role: user da login (khuyen nghi DONOR)
- Du lieu: POST-VALID-01
- Buoc test:
  1. Login bang U-DONOR-01.
  2. Vao /rescue/create.
  3. Nhap thong tin post hop le.
  4. Submit tao bai dang.
- Expected:
  1. Tao post thanh cong, khong bao loi.
  2. Post moi co quantity dung theo input.
  3. API POST /api/posts tra ve 200 va payload post.

#### TC-P0-02 - Post moi xuat hien tren marketplace
- Priority: P0
- Role: guest hoac user bat ky
- Du lieu: post tu TC-P0-01
- Buoc test:
  1. Vao /marketplace.
  2. Tim post bang title.
  3. Mo card chi tiet qua nut "Giai cuu ngay".
- Expected:
  1. Post hien thi dung title/gia/so luong.
  2. Chuyen trang sang /rescue/confirm/:id dung post id.

#### TC-P0-03 - Dat don PICKUP thanh cong
- Priority: P0
- Role: RECEIVER
- Du lieu: ORDER-PICKUP-VALID-01
- Buoc test:
  1. Login U-RECEIVER-01.
  2. Mo /rescue/confirm/:id cua post con hang.
  3. Chon quantity = 1, method = PICKUP.
  4. Click "Xac nhan giai cuu".
- Expected:
  1. Tao donation thanh cong.
  2. Redirect den /rescue/success/:donationId.
  3. quantity cua post giam di 1.
  4. Co qrCode tren success page voi pickup.

#### TC-P0-04 - Dat don DELIVERY thanh cong
- Priority: P0
- Role: RECEIVER
- Du lieu: ORDER-DELIVERY-VALID-01
- Buoc test:
  1. Login U-RECEIVER-01.
  2. Mo /rescue/confirm/:id.
  3. Chon DELIVERY, nhap address + phone hop le.
  4. Click "Xac nhan giai cuu".
- Expected:
  1. Tao donation thanh cong.
  2. Redirect den /rescue/success/:donationId.
  3. Success page hien thi trang thai cho giao hang (khong hien QR pickup mode).

#### TC-P0-05 - Orders list hien thi dung don vua tao
- Priority: P0
- Role: RECEIVER
- Buoc test:
  1. Vao /orders sau khi dat don.
  2. Kiem tra don vua tao nam trong danh sach.
  3. Click vao CTA xem chi tiet/ma nhan hang.
- Expected:
  1. Don hien thi dung title, quantity, donor.
  2. Dieu huong dung den /rescue/success/:id.

#### TC-P0-06 - Guest khong duoc dat don
- Priority: P0
- Role: Guest (chua login)
- Buoc test:
  1. Logout.
  2. Truy cap truc tiep /rescue/confirm/:id.
- Expected:
  1. Redirect ve /login.
  2. Khong tao donation moi.

### P1 - Quan trong

#### TC-P1-01 - Negative create post: rescuePrice >= originalPrice
- Priority: P1
- Role: user da login
- Du lieu: POST-NEG-02
- Buoc test:
  1. Nhap form voi rescuePrice bang hoac lon hon originalPrice.
  2. Submit.
- Expected:
  1. Khong tao post.
  2. Hien thong bao loi validate gia.

#### TC-P1-02 - Negative create post: expiryDate trong qua khu
- Priority: P1
- Role: user da login
- Du lieu: POST-NEG-03
- Buoc test:
  1. Nhap expiryDate da qua.
  2. Submit.
- Expected:
  1. Khong tao post.
  2. Hien loi expiryDate khong hop le.

#### TC-P1-03 - Negative order: quantity vuot ton kho
- Priority: P1
- Role: RECEIVER
- Du lieu: ORDER-NEG-02
- Buoc test:
  1. Mo post con so luong thap.
  2. Co gang dat quantity lon hon ton kho.
- Expected:
  1. API tra loi fail voi thong diep khong du so luong/het hang.
  2. UI hien thong diep loi ro rang.

#### TC-P1-04 - Negative order DELIVERY thieu thong tin
- Priority: P1
- Role: RECEIVER
- Du lieu: ORDER-NEG-03
- Buoc test:
  1. Chon DELIVERY nhung bo trong address/phone.
  2. Submit.
- Expected:
  1. Khong tao donation.
  2. Hien loi tai field address/phone.

#### TC-P1-05 - Negative order DELIVERY sai dinh dang phone
- Priority: P1
- Role: RECEIVER
- Du lieu: ORDER-NEG-04
- Buoc test:
  1. Chon DELIVERY, nhap phone sai format.
  2. Submit.
- Expected:
  1. Khong tao donation.
  2. Hien loi phone khong hop le.

#### TC-P1-06 - Ownership: khong xem duoc success page cua nguoi khac
- Priority: P1
- Role: RECEIVER khac
- Du lieu: donationId cua U-RECEIVER-01
- Buoc test:
  1. Login U-RECEIVER-02.
  2. Truy cap /rescue/success/:donationId-cua-receiver-01.
- Expected:
  1. Khong xem duoc chi tiet (404/notFound).

### P2 - Mo rong/regression

#### TC-P2-01 - Marketplace filter/search hoat dong voi post moi
- Priority: P2
- Role: bat ky
- Buoc test:
  1. Search theo title donor.
  2. Doi category INDIVIDUAL/MYSTERY_BOX.
- Expected:
  1. Ket qua loc dung voi dieu kien.

#### TC-P2-02 - Quantity ve 0 thi nut "Giai cuu ngay" bi vo hieu hoa
- Priority: P2
- Role: bat ky
- Buoc test:
  1. Tao post quantity = 1.
  2. Dat don het quantity.
  3. Quay lai marketplace.
- Expected:
  1. Card hien "Da het" va khong cho dat tiep.

#### TC-P2-03 - Truy cap /orders khi chua login
- Priority: P2
- Role: guest
- Buoc test:
  1. Logout.
  2. Vao /orders.
- Expected:
  1. Redirect /login.

## 6) Role-based matrix
| Chuc nang | Guest | RECEIVER | DONOR | ADMIN |
|---|---|---|---|---|
| Xem marketplace | Cho phep | Cho phep | Cho phep | Cho phep |
| Vao trang create post | Hien tai co the vao UI, khong login thi submit fail | Co the tao post (theo code hien tai) | Co the tao post | Co the tao post |
| Dat donation | Khong (redirect login) | Co | Co (neu tu dat) | Co |
| Xem /orders cua minh | Khong (redirect login) | Co | Co neu co order voi receiverId cua user | Co neu co order voi receiverId cua user |
| Xem success page cua donation nguoi khac | Khong | Khong | Khong | Khong |

Ghi chu: Theo code hien tai, API create post chi check auth, chua rang buoc role DONOR.

## 7) Defect logging format (de dong bo team)
- Tieu de: [Create-Marketplace-Order][P0/P1/P2] Mo ta ngan
- Environment: local/staging + commit hash
- Steps to reproduce: liet ke ro buoc
- Actual: ket qua thuc te
- Expected: ket qua mong doi
- Attachments: screenshot/video + request/response (neu co)

## 8) Exit criteria de dong task
- Tat ca test case P0 pass.
- Khong con bug blocker/critical tren flow chinh.
- P1 co ket qua ro rang (pass hoac da tao ticket follow-up).
- Team da review tai lieu va thong nhat dung cho regression checklist.
