# Jane.M security and privacy model

## Security objective

The application will process customer contact details, event dates, measurements or inspiration uploads, appointment records and deposits. It must protect that information while keeping the public catalogue fast and discoverable. Security controls are product requirements, not optional deployment work.

## Access control

- Require authenticated server sessions for `/admin` and every administrative route/action.
- Authorize each mutation on the server using a role and resource check; never rely on hidden UI controls.
- Use least-privilege roles: owner, admin, staff, and optional viewer.
- Require a separate, explicit owner action for role changes, payment settings, public media publication and catalogue selection.
- Rotate sessions on sign-in and privilege change; use secure, HTTP-only, same-site cookies and a strong session secret.
- Record login failures, role changes, publication changes, booking/deposit status changes, exports, and destructive actions in an append-only audit log.

## Forms, APIs and abuse prevention

All public inputs are parsed by shared server-side Zod schemas. Validate bounds, dates, email/phone formats, enum values, file metadata and message length; normalize only after preserving the original where it is operationally useful. Return field-specific but non-sensitive errors.

Use a layered abuse-control approach: rate limiting by route/IP plus account where relevant, a honeypot or human challenge for public forms, throttled notification delivery, idempotency keys for payment/webhook actions, CSRF protection for cookie-authenticated mutations, strict origin checking, and request-size limits. Do not expose internal error text, database errors, provider responses, file keys, or existence of private records.

## Upload and media isolation

Uploads are high risk. Accept only a narrow allowlist of documented types and size limits; generate server-side filenames/keys; inspect magic bytes; remove or neutralize active content; strip unneeded metadata from public derivatives; and store original files outside the public web root. Private originals and customer uploads must be served only through short-lived, authorisation-checked URLs. Public derivatives need an approval record and safe `Content-Type`, `Content-Disposition`, cache, and anti-sniffing headers.

Never accept Office workbooks, presentations, executables, HTML, SVG with active content, archives, or unknown formats in customer uploads unless a later use case adds an isolated malware-scanning workflow. The pre-existing receipt workbook is expressly out of scope.

## Data protection

Collect only data needed to respond to a request or fulfil a booking. Separate required service consent from optional marketing consent; record the policy version and time; provide a withdrawal path; and document retention periods before public launch. Limit staff access to contact data by role and do not include personal data in analytics, client logs, error reports, URLs, or email subject lines.

Use TLS in transit, encrypted managed database/storage services at rest, secret management rather than committed `.env` files, rotating provider credentials, backup restoration tests, and a documented process for deletion/export requests. Choose and publish the final privacy wording after the owner supplies business and legal details.

## Application hardening

Set a restrictive Content Security Policy, frame-ancestors policy, `X-Content-Type-Options: nosniff`, referrer policy, permissions policy, and HSTS in production. Keep dependencies patched, run lockfile-backed installs, scan dependency changes, avoid inline scripts where feasible, and ensure redirects/links use allowlists. Admin forms need clear re-authentication or confirmation for high-impact actions.

Promotion, price, and deposit calculations execute only on the server. Payment integrations must use a hosted/tokenized provider flow; the Jane.M application must never store raw card or bank credentials. Verify every webhook signature, timestamp and idempotency key before recording a payment state transition.

## Monitoring and incident response

Use structured, redacted logs with request IDs. Monitor authentication failures, rate-limit events, upload rejections, background-job failures, mail bounces, health checks, audit-log write failures and suspicious admin activity. Define an owner escalation path, credential-revocation procedure, backup restore procedure, and customer-notification decision process before production launch.
