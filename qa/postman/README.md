# Food Rescue API Integration Tests (Postman/Newman)

## Muc tieu
Bo test nay kiem thu API integration cho cac module:
- Auth (ho tro setup token)
- Posts (`/api/posts`)
- Donations (`/api/donations`)

Pham vi test gom:
- Success case
- Auth fail
- Validation fail
- Conflict/edge-case

## Cau truc file
- `qa/postman/FoodRescue.postman_collection.json`
- `qa/postman/FoodRescue.postman_environment.json`
- `qa/postman/reports/newman-report.json`
- `qa/postman/reports/newman-report.xml`
- `qa/postman/reports/latest-run.md`

## So luong request
Collection hien co **20 requests**, chia theo module:
- Auth: 8 requests
- Posts: 5 requests
- Donations: 7 requests

## Yeu cau truoc khi chay
1. Backend API dang chay va truy cap duoc tai `baseUrl`.
2. Database va Redis da san sang.
3. Endpoint auth/register/login hoat dong binh thuong.

## Cach chuyen dev/staging
Environment co cac bien:
- `devBaseUrl`
- `stagingBaseUrl`
- `baseUrl`

Khi chay local, dat `baseUrl = devBaseUrl` (mac dinh `http://localhost:3001`).
Khi chay staging, sua `baseUrl` thanh gia tri staging.

## Chay bang Newman
Tu thu muc goc project:

```powershell
npx newman run qa/postman/FoodRescue.postman_collection.json `
  -e qa/postman/FoodRescue.postman_environment.json `
  -r cli,json,junit `
  --reporter-json-export qa/postman/reports/newman-report.json `
  --reporter-junit-export qa/postman/reports/newman-report.xml
```

## Ghi chu ve data test
Collection tu dong tao email duy nhat moi lan run bang `runId`:
- `donor_<runId>@example.com`
- `receiver_<runId>@example.com`
- `intruder_<runId>@example.com`

Vi vay co the chay lap lai nhieu lan ma khong va cham du lieu user cu.

## Ket qua run moi nhat
Xem file: `qa/postman/reports/latest-run.md`

Neu co fail, file nay phai ghi ro:
- Request nao fail
- Expected vs actual
- Ly do (service down, env sai, bug nghiep vu, ...)
