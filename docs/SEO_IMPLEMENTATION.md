# SEO implementation

Run `npm run build` to generate the public landing pages, `sitemap.xml`, `robots.txt`, and `404.html`. Run `npm run test:seo` to validate metadata, canonicals, internal links, JSON-LD, image alt text/dimensions, robots and sitemap contents.

`JANEM_SITE_URL=https://www.example.com/ npm run build` is the only required change when moving from GitHub Pages to a verified custom domain. The build creates absolute canonicals and sitemap URLs from that value.

Implemented schema: `ClothingStore`, `WebSite`, `BreadcrumbList`, `VideoObject`, and `Product` only for the three genuine collection looks. No price, availability, review, rating, address or fabricated product information is emitted. Analytics events are provider-neutral and Google tags do not load until consent is granted.

Final local Lighthouse: desktop 100 performance / 96 accessibility / 100 SEO; mobile 94 / 96 / 100. Mobile LCP was 2.6 s and CLS was 0. These are test-environment results, not a substitute for a live-host check after GitHub Pages is enabled.
