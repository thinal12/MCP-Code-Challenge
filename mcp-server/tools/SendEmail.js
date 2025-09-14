import nodemailer from "nodemailer";

export async function SendEmail(to, subject, body) {
  let transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 587,
        secure: false,
        auth: {
          user: "resend",
          pass: process.env.EMAIL_PASS,
        },
      });
  
      await transporter.sendMail({
        from: "onboarding@resend.dev",
        to: to,
        subject: subject,
        text: body,
      });
}
