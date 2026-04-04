# Shared Test Data - Create Post -> Marketplace -> Order

## 1) Muc dich
Bo test data dung chung cho dev/QA chay lai flow va regression.

## 2) Account test
| Alias | Email | Password | Role | Su dung |
|---|---|---|---|---|
| donor01 | donor01@foodrescue.test | Test@1234 | DONOR | Tao post, la donor cua order |
| receiver01 | receiver01@foodrescue.test | Test@1234 | RECEIVER | Dat order happy path |
| receiver02 | receiver02@foodrescue.test | Test@1234 | RECEIVER | Test ownership/forbidden |
| admin01 | admin01@foodrescue.test | Test@1234 | ADMIN | Optional troubleshooting |

Note:
- Register API default tao RECEIVER.
- Neu can role khac, cap nhat role bang SQL.

## 3) SQL setup role
```sql
SELECT id, email, role FROM "User"
WHERE email IN (
	'donor01@foodrescue.test',
	'receiver01@foodrescue.test',
	'receiver02@foodrescue.test',
	'admin01@foodrescue.test'
);

UPDATE "User" SET role='DONOR'    WHERE email='donor01@foodrescue.test';
UPDATE "User" SET role='RECEIVER' WHERE email='receiver01@foodrescue.test';
UPDATE "User" SET role='RECEIVER' WHERE email='receiver02@foodrescue.test';
UPDATE "User" SET role='ADMIN'    WHERE email='admin01@foodrescue.test';
```

## 4) Login va token
```bash
curl -X POST http://localhost:3001/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"donor01@foodrescue.test","password":"Test@1234"}'
```

Header dung chung:
```text
Authorization: Bearer <access_token>
Content-Type: application/json
```

## 5) Payload - Create Post

### 5.1 Valid INDIVIDUAL
```json
{
	"title": "[QA][Sprint-XX][TC-API-POST-001] Com ga nuong",
	"description": "Suat com ga cuoi ngay con ngon",
	"type": "INDIVIDUAL",
	"originalPrice": 55000,
	"rescuePrice": 29000,
	"quantity": 5,
	"expiryDate": "2030-12-31T16:30:00.000Z",
	"imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
}
```

### 5.2 Valid MYSTERY_BOX
```json
{
	"title": "[QA][Sprint-XX][TC-API-POST-001] Mystery Box bua toi",
	"description": "Combo ngau nhien tu bep hom nay",
	"type": "MYSTERY_BOX",
	"originalPrice": 120000,
	"rescuePrice": 49000,
	"quantity": 3,
	"expiryDate": "2030-12-31T17:00:00.000Z",
	"imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
}
```

### 5.3 Invalid price
```json
{
	"title": "[QA][Sprint-XX][TC-API-POST-003] Banh mi",
	"type": "INDIVIDUAL",
	"originalPrice": 25000,
	"rescuePrice": 25000,
	"quantity": 2,
	"expiryDate": "2030-12-31T17:00:00.000Z"
}
```

### 5.4 Invalid quantity
```json
{
	"title": "[QA][Sprint-XX][TC-API-POST-004] Bun bo",
	"type": "INDIVIDUAL",
	"originalPrice": 60000,
	"rescuePrice": 30000,
	"quantity": 0,
	"expiryDate": "2030-12-31T17:00:00.000Z"
}
```

### 5.5 Invalid expiry
```json
{
	"title": "[QA][Sprint-XX][TC-API-POST-005] Pho bo",
	"type": "INDIVIDUAL",
	"originalPrice": 70000,
	"rescuePrice": 35000,
	"quantity": 2,
	"expiryDate": "2020-01-01T00:00:00.000Z"
}
```

## 6) Payload - Create Donation

### 6.1 Valid PICKUP
```json
{
	"postId": "<POST_ID_VALID>",
	"quantity": 1,
	"fulfillmentMethod": "PICKUP"
}
```

### 6.2 Valid DELIVERY
```json
{
	"postId": "<POST_ID_VALID>",
	"quantity": 1,
	"fulfillmentMethod": "DELIVERY",
	"address": "123 Nguyen Trai, Quan 1, TP.HCM",
	"phone": "0912345678"
}
```

### 6.3 DELIVERY missing address
```json
{
	"postId": "<POST_ID_VALID>",
	"quantity": 1,
	"fulfillmentMethod": "DELIVERY",
	"phone": "0912345678"
}
```

### 6.4 DELIVERY invalid phone
```json
{
	"postId": "<POST_ID_VALID>",
	"quantity": 1,
	"fulfillmentMethod": "DELIVERY",
	"address": "123 Nguyen Trai, Quan 1, TP.HCM",
	"phone": "12345"
}
```

### 6.5 Over quantity
```json
{
	"postId": "<POST_ID_VALID_QUANTITY_1>",
	"quantity": 99,
	"fulfillmentMethod": "PICKUP"
}
```

## 7) Regression dataset
- POST_A_AVAILABLE_Q5 (valid, quantity=5)
- POST_B_AVAILABLE_Q1 (valid, quantity=1)
- POST_C_EXPIRED (expired)

Naming rule de truy vet:
- [QA][Sprint-XX][Case-ID] <Title>

## 8) Expected nhanh de doi chieu
| Case | Status |
|---|---|
| Create post valid | 200 |
| Create post no auth | 401 |
| Create post invalid price | 400 |
| Create post invalid quantity | 400 |
| Create post invalid expiry | 400 |
| Donation valid | 200 |
| Donation invalid delivery fields | 400 |
| Donation over quantity | 400 |
| Donation no auth | 401 |
| GET donation by stranger | 403 |

## 9) Cleanup script
```sql
DELETE FROM "Donation"
WHERE "postId" IN (
	SELECT id FROM "FoodPost" WHERE title LIKE '[QA][Sprint-%'
);

DELETE FROM "FoodPost"
WHERE title LIKE '[QA][Sprint-%';
```

Khuyen nghi: chi cleanup tren test/staging environment.
