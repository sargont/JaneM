(function restrictCatalogueAccess() {
  const dialog = document.querySelector(".catalogue-access-dialog");
  const controls = document.querySelectorAll("[data-catalogue-restricted]");
  if (!controls.length) return;

  controls.forEach((control) => control.addEventListener("click", (event) => {
    event.preventDefault();
    window.JaneMAnalytics?.track("catalogue_access_restricted", { source: window.location.pathname });
    if (dialog?.showModal) dialog.showModal();
    else window.location.href = "catalogue.html#catalogue-access";
  }));

  dialog?.querySelector(".catalogue-access-dialog__close")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}());
