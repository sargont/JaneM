# Wear Jane.M traffic growth actions

Updated: 23 September 2026

## What the data currently says

Google Analytics, last 7 days:

- Active users: 91
- Views: 143
- New users: 87
- Sessions: 107
- Top countries by active users: United States 37, Lesotho 23, Germany 6, United Kingdom 5, France 4, Poland 4, South Africa 3
- Top city signal: Maseru 19 active users
- Top pages by views: home page 114, Style Studio 6, graduation dresses 4, collection 2, atelier/about 2
- Sessions by channel: Direct 86, Organic Search 9, Organic Social 6, Unassigned 5, Cross-network 1, Referral 1
- Session source/medium includes `google-business-profile / organic-local` with 1 session, so the tagged Google Business Profile link is working.

Live Google result checks:

- `graduation dresses Lesotho`: Jane.M appears in local results and the graduation page appears organically.
- `custom dresses Maseru`: Jane.M appears as the top organic result and in local results.
- `dress maker Maseru`: Jane.M appears in local results and the custom dresses page appears organically.
- `wedding dresses Lesotho`: Jane.M did not appear in the first visible results; The Bridal House Lesotho and D&D Clothing were prominent.
- `women wear Lesotho`: Jane.M did not appear in the first visible results; broad retail and traditional-wear results dominated.

Search Console status:

- Jane.M profile access is available under `litebohomokhethi@gmail.com`.
- Domain property: `wearjanem.com`.
- Performance, 3-month range: 3 clicks, 22 impressions, 13.6% CTR, average position 5.8.
- Visible queries: `tailoring shop near me` had 1 click from 1 impression; `dress maker` had 2 impressions; `dress patterns` had 2 impressions; `places that alter clothes near me`, `yes`, `jane yap atelier` and `jane atelier` had 1 impression each.
- Sitemap: `https://wearjanem.com/sitemap.xml` submitted on 17 September 2026, last read 20 September 2026, status `Success`, 25 discovered pages.
- Page indexing: 20 indexed pages and 8 not indexed as of the 18 September 2026 indexing report.
- Expected not indexed: 1 page excluded by a deliberate `noindex` tag.
- Priority discovered-but-not-indexed URLs: `/about/`, `/bridesmaid-dresses/`, `/catalogue.html`, `/collection/`, `/contact/`, `/price-guide/`, `/wedding-dresses-lesotho/`.
- After the new page deployment, resubmit the sitemap or wait for recrawl so Google discovers the 26th indexable page.
- After deployment, manually inspect and request indexing for `/wedding-dresses-lesotho/`, `/bridesmaid-dresses/`, `/contact/`, `/collection/`, `/price-guide/` and `/custom-womenswear-lesotho/`.

## Technical fixes

Completed in the website:

- Added the Google-listed address, `Sekamaneng, Ha Foso 100`, to the contact copy.
- Added a visible `Directions to Ha Foso` link in the footer.
- Added `directions_click` tracking for the directions link.
- Added `PostalAddress` and `hasMap` structured data to every generated page.
- Added structured service offers for bespoke wedding dresses, bridesmaid dresses, graduation dresses, evening gowns, corset dresses, custom women's wear, remote dress consultations and made-to-measure dressmaking.
- Added `/custom-womenswear-lesotho/` to broaden the site beyond single-occasion searches.
- Strengthened `/wedding-dresses-lesotho/` with bridal, wedding gown, white wedding dress, modern corset wedding dress and made-to-measure bridal wording.
- Strengthened `/custom-dresses-maseru/` for dress maker and tailoring-shop intent while keeping the positioning focused on made-to-measure occasionwear.
- Confirmed `https://wearjanem.com/sitemap.xml` and `https://wearjanem.com/robots.txt` are live.

Completed in GitHub Pages settings:

- Enabled **Enforce HTTPS** for the custom domain in GitHub Pages.
- Immediately after enabling it, GitHub edge cache still returned `http://wearjanem.com/` as `200 OK`; allow propagation and recheck. Once propagated, `http://wearjanem.com/` and the old GitHub Pages URL should resolve to `https://wearjanem.com/`.

## Growth interventions

1. **Finish Google Business Profile strength**

   Complete Google's `Profile strength / Complete info` checklist from the manager surface. Prioritize services, products/photos, directions, booking link, recent review replies and service-area accuracy.

2. **Use tagged links everywhere**

   Direct traffic is still too high. Replace plain links in Instagram bio, Facebook, WhatsApp Business, YouTube and Google posts with the links in `docs/CAMPAIGN_LINKS.md`.

3. **Push wedding intent harder**

   Jane.M is not yet visible for `wedding dresses Lesotho`. The wedding page needs more authority signals:

   - Add a Google Business Profile post linking to `/wedding-dresses-lesotho/`.
   - Add one or two wedding-focused photos to the Google profile if real examples are available.
   - Add a Facebook/Instagram post using the phrase `bespoke wedding dresses in Maseru, Lesotho`.
   - Link from YouTube or JaneM TV descriptions to the wedding page.

4. **Create content around broader women's wear terms**

   `women wear Lesotho` is too broad and currently dominated by retail/traditional-wear results. Jane.M should not chase it as a generic retail keyword. Use narrower pages/posts around:

   - `custom women's wear Maseru`
   - `made-to-measure women's fashion Lesotho`
   - `occasion wear Lesotho`
   - `gala dresses Maseru`
   - `corset dresses Lesotho`

   The first site intervention is now live in source as `/custom-womenswear-lesotho/`. Support it with social and Google Business Profile posts using real work examples.

5. **Turn graduation strength into bookings**

   Graduation is already showing. Use it now while Google has signal:

   - Post weekly graduation examples on Google Business Profile through peak season.
   - Send WhatsApp Status traffic to the tracked booking URL.
   - Add recent graduation photos to the Google profile.
   - Ask happy graduation clients for Google reviews mentioning `graduation dress` naturally.

6. **Measure the next real funnel**

   In GA4, mark these as key events once they appear after deployment:

   - `consultation_whatsapp_open`
   - `style_studio_whatsapp_click`
   - `directions_click`

   Confirmed appointments, deposits and orders should be captured in the workflow system, not inferred from website clicks.
