import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ResumeInfo } from "./tools/ResumeInfo.js";
import { createServer } from "http";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SendEmail } from "./tools/SendEmail.js";

dotenv.config();
const app = express();
app.use(cors());
const server = createServer(app);
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/send_email", async (req, res) => {
  console.log(req.body);
  const { to, subject, body } = req.body;

  try {
    await SendEmail(to, subject, body);
    res.json({ status: "sent", to });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
