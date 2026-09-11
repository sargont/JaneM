# Jane.M Workroom — laptop prototype

Run from the repository root:

```sh
python3 -m http.server 4175 --bind 127.0.0.1 --directory workflow-studio
```

Open http://127.0.0.1:4175. Run checks with `node workflow-studio/test.js`.

This independent prototype starts with one fictional tailor and three fictional jobs. It does not modify the public website or existing Content Studio. Data stays in localStorage for this browser and origin. It is not authenticated, shared, backed up automatically, or suitable as a production customer system. Export creates a JSON snapshot; restore/import is not implemented yet. Changing browser or port creates a separate storage context.

## Daily use

1. Open a card or create a job. Record customer, contact, garment, quantity, design brief, measurements with units, materials/readiness, deposit status, accepted date, promised delivery, event date, fitting appointment, priority, lead tailor, blockers, and handover/quality notes.
2. Add activities for measuring, pattern making, cutting, sewing, fittings, alterations, finishing and inspection as needed. Each activity has its own tailor, planned date, estimated remaining hours and completion checkbox. Split work spanning days into separate activities. Hours are total for the job quantity, not per garment.
3. Review Tailor capacity. The initial six hours per day is an editable demonstration assumption. Set availability to zero for weekends or leave, or adjust any of the next seven days. Add staff as the team grows. Red cells mean planned work exceeds available time.
4. Use Production board to update the current stage and Activity schedule to review tasks. Mark activities complete to release their reserved hours. Stages and tasks are updated manually; changing a stage does not automatically complete activities.
5. Export snapshots regularly while reviewing the prototype.

## Deadline rules

The promised delivery date is the provisional SLA. Dates are evaluated using Africa/Johannesburg time. Uncollected jobs past their promised date are overdue, including Ready jobs. A blocked job is flagged unless already overdue. Jobs due within two calendar days are Due soon. On track means no deadline/blocker flag; it does not prove feasibility. Prioritisation uses risk, priority, then delivery date. Collected jobs leave active capacity calculations.

The prototype blocks delivery before acceptance or after a supplied event date. It warns after saving about unassigned/undated work, activities after delivery, and overloaded tailors. It does not reserve appointment times, prevent overlapping fittings, enforce task dependencies, infer material arrival, send reminders, or automatically reschedule. Deposit status is informational. Production stage transitions are unrestricted in this review version.

## Next production iteration

Confirm actual productive hours, working days, garment/activity estimates, material and deposit readiness gates, fitting buffers, and rush-job approval rules. Then add authenticated staff access, a shared database, versioned job history, reliable backup/restore, stage checklists, per-activity dependencies and richer skill matching. Keep customer measurements and contact details behind access controls. No customer data was imported for this prototype.

## Skills, WhatsApp intake and assisted planning

Tailor skills are now editable checkbox dropdowns, using a shared activity vocabulary. Existing comma-separated skills migrate in memory and persist with the next save. Unknown legacy skills remain available. Open the skills dropdown and tick multiple checkboxes, then save the tailor. Activities have a required-skill selector; saving rejects an incomplete activity assigned to a tailor without that selected skill. Activities without a selected skill still require manual review.

Add workflow activities inserts missing standard activities with one-hour placeholder estimates. Review all estimates before use. Suggest assignments fills only unassigned activities with a selected skill and date, choosing a qualified tailor with enough remaining capacity. It includes other jobs and all existing draft assignments, and reserves capacity between suggestions. Suggestions stay unsaved until the job is saved; it does not move dates or promise delivery feasibility.

Cards use red for SLA breaches (including days late), amber for due within two calendar days, green for no deadline flag, purple for blockers, and grey for collected work. Deadline status is evaluated when rendered; there are no background notifications while the app is closed.

Import WhatsApp accepts pasted text or a UTF-8 .txt export up to 200 KB, one request at a time. Explicit labels supported: Customer/Name, Contact/Phone, Garment/Job, Quantity, Delivery/Due, Event, Materials, Measurements, Notes. Dates must be valid YYYY-MM-DD dates. Free conversation is preserved as the design brief and original source, not interpreted by an AI service. Review all extracted fields and add missing required fields before saving. Exact source duplicates are rejected; paraphrased duplicates are not detected. Images, audio, ZIP exports, and live WhatsApp integration are not supported.

Recommended next work: garment-specific templates with measured effort, a daily exceptions list, material readiness gates, and reliable backup restore. Consider shared staff access and live message intake after those rules are established. No messages are sent automatically.

## Simplified screens and payments

Capacity is now a read-only weekly overview: planned / available hours, with a plain-language free-hours or overload label. Click a day to change available hours. Team & skills is the separate setup page for staff hours and checkbox skill dropdowns. Existing staff and assignments are preserved.

Revenue & payments shows all-time agreed job value, recorded cash receipts, outstanding balances and jobs without prices. Totals include collected jobs and use LSL integer minor units. These are operational job/payment totals, not profit or formal accounting revenue recognition. Unpriced jobs are excluded from value/balance totals. Legacy deposit labels never imply an amount and are retained for reference in each card.

In a job card, enter an agreed total and optionally a new received payment, payment date, method and reference. Saving appends a payment entry with a stable ID and recording timestamp. Status is calculated as Price needed, Unpaid, Partially paid or Fully paid. Additional payments beyond the total and future-dated receipts are rejected. Existing payment history is preserved when editing other fields. Refunds, corrections/reversals, invoice generation, expenses and reporting-period filters are not implemented. Data remains browser-local; export snapshots for review.

## Compact board and inspiration photos

Cards show essential job, deadline and payment information; Details expands additional content. Collapse all resets expanded cards. Stage columns scroll independently in a horizontal board. Drag a card to a stage or use its Move to selector (keyboard/touch alternative). Moves update stage only and preserve activities, payments and photos. An Undo move action is available immediately afterward.

Collected is the closed state. Active jobs are shown by default; choose Closed jobs or All jobs to retrieve them and move them back into an active stage. Closing does not delete records or remove their amounts from the all-time revenue view. Board and schedule filters include priority, text, lead/activity tailor, SLA and payment status; visibility filtering applies to the board. Clear filters returns to active jobs.

Inspiration accepts up to three JPEG/PNG/WebP photos per card, each at most 500 KB. Original images are stored as data URLs in the browser record and included in JSON exports. Attachments and removals apply only on Save. Full browser storage prevents the card save and keeps the draft open. Storage is finite and browser-local; this is not a shared media library.

## Archive, Trash and backup restore

Archive is independent of production stage. Archive removes jobs from active work and capacity but retains their money totals. Move to trash is recoverable deletion: trash jobs leave production and money totals. Jobs → Filters → Archived jobs / Trash reveals these records. Open a card to Unarchive or Restore from trash. Trash restore preserves its prior archive status. No permanent erase is exposed.

Export backup downloads the full snapshot (including archived/trashed jobs, payment history and photos). Restore backup validates an exported JSON file and previews its counts. The explicit restore action replaces current records with that snapshot; export current data first if needed. Invalid or oversized files and failed writes do not replace stored data. Backups are not automatic and only cover data at export time.

Browser localStorage usually survives a browser crash or normal restart. Unsaved edits can be lost. Deleting site data, deleting a browser profile, device failure or private-session disposal can remove stored jobs. Clearing only HTTP cached files normally does not remove localStorage, but browser clear-data choices vary. A different browser/profile/origin has a separate store. Keep exported files in a separate backed-up location. The next reliability step is a local database with automatic versioned file backups, followed by shared authenticated storage if staff access is needed.

## WhatsApp receipts and hosting

A successful new payment opens a copyable WhatsApp receipt. The payment history also offers Receipt for prior entries. Newly recorded payments snapshot the agreed total; historical receipts show cumulative receipts through that payment, not later payments. Older entries without a price snapshot fall back to the current job total. Copy requires clipboard permission / a secure origin; otherwise the text is selected for manual copying. No message is sent automatically.

The deployable static files are index.html, style.css, core.js and app.js only. Do not publish exported backups or personal job records. Hosting at a new origin creates a separate browser store: export locally and restore at the hosted URL. Browser-local phone and laptop datasets never auto-sync; use one device as the primary record until shared storage is added. Restore replaces, rather than merges, data.

A future Neon Postgres integration can use an authenticated backend API hosted separately from GitHub Pages. Keep database credentials on the backend and enforce workspace access there. A public shared database without user authentication would not provide private per-user jobs. GitHub Pages hosting suitability must also be checked against its commercial-use restrictions before using it for business operations.
