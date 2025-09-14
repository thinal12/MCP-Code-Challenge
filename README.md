# MCP Code Challenge

## Prerequisites

Before running the project, you need API keys for Gemini (Google Generative AI) and Resend (email service).

### 1. Get a Gemini API Key

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
- Sign in with your Google account.
- Click "Create API Key" and copy the generated key.

### 2. Get a Resend API Key

- Go to [Resend](https://resend.com/) and sign up.
- After verifying your email, go to the [API Keys](https://resend.com/api-keys) section.
- Click "Create API Key" and copy the key.
- For SMTP, use the credentials provided in your Resend dashboard (host, user, password).

### 3. Configure Environment Variables

Create a `.env` file in the `mcp-server` directory:

```env
PORT=3001
GEMINI_API_KEY=your-gemini-api-key-here
EMAIL_PASS=your-resend-smtp-password-here // will be the token value of the api key
```

## Start the Server and Frontend

To start the backend server:

```sh
npm run server
```

To start the next.js frontend:

```sh
 npm run frontend
```

- The frontend will run on [http://localhost:3000](http://localhost:3000).

These commands will also install all dependencies.
- 
