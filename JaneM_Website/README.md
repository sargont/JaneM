# Jane.M Website

A responsive static website for Jane.M Lesotho.

## Included
- Graduation campaign landing page
- Featured design collection
- 30% promotion
- Price guide
- WhatsApp ordering flow
- Catalogue download
- Mobile-responsive navigation
- 15-second promotional video

## Run locally
Open `index.html` directly, or run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

For the editable local website and Content Studio, use the server documented in [`../admin-portal/README.md`](../admin-portal/README.md). It serves the public website and `/admin/` together on `http://127.0.0.1:4173/`.

## Routes
- `/` — public homepage
- `/catalogue.html` — a temporary, privacy-first catalogue availability page. The original PDF and gallery derivatives are retained outside the deployed website until image permissions are confirmed.
- `/admin.html` — admin portal setup page; this static version intentionally has no login or customer-data controls

## Google Analytics
When a Google Analytics 4 Measurement ID is available, add it to `config.js` as `googleAnalyticsMeasurementId` (for example, `G-ABC123DEF4`). The optional loader is disabled until a valid ID is supplied. Never add private API secrets to this static file.

## Deployment
Upload this folder to:
- Netlify
- Vercel
- GitHub Pages
- cPanel / shared hosting

## Important edits before launch
- Replace placeholder operating hours or email if needed.
- Add a permanent address when available.
- Connect a custom domain.
- Add Meta Pixel / Google Analytics only after consent and privacy wording are ready.
