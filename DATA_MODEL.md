# Jane.M data model

## Modelling principles

Use PostgreSQL through Prisma. Store money as integer minor units (for example, cents) with an explicit currency code; do not use floating-point amounts. Store business timestamps in UTC and display them in the applicable customer timezone. Treat a media object's storage key as infrastructure data, never as a public URL or a user-visible identifier.

Every mutable business record has `createdAt`, `updatedAt`, and, where useful, `createdById` and `updatedById`. Operational deletion should generally be archival (`archivedAt` or status) so reports and audit trails remain coherent.

## Core entities

| Entity | Key fields | Purpose |
| --- | --- | --- |
| User | id, email, name, role, active | Admin/staff identity and authorization |
| Session / Account | provider identifiers, expiry | Authentication implementation records |
| MediaAsset | id, storageKey, checksum, mimeType, dimensions, source, visibility, approvalStatus | Original upload or managed derivative with provenance |
| Collection | slug, title, description, status, sortOrder | Public grouping of approved looks |
| Look | slug, name, description, status, collectionId, coverAssetId | Public design/look record; no implied item price |
| LookMedia | lookId, mediaAssetId, role, sortOrder, altText | Ordered public media relationship |
| PriceGuideItem | name, amount, currency, effectiveFrom, effectiveTo, active | Generic design/service fee, not a look price |
| Promotion | name, code, percentage or amount, startAt, endAt, status, eligibility | Versioned business rule evaluated at request time |
| SiteSetting | key, value, visibility, updatedById | Controlled site-wide settings, including selected catalogue |
| Enquiry | contact fields, event date, message, status, source, consent timestamps | Canonical customer contact request |
| Consultation | enquiryId, requested slots, scheduledAt, status, notes | Appointment workflow once staff reviews availability |
| Booking | enquiryId, reference, status, quoted amount, deposit amount, due dates | Confirmed work; created after staff approval |
| Deposit | bookingId, amount, status, provider reference, receivedAt | Payment/deposit lifecycle without storing card data |
| Referral | advocate enquiry/booking, referred contact, code, status | Opt-in referral tracking |
| Consent | subject type/id, policy version, purpose, capturedAt, withdrawnAt | Evidence of marketing/privacy choices |
| AuditEvent | actor, action, target type/id, request metadata, before/after summary | Immutable operational accountability |

## Important relationships

```text
Collection 1--* Look 1--* LookMedia *--1 MediaAsset
Enquiry    1--* Consultation
Enquiry    0..1 Booking 1--* Deposit
Promotion  0..* PriceGuideItem (through a versioned eligibility/effective rule)
User       1--* AuditEvent
```

The database must enforce a unique slug per public content type, unique media checksum per exact object where duplication is undesirable, a unique booking reference, and a unique active site-setting key. Foreign keys protect referential integrity. Visibility and approval status must be indexed because public queries always filter by them.

## Lifecycle states

- `MediaAsset`: `QUARANTINED`, `PRIVATE`, `APPROVED`, `PUBLISHED`, `ARCHIVED`, `REJECTED`.
- `Look` / `Collection`: `DRAFT`, `REVIEW`, `PUBLISHED`, `ARCHIVED`.
- `Promotion`: `DRAFT`, `SCHEDULED`, `ACTIVE`, `EXPIRED`, `DISABLED`. A status is not enough: the public query also checks `startAt <= now < endAt`.
- `Enquiry`: `NEW`, `ACKNOWLEDGED`, `QUALIFIED`, `CLOSED`, `SPAM`.
- `Consultation`: `REQUESTED`, `PROPOSED`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`.
- `Booking`: `PENDING_DEPOSIT`, `CONFIRMED`, `IN_PROGRESS`, `READY`, `COMPLETED`, `CANCELLED`.
- `Deposit`: `PENDING`, `RECEIVED`, `FAILED`, `REFUNDED`, `WAIVED`.

State transitions belong in domain services, not UI components. Each material transition writes an audit event.

## Public-data rules

Only `PUBLISHED` looks whose media is `PUBLISHED` and `PUBLIC` may appear on public pages. The production homepage's three looks retain their established names and images, but their generic fee-table rows must not become look-level prices. The catalogue setting may point only to an approved public `MediaAsset` or an approved public external link recorded in the setting history.

Customer information is not a marketing list by default. A contact record becomes eligible for marketing only through a separate, versioned and revocable marketing consent record.

## Seed data

Initial seed data should contain only the verified facts in the approved website:

- the three named homepage looks with their approved source-image provenance;
- the nine generic design/service price-guide rows;
- a 30% design-fee promotion dated 2026-08-01 through 2026-10-31, excluding material costs; and
- the required 60% booking deposit rule.

Seeding must not publish the 50%-discount campaign packs, private receipt workbook, unclassified catalogue photographs, or any unverified phone numbers. Seed data should be idempotent, produce stable slugs, and emit a small verification report in development.
