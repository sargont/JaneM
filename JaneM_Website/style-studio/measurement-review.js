(function exposeJaneMMeasurementReview(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.JaneMMeasurementReview = api;
})(typeof window !== "undefined" ? window : globalThis, () => {
  const fields = [["Bust", "bust"], ["Waist", "waist"], ["Hip", "hip"], ["Shoulder width", "shoulder"], ["Upper arm", "upperArm"], ["Sleeve length", "sleeveLength"], ["Shoulder to waist", "torso"], ["Dress length", "dressLength"], ["Height", "height"], ["Heel height", "heelHeight"]];
  const ranges = {
    bust: [50, 180], waist: [40, 170], hip: [60, 200], shoulder: [25, 65], upperArm: [15, 70],
    sleeveLength: [20, 90], torso: [25, 80], dressLength: [45, 190], height: [120, 230], heelHeight: [0, 20]
  };
  const compact = value => String(value || "").replace(/\s+/g, " ").trim();

  function numberInCentimetres(value, unit) {
    const raw = compact(value).replace(",", ".");
    if (!raw) return null;
    const numeric = Number(raw);
    if (!Number.isFinite(numeric) || numeric < 0) return { raw, cm: null };
    return { raw, cm: unit === "in" ? numeric * 2.54 : numeric };
  }

  function assessMeasurements(detail) {
    if (!detail.captureMeasurements) return { hasValues: false, rangeFlags: [], consistencyFlags: [], affectedNames: new Set(), isQuestionable: false };
    const unit = detail.measureUnit || "cm";
    const parsed = Object.fromEntries(fields.map(([, name]) => [name, numberInCentimetres(detail[name], unit)]));
    const rangeFlags = [];
    const affectedNames = new Set();
    fields.forEach(([label, name]) => {
      const item = parsed[name];
      if (!item) return;
      const [minimum, maximum] = ranges[name];
      if (item.cm === null || item.cm < minimum || item.cm > maximum) { rangeFlags.push(label); affectedNames.add(name); }
    });
    const consistencyFlags = [];
    const has = name => parsed[name]?.cm !== null && parsed[name] !== null;
    const flagPair = (text, names) => { consistencyFlags.push(text); names.forEach(name => affectedNames.add(name)); };
    if (has("bust") && has("hip") && (parsed.bust.cm < parsed.hip.cm * 0.45 || parsed.hip.cm < parsed.bust.cm * 0.45)) flagPair("Bust and hip values", ["bust", "hip"]);
    if (has("upperArm") && has("bust") && parsed.upperArm.cm > parsed.bust.cm) flagPair("Upper arm and bust values", ["upperArm", "bust"]);
    if (has("dressLength") && has("torso") && parsed.dressLength.cm < parsed.torso.cm) flagPair("Dress length and shoulder-to-waist values", ["dressLength", "torso"]);
    if (has("height")) {
      const related = ["bust", "hip", "torso", "dressLength"].filter(has).map(name => parsed[name].cm);
      if (related.length && parsed.height.cm <= Math.max(...related)) flagPair("Height and related measurements", ["height"]);
    }
    return { hasValues: Object.values(parsed).some(Boolean), rangeFlags, consistencyFlags, affectedNames, isQuestionable: rangeFlags.length > 0 || consistencyFlags.length > 0 };
  }

  return { fields, assessMeasurements };
});
