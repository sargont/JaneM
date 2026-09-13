# Jane.M production web application

This repository contains the approved Jane.M static website, proprietary source material, and the Phase 0 production-application audit.

## September 2026 site upgrade

The site now includes a garment-led homepage, an approved-look collection with saved shortlists, a reviewable WhatsApp consultation request, and a daily Style Studio with a device-local wardrobe, outfits, wear history, seven-day planner and backups. The existing occasion Studio and PDF briefs remain available.

Run `npm install` and `npm test` to build and validate. `scripts/build-seo-site.js` and `scripts/experience-pages.js` own generated pages; update them rather than editing generated collection or booking HTML directly. Browser-only preferences and wardrobe data do not sync across devices. Payments, live booking slots and AI services are future integrations.

## Project status (original application audit)

- Phase 0 - Audit and baseline: complete
- Phase 1 - Application foundation: not started
- Approved static website: `JaneM_Website/`
- Baseline Git commit: `87beebd`

No production application code has been introduced yet. The approved static site and original assets remain unchanged and recoverable from the baseline commit.

## Run the approved static site

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory JaneM_Website
```

Open `http://127.0.0.1:4173/`.

## Run the local Content Studio

To use the public website with its local content-management API, run:

```bash
node admin-portal/server.js
```

Open the public website at `http://127.0.0.1:4173/` and the local Content Studio at `http://127.0.0.1:4173/admin/`. The portal is deliberately loopback-only and unauthenticated for laptop-local use; see `admin-portal/README.md` before exposing it anywhere else.

## Phase 0 documentation

- [Current-state audit](docs/CURRENT_STATE_AUDIT.md)
- [Asset inventory](docs/ASSET_INVENTORY.md)
- [Machine-readable asset inventory](docs/asset_inventory.csv)
- [Architecture](ARCHITECTURE.md)
- [Data model](DATA_MODEL.md)
- [Security model](SECURITY.md)
- [Content migration](CONTENT_MIGRATION.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Visual baseline](docs/baseline/README.md)
- [Implementation log](docs/IMPLEMENTATION_LOG.md)

## Asset handling rule

Treat every pre-existing photograph, catalogue, video, workbook, document, deck, and archive as source material. Do not overwrite, destructively rename, recompress, or publish it without the approval status recorded in the asset inventory.
