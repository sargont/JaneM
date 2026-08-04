# Jane.M SEO audit — 2026-08-04

## Deployment and public URL audit

- Git remote: `https://github.com/sargont/JaneM.git`.
- Deployment method: `.github/workflows/deploy-janem-pages.yml` publishes `JaneM_Website/` through the official GitHub Pages Actions workflow on pushes to `main`.
- Expected project-site URL: `https://sargont.github.io/JaneM/`, derived from the repository owner and name. GitHub’s public Pages API returned `404` during this audit, so Pages activation and its final deployment URL still need confirming in repository Settings → Pages. The build reads this URL from `JaneM_Website/seo.config.json`; it is not embedded in templates.
- Existing public HTML before this programme: `/`, `/catalogue.html`, and `/admin.html`. The last is not a public portal and must stay excluded from discovery.

## Baseline findings

| Area | Baseline | Priority |
| --- | --- | --- |
| Indexable content architecture | Homepage and catalogue only | High |
| Canonical, Open Graph, Twitter, JSON-LD | Absent | High |
| Sitemap, robots and 404 | Absent | High |
| Image dimensions / modern formats | Partial; primary images were JPG-only | High |
| Crawlable internal journey | Navigation was mostly on-page fragments | Medium |
| Consent support | Google tag could load without a consent choice | High |
| Lighthouse | Not recorded: Pages endpoint was unavailable and Lighthouse is not installed in this workspace | Manual follow-up |

The audit did not fabricate Lighthouse scores. Use the documented post-deploy command after Pages is live.

## Final local validation

After implementation, Lighthouse was run against the local Content Studio server with a cold-cache profile:

| Profile | Performance | Accessibility | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | --- | ---: |
| Desktop | 100 | 96 | 100 | 0.6 s | 0.001 |
| Mobile | 94 | 96 | 100 | 2.6 s | 0 |

The mobile score improved from 74 during the first local run after external font and icon styles were made non-render-blocking. Scores are local-only and should be rechecked on the live CDN/Pages hostname after deployment.
