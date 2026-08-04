# Jane.M implementation plan

## Delivery rule

Progress from one phase only after its acceptance checks pass. The approved static website remains unchanged as a visual and content reference until the production application has passed release acceptance. Provider credentials are not required to begin foundation work, but no simulated provider may accidentally send messages or expose data.

## Phase 0 — Audit and immutable baseline

Completed. The static website, source-assets review, visual baselines, audit, and operating documentation are retained in the repository. The Phase 0 exit condition is the baseline commit `87beebd` plus the documentation linked from the root README.

## Phase 1 — Application foundation

Create the Next.js/TypeScript application alongside `JaneM_Website/`. Add a strict package configuration, lint/type/test/build scripts, environment validation, Prisma schema and migrations, development-safe database setup, seed framework, shared design tokens, accessible primitives, and a minimal health check. Add unit-test and Playwright foundations.

Exit checks: clean install; lint, typecheck, unit tests and production build pass; missing/invalid required environment values fail safely; migrations and idempotent seeds work against an empty development database; no original assets are moved, overwritten, or made public.

## Phase 2 — Approved public-site migration

Recreate the public homepage from baseline-derived components and migrate only verified public content. Implement responsive layout, safe local media derivatives, request-time promotion/price queries, catalogue setting, public collection/look routes, privacy/terms placeholders, and WhatsApp handoffs. Resolve the baseline accessibility defects: visible focus, reduced-motion handling, accessible mobile navigation, adequate touch targets, and an accessible price-guide container.

Exit checks: desktop/mobile visual comparisons are materially consistent with the ten captured references; no page-level overflow; keyboard navigation and focus are usable; public pages disclose only approved content; inactive promotions do not render.

## Phase 3 — Enquiry and consultation workflow

Add validated enquiry and consultation-request flows, consent capture, rate limiting, spam defence, owner/staff notifications through a safe adapter, confirmation states, and staff triage. Keep customer data private and never make availability or price promises before staff review.

Exit checks: invalid/abusive submissions are rejected safely; valid submissions create auditable records exactly once; notification failures are observable; consent is recorded with policy version; customer data does not appear in URLs, logs, or public responses.

## Phase 4 — Admin, media and catalogue operations

Implement authentication, role checks, audit events, private upload handling, media approval/publishing, collections/looks, prices/promotions, site settings, and canonical catalogue selection. Add an explicit quarantine/approval lifecycle and no public direct access to original uploads.

Exit checks: role-based access is tested; unauthorized routes/mutations are denied; media cannot be publicly served before approval; all material admin changes have audit events; expired promotions are excluded without scheduler dependence.

## Phase 5 — Bookings, deposits and referrals

Add staff-approved booking records, deposit state tracking, referral workflow, payment-provider adapter, signed webhook verification and idempotency. Do not store raw payment credentials.

Exit checks: booking and deposit transitions are server-authorized and audited; duplicate webhooks do not duplicate effects; payment failure/retry behaviour is safe; referral consent is explicit.

## Phase 6 — Reporting, hardening and operations

Add privacy-preserving operational reports, safe exports, backups and restore verification, monitoring, error redaction, CSP/security headers, dependency review, accessibility audit, load/performance checks and release runbook.

Exit checks: security checklist passes; restore drill succeeds; monitoring captures controlled test failures; a full accessibility and responsive suite passes; privacy retention/export/deletion paths are documented and tested.

## Phase 7 — Production release

Select providers and credentials, configure production secrets, deploy a staging environment, migrate approved production content, execute UAT with the owner, and deploy only a verified saved release. Preserve the static implementation until post-launch validation is accepted.

Exit checks: owner approves canonical catalogue, policy wording, operating hours and public business details; staging and production are separated; public media and customer data access are verified; rollback procedure is rehearsed; operational ownership is confirmed.

## Cross-phase acceptance gates

Every phase must retain the approved commercial facts, have reviewed migrations, update tests when behaviour changes, avoid unapproved source-asset publication, and preserve a reviewable audit trail. A failure in a release gate returns work to the relevant phase; it must not be waived by a client-side workaround.
