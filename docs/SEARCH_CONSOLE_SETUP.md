# Google Search Console and Bing Webmaster Tools

After the production hostname is live:

1. Add the canonical domain as a **Domain property** in Google Search Console and verify with the DNS TXT record it provides.
2. Submit `https://YOUR-CANONICAL-HOST/sitemap.xml` in Search Console → Sitemaps.
3. Inspect the homepage, collection and one individual look with URL Inspection; request indexing only after their canonical URL is correct.
4. Add the same canonical hostname to Bing Webmaster Tools, verify by DNS, then submit the same sitemap.
5. Monitor Page indexing, Core Web Vitals, Enhancements, Crawl stats, and rich-result reports weekly for the first month. Do not submit the GitHub Pages URL once the custom domain is canonical.
