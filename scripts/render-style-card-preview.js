const fs = require("node:fs");
const path = require("node:path");
const { buildStyleCardSvg } = require("../JaneM_Website/style-studio/style-card.js");

const output = path.resolve(process.argv[2] || "output/svg/JaneM-Style-Card-Preview.svg");
const card = buildStyleCardSvg({
  recommendation: {
    profile: "The Softly Defined",
    summary: "A romantic direction for a memorable milestone: contoured fit-and-flare with a defined waist, knee length, and a softly luminous colour story.",
    silhouette: "Contoured fit-and-flare with a defined waist",
    palette: { name: "Soft-light elegance", colours: [["Champagne", "#d7b981"], ["Blush", "#d8a5a1"], ["Ivory", "#f6eee3"]] }
  },
  publicUrl: "https://sargont.github.io/JaneM/style-studio/"
});

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, card, "utf8");
console.log(output);
