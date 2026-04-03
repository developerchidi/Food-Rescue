# Test Data - Create Post -> Marketplace -> Order

## 1) Muc dich
Bo test data dung chung cho team Dev/QA de test luong tao bai dang -> hien thi marketplace -> tao don hang.

## 2) Environment
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Yeu cau co DB va Redis da san sang.

## 3) Tai khoan test
| Key | Role | Email | Password | Ghi chu |
|---|---|---|---|---|
| U-DONOR-01 | DONOR | donor01+qa@foodrescue.test | P@ssw0rd123 | Dung de tao post |
| U-RECEIVER-01 | RECEIVER | receiver01+qa@foodrescue.test | P@ssw0rd123 | Dung de dat don |
| U-RECEIVER-02 | RECEIVER | receiver02+qa@foodrescue.test | P@ssw0rd123 | Dung de test ownership |
| U-ADMIN-01 | ADMIN | admin01+qa@foodrescue.test | P@ssw0rd123 | Dung de test role-based (neu can) |

## 4) Mau du lieu post
### POST-VALID-01 (P0)
- title: "Com ga nuong giai cuu"
- description: "Suat trua con moi, giai cuu trong ngay"
- type: "INDIVIDUAL"
- originalPrice: 50000
- rescuePrice: 30000
- quantity: 5
- expiryDate: now + 2h
- imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"

### POST-VALID-02 (P1)
- title: "Hop bi an cuoi ngay"
- description: "Mystery box gom banh mi + salad"
- type: "MYSTERY_BOX"
- originalPrice: 60000
- rescuePrice: 35000
- quantity: 3
- expiryDate: now + 4h
- imageUrl: (co the de trong)

## 5) Mau du lieu invalid post
### POST-NEG-01
- title: "Com" (duoi 5 ky tu)
- Ky vong: 400 + message title khong hop le

### POST-NEG-02
- originalPrice: 30000
- rescuePrice: 30000 (hoac lon hon)
- Ky vong: fail, message "Gia giai cuu phai nho hon gia goc"

### POST-NEG-03
- expiryDate: now - 1h
- Ky vong: fail, message het han khong hop le

### POST-NEG-04
- quantity: 0
- Ky vong: fail

## 6) Mau du lieu order
### ORDER-PICKUP-VALID-01
- postId: su dung post vua tao tu POST-VALID-01
- quantity: 1
- fulfillmentMethod: "PICKUP"
- address: bo trong
- phone: bo trong

### ORDER-DELIVERY-VALID-01
- postId: su dung post vua tao tu POST-VALID-01
- quantity: 1
- fulfillmentMethod: "DELIVERY"
- address: "123 Nguyen Hue, Q1, TP.HCM"
- phone: "0912345678"

## 7) Mau du lieu invalid order
### ORDER-NEG-01
- quantity: 0
- Ky vong: fail "So luong toi thieu la 1"

### ORDER-NEG-02
- quantity > so luong con lai cua post
- Ky vong: fail "khong du so luong" hoac "vua het hang"

### ORDER-NEG-03
- fulfillmentMethod: "DELIVERY"
- address: rong
- phone: rong
- Ky vong: fail voi fieldErrors address/phone

### ORDER-NEG-04
- fulfillmentMethod: "DELIVERY"
- phone: "12345"
- Ky vong: fail regex so dien thoai

### ORDER-NEG-05
- Dat don cho post da het han
- Ky vong: fail "Bai dang da het han"

## 8) Quy uoc quan ly du lieu
- Sau moi lan chay regression, ghi lai ID post va ID donation da tao.
- Neu can reset du lieu: xoa donation test truoc, sau do xoa post test.
- Khuyen nghi gom tien to "[QA]" trong title post de de loc tren marketplace.
