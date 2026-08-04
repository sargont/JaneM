# Catalogue access status

## Temporary public restriction — 2026-08-04

The website catalogue is temporarily unavailable while image permissions and provenance are confirmed.

- The public PDF and 49 rendered catalogue-page derivatives were moved from `JaneM_Website/assets/` to `private-assets/restricted-catalogue/`.
- GitHub Pages publishes only `JaneM_Website/`, so the former website URLs now return `404`.
- Existing catalogue navigation and buttons remain. They lead visitors to a clear availability notice and a WhatsApp consultation path rather than exposing images or producing a broken download.
- No source photographs or PDFs were modified or deleted.

## Before restoring public access

1. Complete the image-permission/provenance review for every page and exported PDF image.
2. Create and visually review a privacy-safe catalogue export.
3. Publish only the approved PDF and approved rendered derivatives back into `JaneM_Website/assets/`.
4. Restore the gallery script and normal button targets only after that review is complete.

This protects the deployed website only. If the GitHub repository is public, source files committed anywhere in its history may still be accessible through GitHub. Keep source assets in a private repository and do not push unapproved catalogue assets if they must not be publicly accessible at all.
