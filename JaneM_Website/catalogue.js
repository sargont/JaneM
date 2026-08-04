(function initialiseCatalogueGallery() {
  const gallery = document.querySelector("[data-catalogue-gallery]");
  const dialog = document.querySelector(".catalogue-dialog");
  if (!gallery || !dialog) return;

  const image = dialog.querySelector(".catalogue-dialog__image");
  const caption = dialog.querySelector(".catalogue-dialog__caption");
  const closeButton = dialog.querySelector(".catalogue-dialog__close");
  const totalPages = 49;

  for (let page = 1; page <= totalPages; page += 1) {
    const pageNumber = String(page).padStart(2, "0");
    const pageTitle = "Catalogue page " + page + " of " + totalPages;
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    const preview = document.createElement("img");
    const label = document.createElement("span");

    button.type = "button";
    button.className = "catalogue-card";
    button.setAttribute("aria-label", "View " + pageTitle + " larger");
    preview.src = "assets/catalogue-pages/page-" + pageNumber + ".jpg";
    preview.alt = pageTitle + " from the Jane.M Graduation Collection 2026";
    preview.loading = page <= 6 ? "eager" : "lazy";
    preview.decoding = "async";
    preview.width = 720;
    preview.height = 1019;
    label.textContent = "Page " + pageNumber;

    button.append(preview, label);
    listItem.append(button);
    gallery.append(listItem);
  }

  gallery.addEventListener("click", (event) => {
    const button = event.target.closest(".catalogue-card");
    if (!button) return;
    const preview = button.querySelector("img");
    image.src = preview.src;
    image.alt = preview.alt;
    caption.textContent = button.querySelector("span").textContent + " - Jane.M Graduation Collection 2026";
    window.JaneMAnalytics?.track("catalogue_view", { catalogue_page: button.getAttribute("aria-label") });
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}());
