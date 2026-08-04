# GitHub Pages custom domain

1. Choose the canonical hostname, normally `www.example.com` or `example.com`; do not configure both as primary URLs.
2. Set `JANEM_SITE_URL` in the deployment workflow to the chosen HTTPS URL and rebuild. Update `seo.config.json` as the checked-in default once the hostname is confirmed.
3. In GitHub repository Settings → Pages, set the custom domain and enable **Enforce HTTPS** after DNS resolves.
4. For `www`, create a DNS CNAME to `sargont.github.io`. For an apex domain, use the four GitHub Pages A records shown in GitHub’s current Pages documentation or your DNS provider’s supported ALIAS/ANAME setup.
5. Configure a 301 redirect from the non-canonical hostname to the chosen hostname at the DNS/CDN provider. Confirm `http` redirects to `https`.
6. Only then rename `JaneM_Website/CNAME.example` to `CNAME` and replace its contents with the single verified hostname (no protocol or path).

Verify the final canonical, sitemap and robots URLs with curl before submitting them to search engines.
