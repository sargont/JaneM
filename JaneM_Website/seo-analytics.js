(function initialisePrivacyFriendlyAnalytics() {
  const safeLinkUrl = (value) => {
    try {
      const url = new URL(value, window.location.href);
      // WhatsApp URLs may contain a visitor's free-text message. Never send it to analytics.
      if (url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com")) return url.origin + url.pathname;
      return url.origin === window.location.origin ? url.pathname : url.origin + url.pathname;
    } catch { return ""; }
  };
  const track = (event, detail = {}) => {
    window.dispatchEvent(new CustomEvent("janem:analytics", { detail: { event, ...detail } }));
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") window.gtag("event", event, detail);
    else window.dataLayer.push({ event, ...detail });
  };
  window.JaneMAnalytics = { track };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a, button");
    if (!link) return;
    const explicit = link.dataset.analyticsEvent;
    if (explicit) track(explicit, { link_url: safeLinkUrl(link.href) });
    else if (/wa\.me/.test(link.href || "")) track("whatsapp_click", { link_url: safeLinkUrl(link.href) });
    else if (/^tel:/.test(link.href || "")) track("phone_click", { link_url: safeLinkUrl(link.href) });
    else if (/catalogue\.pdf/.test(link.href || "")) track("catalogue_download", { link_url: safeLinkUrl(link.href) });
  });
  document.addEventListener("submit", (event) => {
    const type = event.target.dataset.formType;
    if (type) track(type + "_submit");
  });
  document.addEventListener("focusin", (event) => {
    const form = event.target.closest("form[data-form-type]");
    if (!form || form.dataset.analyticsStarted) return;
    form.dataset.analyticsStarted = "true";
    track(form.dataset.formType + "_start");
  });
  track("organic_landing_page", { path: window.location.pathname });
  if (/catalogue\.html$/.test(window.location.pathname)) track("catalogue_view");
  if (/\/collection\//.test(window.location.pathname)) track("individual_look_view");
}());
