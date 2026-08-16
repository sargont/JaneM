# JaneM Style Studio

The public Style Studio is a static, browser-only experience. `index.html` presents the consultation journey; `studio.js` handles the journey and WhatsApp handoff; `recommendations.js` contains the deterministic, testable recommendation logic; `brief-pdf.js` creates the selectable-text A4 Style Brief; and `studio.css` provides its responsive presentation.

The Style Studio keeps only the non-sensitive journey answers (occasion, style, colour and budget) in the current browser session so a visitor can return from collection exploration without losing progress. It never stores a current result, advanced notes, measurements or reference photographs. A reference photograph remains on the visitor's device only for the active browser interaction unless she independently attaches it in WhatsApp.

Measurement figures receive a soft fashion-range and consistency review before the detailed brief or visual mood reference is created. A visitor can edit a value or explicitly keep it; figures that need review remain labelled as customer-provided and requiring verification. They do not influence the visual proportions, complexity assessment or workmanship guidance.

The detailed brief has three deliberately separate layers: client preferences preserve selected and entered values; the Style Studio recommendation interprets the silhouette, fabric behaviour, finishing, construction complexity and indicative pricing; and the Jane.M confirmation section identifies decisions reserved for consultation. Free-text feature entries are classified as concrete design features, general notes or unclear/non-actionable text. Only concrete features become garment instructions; wording such as “lovely” is retained as an additional client note instead.

The on-screen Style Brief, detailed WhatsApp handoff and PDF download use the same `designerBrief()` structured result. The PDF is a real-text, multi-page A4 document—not a screenshot—and deliberately does not embed a local-only reference photo.

There is no backend, external AI request, account system, lead-capture form or API key associated with this route. `saveStyleStudioResult(result)` is intentionally a no-op that keeps the future integration boundary in one place. A future service may use `POST /api/style-studio/results` to receive the structured result, event context, selected design direction, construction scope and measurement-verification state. It must never receive or store local reference-photo files automatically.
