(function initialiseJaneMTV() {
  const fallbackConfig = {
    channelUrl: "https://youtube.com/@janemtv",
    channelName: "JaneM TV",
    featuredVideoId: "OgL9M95S7MQ",
    featuredVideoTitle: "A custom order that almost took me out",
    featuredVideoDescription: "A popular JaneM TV studio story following the demands and detail behind a custom order.",
    videos: [
      { id: "Tg8_GjfMLj8", title: "Rediscovering myself at 35", description: "A personal JaneM TV story about growth, reflection and finding your way forward." },
      { id: "QIci5o8c-FY", title: "A quick client order", description: "A sewing-studio diary following a fast client order and hands-on teaching." },
      { id: "YnfS36rjZc0", title: "Another custom order", description: "Follow the JaneM studio as work begins on another made-to-measure order." }
    ]
  };
  const suppliedConfig = window.JaneMTVConfig || {};
  const config = {
    ...fallbackConfig,
    ...suppliedConfig,
    videos: Array.isArray(suppliedConfig.videos) && suppliedConfig.videos.some((video) => /^[A-Za-z0-9_-]{11}$/.test(video.id || ""))
      ? suppliedConfig.videos
      : fallbackConfig.videos
  };
  const player = document.querySelector("[data-janem-tv-player]");
  const title = document.querySelector("[data-janem-tv-title]");
  const description = document.querySelector("[data-janem-tv-description]");
  const cards = document.querySelector("[data-janem-tv-cards]");
  if (!config || !player || !cards) return;

  const validId = (id) => /^[A-Za-z0-9_-]{11}$/.test(id || "");
  const videos = [{
    id: config.featuredVideoId,
    title: config.featuredVideoTitle || "Featured from JaneM TV",
    description: config.featuredVideoDescription || "Fashion inspiration and stories from the JaneM studio."
  }, ...config.videos];

  function showVideo(video) {
    title.textContent = video.title;
    description.textContent = video.description;
    player.replaceChildren();
    if (!validId(video.id)) {
      player.innerHTML = '<div class="janem-tv__unavailable"><span>JaneM TV</span><strong>Video details are being prepared.</strong><p>Visit the official channel to watch JaneM TV.</p></div>';
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(video.id);
    iframe.title = video.title + " — JaneM TV";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    player.append(iframe);
  }

  videos.slice(1, 4).forEach((video, index) => {
    const wrapper = document.createElement("article");
    const card = document.createElement("button");
    const hasVideo = validId(video.id);
    const watchUrl = hasVideo
      ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`
      : config.channelUrl;
    wrapper.className = "janem-tv-card-wrap";
    card.className = "janem-tv-card";
    card.type = "button";
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `<span class="janem-tv-card__image">${hasVideo ? `<img src="https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/hqdefault.jpg" loading="lazy" alt="Thumbnail for ${video.title}" />` : '<span class="janem-tv-card__fallback" aria-hidden="true"></span>'}<span class="janem-tv-card__play" aria-hidden="true">Play</span></span><span class="janem-tv-card__copy"><strong>${video.title}</strong><span>${video.description}</span></span>`;
    card.addEventListener("click", () => {
      showVideo(video);
      cards.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
      card.setAttribute("aria-pressed", "true");
      player.closest(".janem-tv-feature").scrollIntoView({ behavior: "smooth", block: "start" });
      window.JaneMAnalytics?.track("janem_tv_video_select", { position: index + 1, video_id: video.id || "unconfigured" });
    });
    const watchLink = document.createElement("a");
    watchLink.className = "janem-tv-card__youtube-link";
    watchLink.href = watchUrl;
    watchLink.target = "_blank";
    watchLink.rel = "noopener noreferrer";
    watchLink.textContent = "Watch on YouTube";
    wrapper.append(card, watchLink);
    cards.append(wrapper);
  });

  document.querySelectorAll("[data-janem-tv-channel]").forEach((link) => { link.href = config.channelUrl; });
  showVideo(videos[0]);
}());
