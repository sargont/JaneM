(function initialisePrivacyFriendlyAnalytics() {
  const consentKey = "janem-analytics-consent";
  const hasConsent = () => window.localStorage?.getItem(consentKey) === "granted";
  const track = (event, detail = {}) => {
    window.dispatchEvent(new CustomEvent("janem:analytics", { detail: { event, ...detail } }));
    if (!hasConsent()) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...detail });
  };
  window.JaneMAnalytics = { track };

  function openConsent() {
    if (window.localStorage?.getItem(consentKey)) return;
    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Analytics privacy choice");
    banner.innerHTML = '<strong>Analytics choice</strong><p>Jane.M uses optional analytics to understand which pages and enquiries help visitors. No Google tags load unless you allow analytics.</p><div class="cookie-consent__actions"><button type="button" data-choice="granted">Allow analytics</button><button type="button" data-choice="denied">Keep essential only</button></div>';
    banner.addEventListener("click", (event) => {
      const choice = event.target.dataset.choice;
      if (!choice) return;
      window.localStorage?.setItem(consentKey, choice);
      banner.remove();
      if (choice === "granted") window.dispatchEvent(new CustomEvent("janemanalyticsconsent"));
    });
    document.body.append(banner);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a, button");
    if (!link) return;
    const explicit = link.dataset.analyticsEvent;
    if (explicit) track(explicit, { link_url: link.href || "" });
    else if (/wa\.me/.test(link.href || "")) track("whatsapp_click", { link_url: link.href });
    else if (/^tel:/.test(link.href || "")) track("phone_click", { link_url: link.href });
    else if (/catalogue\.pdf/.test(link.href || "")) track("catalogue_download", { link_url: link.href });
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
  openConsent();
}());
