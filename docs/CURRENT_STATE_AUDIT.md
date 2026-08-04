# Jane.M current-state audit

Audit date: 2026-08-04
Timezone: Africa/Johannesburg
Baseline commit: `87beebd` (`chore: preserve approved Jane.M project baseline`)

## Outcome

The approved implementation is a responsive static site in `JaneM_Website/`. Its visual direction is suitable as the production application's immutable design baseline, but its technology cannot satisfy the requested catalogue, enquiry, booking, promotion, referral, deposit, administration, security, or reporting requirements without migration.

The recommended approach is a progressive replacement with a single Next.js application. Keep `JaneM_Website/` unchanged as the reference implementation, retain the Git baseline, and copy only approved assets into a managed public/private asset structure with recorded provenance.

## Repository and Git safety

The JaneM folder originally inherited an empty Git repository from the entire Downloads directory. That parent scope exposed unrelated personal files as untracked content and was unsafe for staging. JaneM is now an isolated nested Git repository containing only the project.

- Branch: `main`
- Baseline commit: `87beebd`
- Original project files committed: 42, plus `.gitignore`
- Temporary Office lock files and `.DS_Store` files: ignored, not deleted
- Original source assets: unchanged
- Approved static site: unchanged

## Approved website implementation

| Area | Current implementation |
| --- | --- |
| Entry point | `JaneM_Website/index.html` |
| Styling | One hand-authored stylesheet, `JaneM_Website/styles.css` |
| Behaviour | One vanilla JavaScript file, `JaneM_Website/script.js` |
| Runtime | Static files; no compilation or package manager |
| Fonts | Google-hosted Cormorant Garamond and Manrope |
| Media | Four JPEGs, one 15-second H.264 MP4, one PDF catalogue |
| Data | Hard-coded in HTML |
| Integrations | WhatsApp deep links and `mailto:` only |

### Recognisable approved structure

The baseline contains the required header/navigation, hero, promotional video, statement band, three-look collection, graduation promotion, price guide, ordering process, final call to action, WhatsApp handoffs, catalogue download, and contact footer. The black, cream, and gold palette and the serif/sans typography hierarchy are consistent across desktop and mobile.

### Approved facts present in the site

- WhatsApp: `+266 6279 0946`
- Email: `officialjanem@gmail.com`
- Promotion: 30% off design fees
- Promotion dates: 1 August 2026 through 31 October 2026
- Deposit: 60%
- Material costs: excluded
- Featured relationships explicitly established by the approved static site:
  - Look 01 / The Golden Hour / `look-gold.jpg`
  - Look 02 / Classic Grace / `look-sleeves.jpg`
  - Look 03 / Midnight Allure / `look-blue.jpg`

No item-specific price is established for those three photographs. The price table is a generic design/service fee guide and must not be attached to individual looks during migration.

## Local runtime verification

The site was served successfully with Python's static HTTP server and inspected in a browser at 1440 x 900 and 375 x 812.

| Check | Result |
| --- | --- |
| HTML, CSS, JavaScript | Loaded successfully |
| Logo and three collection images | Loaded; natural dimensions present |
| Promotional video | Ready state 4; 15 seconds; 720 x 1280; autoplay/muted |
| Mobile menu | Opens and sets `aria-expanded=true` |
| Heading hierarchy | One H1 followed by H2/H3 sections |
| WhatsApp deep links | Six present |
| Page-level horizontal overflow | None at 375px or 1440px |
| Browser warnings/errors | None |
| Missing asset | `/favicon.ico` returns 404 |

The visual baselines cover the homepage top, collection, promotion, price guide, and ordering process at both widths. See `docs/baseline/README.md`.

## Asset and content findings

The original project contains 18 standalone image files, one video, seven PDFs, four non-temporary workbooks, one DOCX, one PPTX, three ZIP archives, three campaign text files, and four static-site source/readme files. `Catalog Photos.zip` contains 38 photographs representing 36 exact-hash-unique files.

Material findings:

1. `JaneM_Full_Premium_Graduation_Catalogue_2026.pdf` is byte-for-byte identical to the currently public `JaneM_Website/assets/catalogue.pdf`.
2. `JaneM_Refined_Graduation_Catalogue_2026.pdf` and `JaneM_Refined_Graduation_Catalogue_20266.pdf` are exact duplicates.
3. The website logo and three look images are exact copies of root source images; provenance is documented.
4. `JaneM_Lookbook_Catalogue_Aug-Oct_2026.pdf` explicitly labels its content as real Jane.M designs and defines Look 01 through Look 19, but individual filenames still require careful visual/hash matching before import.
5. Two campaign creative packs advertise a conflicting 50% discount and use outdated numbers (`+266 5881 8409`, `+266 6222 2018`, or variants). They are obsolete/internal and must not be published or seeded as active promotions.
6. The root price-list image uses an outdated number (`+266 62222013`). Its fee data is useful for reconciliation, but the artwork is not public-ready.
7. `Receipt_Expense_Register_Aug2026.xlsx` contains unrelated/private travel receipt data. It is excluded from application migration and all public/admin uploads unless the owner later places it in scope.
8. Strategy, playbook, forecast, and execution-tracker files are internal business material. They may inform requirements but must not be publicly served.
9. The 26 MB public catalogue is too large for an ideal customer download. Preserve it as the approved original; create an approved optimized derivative later rather than modifying it in place.

## Technology assessment

### What should be preserved

- Semantic section order and content hierarchy
- CSS design tokens: black, cream, paper, gold, muted text, and line colours
- Typography pairing and scale relationships
- Header, hero, image-card, promotion, table, process, CTA, and footer compositions
- Current copy and verified commercial facts
- Current real Jane.M media and video
- WhatsApp handoff pattern

### What should be migrated

- Static HTML into Next.js App Router server components and focused client components
- Hard-coded content into seeded PostgreSQL records
- Direct asset references into managed public media records with provenance
- Hard-coded price/promotion values into versioned records and request-time active rules
- Static catalogue download into an admin-selectable site setting

### Current functional gaps

- No database, API, server validation, admin portal, authentication, roles, or audit log
- No enquiry, appointment, upload, notification, referral, deposit, or reporting workflows
- No catalogue search/filter/detail routes
- No privacy or terms pages
- No spam prevention, throttling, CSRF controls, upload isolation, or production error handling
- No automated tests, build pipeline, accessibility test suite, or responsive screenshot tests
- No consent capture or analytics-consent mechanism

## Accessibility and responsive baseline

Positive baseline features include a skip link, labelled navigation, semantic headings, image alt text, a labelled mobile menu, and no page-level mobile overflow.

Phase 1-6 remediation items:

- Add visible `:focus-visible` treatment to every interactive element.
- Add `prefers-reduced-motion` handling; the current IntersectionObserver animation does not respect it.
- Add Escape/outside-click and focus management for the mobile menu.
- Ensure 44 x 44 CSS-pixel touch targets; the current menu control is smaller in its resting state.
- Treat the wide price table as an accessible labelled scroll region or responsive comparison layout.
- Decide whether the muted autoplay video is decorative; provide an accessible alternative/poster and controls when content-bearing.
- Self-host approved font files through the framework font pipeline to remove third-party font requests and reduce layout shift.

## Performance baseline

- Video: 999,810 bytes, H.264, 720 x 1280, 15 seconds.
- Public PDF catalogue: 25,962,524 bytes, 49 A4 pages.
- Collection JPEGs: 54-123 KB each, 900-1000px wide.
- Logo source: 1131 x 1599 but visually contains substantial whitespace; preserve original and create managed display derivatives later.

The production application should use responsive image variants, explicit dimensions, lazy loading below the fold, one essential poster/hero preload only, self-hosted fonts, and an optimized approved catalogue derivative.

## Critical decisions already resolved

- Migrate to the requested single Next.js/TypeScript/PostgreSQL/Prisma architecture.
- Do not redesign the public site.
- Do not publish unclassified archive photographs automatically.
- Do not seed the 50% campaign packs as active or public content.
- Do not migrate private receipt data.
- Do not attach generic fees to specific looks.
- Evaluate promotion activity at request time so expired promotions cannot remain visible even if a scheduler fails.

No genuinely blocking product decision prevents Phase 1. Provider-specific choices for production hosting, object storage, and transactional email can remain behind adapters until credentials are supplied.
