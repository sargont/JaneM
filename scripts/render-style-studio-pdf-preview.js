const fs = require("node:fs");
const path = require("node:path");
const { buildStyleBriefPdf } = require("../JaneM_Website/style-studio/brief-pdf.js");

const output = path.resolve(process.argv[2] || "output/pdf/JaneM-Style-Brief-Preview.pdf");
const pdf = buildStyleBriefPdf({
  reference: "JM-PREVIEW",
  profile: "The Softly Defined",
  createdAt: "2026-08-16T10:00:00.000Z",
  summary: "A romantic direction for a memorable milestone: a contoured fit-and-flare with a defined waist, knee length, and a softly luminous colour story.",
  clientPreferences: {
    Occasion: "Graduation",
    "Event timing": "1-3 months away",
    "Style personality": "Romantic",
    "Preferred silhouette": "Defined waist",
    "Preferred garment length": "Knee length",
    "Reference-photo status": "Not provided"
  },
  styleRecommendation: {
    "Design direction": "A softly structured fit-and-flare with an elegant, defined waist.",
    Silhouette: "Contoured fit-and-flare with a defined waist",
    "Colour story": "Soft-light elegance: champagne, blush and warm ivory.",
    "Indicative workmanship range": "M3,000-M4,800"
  },
  construction: {
    "Fabric behaviour": "Satin or softly structured crepe with gentle movement.",
    "Detail placement": "Refined waist emphasis, clean neckline and understated finishing."
  },
  measurements: { Bust: "92 cm", Waist: "74 cm", Hip: "101 cm", "Dress length": "104 cm" },
  collectionSuggestions: [{ name: "Golden Hour" }, { name: "Classic Grace" }],
  atelierDecisions: {
    "Final measurements": "Verified during fitting.",
    "Fabric and trims": "Confirmed after consultation.",
    "Final quotation": "Issued once the final design and construction are agreed."
  },
  disclaimer: "This private Style Brief is a considered starting point. Jane.M confirms the final design, fit, fabric availability and quotation with you during consultation."
}, { whatsApp: "+266 6279 0946" });

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, pdf, "binary");
console.log(output);
