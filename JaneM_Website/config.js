window.JaneMConfig = { googleAnalyticsMeasurementId: "G-LZ7JHY0VQ8", googleTagManagerContainerId: "" };

(function loadManagedContent() {
  function valueAtPath(source, path) {
    return path.split(".").reduce((value, key) => value?.[key], source);
  }

  function applyContent(content) {
    document.querySelectorAll("[data-cms-text]").forEach((element) => {
      const value = valueAtPath(content, element.dataset.cmsText);
      if (typeof value === "string" && value) element.textContent = value;
    });
    document.querySelectorAll("[data-cms-href]").forEach((element) => {
      const value = valueAtPath(content, element.dataset.cmsHref);
      if (typeof value === "string" && value) element.href = value;
    });
    document.querySelectorAll("[data-cms-email]").forEach((element) => {
      const value = valueAtPath(content, element.dataset.cmsEmail);
      if (typeof value === "string" && value) {
        element.textContent = value;
        element.href = "mailto:" + value;
      }
    });
  }

  fetch("/api/public-content", { cache: "no-store" })
    .then((response) => response.ok ? response.json() : null)
    .then((content) => {
      if (!content) return;
      window.JaneMConfig = { ...window.JaneMConfig, ...content.analytics };
      applyContent(content);
      window.dispatchEvent(new CustomEvent("janemcontentready", { detail: content }));
    })
    .catch(() => {});
}());
