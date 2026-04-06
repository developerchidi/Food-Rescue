# Latest Newman Run

- Date: 2026-04-06
- Branch: feature/qa-postman-regression-posts-donations
- Command:

```powershell
npx newman run qa/postman/FoodRescue.postman_collection.json `
  -e qa/postman/FoodRescue.postman_environment.json `
  -r cli,json,junit `
  --reporter-json-export qa/postman/reports/newman-report.json `
  --reporter-junit-export qa/postman/reports/newman-report.xml
```

- Summary:
  - Requests: 20 total, 20 failed
  - Tests: 20 total, 20 failed
  - Assertions: 33 total, 33 failed
  - Root Cause: Backend service not running (docker compose failed - command not found)

- Full Report: See `regression-report.md`
  --reporter-junit-export qa/postman/reports/newman-report.xml
```

## Summary
- Requests executed: 20
- Request transport failures: 0
- Assertions executed: 33
- Assertions failed: 27
- Final status: FAIL

## Main Failure Reasons
1. Auth endpoints expected success (`201/200`) but returned `500`.
2. Since auth did not return token/user payload, dependent post/donation success flows failed by chain effect.
3. Backend startup/logs indicate missing Redis env for Upstash (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).
4. Backend requests show `500 Internal Server Error` on register/login/get-posts, indicating runtime dependency/env issue (DB and/or Redis config).

## Evidence
- Newman JSON report: `qa/postman/reports/newman-report.json`
- Newman JUnit report: `qa/postman/reports/newman-report.xml`

## Typical Failed Assertions (sample)
1. `Register Donor - Success`: expected status `201`, got `500`.
2. `Register Donor - Success`: expected response to have `userId`.
3. `Login Donor - Success`: expected status `200`, got `500`.
4. `Create Post - Success`: expected status `200`, got `401` (no token generated due login fail).

## Recommendation To Reach PASS
1. Configure backend env variables for database and Upstash Redis.
2. Start backend successfully on `http://localhost:3001`.
3. Re-run the same Newman command.
