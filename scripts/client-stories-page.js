const stories = require('./client-stories.json');

// One record per delivered look. Keep media inside its story, not in a second hero.
function render(page, ctx, entries = stories) {
  const { esc, absolute, metadata, sharedHeader, sharedFooter } = ctx;
  const prefix = '../';
  const route = '/client-stories/';
  const ids = new Set();
  for (const story of entries) {
    if (!/^[a-z0-9-]+$/.test(story.id) || ids.has(story.id)) throw new Error('Client stories require unique URL-safe IDs');
    ids.add(story.id);
  }
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Jane.M client stories', url: absolute(route), description: page.description,
    mainEntity: {
      '@type': 'ItemList', numberOfItems: entries.length,
      itemListElement: entries.map((story, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: {
          '@type': 'CreativeWork', '@id': absolute(`${route}#${story.id}`),
          name: story.title, description: story.summary, image: absolute(story.image),
          creator: { '@type': 'Organization', name: 'Jane.M Atelier' },
          ...(story.video ? { video: {
            '@type': 'VideoObject', name: story.videoTitle, description: story.summary,
            thumbnailUrl: absolute(story.poster), contentUrl: absolute(story.video),
            uploadDate: `${story.published}T00:00:00+02:00`
          } } : {})
        }
      }))
    }
  };
  const cards = entries.map(story => {
    const enquiry = `https://wa.me/26662790946?text=${encodeURIComponent(`Hello Jane.M, I saw the client story “${story.title}” and would like to discuss a look for my occasion.`)}`;
    return `<article class="story-entry" id="${story.id}" aria-labelledby="${story.id}-title">
      <a class="story-entry__art" href="${prefix}${esc(story.image)}" target="_blank" rel="noopener" aria-label="Open the full appreciation card for ${esc(story.title)} (new tab)">
        <img src="${prefix}${esc(story.image)}" width="${story.imageWidth}" height="${story.imageHeight}" alt="${esc(story.imageAlt)}" loading="lazy" decoding="async">
        <span>View full appreciation card <span aria-hidden="true">↗</span></span>
      </a>
      <div class="story-entry__body">
        <p class="eyebrow">${esc(story.category)} · Delivered</p>
        <h2 id="${story.id}-title">${esc(story.title)}</h2>
        <p>${esc(story.summary)}</p>
        ${(story.story || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
        ${story.video ? `<details class="story-entry__reveal"><summary>Watch the finished dress <span aria-hidden="true">+</span></summary><div class="story-entry__film"><video controls playsinline preload="none" poster="${prefix}${esc(story.poster)}" aria-label="${esc(story.videoTitle)}"><source src="${prefix}${esc(story.video)}" type="video/mp4">Your browser does not support this video. <a href="${prefix}${esc(story.video)}">Open the dress video</a>.</video></div></details>` : ''}
        <a class="btn btn-gold" data-analytics-event="whatsapp_click" data-analytics-location="client_story_${story.id}" href="${enquiry}" target="_blank" rel="noopener">Discuss a similar look <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
  }).join('');
  return `<!doctype html><html lang="en"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><meta name="theme-color" content="#15120f">
    <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="${prefix}styles.css?v=20260929stories4"><script src="${prefix}theme.js"></script>
    ${metadata(page, route, page.image, [schema])}
  </head><body>${sharedHeader(prefix)}<main id="main" class="stories-page">
    <nav class="seo-breadcrumb container" aria-label="Breadcrumb"><a href="${prefix}index.html">Home</a><span aria-hidden="true">/</span><span>Client stories</span></nav>
    <header class="stories-intro container"><p class="eyebrow">From the atelier to you</p><h1>Client stories.<br><span>Made personal.</span></h1><p>Finished pieces, thoughtful details and the people we make them for. Find inspiration for your own Jane.M moment.</p></header>
    <section class="stories-collection container" aria-label="Delivered client stories">${cards || '<p>Our first client stories are coming soon.</p>'}</section>
    <aside class="stories-next container"><p>Still exploring your own look?</p><a href="${prefix}style-studio/" data-analytics-event="style_studio_cta" data-analytics-location="client_stories">Try the free Style Studio <span aria-hidden="true">→</span></a></aside>
  </main>${sharedFooter(prefix)}<script src="${prefix}config.js"></script><script src="${prefix}analytics.js"></script><script src="${prefix}seo-analytics.js"></script><script src="${prefix}script.js"></script><script src="${prefix}client-stories.js"></script></body></html>`;
}
module.exports = { render };
