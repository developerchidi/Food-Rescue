# Shared Test Data - Create Post -> Marketplace -> Order

## 1. Muc dich
Cung cap bo test data dung chung cho Dev/QA de chay lai manual test mot cach nhat quan.

## 2. Nhan su va account test

## 2.1 Tai khoan de xuat

| Alias | Email | Password | Role | Muc dich |
|---|---|---|---|---|
| donor01 | donor01@foodrescue.test | Test@1234 | DONOR | Tao post, lam donor trong donation |
| receiver01 | receiver01@foodrescue.test | Test@1234 | RECEIVER | Dat don happy path |
| receiver02 | receiver02@foodrescue.test | Test@1234 | RECEIVER | Test ownership/forbidden |
| admin01 | admin01@foodrescue.test | Test@1234 | ADMIN | Optional support/debug |

Luu y:
- Register API hien tai khong nhan role, user moi mac dinh RECEIVER.
- Can cap nhat role truoc khi test role-based.

## 2.2 SQL cap nhat role (tham khao)

```sql
-- Tim user
SELECT id, email, role FROM "User" WHERE email IN (
  'donor01@foodrescue.test',
  'receiver01@foodrescue.test',
  'receiver02@foodrescue.test',
  'admin01@foodrescue.test'
);

-- Gan role
UPDATE "User" SET role = 'DONOR' WHERE email = 'donor01@foodrescue.test';
UPDATE "User" SET role = 'RECEIVER' WHERE email = 'receiver01@foodrescue.test';
UPDATE "User" SET role = 'RECEIVER' WHERE email = 'receiver02@foodrescue.test';
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin01@foodrescue.test';
```

## 3. Token/API setup

## 3.1 Login lay token

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"donor01@foodrescue.test","password":"Test@1234"}'
```

Expected: response co token.

## 3.2 Header mau

```text
Authorization: Bearer <access_token>
Content-Type: application/json
```

## 4. Test data cho Create Post

## 4.1 Payload hop le - INDIVIDUAL

```json
{
  "title": "Com ga nuong giai cuu",
  "description": "Suat com ga cuoi ngay con ngon",
  "type": "INDIVIDUAL",
  "originalPrice": 55000,
  "rescuePrice": 29000,
  "quantity": 5,
  "expiryDate": "2030-12-31T16:30:00.000Z",
  "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
}
```

## 4.2 Payload hop le - MYSTERY_BOX

```json
{
  "title": "Mystery Box bua toi",
  "description": "Combo ngau nhien tu bep hom nay",
  "type": "MYSTERY_BOX",
  "originalPrice": 120000,
  "rescuePrice": 49000,
  "quantity": 3,
  "expiryDate": "2030-12-31T17:00:00.000Z",
  "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
}
```

## 4.3 Payload negative - rescuePrice >= originalPrice

```json
{
  "title": "Banh mi cuoi ngay",
  "type": "INDIVIDUAL",
  "originalPrice": 25000,
  "rescuePrice": 25000,
  "quantity": 2,
  "expiryDate": "2030-12-31T17:00:00.000Z"
}
```

## 4.4 Payload negative - quantity = 0

```json
{
  "title": "Bun bo Hue",
  "type": "INDIVIDUAL",
  "originalPrice": 60000,
  "rescuePrice": 30000,
  "quantity": 0,
  "expiryDate": "2030-12-31T17:00:00.000Z"
}
```

## 4.5 Payload negative - expiryDate qua khu

```json
{
  "title": "Pho bo",
  "type": "INDIVIDUAL",
  "originalPrice": 70000,
  "rescuePrice": 35000,
  "quantity": 2,
  "expiryDate": "2020-01-01T00:00:00.000Z"
}
```

## 5. Test data cho Donation/Order

## 5.1 Payload hop le - PICKUP

```json
{
  "postId": "<POST_ID_VALID>",
  "quantity": 1,
  "fulfillmentMethod": "PICKUP"
}
```

## 5.2 Payload hop le - DELIVERY

```json
{
  "postId": "<POST_ID_VALID>",
  "quantity": 1,
  "fulfillmentMethod": "DELIVERY",
  "address": "123 Nguyen Trai, Quan 1, TP.HCM",
  "phone": "0912345678"
}
```

## 5.3 Payload negative - DELIVERY thieu address

```json
{
  "postId": "<POST_ID_VALID>",
  "quantity": 1,
  "fulfillmentMethod": "DELIVERY",
  "phone": "0912345678"
}
```

## 5.4 Payload negative - phone sai regex

```json
{
  "postId": "<POST_ID_VALID>",
  "quantity": 1,
  "fulfillmentMethod": "DELIVERY",
  "address": "123 Nguyen Trai, Quan 1, TP.HCM",
  "phone": "12345"
}
```

## 5.5 Payload negative - quantity vuot ton

```json
{
  "postId": "<POST_ID_VALID_QUANTITY_1>",
  "quantity": 99,
  "fulfillmentMethod": "PICKUP"
}
```

## 6. Dataset de tai su dung regression

## 6.1 Mau post de giu lai trong moi truong test
- POST_A_AVAILABLE_Q5 (INDIVIDUAL, quantity=5, chua het han)
- POST_B_AVAILABLE_Q1 (MYSTERY_BOX, quantity=1, chua het han)
- POST_C_EXPIRED (INDIVIDUAL, da het han)

## 6.2 Rule dat ten de truy vet
- Tien to title de test: [QA][Sprint-XX][Case-ID]
- Vi du: [QA][Sprint-12][TC-OD-002] Com ga nuong

## 7. Du lieu expected de doi chieu nhanh

| Case | Expected status | Expected thong diep |
|---|---|---|
| create post valid | 200 | tao post thanh cong |
| create post no auth | 401 | Unauthorized |
| create post invalid price | 400 | Gia giai cuu phai nho hon gia goc |
| donation valid pickup | 200 | tra ve donation id |
| donation delivery missing fields | 400 | du lieu khong hop le/fieldErrors |
| donation invalid phone | 400 | So dien thoai khong hop le |
| donation over quantity | 400 | khong du so luong/het hang |
| donation unauthorized | 401 | Unauthorized |
| get donation by stranger | 403 | Forbidden |

## 8. Cleanup sau test (khuyen nghi)

```sql
-- Xoa du lieu test theo title prefix
DELETE FROM "Donation"
WHERE "postId" IN (
  SELECT id FROM "FoodPost" WHERE title LIKE '[QA][Sprint-%'
);

DELETE FROM "FoodPost"
WHERE title LIKE '[QA][Sprint-%';
```

Luu y: backup DB hoac chay tren moi truong test/staging truoc khi cleanup.
