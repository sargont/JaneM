# Approved visual baseline

Captured: 2026-08-04
Source: baseline commit `87beebd`
Implementation: `JaneM_Website/` served unchanged

## Viewports

- Desktop: 1440 x 900
- Mobile: 375 x 812

Each viewport includes the top of the homepage plus section-aligned captures for collection, promotion, price guide, and ordering process. The section captures were triggered through the actual navigation so the site's IntersectionObserver animation reached its settled state.

## Files

| Area | Desktop | Mobile |
| --- | --- | --- |
| Homepage top | `screenshots/home-desktop-1440.png` | `screenshots/home-mobile-375.png` |
| Collection | `screenshots/home-desktop-collection-1440.png` | `screenshots/home-mobile-collection-375.png` |
| Promotion | `screenshots/home-desktop-promo-1440.png` | `screenshots/home-mobile-promo-375.png` |
| Price guide | `screenshots/home-desktop-pricing-1440.png` | `screenshots/home-mobile-pricing-375.png` |
| How to order | `screenshots/home-desktop-process-1440.png` | `screenshots/home-mobile-process-375.png` |

`screenshot-overview.png` is a contact sheet for quick regression review. The individual PNGs are the authoritative comparison artifacts.

## Baseline observations

- No page-level horizontal overflow at either viewport.
- Mobile menu opens and updates `aria-expanded` correctly.
- All approved images and the promotional video load.
- No browser console warnings or errors were observed.
- `/favicon.ico` returns 404; this is a known low-severity baseline defect.

Future screenshot tests should add 320, 430, 768, and 1024 widths while retaining these two approved reference sizes.
