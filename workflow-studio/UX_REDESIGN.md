# Jane.M UX redesign — 11 September 2026

Figma direction: https://www.figma.com/design/aX0iNbaq41La9xUkDzqiYJ

The Figma file is an editable conceptual overview and interaction brief. It is not a pixel-for-pixel copy of every implemented screen, and no independent human designer review was performed. The connected library search returned no matching dashboard or navigation assets; the direction uses the existing DM Sans / Playfair Display typography and atelier greens.

## Findings and implemented response

- The opening board exposed production mechanics before business priorities. Today now opens first, with active jobs, deadline/blocker attention, outstanding amounts, today's activities and team load derived from saved records.
- Filters and explanatory notices competed with work. Filters are collapsed with an active-filter count; detailed prototype information expands on demand.
- Every view shared the same generic heading. Each now names its purpose and next decision.
- One long job form mixed unrelated tasks. The editor now has Details, Work plan, Payments and Inspiration tabs with keyboard navigation, visible selected state, validation-driven tab selection and full-card printing.
- Revenue actions opened unrelated form fields. Record payment opens Payments; scheduled activities open Work plan.
- The interface accumulated mixed spacing and oversized controls. A consistent warm-white surface, restrained borders, green navigation, compact controls and responsive panels now unify the app.

## Preserved behaviour

Browser storage key, job IDs, staff skills, payment history, attachments, stage moves, filters, export, WhatsApp draft review, closed-job recovery and capacity calculations remain in place. No saved customer records were sent to Figma; design figures are explicitly illustrative.

## Validation

Local regression checks cover payment arithmetic and history, overpayment rejection, skills, draft intake, closed/reopened cards, Today rendering, tab switching, hidden required-field reveal and default-collapsed filters. Browser inspection confirms the overview and the Details/Payments tabs render. The Figma overview was rendered and inspected, and its fonts were read back.

## Remaining product limits

This remains a laptop prototype with browser-local data. The attention queue highlights date and blocker flags, not a guaranteed delivery forecast. Outstanding amounts exclude unpriced jobs. Automated reminders, shared access, restore/import and financial corrections are still separate work.
