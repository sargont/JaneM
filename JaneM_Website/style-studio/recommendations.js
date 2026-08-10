(function exposeJaneMStyleRecommendations(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.JaneMStyleRecommendations = api;
})(typeof window !== "undefined" ? window : globalThis, () => {
  const PALETTES = {
    "Jewel tones": { name: "Jewel-tone poise", story: "A saturated colour story gives the look richness and presence while keeping the styling refined.", colours: [["Emerald", "#075449"], ["Sapphire", "#173b66"], ["Burgundy", "#75223c"]], colour: "jewel-tone green, blue or burgundy", recommendedColour: "a jewel-tone green, blue or burgundy" },
    "Classic darks": { name: "Midnight classic", story: "Deep, tailored neutrals create a polished foundation that lets the silhouette and finishing speak clearly.", colours: [["Black", "#181615"], ["Midnight navy", "#182b46"], ["Deep mocha", "#543b30"]], colour: "black, midnight navy or deep mocha", recommendedColour: "black, midnight navy or deep mocha" },
    "Soft lights": { name: "Soft-light elegance", story: "A gentle, luminous palette makes room for texture, careful tailoring and a graceful finish.", colours: [["Champagne", "#d9bd94"], ["Rose mist", "#d8a9a6"], ["Warm ivory", "#f2eadf"]], colour: "champagne, blush or warm ivory", recommendedColour: "champagne or warm ivory" },
    "Warm earths": { name: "Golden earth", story: "Warm, grounded tones feel rich in photographs and pair beautifully with a considered metallic accent.", colours: [["Terracotta", "#a34f36"], ["Bronze", "#9a6b2c"], ["Olive", "#66713c"]], colour: "terracotta, bronze or olive", recommendedColour: "terracotta, bronze or olive" },
    "Surprise me": { name: "The JaneM edit", story: "A refined dark-and-gold palette gives the atelier room to select a memorable colour direction around the final fabric.", colours: [["Ink", "#1d2434"], ["Atelier gold", "#b38a45"], ["Cream", "#e7d9c2"]], colour: "a JaneM-selected ink, gold or cream direction", recommendedColour: "a JaneM-selected ink, gold or cream direction" }
  };

  const PROFILE_NAMES = {
    Classic: { "Softly flowing": "The Timeless Muse", "Defined waist": "The Classic Hourglass", "Sleek and fitted": "The Modern Heirloom", "Statement volume": "The Grand Classic", "Not sure yet": "The Polished Original" },
    Elegant: { "Softly flowing": "The Graceful Muse", "Defined waist": "The Poised Icon", "Sleek and fitted": "The Elegant Line", "Statement volume": "The Ceremony Edit", "Not sure yet": "The Refined Original" },
    Modern: { "Softly flowing": "The Soft Modern", "Defined waist": "The Defined Modern", "Sleek and fitted": "The Modern Line", "Statement volume": "The Architectural Muse", "Not sure yet": "The Contemporary Edit" },
    Glamorous: { "Softly flowing": "The Luminous Muse", "Defined waist": "The Glamour Hour", "Sleek and fitted": "The After-Dark Icon", "Statement volume": "The Grand Entrance", "Not sure yet": "The Golden Moment" },
    Romantic: { "Softly flowing": "The Romantic Muse", "Defined waist": "The Softly Defined", "Sleek and fitted": "The Modern Romantic", "Statement volume": "The Celebration Bloom", "Not sure yet": "The Gentle Statement" },
    Bold: { "Softly flowing": "The Confident Muse", "Defined waist": "The Defined Statement", "Sleek and fitted": "The Bold Line", "Statement volume": "The Main Event", "Not sure yet": "The Unforgettable Edit" }
  };
  const silhouetteMap = { "Softly flowing": "fluid A-line with soft movement", "Defined waist": "contoured fit-and-flare with a defined waist", "Sleek and fitted": "sculpted column with a clean vertical line", "Statement volume": "structured full-skirt silhouette with a focused waist", "Not sure yet": "balanced A-line with a softly defined waist" };
  const fabricMap = { "Softly flowing": "silk-blend crepe or fluid satin", "Defined waist": "lined crepe or controlled satin", "Sleek and fitted": "structured crepe or matte satin with considered support", "Statement volume": "satin with an organza or structured lining detail", "Not sure yet": "a refined crepe or satin selected with JaneM" };
  const lengthByOccasion = { Graduation: "graceful maxi length", "Wedding guest": "polished midi length", "Birthday or celebration": "celebratory midi length", "Corporate event": "tailored midi length", "Evening gala": "full-length maxi", "Special occasion": "elegant midi-to-maxi length" };
  const lengthByPreference = { Mini: "mini length", "Above knee": "above-knee length", "Knee length": "knee length", Midi: "midi length", Ankle: "ankle length", "Floor length": "floor length" };
  const featurePatterns = [
    ["slit", /\bslit\b/i], ["pockets", /\bpockets?\b/i], ["corset detail", /\bcorset(?:ry)?\b/i], ["beading", /\b(beads?|beading)\b/i], ["open back", /\bopen[-\s]?back\b/i], ["bow", /\bbows?\b/i], ["pleats", /\bpleats?\b/i], ["train", /\btrain\b/i], ["puff sleeve", /\bpuff(?:ed)?\s+sleeves?\b/i], ["draping", /\bdrap(?:e|ed|ing)\b/i]
  ];
  const generalNotePattern = /\b(lovely|beautiful|nice|stunning|elegant\s+please|pretty|gorgeous)\b/i;
  const compact = value => String(value || "").replace(/\s+/g, " ").trim();
  const lowerFirst = value => compact(value).replace(/^./, character => character.toLowerCase());
  const garmentLengthPhrase = (selection, fallback) => selection && selection !== "No preference / advise me" ? lowerFirst(selection) : fallback.replace(/ length$/, "");
  const silhouettePhrase = value => value.replace(" with a softly defined waist", " and a softly defined waist").replace(" with a defined waist", " and a defined waist").replace(" with a focused waist", " and a focused waist");
  const sleevePhrase = (value) => {
    const sleeve = lowerFirst(value);
    if (sleeve === "sleeveless") return "a sleeveless finish";
    if (/\bsleeve$/.test(sleeve)) return `${sleeve}s`;
    return sleeve;
  };

  const stableId = (value) => {
    let hash = 0;
    for (const character of value) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    return `JM-${hash.toString(36).toUpperCase().padStart(5, "0").slice(-5)}`;
  };

  function recommend(data) {
    const palette = PALETTES[data.colour] || PALETTES["Surprise me"];
    const profile = PROFILE_NAMES[data.personality]?.[data.fit] || "The JaneM Edit";
    const preferredLength = lengthByPreference[data.garmentLength] || lengthByOccasion[data.occasion] || "occasion-led length";
    const neckline = data.coverage === "More coverage" ? (data.personality === "Modern" ? "clean high neckline" : "soft boat neckline") : data.coverage === "Open to a little drama" ? (data.personality === "Glamorous" || data.personality === "Bold" ? "off-shoulder or asymmetric neckline" : "refined V neckline") : (data.personality === "Romantic" ? "soft square neckline" : "balanced square or gentle V neckline");
    const sleeves = data.coverage === "More coverage" ? "elegant long or sheer sleeve" : data.coverage === "Open to a little drama" ? "sleek sleeveless or detachable sleeve direction" : "cap sleeve, soft shoulder or detachable sleeve direction";
    const detailMap = { Classic: "clean seam work and one polished finishing detail", Elegant: "refined drape or a quiet waist detail", Modern: "one architectural line with clean construction", Glamorous: "controlled lustre, drape or a statement back detail", Romantic: "soft gathering or a delicately shaped waist detail", Bold: "one confident focal detail with a restrained supporting finish" };
    const guidanceRangeByLength = { Ankle: "M3,000–M4,200 starting direction", "Floor length": "M3,500–M4,800 starting direction" };
    const workRanges = { "Under M1,800": "M1,450–M1,800", "M1,800–M3,000": "M1,800–M3,000", "M3,000–M4,800": "M3,000–M4,800", "M4,800+": "From M4,800", "I would like guidance": guidanceRangeByLength[data.garmentLength] || "M2,500–M3,500 starting direction" };
    const urgencyCopy = data.urgency === "Within two weeks" ? "Because your event is soon, JaneM can focus first on availability and a clear, achievable finishing plan." : data.urgency === "I am still planning" ? "You have room to explore the direction now, then refine every construction choice with confidence." : `Your ${String(data.urgency || "").toLowerCase()} timeline gives JaneM a useful starting point for planning fittings and finishing.`;
    const article = /^[aeiou]/i.test(data.personality || "") ? "an" : "a";
    return {
      id: stableId([data.occasion, data.urgency, data.personality, data.fit, data.garmentLength, data.coverage, data.colour, data.budget].join("|")),
      profile, palette, silhouette: silhouetteMap[data.fit] || silhouetteMap["Not sure yet"], neckline, sleeves, length: preferredLength, fabric: fabricMap[data.fit] || fabricMap["Not sure yet"], details: detailMap[data.personality] || "refined finishing selected with JaneM", workmanship: workRanges[data.budget] || "Indicative range confirmed with JaneM",
      summary: `${profile} is ${article} ${String(data.personality || "considered").toLowerCase()} direction for ${data.occasion === "Corporate event" ? "tailored authority" : data.occasion === "Evening gala" ? "after-dark presence" : "a memorable milestone"}: ${silhouetteMap[data.fit] || silhouetteMap["Not sure yet"]}, ${preferredLength}, ${palette.colour}, and a finish that honours your ${String(data.coverage || "balanced").toLowerCase()} preference.`,
      reasons: [`${data.occasion} calls for ${data.occasion === "Corporate event" ? "composure and presence" : "a look that feels personal in photographs and in motion"}; this silhouette keeps the line intentional.`, `${data.coverage} leads the neckline and sleeve direction, so the result feels confident without asking you to compromise on comfort.`, `${palette.name} gives the outfit a cohesive colour story, while ${detailMap[data.personality] || "refined finishing"} keeps the overall effect considered.`, urgencyCopy],
      styling: `Keep accessories focused: choose ${data.colour === "Soft lights" ? "pearl, brushed gold or a soft metallic" : data.colour === "Classic darks" ? "one metallic accent and a sleek structured bag" : "a warm gold or polished neutral accent"}. A clean shoe line and one considered hair choice will let the silhouette remain the hero.`
    };
  }

  function classifyFeatureText(value) {
    const raw = compact(value);
    if (!raw) return { category: "none", raw: "", features: [] };
    const features = featurePatterns.filter(([, pattern]) => pattern.test(raw)).map(([feature]) => feature);
    if (features.length) return { category: "concrete design feature", raw, features: [...new Set(features)] };
    return { category: generalNotePattern.test(raw) ? "general note" : "unclear / non-actionable", raw, features: [] };
  }

  function fabricBehaviour(data, detail, base) {
    const selected = compact(detail.fabric);
    const structuredShape = ["Defined waist", "Sleek and fitted", "Statement volume", "Not sure yet"].includes(data.fit);
    if (selected === "Silk or silk-blend") {
      return structuredShape ? `A silk-blend with sufficient body is recommended so the ${base.silhouette} keeps its shape while still moving elegantly.` : "A fluid silk or silk-blend can support soft movement; the final weight should be confirmed for comfort and the desired drape.";
    }
    if (selected === "Satin") return structuredShape ? `Use a controlled satin weight with lining or support where needed, so the ${base.silhouette} reads cleanly without becoming stiff.` : "Use a satin weight that moves comfortably and keeps the line polished without unnecessary bulk.";
    if (selected === "Crepe") return "A lined crepe is a practical option for clean shaping, controlled movement and a calm photographic finish.";
    if (selected === "Organza") return "Use organza as a controlled layer or support rather than the sole base fabric, so volume stays intentional and movement remains comfortable.";
    if (selected === "Lace") return "Select lace only after its weight, lining needs and edge finish are confirmed, so it supports rather than obscures the intended silhouette.";
    if (selected === "Textured fabric") return "Confirm the fabric weight and surface texture against the silhouette so the finish adds interest without disrupting the line.";
    return `Jane.M should select ${base.fabric} after confirming the needed drape, structure, movement and comfort for the event.`;
  }

  function detailPlacement(detail, featureInfo) {
    if (featureInfo.features.includes("beading")) return "Keep the requested beading restrained and tonal, concentrated at the neckline or waist so it reads as a considered finish rather than all-over coverage.";
    if (featureInfo.features.includes("corset detail")) return "Let the requested corset seaming provide the focal detail; keep any surface finishing restrained so the construction remains clear.";
    if (featureInfo.features.length) return `Resolve the requested ${featureInfo.features.join(", ")} during consultation, keeping the focal detail concentrated so the silhouette remains the lead.`;
    if (detail.embellishment === "Statement detail") return "Use one clearly placed focal detail, then keep the remaining surface finish controlled so the garment does not compete with its silhouette.";
    if (detail.embellishment === "Refined detail") return "Keep the finish restrained, concentrating a fabric-matched detail at the neckline or waist rather than spreading decoration across the garment.";
    if (detail.embellishment === "Minimal") return "Keep detail to clean seam work and carefully finished edges, allowing the shape and fabric to carry the look.";
    return "Keep surface treatment understated until Jane.M confirms the final fabric and construction direction.";
  }

  function constructionScope(data, detail, featureInfo, base) {
    const drivers = [];
    let score = 0;
    if (data.fit === "Statement volume") { score += 3; drivers.push("structured skirt volume and waist control"); }
    else if (data.fit === "Sleek and fitted") { score += 3; drivers.push("close-fit shaping and support"); }
    else if (data.fit === "Defined waist") { score += 2; drivers.push("shaped bodice and defined waist"); }
    else { score += 1; drivers.push(data.fit === "Softly flowing" ? "fluid silhouette control" : "balanced A-line shaping"); }
    if (["Ankle", "Floor length"].includes(data.garmentLength)) { score += 1; drivers.push("longer hem and movement finishing"); }
    if (["Short sleeve", "Long sleeve", "Sheer sleeve", "Detachable sleeve"].includes(detail.sleeves)) { score += 1; drivers.push(`${lowerFirst(detail.sleeves)} finishing`); }
    if (["Organza", "Lace", "Textured fabric"].includes(detail.fabric)) { score += 1; drivers.push(`${lowerFirst(detail.fabric)} handling`); }
    if (detail.embellishment === "Refined detail") { score += 1; drivers.push("restrained detail placement"); }
    if (detail.embellishment === "Statement detail") { score += 2; drivers.push("statement detail and hand finishing"); }
    if (featureInfo.features.some(feature => ["corset detail", "train", "draping", "open back"].includes(feature))) { score += 2; drivers.push("requested feature construction"); }
    if (featureInfo.features.includes("beading")) { score += 1; drivers.push("requested beading placement"); }
    const category = score >= 6 ? "Complex construction" : score >= 3 ? "Moderate construction" : "Light construction";
    const lowerEnd = category === "Light construction" ? "Clean silhouette work, limited internal structure and restrained finishing keep the work near the lower end." : "A clean interpretation of the selected shape, with restrained detailing and standard fitting scope, keeps the work nearer the lower end.";
    const upperEnd = `More ${["internal structure", "hand-applied detail", "complex finishing", "additional fitting work"].filter((item, index) => index < (category === "Complex construction" ? 4 : 3)).join(", ")} move the work toward the upper end.`;
    return { category, drivers, summary: `${category}: ${drivers.join("; ")}.`, lowerEnd, upperEnd, indicativeRange: base.workmanship };
  }

  function interpretDesign(data, detail = {}, base = recommend(data)) {
    const featureInfo = classifyFeatureText(detail.features);
    const neckline = compact(detail.neckline) || base.neckline;
    const sleeve = compact(detail.sleeves) || base.sleeves;
    const length = garmentLengthPhrase(data.garmentLength, base.length);
    const colour = base.palette.recommendedColour;
    const eventDress = data.occasion === "Graduation" ? "graduation dress" : data.occasion === "Corporate event" ? "occasion dress for a corporate setting" : `${String(data.occasion || "special occasion").toLowerCase()} dress`;
    const waist = data.fit === "Defined waist" ? "defined waist" : data.fit === "Not sure yet" ? "softly structured waist" : data.fit === "Statement volume" ? "controlled waist" : "considered waistline";
    const silhouetteInterpretation = `${silhouettePhrase(base.silhouette)} interpreted with a ${waist} and an intentional line through the ${length} proportion.`;
    const direction = `A ${colour} ${length} ${eventDress} with a ${silhouettePhrase(base.silhouette)}, ${lowerFirst(neckline)} and ${sleevePhrase(sleeve)}. The line should feel composed and event-appropriate rather than overworked.`;
    const whyItWorks = data.occasion === "Graduation"
      ? `The ${length} length and ${silhouettePhrase(base.silhouette)} provide presence without competing with graduation regalia. The ${waist} gives shape, while the ${lowerFirst(neckline)} and ${sleevePhrase(sleeve)} remain composed and photograph well when the gown is open.`
      : `The ${length} length and ${silhouettePhrase(base.silhouette)} create an intentional proportion for ${String(data.occasion || "the event").toLowerCase()}, while the ${lowerFirst(neckline)} and ${sleevePhrase(sleeve)} honour the selected ${String(data.coverage || "balanced").toLowerCase()} coverage preference.`;
    const construction = constructionScope(data, detail, featureInfo, base);
    const rawFeatures = featureInfo.category === "concrete design feature" ? featureInfo.raw : "None specified";
    const additionalClientNote = featureInfo.category === "none" ? "None specified" : featureInfo.category === "concrete design feature" ? "None specified" : featureInfo.raw;
    const clientPreferences = {
      Occasion: compact(data.occasion) || "Not specified",
      "Event timing": compact(data.urgency) || "Not specified",
      "Style personality": compact(data.personality) || "Not specified",
      "Preferred silhouette or fit": compact(data.fit) || "Not specified",
      "Coverage preference": compact(data.coverage) || "Not specified",
      "Budget range": compact(data.budget) || "Not specified",
      "Preferred garment length": compact(data.garmentLength) || "Not specified",
      "Colour direction": compact(data.colour) || "Not specified",
      "Neckline preference": compact(detail.neckline) || "Let Jane.M advise",
      "Sleeve preference": compact(detail.sleeves) || "Let Jane.M advise",
      "Fabric preference": compact(detail.fabric) || "Let Jane.M advise",
      Embellishment: compact(detail.embellishment) || "Keep it understated",
      "Specific design features": rawFeatures,
      "Additional client note": additionalClientNote,
      "Additional notes": compact(detail.notes) || "None specified",
      "Reference-photo status": compact(detail.referencePhotoStatus) || "Not provided"
    };
    const recommendation = {
      "Design direction": direction,
      "Recommended silhouette interpretation": silhouetteInterpretation,
      "Recommended colour choice": `Focus on ${colour}; Jane.M will confirm the final shade against the chosen fabric.`,
      "Recommended fabric behaviour": fabricBehaviour(data, detail, base),
      "Recommended detail placement": detailPlacement(detail, featureInfo),
      "Why this works": whyItWorks,
      "Styling logic": base.styling,
      "Construction complexity": construction.category,
      "Main complexity drivers": construction.drivers.join("; "),
      "Indicative workmanship range": construction.indicativeRange,
      "Lower-end direction": construction.lowerEnd,
      "Upper-end drivers": construction.upperEnd
    };
    const atelierDecisions = {
      "Final measurements": "Confirm during fitting before any construction is finalised.",
      "Exact fabric": "Confirm final weight, drape, structure and finish against the intended silhouette.",
      "Detail placement": "Confirm exact placement and amount of finishing or handwork.",
      "Construction and fittings": "Confirm the construction method, fitting plan and production timing.",
      "Final quotation": "Confirm after fabric, construction scope and fitting requirements are agreed."
    };
    const conciseWhy = data.occasion === "Graduation"
      ? `The ${length} A-line supports graduation regalia and photographs well; the waist adds shape while the ${lowerFirst(neckline)} and ${sleevePhrase(sleeve)} stay composed when the gown is open.`
      : `The ${length} ${silhouettePhrase(base.silhouette)} creates an intentional proportion for ${String(data.occasion || "the event").toLowerCase()} while respecting the selected coverage.`;
    const conciseFabric = detail.fabric === "Silk or silk-blend" ? `Use a silk-blend with enough body to hold the ${silhouettePhrase(base.silhouette)} while moving elegantly.` : detail.fabric ? `Confirm ${lowerFirst(detail.fabric)} for the required drape, structure and comfort.` : `Confirm the final fabric for the required drape, structure and comfort.`;
    const conciseDetail = featureInfo.features.length ? `Confirm ${featureInfo.features.join(", ")} as the focal detail, keeping the remaining finish restrained.` : detail.embellishment === "Refined detail" ? "Keep detail restrained and concentrated at the neckline or waist." : "Keep the surface finish controlled until the final fabric is confirmed.";
    const whatsapp = {
      "Design direction": direction,
      "Why it works": conciseWhy,
      "Fabric behaviour": conciseFabric,
      "Detail placement": conciseDetail,
      "Pricing drivers": "Lower: clean construction with restrained detailing. Upper: more internal structure, hand-applied detail, complex finishing or additional fitting work."
    };
    return { featureInfo, clientPreferences, recommendation, construction, atelierDecisions, whatsapp };
  }

  return { recommend, classifyFeatureText, interpretDesign };
});
