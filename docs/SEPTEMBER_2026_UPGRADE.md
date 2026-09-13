# JANe M September 2026 upgrade

Implemented in the existing static site; original occasion recommendations and PDF generation are preserved.

## Visitor-facing changes

- Garment-led homepage, simplified navigation, daily styling entry and sculpted-gold wordmark near the atelier story.
- Approved three-look collection with occasion filters, individual detail pages, device-local shortlist and direct design-to-consultation links. The catalogue URL now presents the same approved collection; original source catalogue assets remain untouched.
- Daily Style Studio at `style-studio/today/`: text-only wardrobe, owned-versus-suggested labels, coverage and footwear constraints, manual weather choice, laundry availability, anchor piece, combination variations, saved outfits, wear history, seven-day planner, private JSON backup/restore and clear controls.
- Consultation form with optional date and notes, workmanship budget, selected collection looks, request preview, edit/copy controls and WhatsApp handoff. No message is sent by preparing the request.
- Mobile layout rules, accessible form labels, keyboard focus treatments, reduced motion, theme support and Escape/outside-click handling for navigation.

## State and boundaries

Daily preferences persist only when the visitor opts in. Adding a wardrobe piece or saving/planning an outfit explicitly saves it in this browser. No account, cross-device sync, background uploads, weather API or external AI calls are present. The recommendations are deterministic wardrobe rules. No live appointment inventory, appointment confirmation, quote acceptance, payment, order tracking or notifications are simulated. Those remain future service integrations.

Private review source is kept in `output/janem-private-preview/`, an isolated sanitized source repository. It excludes original catalogues, legacy prototypes, administration and unrelated business material. Business analytics is disabled in that review copy. The original GitHub Pages site has not been pushed or deployed by this task.

## Build ownership and validation

`build-seo-site.js` owns generated pages and SEO. `experience-pages.js` owns daily, collection and booking templates. Update those sources before rebuilding rather than editing generated HTML.

`npm test` passes the original recommendations, measurements, PDF, style card, theme and SEO checks plus new daily core and jsdom interaction checks. New checks cover ownership, flat-shoe and coverage constraints, cold/warm weather, unavailable wardrobe pieces, anchor combinations, recent wear, saved-state round trips, escaped input, add/remove/undo, saved outfits, seven-day plans, reload, corrupt browser storage, collection shortlist and unsent WhatsApp request preview.

Browser screenshots and visual interaction testing were not performed in this pass. Responsive styling is implemented but should receive device review before public release.

## Branding asset

The built-in Image Generation tool produced a standalone exact-case JANe M sculpted champagne-gold wordmark in one request. The website uses a 79 KB JPEG at `JaneM_Website/assets/janem-sculpted-gold-wordmark.jpg`; the original and prompt are retained under `output/branding/`. The effect is a rendered dimensional wordmark with restrained hover tilt, not an interactive 3D model.

## 7 September editorial refinement

The homepage is now a continuous fashion editorial: cover look, two signature looks, atelier story, consultation and practical ordering information. Direct look enquiries avoid extra catalogue navigation. Pricing sits in a compact disclosure. Repeated promotion panels and the large sculpted wordmark treatment have been removed from the homepage.

Style Studio has a dedicated app shell and a two-choice entrance. Daily Studio presents Today, Wardrobe, Saved outfits and My week as accessible keyboard-operated tabs with browser history support. Saving and planning guide users to the relevant screen. Occasion design now has four accurate steps, retained answers when editing, and optional detail after results. Default automatic appearance stays light.

Validation: recommendation, measurement, PDF, style card, theme, daily data, enquiry, navigation and SEO tests pass. Added navigation coverage includes keyboard tabs, outfit-to-planner transitions, four-step validation/completion and revising answers. Local HTTP checks succeed, but the in-app browser could not navigate away from its connection-error page; responsive layouts were reviewed in source, not visually verified this pass.

## Requested restoration

Restored all non-Studio pages to the saved 5 September private site version. Retained the approved 7 September daily and occasion Studio, including its appearance, four-step navigation and all saved-data functionality. Studio loads its own copy of the approved theme code so the restored main-site theme cannot change its appearance. Comparison verified all 22 non-Studio HTML pages match the September 5 snapshot after normalizing hosting origins, and the two Studio pages match the approved September 7 version except for the theme script path. Functional and SEO tests pass.

## Full catalogue and promotion hero

Restored the original 49-page catalogue gallery using the existing privacy-protected page images. Every page can be enlarged and closed. The main navigation and signature collection now link to the full catalogue. The catalogue page offers direct browsing of all pages; the previously paused original PDF remains outside the static publication.

The homepage hero now features the current 30% workmanship promotion, 1 August–31 October 2026, with the existing promotional video and clear fabric/deposit terms. Verified all 49 image paths, last-page viewer interaction, promotional video availability and byte-for-byte preservation of all tracked Style Studio files. Functional/SEO checks pass.
