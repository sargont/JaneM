const form = document.querySelector("#content-form");
const status = document.querySelector("#save-status");
const saveButton = document.querySelector("#save-button");

function setStatus(message, tone = "") {
  status.textContent = message;
  status.className = "status" + (tone ? " status--" + tone : "");
}

function getByPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function applyValues(content) {
  form.querySelectorAll("[name]").forEach((field) => {
    field.value = getByPath(content, field.name) || "";
  });
}

function contentFromForm() {
  const data = new FormData(form);
  return {
    analytics: {
      googleAnalyticsMeasurementId: data.get("analytics.googleAnalyticsMeasurementId"),
      googleTagManagerContainerId: data.get("analytics.googleTagManagerContainerId")
    },
    hero: { eyebrow: data.get("hero.eyebrow"), lead: data.get("hero.lead") },
    promotion: {
      discountText: data.get("promotion.discountText"),
      datesText: data.get("promotion.datesText"),
      description: data.get("promotion.description")
    },
    social: { youtube: data.get("social.youtube"), facebook: data.get("social.facebook"), instagram: data.get("social.instagram") },
    contact: { email: data.get("contact.email") },
    localSeo: {
      businessName: data.get("localSeo.businessName"), country: data.get("localSeo.country"), serviceArea: data.get("localSeo.serviceArea"),
      telephone: data.get("localSeo.telephone"), whatsApp: data.get("localSeo.whatsApp"), openingHours: data.get("localSeo.openingHours"), googleBusinessProfileUrl: data.get("localSeo.googleBusinessProfileUrl")
    }
  };
}

async function loadContent() {
  try {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load the local content file.");
    applyValues(await response.json());
    setStatus("Local content is ready.", "saved");
  } catch (error) {
    setStatus(error.message, "error");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  saveButton.disabled = true;
  setStatus("Saving locally…");
  try {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contentFromForm())
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not save content.");
    applyValues(payload);
    setStatus("Saved. Refresh the public website to see the change.", "saved");
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    saveButton.disabled = false;
  }
});

loadContent();
