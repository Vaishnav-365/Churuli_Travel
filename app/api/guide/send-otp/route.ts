// app/api/guide/send-otp/route.ts
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return Response.json({ error: "Email required" }, { status: 400 });

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes

  // Upsert OTP in DB (works for first time and resend)
  await prisma.emailOTP.upsert({
    where: { email },
    update: { otp, expiresAt, verified: false },
    create: { email, otp, expiresAt },
  });

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Guide Verify" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

