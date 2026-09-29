# Jane.M Daily Style

Standalone route: `/daily-style/`. Source page renderer: `scripts/daily-style-page.js`. The build script handles canonical metadata, free WebApplication schema, sitemap and shared footer links. The homepage only adds a text link inside the existing Studio invitation; there is no new homepage game section.

## Content and schedule

`JaneM_Website/daily-style/core.js` contains the pieces, explicit matching rules and 30 editorial briefs. The collection rotates daily at midnight Africa/Maseru / UTC+2, using 29 September 2026 as brief 1. These are initial editorial prompts, not claims that Jane.M personally reviewed them. Review wording with the designer before publication, particularly cultural or occasion-specific prompts. Keep piece tags and visible descriptions aligned. All illustrations are styling ideas, not purchasable stock or fit previews.

For a long-term service, refresh the editorial collection regularly. If changing ordering, tags or the number of briefs after launch, version the schedule and preserve old result mappings; the current lightweight format recomputes a saved date against this original 30-brief rotation.

## Local state and limitations

`janem-daily-style-v1` in localStorage records validated piece IDs, best scores by brief date, drafts, visits and actual dates played. Archive attempts cannot create retrospective streak days. Repeated completion updates a result rather than adding a new completed day. There is no login, server, voting or cross-device sync. Clearing site data removes progress. Storage failures show a notice while the game remains playable. The last 180 results/activity dates and 30 drafts are retained when normalised.

Style cards are generated on-device as PNGs. Native sharing uses the browser share sheet; clipboard/manual-copy fallbacks are available. WhatsApp opens a prepared message only after the user selects its link; it never sends automatically.

## Four-week pilot measurement

Events use the existing `JaneMAnalytics` integration:

- `daily_style_game_cta`: discovery link clicked on the homepage.
- `daily_style_visit`: first game visit on a calendar day on this browser; `return_gap_days` and `returning_player` describe locally observed returns, not cross-device identity.
- `daily_style_start`: first piece choice for that brief in this page session.
- `daily_style_complete`: first completed attempt for a brief date on this browser; `score`, `challenge_id`, `is_today`.
- `daily_style_retry`: subsequent checks of a completed date.
- `daily_style_share`: native sharing or copying; does not prove a recipient opened the link.
- `daily_style_card_download`: PNG generated for download.
- Existing `style_studio_cta` and `whatsapp_click`: result links, with `cta_location` identifying the game.

Use GA4 explorations to examine unique-user start → completion → Studio/WhatsApp progression and first-player cohorts returning on day 1 and within 7 days. Compare source/device cohorts and report counts alongside percentages when traffic is low. Return-gap events alone are not cohort retention. Register event-scoped custom dimensions for `challenge_id`, `is_today`, `returning_player`, `cta_location` and a custom metric for `return_gap_days`/`score` if needed in reports. This code does not create those GA4 reports or admin definitions automatically. WhatsApp clicks are enquiry intent, not confirmed orders.

Review after four weeks; do not infer success from extra pageviews alone. Keep improving only if the game produces repeat engaged use, useful outfit planning or more enquiries without harming the main customer journey.

## Verification

Run `npm run test:daily-game` and `npm test`. Tests cover every brief being solvable, midnight rollover, corrupted/blocked storage, repeat attempts, archived-brief streak integrity, restoration, result rendering and analytics deduplication. Review desktop/mobile, light/dark, keyboard selection, reveal, lookbook, archive, export and reset in a browser. Check the downloaded PNG visually.
