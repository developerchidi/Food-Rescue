# E2E Smoke (Playwright) - P0 Flow

This suite covers release-critical business flow only:

1. Login success
2. Login failure with invalid credentials
3. Login -> Marketplace -> Rescue -> Orders

## Prerequisites

- Frontend dependencies installed:
  - `npm install`
- Backend is running and reachable
- Frontend runs at `http://127.0.0.1:3000`
- Backend runs at `http://127.0.0.1:3001`
- Required environment variables are available for both apps (`DATABASE_URL`, auth secrets, etc.)

## Environment Variables for E2E

Optional overrides:

- `E2E_BASE_URL` (default: `http://127.0.0.1:3000`)
- `E2E_BACKEND_URL` (default: `http://127.0.0.1:3001`)
- `E2E_TEST_PASSWORD` (default: `Test@123456`)
- `E2E_RECEIVER_EMAIL` (default: `e2e.receiver@foodrescue.local`)
- `E2E_DONOR_EMAIL` (default: `e2e.donor@foodrescue.local`)
- `E2E_DONOR_PASSWORD` (default: `Test@123456`)

## Local Run

```bash
npm run test:e2e
```

Headed mode:

```bash
npm run test:e2e:headed
```

Open HTML report:

```bash
npm run test:e2e:report
```

## CI Behavior

- Retries: `2` on CI, `1` locally
- Trace: `on-first-retry`
- Screenshot: `only-on-failure`
- Video: `retain-on-failure`

## PR Description Template (E2E section)

```md
### E2E Smoke (Playwright)
- Command: `npm run test:e2e`
- Scope:
  - `tests/e2e/auth/login-auth.spec.ts`
  - `tests/e2e/rescue/create-to-order.spec.ts`
- Result: PASS/FAIL
- Report: attach screenshot of `playwright-report` summary or trace zip links
- Notes: environment used (dev/staging), backend URL, account strategy
```

## CI Rollout Plan

1. Add a dedicated E2E job in GitHub Actions after frontend build.
2. Provision backend + database service for CI (or use staging backend URL).
3. Inject E2E env vars from GitHub Secrets.
4. Run `npx playwright install --with-deps chromium`.
5. Run `npm run test:e2e` and upload artifacts (`playwright-report`, traces, screenshots, videos).
6. Mark E2E as required check for release branches.
