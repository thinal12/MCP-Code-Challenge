"use client";

import { useState } from "react";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [status, setStatus] = useState("");

  async function handleAsk() {
    try {
      const res = await fetch("http://localhost:3001/api/resume_info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer ?? "No answer received");
    } catch (error) {
      setAnswer("Error: " + error.message);
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
      setStatus(data.message ?? "Email sent!");
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  }

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
            style={{ width: "100%", border: "1px solid #ddd", marginBottom: 10 }}
          />
          <button onClick={handleAsk} style={{ marginBottom: 10 }}>
            Ask
          </button>
          <p>
            <b>Answer:</b> {answer}
          </p>
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
          <input
            type="email"
            placeholder="Recipient"
            value={email.to}
            onChange={(e) => setEmail({ ...email, to: e.target.value })}
            style={{ display: "block", width: "100%", border: "1px solid #ddd", marginBottom: 10 }}
          />
          <input
            type="text"
            placeholder="Subject"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            style={{ display: "block", width: "100%", border: "1px solid #ddd", marginBottom: 10 }}
          />
          <textarea
            placeholder="Body"
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            style={{
              display: "block",
              width: "100%",
              height: "100px",
              marginBottom: 10,
              border: "1px solid #ddd"
            }}
          />
          <button onClick={handleEmail} style={{ marginBottom: 10 }}>
            Send Email
          </button>
          <p>{status}</p>
        </section>
      </div>
    </div>
  );
}
