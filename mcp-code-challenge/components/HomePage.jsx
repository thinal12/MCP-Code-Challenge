"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    body: "",
  });

  async function handleAsk() {
    try {
      const res = await fetch("http://localhost:3001/api/resume_info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer ?? "No answer received");
      toast.success("Answer received!");
    } catch (error) {
      setAnswer("Error: " + error.message);
      toast.error("Failed to fetch answer");
    }
  }

  async function handleEmail() {
    try {
      const res = await fetch("http://localhost:3001/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      const data = await res.json();
      toast.success(data.message ?? "Email sent!");
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  }

  const fieldStyle = {
    display: "block",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: 10,
    padding: "8px",
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Arial",
        background: "white",
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Toaster position="top-center" />

      <div style={{ display: "flex", gap: "40px" }}>
        <section
          style={{
            flex: 1,
            padding: "20px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Ask about Resume</h2>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask any question"
            style={fieldStyle}
          />
          <button
            onClick={handleAsk}
            style={{
              marginBottom: 10,
              borderRadius: "8px",
              backgroundColor: "black",
              color: "white",
              padding: "8px 12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Ask
          </button>
          <label style={{ display: "block", marginBottom: 5 }}>
            <b>Answer:</b>
          </label>
          <textarea
            value={answer}
            readOnly
            style={{
              ...fieldStyle,
              height: "100px",
              resize: "none",
            }}
          />
        </section>

        <section
          style={{
            flex: 1,
            padding: "20px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Send Email</h2>

          <label style={{ display: "block", marginBottom: 5 }}>Recipient</label>
          <input
            type="email"
            value={email.to}
            onChange={(e) => setEmail({ ...email, to: e.target.value })}
            style={fieldStyle}
          />

          <label style={{ display: "block", marginBottom: 5 }}>Subject</label>
          <input
            type="text"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            style={fieldStyle}
          />

          <label style={{ display: "block", marginBottom: 5 }}>Body</label>
          <textarea
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            style={{ ...fieldStyle, height: "100px" }}
          />

          <button
            onClick={handleEmail}
            style={{
              marginBottom: 10,
              borderRadius: "8px",
              backgroundColor: "black",
              color: "white",
              padding: "8px 12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send Email
          </button>
        </section>
      </div>
    </div>
  );
}
