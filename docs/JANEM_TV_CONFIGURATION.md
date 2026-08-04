# JaneM TV configuration

Update [janem-tv-config.js](../JaneM_Website/janem-tv/janem-tv-config.js) when approved videos are available.

- `channelUrl` is already set to the official channel: `https://youtube.com/@janemtv`.
- Set `featuredVideoId` to the 11-character ID from the YouTube video URL.
- Set each `videos[].id`, title and description to genuine JaneM TV content.

No YouTube API key is used. Until real IDs are supplied, the page presents a branded, accessible fallback and links visitors to the official channel rather than embedding unrelated videos or inventing metadata.
