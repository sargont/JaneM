# Jane.M content migration rules

## Source-of-truth hierarchy

1. The approved static site (`JaneM_Website/`) is the source for current public composition and verified public facts.
2. `docs/asset_inventory.csv` is the source for asset disposition and provenance.
3. A production database record with an approval event is the source for a migrated public item.
4. Internal strategy, playbook, forecast, tracker, receipt, and campaign-source files are reference material only unless a later approval specifically changes their status.

No archive file becomes public merely because it exists in the repository.

## Verified content to preserve

| Subject | Approved record |
| --- | --- |
| Brand | Jane.M Lesotho; “Elegantly you. Uniquely Jane.M.” |
| Contact | WhatsApp `+266 6279 0946`; `officialjanem@gmail.com` |
| Promotion | 30% off design fees, 1 August–31 October 2026 |
| Deposit | 60% required to secure a production slot |
| Materials | Charged separately and excluded from design fees |
| Homepage Look 01 | The Golden Hour; `look-gold.jpg` |
| Homepage Look 02 | Classic Grace; `look-sleeves.jpg` |
| Homepage Look 03 | Midnight Allure; `look-blue.jpg` |

The generic price guide is a service/design-fee schedule. It must not be presented as prices for the three featured looks.

## Asset disposition

| Category | Migration action |
| --- | --- |
| Existing static-site logo, three look images and video | Preserve originals; make approved display derivatives; add provenance records |
| Existing public catalogue | Preserve as the approved original; do not overwrite; choose a controlled canonical download later |
| Lookbook PDF and `Catalog Photos.zip` | Quarantine/private until each item is visually matched, licensed/approved, named and described |
| 50%-discount campaign assets and their copy | Keep internal/quarantined; do not seed, schedule or publish |
| Internal strategy, playbook, forecast and tracker files | Keep private and out of application asset storage |
| Receipt workbook | Exclude entirely from migration and uploads |

The public catalogue at `JaneM_Website/assets/catalogue.pdf` and `JaneM_Full_Premium_Graduation_Catalogue_2026.pdf` are exact duplicates. The two refined catalogue files are also exact duplicates. Retain the originals for provenance; choose one canonical source record rather than creating duplicate public media records.

## Migration procedure

1. Register the source file with checksum, path, MIME type, dimensions/page count, known ownership, and initial `QUARANTINED` state.
2. Review provenance, commercial accuracy, model/release rights if applicable, privacy, image quality, and fit to an approved collection/look.
3. Produce web derivatives without overwriting the source. Record the derivative-parent relationship, transformation, dimensions and checksum.
4. Add inclusive, accurate alt text and content metadata; do not infer a design name, price, fabric, or availability.
5. An authorized publisher changes the record to `APPROVED`/`PUBLISHED`, attaches it to a published look or setting, and creates an audit event.
6. Confirm the public page and download URL expose only the selected approved derivative, then retain the original privately according to the retention policy.

Bulk imports must be idempotent on source checksum plus source context, must report every skipped/duplicate/quarantined item, and must not do a blanket public import. Every exception should be surfaced for owner review rather than silently corrected.

## Promotion and contact hygiene

Campaign packs that advertise 50% off or numbers other than the approved WhatsApp number are obsolete. They may be preserved as internal history but cannot supply default website, ad, seed, or notification content. Promotion visibility must be calculated from the active database record and the current server time, preventing an expired offer from surviving because a scheduled task did not run.

Before launch, the owner must approve a canonical catalogue derivative, final privacy/terms text, operating hours, any public physical address, and all external contact channels. Those decisions are site settings or approved content records—not code constants.
