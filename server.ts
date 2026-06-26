import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is fully operational." });
});

// Mail Transmission API
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing: name, email, subject, message are all required."
    });
  }

  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "siximbazekhaya@gmail.com";
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log(`[Contact API] Received proposal from ${name} (${email}) - Subject: ${subject}`);

  // Check if SMTP is configured
  if (!smtpUser || !smtpPass) {
    console.warn("[Contact API] Mail delivery warning: SMTP_USER or SMTP_PASS is not configured in settings or .env.");
    return res.json({
      success: true,
      simulation: true,
      message: "Message processed successfully in simulation mode! Set SMTP_USER and SMTP_PASS in the settings menu or .env file to enable actual email forwarding to your inbox."
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // Use SSL/TLS for 465, STARTTLS for others
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email templates
    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #1f2937; border-radius: 12px; background-color: #0d0e12; color: #f3f4f6;">
        <div style="border-bottom: 2px solid #e2b714; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #e2b714; margin: 0; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">// New Portfolio Message</h2>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #9ca3af; font-family: monospace;">RECEIVED VIA SECURE CONTACT CHANNEL</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #ffffff; font-size: 16px; margin-top: 0; margin-bottom: 8px;">Subject: ${subject}</h3>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db; background-color: #161722; padding: 16px; border-left: 4px solid #e2b714; border-radius: 4px; font-style: italic; margin: 0;">
            "${message}"
          </p>
        </div>

        <div style="background-color: #11121a; border: 1px solid #1f2937; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #e2b714; text-transform: uppercase; letter-spacing: 0.5px;">Sender Credentials</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 4px 0; color: #9ca3af; width: 80px; font-weight: 500;">Name:</td>
              <td style="padding: 4px 0; color: #ffffff; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #9ca3af;">Email:</td>
              <td style="padding: 4px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #e2b714; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #9ca3af;">Timestamp:</td>
              <td style="padding: 4px 0; color: #9ca3af; font-family: monospace;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; border-top: 1px solid #1f2937; padding-top: 16px; font-size: 11px; color: #6b7280; font-family: monospace;">
          This email was securely delivered from your custom Express Portfolio Server.<br>
          Reply directly to this email to contact <strong>${name}</strong>.
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"${name} via Portfolio" <${smtpUser}>`, // Send via configured SMTP user account
      to: receiverEmail,
      replyTo: email, // Directly reply to sender
      subject: `[Portfolio Contact] ${subject}`,
      text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: emailHtml,
    });

    console.log("[Contact API] Mail sent successfully to " + receiverEmail);
    return res.json({
      success: true,
      simulation: false,
      message: "Signal dispatched perfectly! Your email was delivered to Fika Zekhaya Siximba's inbox."
    });
  } catch (error: any) {
    console.error("[Contact API] Error sending mail via SMTP:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to dispatch communications signal: ${error.message || error}`
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite Dev Server Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Loaded Vite middleware for Development Mode.");
  } else {
    // Production Mode serving compiled static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static assets from: ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server is running on http://localhost:${PORT}`);
  });
}

startServer();
