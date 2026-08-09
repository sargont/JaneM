# Jane.M Style Studio integration

Style Studio is a free personal-styling tool for people building a look from clothes they own, one anchor item, or a new custom direction. Its browser-side rules provide the outfit formula, colour hierarchy, jewellery, shoes, bag, hair, make-up, foundation, outer-layer and re-wear recommendations without requiring an account or API.

The visualizer calls `POST /api/style-studio/visualize` when the trusted local server is available. That endpoint uses live generation when a server-side OpenAI key exists and otherwise returns to the approved mock preview. Do not place provider API keys in this page, pass customer contact details or measurements to image generation, send uploaded images to analytics, or persist reference images in browser storage.
