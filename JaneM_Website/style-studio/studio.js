(() => {
  const WHATSAPP_NUMBER = "26662790946";
  const QUESTION_NAMES = ["occasion", "urgency", "personality", "fit", "garmentLength", "coverage", "colour", "budget"];
  const { fields: measurementFields, assessMeasurements } = window.JaneMMeasurementReview;
  const form = document.getElementById("quickForm");
  const steps = [...document.querySelectorAll(".studio-step")];
  const nextButton = document.getElementById("nextButton");
  const backButton = document.getElementById("backButton");
  const validationMessage = document.getElementById("validationMessage");
  const result = document.getElementById("result");
  const resultReference = document.getElementById("resultReference");
  const resultTitle = document.getElementById("result-title");
  const resultSummary = document.getElementById("resultSummary");
  const directionList = document.getElementById("directionList");
  const paletteTitle = document.getElementById("paletteTitle");
  const paletteStory = document.getElementById("paletteStory");
  const paletteSwatches = document.getElementById("paletteSwatches");
  const resultReasons = document.getElementById("resultReasons");
  const estimateValue = document.getElementById("estimateValue");
  const priceCopy = document.getElementById("priceCopy");
  const priceDrivers = document.getElementById("priceDrivers");
  const fabricRecommendation = document.getElementById("fabricRecommendation");
  const detailRecommendation = document.getElementById("detailRecommendation");
  const complexityCategory = document.getElementById("complexityCategory");
  const complexityDrivers = document.getElementById("complexityDrivers");
  const complexityCopy = document.getElementById("complexityCopy");
  const quickWhatsApp = document.getElementById("quickWhatsApp");
  const mobileWhatsApp = document.getElementById("mobileWhatsApp");
  const shareButton = document.getElementById("shareButton");
  const downloadCardButton = document.getElementById("downloadCardButton");
  const shareFeedback = document.getElementById("shareFeedback");
  const openAdvanced = document.getElementById("openAdvanced");
  const advancedForm = document.getElementById("advancedForm");
  const createBrief = document.getElementById("createBrief");
  const previewConcept = document.getElementById("previewConcept");
  const conceptBoard = document.getElementById("conceptBoard");
  const briefPreview = document.getElementById("briefPreview");
  const copyBrief = document.getElementById("copyBrief");
  const downloadBrief = document.getElementById("downloadBrief");
  const detailedHandoff = document.getElementById("detailedHandoff");
  const detailedWhatsApp = document.getElementById("detailedWhatsApp");
  const includeMeasurements = document.getElementById("includeMeasurements");
  const includeSensitive = document.getElementById("includeSensitive");
  const briefFeedback = document.getElementById("briefFeedback");
  const referencePhoto = document.getElementById("referencePhoto");
  const photoStatus = document.getElementById("photoStatus");
  const captureMeasurements = document.getElementById("captureMeasurements");
  const measurementFlow = document.getElementById("measurementFlow");
  const measurementReview = document.getElementById("measurementReview");
  const measurementValidationStatus = document.getElementById("measurementValidationStatus");
  const measurementRangeMessage = document.getElementById("measurementRangeMessage");
  const measurementConsistencyMessage = document.getElementById("measurementConsistencyMessage");
  const measurementReviewList = document.getElementById("measurementReviewList");
  const editMeasurements = document.getElementById("editMeasurements");
  const keepMeasurements = document.getElementById("keepMeasurements");
  const guidePrevious = document.getElementById("guidePrevious");
  const guideNext = document.getElementById("guideNext");
  const guideCount = document.getElementById("guideCount");
  const restartButton = document.getElementById("restartButton");
  const clearSavedButton = document.getElementById("clearSavedButton");
  const track = (event, details = {}) => window.JaneMAnalytics?.track(event, details);
  const { recommend, interpretDesign } = window.JaneMStyleRecommendations;
  let step = 0;
  let started = false;
  let current = null;
  let guideIndex = 0;
  let measurementReviewConfirmed = false;
  let pendingMeasurementAction = null;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const compact = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const publicStudioUrl = () => document.querySelector('link[rel="canonical"]')?.href || "https://sargont.github.io/JaneM/style-studio/";
  const answer = name => form.querySelector(`[name="${name}"]:checked`)?.value || "";
  const answers = () => Object.fromEntries(QUESTION_NAMES.map(name => [name, answer(name)]));
  const shortSilhouette = (value) => ({ "fluid A-line with soft movement": "Fluid A-line", "contoured fit-and-flare with a defined waist": "Fit-and-flare", "sculpted column with a clean vertical line": "Sculpted column", "structured full-skirt silhouette with a focused waist": "Structured full skirt", "balanced A-line with a softly defined waist": "Balanced A-line" }[value] || value);
  const shortNeckline = value => compact(value).replace(/ neckline$/i, "").replace(/^(soft|clean|balanced|refined)\s+/i, "");
  const shortSleeve = value => compact(value).replace(/ direction$/i, "").replace(/^(elegant|sleek)\s+/i, "");

  function updateStep() {
    steps.forEach((item, index) => { item.hidden = index !== step; item.classList.toggle("is-active", index === step); });
    const labels = ["Your occasion", "Your style energy", "Coverage and colour", "Your starting point"];
    document.getElementById("stepLabel").textContent = `Step ${step + 1} of ${steps.length}`;
    document.getElementById("stepPrompt").textContent = labels[step];
    document.getElementById("progressStatus").textContent = `Step ${step + 1} of ${steps.length}: ${labels[step]}`;
    document.getElementById("progressBar").style.width = `${((step + 1) / steps.length) * 100}%`;
    backButton.disabled = step === 0;
    nextButton.textContent = step === steps.length - 1 ? "Reveal My Style Match" : "Next";
    validationMessage.hidden = true;
    steps[step].querySelector("input")?.focus({ preventScroll: true });
  }

  function validateCurrentStep() {
    const missing = [...steps[step].querySelectorAll("[data-required]")].filter(group => !group.querySelector("input:checked"));
    [...steps[step].querySelectorAll("[data-required]")].forEach(group => group.removeAttribute("aria-invalid"));
    if (!missing.length) { validationMessage.hidden = true; return true; }
    missing.forEach(group => group.setAttribute("aria-invalid", "true"));
    validationMessage.hidden = false;
    missing[0].querySelector("input")?.focus();
    return false;
  }

  function resultInterpretation() {
    return interpretDesign(current.data, advancedValues(), current.recommendation);
  }
  function whyItSuits(interpretation) {
    const { data, recommendation } = current;
    const detail = advancedValues();
    const neckline = shortNeckline(detail.neckline || recommendation.neckline);
    const sleeve = shortSleeve(detail.sleeves || recommendation.sleeves);
    const occasionCopy = data.occasion === "Graduation" ? "provides presence without competing with graduation regalia" : `creates an intentional proportion for ${data.occasion.toLowerCase()}`;
    const detailReason = interpretation.recommendation["Recommended detail placement"].replace(/ rather than.*$/i, "").replace(/^Keep /, "");
    return [
      `The ${recommendation.length} and ${shortSilhouette(recommendation.silhouette).toLowerCase()} ${occasionCopy}.`,
      `The ${neckline.toLowerCase()} neckline and ${sleeve.toLowerCase()} remain composed and photograph beautifully.`,
      `${detailReason.charAt(0).toUpperCase()}${detailReason.slice(1)}.`
    ];
  }
  function renderConsultationCore() {
    if (!current) return;
    const interpretation = resultInterpretation();
    const { recommendation, data } = current;
    const detail = advancedValues();
    resultSummary.textContent = interpretation.recommendation["Design direction"];
    const specification = [
      ["Silhouette", shortSilhouette(recommendation.silhouette)],
      ["Neckline", shortNeckline(detail.neckline || recommendation.neckline)],
      ["Sleeve", shortSleeve(detail.sleeves || recommendation.sleeves)],
      ["Length", data.garmentLength === "No preference / advise me" ? recommendation.length : data.garmentLength],
      ["Colour direction", recommendation.palette.colours.map(([name]) => name).join(", ")],
      ["Fabric direction", recommendation.fabric]
    ];
    directionList.innerHTML = specification.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
    paletteTitle.textContent = recommendation.palette.name;
    paletteStory.textContent = recommendation.palette.story;
    paletteSwatches.innerHTML = recommendation.palette.colours.map(([name, colour]) => `<div class="palette-swatch"><span style="--colour:${escapeHtml(colour)}"></span><span>${escapeHtml(name)}</span></div>`).join("");
    resultReasons.innerHTML = whyItSuits(interpretation).map(reason => `<li>${escapeHtml(reason)}</li>`).join("");
    estimateValue.textContent = recommendation.workmanship;
    priceCopy.textContent = "Your final quote is tailored to your chosen fabric, detailing and construction.";
    const pricingDrivers = [...interpretation.construction.drivers, "final fabric selection", "fitting and finishing requirements"].slice(0, 5);
    priceDrivers.innerHTML = pricingDrivers.map(driver => `<li>${escapeHtml(driver)}</li>`).join("");
    fabricRecommendation.textContent = interpretation.recommendation["Recommended fabric behaviour"];
    detailRecommendation.textContent = interpretation.recommendation["Recommended detail placement"];
    complexityCategory.textContent = interpretation.recommendation["Construction complexity"];
    complexityDrivers.innerHTML = interpretation.construction.drivers.map(driver => `<li>${escapeHtml(driver)}</li>`).join("");
    complexityCopy.textContent = "Complexity is based on silhouette, structure, detailing and finishing.";
  }
  function renderResult() {
    const data = answers();
    const recommendation = recommend(data);
    current = { data, recommendation };
    resultReference.textContent = `Reference: ${recommendation.id}`;
    resultTitle.textContent = recommendation.profile;
    renderConsultationCore();
    quickWhatsApp.href = whatsappLink(quickMessage());
    mobileWhatsApp.href = quickWhatsApp.href;
    result.hidden = false;
    document.getElementById("studioApp").hidden = true;
    track("style_studio_result_view", { occasion_category: data.occasion, style_profile_id: recommendation.id, completion_state: "quick" });
    window.requestAnimationFrame(() => result.focus({ preventScroll: true }));
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function quickMessage() {
    const { data, recommendation } = current;
    return [
      "Hello JaneM, I completed the JaneM Style Studio and would love to refine this look.", "",
      `Reference: ${recommendation.id}`,
      `Occasion: ${data.occasion}`,
      `Event timing: ${data.urgency}`,
      `Style profile: ${recommendation.profile}`,
      `Recommended silhouette: ${recommendation.silhouette}`,
      `Preferred garment length: ${data.garmentLength}`,
      `Recommended length: ${recommendation.length}`,
      `Recommended colour: ${recommendation.palette.colour}`,
      `Coverage preference: ${data.coverage}`,
      `Budget range: ${data.budget}`,
      `Indicative workmanship range: ${recommendation.workmanship}`,
      `Summary: ${recommendation.summary}`,
      "", "Can JaneM help me refine this look?"
    ].join("\n");
  }
  const whatsappLink = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  function publicShareText() {
    const { recommendation } = current;
    return [
      `My JaneM Style Profile: ${recommendation.profile}`,
      recommendation.summary.replace(/for (a |an )?[^:]+: /i, ""),
      `Silhouette: ${recommendation.silhouette}`,
      `Colour story: ${recommendation.palette.name}`,
      "Discover your own JaneM Style Match:", publicStudioUrl()
    ].join("\n");
  }
  async function copyText(value) {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); return; }
    const area = document.createElement("textarea");
    area.value = value; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
    document.body.append(area); area.select();
    const didCopy = document.execCommand("copy"); area.remove();
    if (!didCopy) throw new Error("Copy unavailable");
  }
  async function shareProfile() {
    if (!current) return;
    const text = publicShareText();
    try {
      if (navigator.share) {
        await navigator.share({ title: `JaneM Style Profile — ${current.recommendation.profile}`, text, url: publicStudioUrl() });
        shareFeedback.textContent = "Your privacy-safe Style Profile is ready to share.";
        track("style_studio_share", { method: "native", style_profile_id: current.recommendation.id });
      } else {
        await copyText(text);
        shareFeedback.textContent = "Your privacy-safe Style Profile and link have been copied.";
        track("style_studio_share", { method: "copy", style_profile_id: current.recommendation.id });
      }
    } catch (error) {
      if (error.name === "AbortError") { shareFeedback.textContent = "Sharing was cancelled."; return; }
      try {
        await copyText(text);
        shareFeedback.textContent = "Sharing is not available here, so your Style Profile and link have been copied.";
        track("style_studio_share", { method: "copy", style_profile_id: current.recommendation.id });
      } catch { shareFeedback.textContent = "Your browser could not share or copy this profile. You can still copy the public link from your browser."; }
    }
  }

  function resultCardSvg() {
    const { recommendation } = current;
    const lines = [recommendation.summary, `Silhouette: ${recommendation.silhouette}`].map(text => compact(text).match(/.{1,55}(?:\s|$)|.{1,55}/g) || []);
    const descriptionLines = lines[0].slice(0, 3);
    const silhouetteLines = lines[1].slice(0, 2);
    const colours = recommendation.palette.colours.map(([, colour], index) => `<rect x="${112 + index * 74}" y="535" width="56" height="56" fill="${colour}"/>`).join("");
    const textNodes = descriptionLines.map((line, index) => `<text x="112" y="${332 + index * 30}" class="body">${escapeHtml(line.trim())}</text>`).join("") + silhouetteLines.map((line, index) => `<text x="112" y="${445 + index * 30}" class="body">${escapeHtml(line.trim())}</text>`).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="720" viewBox="0 0 1080 720"><style>.eyebrow{font:700 16px Arial,sans-serif;letter-spacing:4px}.title{font:600 67px Georgia,serif}.body{font:400 22px Arial,sans-serif}.small{font:700 15px Arial,sans-serif;letter-spacing:2px}</style><rect width="1080" height="720" fill="#15120f"/><circle cx="930" cy="105" r="230" fill="#b38a45" opacity=".16"/><text x="112" y="116" fill="#e0bd7d" class="eyebrow">JANE.M STYLE STUDIO</text><text x="112" y="213" fill="#fff" class="title">${escapeHtml(recommendation.profile)}</text><text x="112" y="269" fill="#d9cfc5" class="small">YOUR PERSONAL STYLE DIRECTION</text>${textNodes}<text x="112" y="505" fill="#e0bd7d" class="small">COLOUR STORY · ${escapeHtml(recommendation.palette.name.toUpperCase())}</text>${colours}<text x="112" y="654" fill="#d9cfc5" class="body">Try Style Studio · ${escapeHtml(publicStudioUrl())}</text></svg>`;
  }
  function downloadStyleCard() {
    if (!current) return;
    const blob = new Blob([resultCardSvg()], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `JaneM-${current.recommendation.id}-Style-Profile.svg`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    shareFeedback.textContent = "Your privacy-safe Style Profile card has downloaded.";
    track("style_studio_share", { method: "download_card", style_profile_id: current.recommendation.id });
  }

  function advancedValues() {
    const formData = new FormData(advancedForm);
    const fields = ["neckline", "sleeves", "fabric", "embellishment", "features", "notes", "measureUnit", ...measurementFields.map(([, name]) => name)];
    const values = Object.fromEntries(fields.map(name => [name, compact(formData.get(name))]));
    values.captureMeasurements = captureMeasurements.checked;
    return values;
  }
  function renderMeasurementReview(assessment) {
    measurementRangeMessage.hidden = assessment.rangeFlags.length === 0;
    measurementConsistencyMessage.hidden = assessment.consistencyFlags.length === 0;
    measurementReviewList.innerHTML = [...assessment.rangeFlags, ...assessment.consistencyFlags].map(item => `<li>${escapeHtml(item)}</li>`).join("");
    measurementReview.hidden = !assessment.isQuestionable || measurementReviewConfirmed;
  }
  function updateMeasurementValidation({ reveal = false } = {}) {
    const detail = advancedValues();
    const assessment = assessMeasurements(detail);
    const names = measurementFields.map(([, name]) => name);
    names.forEach(name => {
      const input = advancedForm.querySelector(`[name="${name}"]`);
      const label = input?.closest("label");
      const requiresReview = detail.captureMeasurements && assessment.affectedNames.has(name);
      if (input) {
        if (requiresReview) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }
      label?.classList.toggle("is-invalid", requiresReview && !measurementReviewConfirmed);
      label?.classList.toggle("requires-review", requiresReview && measurementReviewConfirmed);
    });
    if (!detail.captureMeasurements) {
      measurementValidationStatus.textContent = "Measurements are optional. If you add them, we will check them for common entry errors before you create your brief.";
      measurementReview.hidden = true;
      return assessment;
    }
    if (!assessment.hasValues) {
      measurementValidationStatus.textContent = "Enter the figures you know. You can leave any measurement you do not have blank.";
      measurementReview.hidden = true;
      return assessment;
    }
    if (assessment.isQuestionable) {
      const items = [...assessment.rangeFlags, ...assessment.consistencyFlags].join(", ");
      measurementValidationStatus.textContent = measurementReviewConfirmed
        ? `Marked for JaneM to verify: ${items}. These values will be clearly labelled in the brief.`
        : `Review required before creating a detailed brief: ${items}.`;
      if (reveal || !measurementReviewConfirmed) renderMeasurementReview(assessment);
      return assessment;
    }
    measurementValidationStatus.textContent = "Measurements look consistent with the selected unit. JaneM will verify every final measurement at fitting.";
    measurementReview.hidden = true;
    return assessment;
  }
  function ensureMeasurementsReviewed(continuation) {
    const assessment = updateMeasurementValidation({ reveal: true });
    if (!assessment.isQuestionable || measurementReviewConfirmed) return true;
    pendingMeasurementAction = continuation;
    renderMeasurementReview(assessment);
    measurementReview.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    return false;
  }
  function measurements(detail, assessment = assessMeasurements(detail)) {
    if (!detail.captureMeasurements) return { status: "Deferred — JaneM will take and verify measurements during fitting." };
    const unit = detail.measureUnit || "cm";
    const supplied = measurementFields.filter(([, name]) => detail[name]).map(([label, name]) => {
      const requiresVerification = assessment.affectedNames.has(name);
      return [label, `${detail[name]} ${unit}${requiresVerification ? " — customer-provided, requires verification" : ""}`];
    });
    if (!supplied.length) return { status: "No figures added yet — JaneM will take and verify measurements during fitting." };
    if (assessment.isQuestionable) supplied.push(["Measurement status", "Customer-provided figures require verification before construction."]);
    return Object.fromEntries(supplied);
  }
  function definitionList(values) {
    return `<dl>${Object.entries(values).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>`;
  }
  function designerBrief(detail = advancedValues()) {
    const { data, recommendation } = current;
    const assessment = assessMeasurements(detail);
    const interpretation = interpretDesign(data, { ...detail, referencePhotoStatus: referencePhoto.files?.[0] ? "Selected on this device — client may attach it manually in WhatsApp." : "Not provided" }, recommendation);
    return {
      reference: recommendation.id,
      profile: recommendation.profile,
      clientPreferences: interpretation.clientPreferences,
      styleRecommendation: interpretation.recommendation,
      construction: interpretation.construction,
      atelierDecisions: interpretation.atelierDecisions,
      whatsapp: interpretation.whatsapp,
      featureInfo: interpretation.featureInfo,
      measurements: measurements(detail, assessment),
      measurementAssessment: assessment,
      summary: recommendation.summary,
      disclaimer: "Starting brief for consultation. Jane.M confirms measurements, construction, fabric, availability and final quotation before production."
    };
  }
  function buildVisualizationPrompt(brief, assessment) {
    return [
      "Create a Jane.M atelier consultation concept board for a single occasion-wear garment.",
      `Direction: ${brief.styleRecommendation["Design direction"]}`,
      `Fabric behaviour: ${brief.styleRecommendation["Recommended fabric behaviour"]}`,
      `Detail placement: ${brief.styleRecommendation["Recommended detail placement"]}`,
      `The garment length must be ${brief.clientPreferences["Preferred garment length"]}.`,
      "Show front, back, and a construction/detail view of the exact same garment, with consistent fabric, colour, silhouette and embellishment.",
      "Customer measurements are provisional and Jane.M will verify them during consultation.",
      assessment.isQuestionable ? "Measurements need verification: use realistic generic proportions and do not distort the model or garment for implausible figures." : "Use balanced fashion proportions; do not treat customer figures as final construction measurements.",
      "This is a visual direction only, not a final pattern, fit confirmation or production design."
    ].join("\n");
  }
  function saveStyleStudioResult(resultData) {
    // Future integration: POST /api/style-studio/results with the structured brief, selected options and verification state.
    // This static version intentionally performs no network request or browser storage and never includes photo files.
    void resultData;
    return { saved: false };
  }
  function briefText(brief) {
    const section = (title, values) => `${title.toUpperCase()}\n${Object.entries(values).map(([label, value]) => `${label}: ${value}`).join("\n")}`;
    return [
      `JANE.M DESIGNER BRIEF — ${brief.profile}`,
      `Reference: ${brief.reference}`,
      "", section("Section A — Client preferences", brief.clientPreferences), "", section("Measurements supplied", brief.measurements), "",
      section("Section B — Jane.M Style Studio recommendation", brief.styleRecommendation), "",
      section("Section C — To confirm with Jane.M", brief.atelierDecisions), "", brief.disclaimer
    ].join("\n");
  }
  function renderBrief(brief) {
    briefPreview.innerHTML = `<div class="designer-brief__head"><p class="panel-kicker">Reference: ${escapeHtml(brief.reference)}</p><h4>${escapeHtml(brief.profile)}</h4><p>${escapeHtml(brief.disclaimer)}</p></div><div class="designer-brief__body"><section class="designer-brief__section designer-brief__section--full"><h5>Section A — Client preferences</h5>${definitionList(brief.clientPreferences)}</section><section class="designer-brief__section designer-brief__section--full"><h5>Measurements supplied</h5>${definitionList(brief.measurements)}</section><section class="designer-brief__section designer-brief__section--full"><h5>Section B — Jane.M Style Studio recommendation</h5>${definitionList(brief.styleRecommendation)}</section><section class="designer-brief__section designer-brief__section--full"><h5>Section C — To confirm with Jane.M</h5>${definitionList(brief.atelierDecisions)}</section></div>`;
    briefPreview.hidden = false;
  }
  function conceptPreview() {
    if (!current || !ensureMeasurementsReviewed(conceptPreview)) return;
    const detail = advancedValues();
    const brief = designerBrief(detail);
    const r = current.recommendation;
    const line = brief.styleRecommendation["Design direction"];
    const verificationNote = brief.measurementAssessment.isQuestionable ? `<p class="concept-measurement-note"><strong>Measurements need verification.</strong><br>Some measurements appear inconsistent, so they were not used to proportion this concept. Jane.M will confirm measurements during consultation.</p>` : "";
    conceptBoard.innerHTML = `<div class="concept-board__visual"><img src="../assets/style-studio/mock-design-concept.png" width="2000" height="795" alt="JaneM atelier visual mood reference"><div class="concept-board__caption"><p class="panel-kicker">Visual look preview</p><h4>${escapeHtml(r.profile)}</h4><p>A visual mood reference for your consultation—not a final garment design.</p></div></div><div><p class="panel-kicker">Your look direction</p><h4>${escapeHtml(r.palette.name)}</h4><p>${escapeHtml(line)}</p><p><strong>Detail placement:</strong> ${escapeHtml(brief.styleRecommendation["Recommended detail placement"])}</p>${verificationNote}<div class="concept-colours">${r.palette.colours.map(([, colour]) => `<span style="--colour:${escapeHtml(colour)}"></span>`).join("")}</div></div>`;
    current.visualizationPrompt = buildVisualizationPrompt(brief, brief.measurementAssessment);
    conceptBoard.hidden = false;
    briefFeedback.textContent = "Your visual look preview is ready. It stays on this device and is a consultation direction, not a final garment design.";
  }
  function detailedMessage() {
    const detail = advancedValues();
    const brief = designerBrief(detail);
    const preferences = brief.clientPreferences;
    const recommendation = brief.styleRecommendation;
    const whatsappRecommendation = brief.whatsapp;
    const additionalNotes = includeSensitive.checked ? preferences["Additional notes"] : "Not shared";
    const sharedMeasurements = includeMeasurements.checked
      ? Object.entries(brief.measurements).map(([label, value]) => `${label}: ${value}`)
      : ["Status: Not shared in WhatsApp — JaneM will take and verify measurements during fitting."];
    return [
      "Hello JaneM, I completed the Detailed Designer Brief from Style Studio.", "",
      `Reference: ${brief.reference}`, "",
      "CLIENT PREFERENCES",
      `Occasion: ${preferences.Occasion}`,
      `Timing: ${preferences["Event timing"]}`,
      `Style personality: ${preferences["Style personality"]}`,
      `Coverage: ${preferences["Coverage preference"]}`,
      `Budget: ${preferences["Budget range"]}`,
      `Length: ${preferences["Preferred garment length"]}`,
      `Neckline: ${preferences["Neckline preference"]}`,
      `Sleeve: ${preferences["Sleeve preference"]}`,
      `Fabric: ${preferences["Fabric preference"]}`,
      `Embellishment: ${preferences.Embellishment}`,
      `Specific design features: ${preferences["Specific design features"]}`,
      `Additional client note: ${preferences["Additional client note"]}`,
      `Additional notes: ${additionalNotes}`,
      `Reference-photo status: ${preferences["Reference-photo status"]}`,
      "", "MEASUREMENTS",
      ...sharedMeasurements,
      "", "STYLE STUDIO RECOMMENDATION",
      `Design direction: ${whatsappRecommendation["Design direction"]}`,
      `Why it works: ${whatsappRecommendation["Why it works"]}`,
      `Recommended fabric behaviour: ${whatsappRecommendation["Fabric behaviour"]}`,
      `Recommended detail placement: ${whatsappRecommendation["Detail placement"]}`,
      `Complexity: ${recommendation["Construction complexity"]} (${recommendation["Main complexity drivers"]})`,
      `Indicative workmanship range: ${recommendation["Indicative workmanship range"]}`,
      `Pricing drivers: ${whatsappRecommendation["Pricing drivers"]}`,
      "", "TO CONFIRM WITH JANE.M",
      "- Measurement verification", "- Final fabric", "- Construction and detail placement", "- Fittings", "- Final quotation",
      "", "Can JaneM help me refine this look?"
    ].join("\n");
  }
  function updateDetailedLink() { if (current) detailedWhatsApp.href = whatsappLink(detailedMessage()); }
  function createDetailedBrief() {
    if (!current || !ensureMeasurementsReviewed(createDetailedBrief)) return;
    const brief = designerBrief();
    renderBrief(brief);
    saveStyleStudioResult({ reference: brief.reference, clientPreferences: brief.clientPreferences, styleRecommendation: brief.styleRecommendation, construction: brief.construction, atelierDecisions: brief.atelierDecisions, measurements: brief.measurements, verificationRequired: brief.measurementAssessment.isQuestionable, visualizationPrompt: buildVisualizationPrompt(brief, brief.measurementAssessment) });
    detailedHandoff.hidden = false;
    copyBrief.hidden = false;
    downloadBrief.hidden = false;
    updateDetailedLink();
    briefFeedback.textContent = "Your detailed brief is ready to review, copy or download. Review the consent note before sending anything sensitive.";
    track("style_studio_brief_complete", { style_profile_id: current.recommendation.id, completion_state: "advanced" });
    detailedHandoff.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  }
  function syncMeasurementFlow() {
    measurementFlow.hidden = !captureMeasurements.checked;
    if (!captureMeasurements.checked) guideIndex = 0;
    showGuide(guideIndex);
  }
  function showGuide(index) {
    const slides = [...document.querySelectorAll(".guide-slide")];
    guideIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== guideIndex; slide.classList.toggle("is-active", slideIndex === guideIndex); });
    guidePrevious.disabled = guideIndex === 0;
    guideNext.disabled = guideIndex === slides.length - 1;
    guideCount.textContent = `${guideIndex + 1} of ${slides.length}`;
  }
  function resetMeasurementReview() {
    measurementReviewConfirmed = false;
    pendingMeasurementAction = null;
    measurementReview.hidden = true;
  }
  function refreshCreatedBrief() {
    if (current) renderConsultationCore();
    if (!briefPreview.hidden && current) renderBrief(designerBrief());
    if (!detailedHandoff.hidden) updateDetailedLink();
  }

  form.addEventListener("change", event => {
    if (!QUESTION_NAMES.includes(event.target.name)) return;
    if (!started) { started = true; track("style_studio_start"); }
    validationMessage.hidden = true;
    event.target.closest("[data-required]")?.removeAttribute("aria-invalid");
  });
  nextButton.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    const data = answers();
    track("style_studio_step_complete", { step_number: step + 1, occasion_category: data.occasion || "not_set" });
    if (step === steps.length - 1) { renderResult(); return; }
    step += 1; updateStep();
  });
  backButton.addEventListener("click", () => { if (step > 0) { step -= 1; updateStep(); } });
  quickWhatsApp.addEventListener("click", () => { if (current) track("style_studio_whatsapp_click", { cta_location: "quick_result", style_profile_id: current.recommendation.id }); });
  mobileWhatsApp.addEventListener("click", () => { if (current) track("style_studio_whatsapp_click", { cta_location: "mobile_result", style_profile_id: current.recommendation.id }); });
  shareButton.addEventListener("click", shareProfile);
  downloadCardButton.addEventListener("click", downloadStyleCard);
  openAdvanced.addEventListener("click", () => {
    const isOpen = !advancedForm.hidden;
    advancedForm.hidden = isOpen; openAdvanced.setAttribute("aria-expanded", String(!isOpen));
    openAdvanced.textContent = isOpen ? "Build Detailed Designer Brief" : "Close detailed brief tools";
    if (!isOpen && current) { track("style_studio_advanced_start", { style_profile_id: current.recommendation.id }); requestAnimationFrame(() => advancedForm.scrollIntoView({ behavior: "auto", block: "start" })); advancedForm.querySelector("select")?.focus({ preventScroll: true }); }
  });
  previewConcept.addEventListener("click", conceptPreview);
  createBrief.addEventListener("click", createDetailedBrief);
  copyBrief.addEventListener("click", async () => {
    if (!current) return;
    try { await copyText(briefText(designerBrief())); briefFeedback.textContent = "Your detailed designer brief has been copied."; }
    catch { briefFeedback.textContent = "Your browser could not copy the brief. You can still download it."; }
  });
  downloadBrief.addEventListener("click", () => {
    if (!current) return;
    const blob = new Blob([briefText(designerBrief())], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `JaneM-${current.recommendation.id}-Designer-Brief.txt`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    briefFeedback.textContent = "Your detailed designer brief has downloaded.";
  });
  [includeMeasurements, includeSensitive].forEach(control => control.addEventListener("change", updateDetailedLink));
  captureMeasurements.addEventListener("change", () => { resetMeasurementReview(); syncMeasurementFlow(); updateMeasurementValidation(); refreshCreatedBrief(); });
  ["input", "change"].forEach(type => advancedForm.addEventListener(type, event => {
    if (["measureUnit", ...measurementFields.map(([, name]) => name)].includes(event.target.name)) { resetMeasurementReview(); updateMeasurementValidation({ reveal: type === "change" }); }
    refreshCreatedBrief();
  }));
  editMeasurements.addEventListener("click", () => {
    const assessment = assessMeasurements(advancedValues());
    const firstName = [...assessment.affectedNames][0];
    measurementReviewConfirmed = false;
    measurementReview.hidden = true;
    advancedForm.querySelector(`[name="${firstName || "bust"}"]`)?.focus();
  });
  keepMeasurements.addEventListener("click", () => {
    measurementReviewConfirmed = true;
    measurementReview.hidden = true;
    updateMeasurementValidation();
    const continuation = pendingMeasurementAction;
    pendingMeasurementAction = null;
    if (continuation) continuation();
  });
  guidePrevious.addEventListener("click", () => showGuide(guideIndex - 1));
  guideNext.addEventListener("click", () => showGuide(guideIndex + 1));
  detailedWhatsApp.addEventListener("click", () => { updateDetailedLink(); if (current) track("style_studio_whatsapp_click", { cta_location: "detailed_brief", style_profile_id: current.recommendation.id, sensitive_details_included: includeSensitive.checked ? "yes" : "no" }); });
  referencePhoto.addEventListener("change", () => { photoStatus.textContent = referencePhoto.files?.[0] ? `“${referencePhoto.files[0].name}” is selected only in this browser. It has not been uploaded.` : "A selected photograph stays on this device. It is not uploaded or included in a message; you can choose to attach it yourself in WhatsApp."; });
  restartButton.addEventListener("click", () => {
    form.reset(); advancedForm.reset(); current = null; step = 0; started = false; resetMeasurementReview();
    result.hidden = true; document.getElementById("studioApp").hidden = false; detailedHandoff.hidden = true; conceptBoard.hidden = true; briefPreview.hidden = true; copyBrief.hidden = true; downloadBrief.hidden = true; advancedForm.hidden = true;
    openAdvanced.setAttribute("aria-expanded", "false"); openAdvanced.textContent = "Build Detailed Designer Brief";
    photoStatus.textContent = "A selected photograph stays on this device. It is not uploaded or included in a message; you can choose to attach it yourself in WhatsApp.";
    syncMeasurementFlow();
    updateStep(); document.getElementById("quick-match").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
  clearSavedButton.hidden = true;

  syncMeasurementFlow();
  updateStep();
  track("style_studio_view", { cta_location: "page" });
})();
