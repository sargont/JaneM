# Jane.M Style Studio v4 — AI Visualization Mock

## New in v4
- Adds **Visualize this brief**
- Simulates GPT analysis with a multi-stage loading sequence
- Displays an approved static concept-board mock
- Generates and downloads the exact GPT image-generation prompt
- Adds a construction-complexity score and indicative custom-workmanship range
- Explicitly requires the model, sketches, detail crops and written content to describe the same garment
- Keeps customer-facing artwork free of internal workflow buttons

## Production integration
Do not place an OpenAI API key in browser JavaScript.

Recommended flow:
1. Browser sends the structured brief and optional reference image to your own server-side endpoint.
2. The endpoint builds or validates the prompt.
3. The endpoint calls OpenAI's Responses API with image generation.
4. The endpoint returns the generated image URL/base64 result and structured analysis.
5. The browser displays the result for customer approval before submission to Jane.M.

Set a server environment variable such as `OPENAI_API_KEY`; never commit it to GitHub.

The current prototype contains no external calls and does not require a key.


## v4.1
The measurement guide now has two navigable illustrations. No other workflow or design changes were made.
