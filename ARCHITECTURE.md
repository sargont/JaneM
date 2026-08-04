# Jane.M production application architecture

## Scope and guardrails

This is the target architecture for replacing the static approved website with one production web application. It preserves the approved information architecture, visual language, verified commercial facts, and WhatsApp handoff pattern documented in `docs/CURRENT_STATE_AUDIT.md`. It does not authorise a redesign, publication of unclassified source media, or migration of private receipt data.

The approved static site in `JaneM_Website/` remains an immutable visual reference. The replacement should live alongside it until the public application has passed its release gate.

## Target stack

| Layer | Recommended implementation | Responsibility |
| --- | --- | --- |
| Web application | Next.js App Router with TypeScript | Server-rendered public pages, focused client interactions, admin portal, route handlers |
| Database | PostgreSQL with Prisma | Transactional records, content, enquiries, bookings, audit events and reports |
| Authentication | Auth.js-compatible credentials or managed identity provider | Admin and staff sessions with role checks |
| Object storage | S3-compatible private bucket behind a storage adapter | Original uploads, derivatives and controlled catalogue downloads |
| Email | Transactional-email adapter | Customer and internal notifications; provider selected later |
| Validation | Zod at every external boundary | Form, route, environment and import validation |
| Tests | Vitest, Playwright and accessibility checks | Unit, integration, end-to-end, responsive visual and a11y coverage |

Production provider choices remain deliberately behind interfaces until the owner supplies credentials. Local development must run without sending real messages or exposing private media.

## Application boundaries

```text
Browser
  -> Next.js public pages and form actions
       -> domain services
            -> Prisma/PostgreSQL
            -> storage adapter
            -> notification adapter
            -> audit-event writer
  -> Next.js admin pages and protected route handlers
       -> authentication and role checks before every mutation
```

Public pages never query raw uploads directly. They receive only approved, public content records. Admin mutations go through server-side services; client components are not trusted to enforce promotions, prices, roles, deposits, or upload policy.

## Recommended folder layout

```text
app/
  (public)/                 homepage, collection, looks, catalogue, privacy, terms
  admin/                    protected admin routes
  api/                      narrow integrations, upload completion and health routes
  actions/                  validated server actions where appropriate
components/
  public/                   baseline-derived presentation components
  admin/                    form and operations components
  ui/                       accessible primitives and tokens
lib/
  domain/                   promotion, price, booking, enquiry and referral rules
  auth/                     session and authorization helpers
  content/                  public-content query boundary
  integrations/             storage, mail and payment adapters
  validation/               Zod schemas
  observability/            structured logs, error reporting and audit events
prisma/
  schema.prisma             schema, migrations and seed data
public/
  approved/                 only low-risk, version-controlled public derivatives
tests/
  unit/ integration/ e2e/ visual/
```

Original source materials must not be copied wholesale into `public/`. Assets enter managed storage only after an approval record, provenance, usage category and visibility have been assigned.

## Public experience

The first public release should provide:

- the existing marketing homepage, retaining its sections and commercial facts;
- browseable collection and look detail pages with only approved media;
- a request-time active promotion and price guide;
- catalogue download controlled by an explicit site setting;
- enquiry and consultation-request forms with consent and spam protection;
- privacy and terms pages; and
- WhatsApp links as an optional handoff, not the only route for a customer request.

Public form submission creates a canonical enquiry record, records consent, triggers a safe internal notification, and exposes a neutral confirmation state. The application must never promise availability or quote a final price before staff review.

## Administration and operational flow

Admin users manage records rather than editing page source. Minimum roles are `OWNER`, `ADMIN`, and `STAFF`; a read-only `VIEWER` role may be added when reporting needs it. An owner controls roles and settings. Staff can process the operational records assigned to them, but cannot publish media, alter roles, or change payment configuration unless explicitly allowed.

Typical flow: create/import a media record -> record provenance -> keep it private -> review and add an approved derivative -> publish it to a look or catalogue only after approval -> retain an audit event for every material mutation. Promotions are evaluated when rendered or quoted, using their effective dates and status. A background scheduler may notify staff about dates, but may not be required to hide an expired offer.

## Environment and deployment

Use one validated environment module. Required production variables should include a database URL, session secret, storage credentials, application origin, rate-limit backend and notification provider configuration. Optional adapters must fail closed: for example, a missing mail provider may queue no message and return a monitored operational error, never attempt delivery using placeholder credentials.

Deploy a stateless application image with managed PostgreSQL and private object storage. Use database migrations as part of release automation, separate production/staging credentials, encrypted backups, error monitoring with redaction, and a health endpoint that proves only safe dependencies. Public static derivatives may be cached; customer records, private uploads, admin routes and signed URLs must not be publicly cached.

## Acceptance boundaries

The migration is ready to replace the static site only when the approved screenshots remain materially matched, public content comes from approved records, all mutations are authorised and audited, forms are validated and throttled, private source material is inaccessible, and migration/seed/test/build checks pass in a clean environment.
