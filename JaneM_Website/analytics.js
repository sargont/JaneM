(function initialiseGoogleTags() {
  let initialized = false;

  function appendScript(source) {
    const script = document.createElement("script");
    script.async = true;
    script.src = source;
    document.head.appendChild(script);
  }

  function registerTags() {
    if (initialized) return;
    const measurementId = window.JaneMConfig?.googleAnalyticsMeasurementId?.trim();
    const containerId = window.JaneMConfig?.googleTagManagerContainerId?.trim();
    const hasGA4 = /^G-[A-Z0-9]+$/i.test(measurementId || "");
    const hasGTM = /^GTM-[A-Z0-9]+$/i.test(containerId || "");
    if (!hasGA4 && !hasGTM) return;

    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    if (hasGTM) {
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      appendScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(containerId));
      return;
    }
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
    appendScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId));
  }

  window.addEventListener("janemcontentready", registerTags, { once: true });
  registerTags();
}());
