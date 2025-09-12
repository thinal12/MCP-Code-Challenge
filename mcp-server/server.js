import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { ResumeInfo } from "./tools/ResumeInfo.js";
import { createServer } from "http"; 
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
const server = createServer(app);
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI("AIzaSyD4DizdDhcDo86Ezfeld4no8rcfaViEjZI");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let resumeText = "";

async function loadResume() {
  if (!resumeText) {
    try {
      resumeText = await ResumeInfo();
    } catch (error) {
      console.error(error);
    }
  }
  return resumeText;
}

app.post("/api/resume_info", async (req, res) => {
  try {
    const { question } = req.body;
    const text = await loadResume();

    const prompt = `
      Answer the user's question using only the information in this resume.

      Resume:
      ${text}

      Question:
      ${question}
          `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/send_email", async (req, res) => {
  console.log(req.body);
  const { to, subject, body } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: "resend",
        pass: "re_T1G2m3fx_V3ZSnpfNArdw4LW7bdYodJ3F",
      },
    });

    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      text: body,
    });

    res.json({ status: "sent", to});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
