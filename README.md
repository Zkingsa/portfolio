<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/19d76041-8541-499e-81c8-1de9245e241d

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Configure your contact form delivery in [.env.local](.env.local):
   - Formspree is already wired for the contact form.
   - To track NDA viewers in Google Sheets, set `GOOGLE_SHEETS_WEBHOOK_URL` to a Google Apps Script web app URL that accepts JSON.
   - To send email notifications for each new viewer, set `SMTP_USER` and `SMTP_PASS`.
4. Run the app:
   `npm run dev`
