const assert = require("node:assert/strict");
const { recommend, classifyFeatureText, interpretDesign } = require("../JaneM_Website/style-studio/recommendations.js");
const { assessMeasurements } = require("../JaneM_Website/style-studio/measurement-review.js");

const scenarios = [
  { occasion: "Graduation", urgency: "1–3 months away", personality: "Elegant", fit: "Defined waist", garmentLength: "Floor length", coverage: "Balanced", colour: "Jewel tones", budget: "M3,000–M4,800", profile: "The Poised Icon", workmanship: "M3,000–M4,800" },
  { occasion: "Corporate event", urgency: "This month", personality: "Modern", fit: "Sleek and fitted", garmentLength: "Midi", coverage: "More coverage", colour: "Classic darks", budget: "M1,800–M3,000", profile: "The Modern Line", workmanship: "M1,800–M3,000" },
  { occasion: "Birthday or celebration", urgency: "More than 3 months away", personality: "Bold", fit: "Statement volume", garmentLength: "Knee length", coverage: "Open to a little drama", colour: "Warm earths", budget: "M4,800+", profile: "The Main Event", workmanship: "From M4,800" },
  { occasion: "Wedding guest", urgency: "1–3 months away", personality: "Romantic", fit: "Softly flowing", garmentLength: "Ankle", coverage: "Balanced", colour: "Soft lights", budget: "M1,800–M3,000", profile: "The Romantic Muse", workmanship: "M1,800–M3,000" },
  { occasion: "Evening gala", urgency: "I am still planning", personality: "Glamorous", fit: "Defined waist", garmentLength: "No preference / advise me", coverage: "Open to a little drama", colour: "Surprise me", budget: "I would like guidance", profile: "The Glamour Hour", workmanship: "M2,500–M3,500 starting direction" }
];

const results = scenarios.map(({ profile, workmanship, ...answers }) => {
  const result = recommend(answers);
  assert.equal(result.profile, profile);
  assert.equal(result.workmanship, workmanship);
  assert.match(result.id, /^JM-[A-Z0-9]{5}$/);
  assert.equal(result.palette.colours.length, 3);
  assert.ok(result.silhouette && result.neckline && result.sleeves && result.length && result.fabric && result.details);
  assert.equal(result.reasons.length, 4);
  assert.ok(!/final garment design/i.test(result.summary));
  return result;
});

assert.equal(new Set(results.map(result => result.profile)).size, scenarios.length, "materially different answers should yield different profiles");
assert.equal(JSON.stringify(recommend(scenarios[0])), JSON.stringify(recommend(scenarios[0])), "recommendations should be deterministic");
assert.match(results[1].neckline, /high neckline/, "modern, higher-coverage result should keep its neckline consistent");
assert.match(results[2].silhouette, /full-skirt/, "statement-volume result should retain a volume-led silhouette");
assert.equal(results[0].length, "floor length", "the selected garment length should guide the recommendation");
assert.notEqual(results[0].id, results[1].id, "reference values should reflect materially different selections");

const suppliedBadMeasurements = assessMeasurements({
  captureMeasurements: true,
  measureUnit: "cm",
  bust: "12", waist: "21", hip: "213", shoulder: "31", upperArm: "123", sleeveLength: "31"
});
assert.equal(suppliedBadMeasurements.isQuestionable, true, "implausible customer figures should receive a soft review state");
assert.deepEqual(suppliedBadMeasurements.rangeFlags, ["Bust", "Waist", "Hip", "Upper arm"]);
assert.ok(suppliedBadMeasurements.consistencyFlags.includes("Bust and hip values"));
assert.ok(suppliedBadMeasurements.consistencyFlags.includes("Upper arm and bust values"));
assert.ok(suppliedBadMeasurements.affectedNames.has("bust") && suppliedBadMeasurements.affectedNames.has("hip") && suppliedBadMeasurements.affectedNames.has("upperArm"));
assert.equal(assessMeasurements({ captureMeasurements: true, measureUnit: "cm", bust: "92", waist: "74", hip: "102", shoulder: "39", upperArm: "30", sleeveLength: "58", torso: "43", dressLength: "142", height: "168", heelHeight: "7" }).isQuestionable, false, "ordinary figures should not create a review prompt");
assert.ok(assessMeasurements({ captureMeasurements: true, measureUnit: "cm", bust: "not a number" }).rangeFlags.includes("Bust"), "non-numeric entries must be flagged for review");
assert.equal(assessMeasurements({ captureMeasurements: true, measureUnit: "in", bust: "36", waist: "29", hip: "40", shoulder: "15", upperArm: "12", sleeveLength: "23", torso: "17", dressLength: "56", height: "66", heelHeight: "3" }).isQuestionable, false, "ordinary inch measurements should be validated after conversion");

const graduationAnswers = { occasion: "Graduation", urgency: "I am still planning", personality: "Elegant", fit: "Not sure yet", garmentLength: "Midi", coverage: "Balanced", colour: "Soft lights", budget: "M3,000–M4,800" };
const graduationDetail = { neckline: "Square neckline", sleeves: "Short sleeve", fabric: "Silk or silk-blend", embellishment: "Refined detail", features: "lovely", notes: "", referencePhotoStatus: "Not provided" };
const graduationBase = recommend(graduationAnswers);
const graduationBrief = interpretDesign(graduationAnswers, graduationDetail, graduationBase);
assert.equal(graduationBase.profile, "The Refined Original");
assert.equal(graduationBase.silhouette, "balanced A-line with a softly defined waist");
assert.equal(graduationBase.workmanship, "M3,000–M4,800");
assert.equal(graduationBrief.featureInfo.category, "general note");
assert.equal(graduationBrief.clientPreferences["Specific design features"], "None specified", "non-actionable text must not become a garment feature");
assert.equal(graduationBrief.clientPreferences["Additional client note"], "lovely", "the exact non-actionable text should remain available as a client note");
assert.doesNotMatch(JSON.stringify(graduationBrief.recommendation), /lovely/i, "the recommendation must not treat a general note as design direction");
assert.match(graduationBrief.recommendation["Design direction"], /graduation dress.*square neckline.*short sleeve/i);
assert.match(graduationBrief.recommendation["Why this works"], /graduation regalia/i);
assert.match(graduationBrief.recommendation["Recommended fabric behaviour"], /silk-blend with sufficient body.*keeps its shape/i);
assert.doesNotMatch(graduationBrief.recommendation["Recommended detail placement"], /bead/i, "refined detail alone must not invent beadwork");
assert.equal(graduationBrief.recommendation["Construction complexity"], "Moderate construction");
assert.match(graduationBrief.recommendation["Main complexity drivers"], /balanced A-line shaping/i);
assert.match(graduationBrief.recommendation["Lower-end direction"], /restrained detailing/i);
assert.match(graduationBrief.recommendation["Upper-end drivers"], /internal structure/i);
assert.match(graduationBrief.whatsapp["Fabric behaviour"], /silk-blend with enough body/i);
assert.match(graduationBrief.whatsapp["Pricing drivers"], /Lower:.*Upper:/i);
assert.ok(graduationBrief.whatsapp["Pricing drivers"].length < 180, "WhatsApp pricing guidance should stay concise");
assert.equal(classifyFeatureText("slit, pockets and beading").category, "concrete design feature");

const lightConstruction = interpretDesign({ occasion: "Wedding guest", urgency: "1–3 months away", personality: "Classic", fit: "Softly flowing", garmentLength: "Knee length", coverage: "Balanced", colour: "Soft lights", budget: "Under M1,800" }, {});
const complexConstruction = interpretDesign({ occasion: "Birthday or celebration", urgency: "More than 3 months away", personality: "Bold", fit: "Statement volume", garmentLength: "Floor length", coverage: "Open to a little drama", colour: "Warm earths", budget: "M4,800+" }, { sleeves: "Long sleeve", fabric: "Organza", embellishment: "Statement detail", features: "corset detail, train and draping" });
assert.equal(lightConstruction.recommendation["Construction complexity"], "Light construction");
assert.equal(complexConstruction.recommendation["Construction complexity"], "Complex construction");

console.log(`Style Studio recommendation, interpretation and measurement-review tests passed: ${scenarios.length} baseline scenarios plus the Graduation brief.`);
