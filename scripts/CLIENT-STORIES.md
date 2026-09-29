# Adding client stories

Add one record to `client-stories.json` per delivered look, using the existing record as a guide. Use a unique lowercase, hyphenated `id`, accurate copy, and approved media. Place media in `JaneM_Website/assets/client-stories/` and include the actual image dimensions. The video, poster and video title are optional together; omit them for photo-only stories.

The collection renders one card per entry. A single entry uses a wide layout; multiple entries use two columns on desktop and one on phones. Each appreciation card appears once, opens at full size when selected, and any video stays collapsed until requested. Enquiry links include the relevant story title automatically.

Run `npm run build`, `node scripts/test-client-stories.js` and `npm run test:seo`, then review `/client-stories/` locally at desktop and phone widths before publishing. Do not add placeholder clients to the public data.
