const assert = require("node:assert/strict");
const { buildStyleCardSvg } = require("../JaneM_Website/style-studio/style-card.js");

const card = buildStyleCardSvg({
  recommendation: {
    profile: "The Softly Defined",
    summary: "A romantic direction for a memorable milestone with a softly luminous colour story.",
    silhouette: "Contoured fit-and-flare with a defined waist",
    palette: { name: "Soft-light elegance", colours: [["Champagne", "#d7b981"], ["Blush", "#d8a5a1"], ["Ivory", "#f6eee3"]] }
  },
  publicUrl: "https://sargont.github.io/JaneM/style-studio/"
});

assert.match(card, /width="1080" height="1350"/, "Style Card should export at a social-ready portrait size.");
assert.match(card, />Jane\.M<\/text>/, "Style Card must carry the Jane.M lockup.");
assert.match(card, /JANE\.M LESOTHO/, "Style Card must identify the Jane.M Lesotho brand.");
assert.match(card, /WHATSAPP \+266 6279 0946/, "Style Card must carry contact details.");
assert.match(card, /fill="#f3e8da" class="body"/, "Style Card body copy must be high contrast on the dark ground.");
assert.match(card, /fill="#f3e8da" class="detail"/, "Style Card silhouette copy must be high contrast on the dark ground.");
console.log("Style Card branding and contrast tests passed.");
