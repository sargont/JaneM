# SEO reporting

Record monthly organic users, landing pages, Search Console clicks/impressions/CTR/average position, indexed URLs, Core Web Vitals, catalogue views, individual-look views, WhatsApp clicks, enquiry starts/submits, booking starts/submits and catalogue downloads. Compare events only after consent; do not infer user-level data from aggregate reporting.

Post-deploy Lighthouse command: `npx lighthouse https://YOUR-CANONICAL-HOST/ --preset=desktop --output=html --output-path=reports/lighthouse-desktop.html` and repeat with `--preset=perf` / a mobile configuration appropriate to the installed Lighthouse version. Keep reports out of the deployed website directory.
