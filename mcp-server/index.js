import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { ResumeInfo } from "./tools/ResumeInfo.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

let resumeText = "";

async function loadResume() {
  if (!resumeText) {
    try {
      
      resumeText = ResumeInfo();
      console.log("✅ Resume loaded successfully");
    } catch (err) {
      console.error("❌ Failed to load resume:", err);
    }
  }
  return resumeText;
}

app.post("/api/resume_info", async (req, res) => {
  const { question } = req.body;
  const text = await loadResume();

  let answer = "I couldn’t find an answer in the resume.";

  if (question.toLowerCase().includes("last position")) {
    const match = text.match(/([^\n]*?(?:Manager|Engineer|Developer|Intern)[^\n]*)/i);
    if (match) {
      answer = match[0];
    }
  }

  res.json({ answer });
});

app.post("/api/send_email", async (req, res) => {
  const { recipient, subject, body } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      text: body
    });

    res.json({ status: "sent", recipient });
  } catch (error) {
    console.error("Email send failed:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
