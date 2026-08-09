# Jane.M Style Studio integration

The visualizer currently runs entirely in the browser and displays the approved mock preview. The `generateDesignConcept(brief)` abstraction in `index.html` is the only intended integration point for a future server implementation.

When live generation is approved, implement `POST /api/style-studio/visualize` on a trusted server and have that endpoint call the selected provider. Do not place provider API keys in this page, pass uploaded images to analytics, or persist reference images in browser storage.
