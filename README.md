# Jane.M production web application

This repository contains the approved Jane.M static website, proprietary source material, and the Phase 0 production-application audit.

## Project status

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
