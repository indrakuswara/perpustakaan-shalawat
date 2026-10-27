# Deploy-validation suite (Playwright)

One suite, two targets, chosen by environment variables. No code
changes are needed to switch targets.

## What is tested

- `public.spec.ts`: read-only public smoke (homepage, listings,
  a published article, search, request pages, sitemap/robots, and
  the admin login redirect). Published-article tests discover the
  first published article instead of hardcoding a title, because
  the local/CI database starts empty while production has real
  articles. If an environment has no published articles, those two
  tests skip honestly.
- `admin-crud.spec.ts`: the full admin lifecycle, serial, with one
  article per run titled `E2E TEST <run id>`: create draft, draft
  not public, admin preview, edit, publish, public visibility,
  unpublish, delete, and a final cleanup assertion. Cleanup only
  ever touches that one article, by its captured id.

## Running locally (pre-deploy gate shape)

The local database is SQLite (`data/app.db`), never production.

```bash
npm run db:seed                 # local test admin
node scripts/seed-e2e-content.ts  # one published article for the public tests
npm run build
npm run start -- -p 3000
PLAYWRIGHT_BASE_URL=http://localhost:3000 \
  E2E_ADMIN_EMAIL="<local admin email>" \
  E2E_ADMIN_PASSWORD="<local admin password>" \
  npx playwright test -c e2e/playwright.config.ts --browser=firefox
```

Why Firefox locally: in this sandbox, Chromium cannot reach
localhost (Local Network Access checks) or the internet (proxy
tunnel), and the Playwright Chromium download repeatedly drops
near completion through the sandbox proxy. CI runs the same suite
in Chromium, which is the browser the suite is configured for.
Do not "fix" the local run by pointing the suite at production.

## Running against production (post-deploy smoke shape)

```bash
PLAYWRIGHT_BASE_URL=https://perpustakaan-shalawat.vercel.app \
  E2E_ADMIN_EMAIL="<admin email>" \
  E2E_ADMIN_PASSWORD="<admin password>" \
  npm run test:e2e
```

In CI this is `smoke-prod.yml`, triggered on Vercel PRODUCTION
deployment success (never a PR preview) or manual dispatch. It creates only dummy `E2E-TEST`
data, publishes it briefly inside one run, then unpublishes and
deletes it in the same run. If `E2E_ADMIN_*` are missing, the
CRUD suite fails loudly instead of silently downgrading to
read-only checks.

## CI

- `test.yml`: pull request and push to master. Builds, seeds a
  local admin and one published article, starts the app, and runs
  the suite in Chromium against local `next start`.
- `smoke-prod.yml`: PRODUCTION deployment success or manual
  dispatch, runs the suite in Chromium against production.
- On failure, both workflows upload the Playwright HTML report
  and screenshots as an artifact.

## Owner report page (hidden)

After every workflow run (pass or fail), `e2e/report-to-site.mjs`
posts a summary parsed from the Playwright JSON report to
`POST /api/automation-report`, protected by the
`AUTOMATION_REPORT_TOKEN` header token. The site stores the
summary in the `automation_runs` table (max 50 runs) and shows it
on the admin-only page `/admin/automationreport`.

That page is deliberately hidden: no button or link anywhere on
the site or in the admin area points to it, it is not in the
sitemap, and `/admin` is disallowed in robots.txt. Only an admin
who knows the URL can open it (the `/admin/*` proxy plus the
page's own guard both require login).

Secrets needed for the production smoke (in addition to the admin
credentials): `AUTOMATION_REPORT_TOKEN` as a GitHub repository
secret AND as a Vercel environment variable, with the same random
value in both places. If it is missing, the report POST fails
loudly and the job fails, so the owner page can never go
silently stale.
