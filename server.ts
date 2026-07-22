import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const NDA_STORAGE_FILE = path.join(DATA_DIR, "nda-viewers.json");

type ContactMessageRecord = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
};

type NdaViewerRecord = {
  id: string;
  name: string;
  email: string;
  company: string;
  timestamp: string;
  source: string;
};

const receivedMessages: ContactMessageRecord[] = [];
let ndaViewerRecords: NdaViewerRecord[] = [];

async function sendEmailNotification(payload: { subject: string; text: string; html: string; replyTo?: string; receiverEmail?: string }) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    return null;
  }

  const receiverEmail = payload.receiverEmail || process.env.NDA_RECEIVER_EMAIL || process.env.CONTACT_RECEIVER_EMAIL || "siximbazekhaya@gmail.com";
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Viewer" <${smtpUser}>`,
    to: receiverEmail,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  return true;
}

async function ensureDataDirectory() {
  try {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('[Server] Failed to create data directory:', error);
  }
}

async function loadNdaViewerRecords() {
  try {
    await ensureDataDirectory();
    const raw = await fs.promises.readFile(NDA_STORAGE_FILE, 'utf8');
    const records = JSON.parse(raw);
    if (Array.isArray(records)) {
      ndaViewerRecords = records;
    }
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error('[Server] Failed to load NDA viewer storage:', error);
    }
  }
}

async function persistNdaViewerRecords() {
  try {
    await ensureDataDirectory();
    await fs.promises.writeFile(NDA_STORAGE_FILE, JSON.stringify(ndaViewerRecords, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('[Server] Failed to persist NDA viewer record:', error);
    return false;
  }
}

async function syncViewerToGoogleSheets(payload: NdaViewerRecord) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return null;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      timestamp: payload.timestamp,
      source: payload.source,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets sync failed: ${errorText}`);
  }

  return true;
}

async function sendWhatsAppNotification(payload: { name: string; email: string; subject: string; message: string }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.WHATSAPP_TO;

  if (!accountSid || !authToken || !from || !to) {
    return null;
  }

  const body = new URLSearchParams({
    From: from,
    To: to,
    Body: `New portfolio message from ${payload.name} (${payload.email})\n\nSubject: ${payload.subject}\n\n${payload.message}`,
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WhatsApp delivery failed: ${errorText}`);
  }

  return true;
}

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is fully operational." });
});

app.post("/api/nda-viewer", async (req, res) => {
  const { name, email, company, timestamp } = req.body;

  if (!name || !email || !timestamp) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and timestamp are required.",
    });
  }

  const record: NdaViewerRecord = {
    id: `viewer_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || "Not provided",
    timestamp: timestamp.trim(),
    source: "nda_acceptance",
  };

  ndaViewerRecords.unshift(record);
  if (ndaViewerRecords.length > 100) {
    ndaViewerRecords.length = 100;
  }

  const savedToFile = await persistNdaViewerRecords();
  if (!savedToFile) {
    console.warn('[NDA Viewer API] Could not persist NDA viewer data to disk.');
  }

  try {
    const sheetSync = await syncViewerToGoogleSheets(record);
    const emailSent = await sendEmailNotification({
      subject: `[Portfolio Viewer] ${record.name}`,
      replyTo: record.email,
      receiverEmail: process.env.NDA_RECEIVER_EMAIL || process.env.CONTACT_RECEIVER_EMAIL || "siximbazekhaya@gmail.com",
      text: `New portfolio project viewer accepted the NDA.\nName: ${record.name}\nEmail: ${record.email}\nCompany: ${record.company}\nTimestamp: ${record.timestamp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #e2b714;">New Portfolio Viewer</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Company:</strong> ${record.company}</p>
          <p><strong>Timestamp:</strong> ${record.timestamp}</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: sheetSync || emailSent
        ? "Viewer registration recorded and synced."
        : "Viewer registration recorded locally. Configure Google Sheets and SMTP for external syncing.",
    });
  } catch (error: any) {
    console.error("[NDA Viewer API] External sync failed:", error);
    return res.json({
      success: true,
      message: "Viewer registration recorded locally. External sync could not be completed.",
    });
  }
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

  const storedMessage: ContactMessageRecord = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    timestamp: new Date().toLocaleString(),
    read: false,
  };

  receivedMessages.unshift(storedMessage);
  if (receivedMessages.length > 50) {
    receivedMessages.length = 50;
  }

  console.log(`[Contact API] Received proposal from ${storedMessage.name} (${storedMessage.email}) - Subject: ${storedMessage.subject}`);

  try {
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

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

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: emailHtml,
      });

      console.log("[Contact API] Mail sent successfully to " + receiverEmail);
      return res.json({
        success: true,
        simulation: false,
        message: "Your proposal was delivered privately to your email inbox.",
        messageId: storedMessage.id,
      });
    }

    const whatsappSent = await sendWhatsAppNotification({
      name: storedMessage.name,
      email: storedMessage.email,
      subject: storedMessage.subject,
      message: storedMessage.message,
    });

    if (whatsappSent) {
      return res.json({
        success: true,
        simulation: false,
        message: "Your proposal was delivered privately to your WhatsApp.",
        messageId: storedMessage.id,
      });
    }

    console.warn("[Contact API] No delivery channel configured. Stored message privately for later setup.");
    return res.json({
      success: true,
      simulation: true,
      message: "Your proposal was received privately and stored. Configure SMTP or WhatsApp credentials to deliver it directly.",
      messageId: storedMessage.id,
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

  await loadNdaViewerRecords();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server is running on http://localhost:${PORT}`);
  });
}

startServer();
