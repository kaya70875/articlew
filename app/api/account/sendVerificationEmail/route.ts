import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { emailTemplate } from "@/components/email/EmailTemplate";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  // Validate email format
  if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Generate a JWT token
  const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET as string, {
    expiresIn: "1h",
  });

  // Create a reset link with the token
  const verifyLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/account/verifyAccount?token=${token}`;

  try {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Articlew Account",
      html: emailTemplate(verifyLink),
    });

    return NextResponse.json(
      { message: "Verify email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending verify email:", error);
    return NextResponse.json(
      { error: "Failed to send verify email" },
      { status: 500 }
    );
  }
}
