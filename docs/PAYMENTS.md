# Going live with real payments (Polar)

All payment code is already built and working against the dev mock. This is
the runbook for turning on real money. Nothing here requires code changes
until the very last section.

## How the flow works today

```
Unlock button → GET /api/checkout
  → polar.checkouts.create() → redirect to Polar's hosted payment page
  → customer pays $5
  → Polar redirects to /payment/success?checkout_id=...
  → page calls GET /api/verify-payment?checkout_id=...
  → if paid: sessionStorage grh_unlocked=1 → results unlock
Polar also POSTs order events to /api/webhooks/polar (signature-verified).
```

When `POLAR_ACCESS_TOKEN` / `POLAR_PRODUCT_ID` are missing, `/api/checkout`
falls back to the mock checkout page in development (`/payment/mock`) and to
`/results?payment=unavailable` in production. The mobile apps additionally use
`NEXT_PUBLIC_PAYMENT_MOCK=1` (in `.env.mobile`) to run the whole mock flow
client-side with no server.

Why Polar and not Stripe: Polar is a Merchant of Record — they handle sales
tax/VAT and payouts, and you don't need a US entity (Stripe doesn't support
Mongolia directly).

## Step 1 — Sandbox (test everything with fake money)

1. Create an account at https://sandbox.polar.sh (separate from production).
2. Create an organization, then a product:
   - Name: "GetReHired — Full Career Report"
   - Type: one-time purchase, price $5.
3. Collect three values:
   - Access token: Settings → Developers → New token (scope: checkouts read/write at minimum)
   - Product ID: on the product page
   - Webhook secret: Settings → Webhooks → Add endpoint
     - URL: `https://<deployed-domain>/api/webhooks/polar` (format: "Raw")
4. Fill them into `.env.local` (slots already exist):
   ```
   POLAR_ACCESS_TOKEN=polar_oat_...
   POLAR_PRODUCT_ID=...
   POLAR_WEBHOOK_SECRET=...
   POLAR_SERVER=sandbox
   ```
5. Test locally: run dev, click unlock — you should land on Polar's hosted
   page instead of the mock. Pay with test card `4242 4242 4242 4242`
   (any future expiry, any CVC). Verify you bounce back to /payment/success
   and results unlock.

## Step 2 — Deploy to Vercel

Payments (and jobs + email) only become real once the API routes are hosted:

1. `vercel` → link the repo, deploy.
2. Add ALL env vars in Vercel project settings: the four `POLAR_*` above,
   plus `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `RESEND_API_KEY`.
3. Point the Polar sandbox webhook endpoint at the deployed URL.
4. Re-test the full checkout on the deployed site.

## Step 3 — Production

1. Create the real account/org/product at https://polar.sh (account needs
   verification before payouts — start this early, it can take days).
2. Generate production token + webhook secret, swap all four env values in
   Vercel, set `POLAR_SERVER=production`.
3. Make one real $5 purchase yourself to confirm.

## Step 4 — Mobile apps (after web works)

1. In `.env.mobile`: set `NEXT_PUBLIC_API_BASE` to the deployed URL and
   REMOVE `NEXT_PUBLIC_PAYMENT_MOCK=1` (this also disables the bundled
   sample job listings — real jobs load from the server).
2. Code change needed: a deep link back into the app. Polar's success
   redirect opens in the system browser, so the app needs a custom URL
   scheme or universal link (e.g. `getrehired://payment/success`) as the
   checkout `successUrl`, handled via Capacitor's App plugin, which then
   runs the same verify-and-unlock logic inside the webview.
3. Rebuild: `./scripts/build-mobile.sh` then gradle / xcodebuild.

## Known gap — unlock persistence

The unlock lives in sessionStorage: closing the browser/app loses it.
`/api/webhooks/polar` has a TODO to durably store paid customers (by email)
once Supabase lands, so buyers can restore access. Acceptable risk for a $5
MVP, but decide before scale.
