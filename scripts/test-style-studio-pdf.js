const assert = require("node:assert/strict");
const { buildStyleBriefPdf } = require("../JaneM_Website/style-studio/brief-pdf.js");

const pdf = buildStyleBriefPdf({
  reference: "JM-ABCDE", profile: "The Refined Original", createdAt: "2026-08-16T10:00:00.000Z",
  summary: "A tailored, considered occasion-wear direction.",
  clientPreferences: { Occasion: "Graduation", "Event timing": "1–3 months away", "Style personality": "Elegant", "Reference-photo status": "Not provided" },
  styleRecommendation: { "Design direction": "A refined A-line direction.", "Indicative workmanship range": "M3,000–M4,800" },
  measurements: { Bust: "92 cm", Waist: "74 cm" },
  collectionSuggestions: [{ name: "Golden Hour" }],
  atelierDecisions: { "Final measurements": "Verify during fitting.", "Final quotation": "Confirm after fabric selection." },
  disclaimer: "Jane.M confirms every final construction detail before production."
}, { whatsApp: "+266 6279 0946" });

assert.match(pdf, /^%PDF-1\.4/, "The brief download must be a valid PDF document, not text or a screenshot.");
assert.match(pdf, /PRIVATE CONSULTATION BRIEF/);
assert.match(pdf, /YOUR PERSONAL STYLE DIRECTION/);
assert.match(pdf, /JM-ABCDE/);
assert.match(pdf, /Client-provided measurements are a private starting point/);
assert.match(pdf, /FITTING VERIFICATION/);
assert.match(pdf, /Golden Hour/);
assert.match(pdf, /Maseru, Lesotho/);
assert.match(pdf, /officialjanem@gmail\.com/);
assert.match(pdf, /Times-Italic/);
assert.match(pdf, /xref/);

const longPdf = buildStyleBriefPdf({
  reference: "JM-LONG1", profile: "The Extended Brief", summary: "A long-form consultation record.",
  clientPreferences: { "Additional notes": "Comfort, movement and finish should be considered carefully. ".repeat(130) },
  styleRecommendation: { "Design direction": "A considered direction." }, measurements: { status: "Deferred" },
  atelierDecisions: { "Final quotation": "Confirm during consultation." }, disclaimer: "Jane.M will confirm final details."
});
assert.match(longPdf, /\/Count [2-9]/, "Long notes must flow to multiple A4 PDF pages.");
console.log("Style Studio PDF brief generation test passed.");
