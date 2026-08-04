# Jane.M local Content Studio

This dependency-free Node server runs the public Jane.M website, the local content-management portal, and the JSON API on your own laptop. It binds only to `127.0.0.1`, so it is not accessible from another device or the public internet.

## Start

From the project root:

```bash
node admin-portal/server.js
```

Then open:

- Public website: `http://127.0.0.1:4173/`
- Content Studio: `http://127.0.0.1:4173/admin/`

## Manageable content

- Homepage eyebrow and introduction
- Promotion copy
- YouTube, Facebook, and Instagram links
- Google Analytics 4 Measurement ID (`G-...`)
- Google Tag Manager container ID (`GTM-...`)

The portal writes the current values to `admin-portal/data/content.json`. The public website fetches that data from `/api/public-content` whenever the local server is used. With no GA4 or GTM ID registered, no Google tracking request is made. If a GTM container is supplied, configure GA4 inside GTM to avoid duplicate page views.

## Local-only operation

No authentication is included by request. Do not bind this server to `0.0.0.0`, place it behind a public URL, or use it to collect customer information without first adding authentication and the security controls documented in `SECURITY.md`.
