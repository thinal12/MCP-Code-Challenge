import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [email, setEmail] = useState<{ to: string; subject: string; body: string }>({
    to: "",
    subject: "",
    body: "",
  });
  const [status, setStatus] = useState<string>("");

  async function handleAsk() {
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer ?? "No answer received");
    } catch (err: any) {
      setAnswer("Error: " + err.message);
    }
  }

  async function handleEmail() {
    try {
      const res = await fetch("/api/sendEmmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      const data = await res.json();
      setStatus(data.message ?? "Email sent!");
    } catch (err: any) {
      setStatus("Error: " + err.message);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>MCP Playground</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Ask about Resume</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What was my last role?"
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleAsk}>Ask</button>
        <p>
          <b>Answer:</b> {answer}
        </p>
      </section>

      <section>
        <h2>Send Email</h2>
        <input
          type="email"
          placeholder="Recipient"
          value={email.to}
          onChange={(e) => setEmail({ ...email, to: e.target.value })}
          style={{ display: "block", marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={email.subject}
          onChange={(e) => setEmail({ ...email, subject: e.target.value })}
          style={{ display: "block", marginBottom: 10 }}
        />
        <textarea
          placeholder="Body"
          value={email.body}
          onChange={(e) => setEmail({ ...email, body: e.target.value })}
          style={{ display: "block", marginBottom: 10, width: "300px", height: "100px" }}
        />
        <button onClick={handleEmail}>Send Email</button>
        <p>{status}</p>
      </section>
    </div>
  );
}
