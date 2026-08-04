# Jane.M asset inventory

Audit date: 2026-08-04
Checksum algorithm: SHA-256
Machine-readable companion: `docs/asset_inventory.csv`

## Summary

The repository contains approved public-site assets, source catalogues, campaign packs, internal operational documents, and one private receipt workbook. This inventory assigns a migration disposition; it does not grant publication permission.

| Finding | Result |
| --- | --- |
| Approved public catalogue | 49-page PDF, 25,962,524 bytes; duplicate of `JaneM_Website/assets/catalogue.pdf` |
| Refined catalogue duplicates | Two 8-page PDFs with the same SHA-256 |
| Homepage source duplicates | Root photos match the static site's logo and three look files byte-for-byte |
| Catalogue archive | `Catalog Photos.zip` has 77 archive entries and 38 photographs (36 exact-hash-unique) |
| Current public video | 15-second 720×1280 H.264 MP4 |
| Obsolete campaign terms | Both campaign packs contain 50%-discount material and/or outdated phone numbers; not public-ready |
| Private financial content | Receipt workbook is excluded from the product scope |

## Disposition keys

- **Approved baseline** — may be retained as the source for a controlled derivative; not permission to copy blindly.
- **Review before use** — private/quarantined until provenance, rights and public copy are approved.
- **Internal only** — business reference material; do not publish or migrate as a customer asset.
- **Exclude** — outside the application scope.

## Migration controls

Record the source checksum before any derivative work. Preserve original filename and source path in the media record, use private storage by default, and publish only an approved derivative through a content record. Never overwrite, recompress in place, or silently rename the source asset.

The CSV covers individually relevant source assets and logical groups of unpacked campaign files. The static source code and baseline screenshots are documented elsewhere and are not media-migration candidates.
