
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this exists, verify later or use direct import if needed
import nodemailer from 'nodemailer';

// If @/lib/prisma doesn't exist, we might need to fix this import.
// Usually standard Next.js prisma setup is in lib/prisma.ts or db.ts.
// I'll assume standard, if error, I'll fix.

import { getSupportEmailTemplate } from '@/lib/templates/supportEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Save to Database
    try {
      const ticket = await prisma.supportRequest.create({
        data: {
          name,
          email,
          message,
          status: 'PENDING'
        }
      });
      console.log("Saved to DB:", ticket.id);
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
    }

    // 2. Send Email
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const { subject, text, html } = getSupportEmailTemplate(name, email, message);

        await transporter.sendMail({
          from: `"Food Rescue Support" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || "admin@foodrescue.vn",
          subject,
          text,
          html,
        });
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Email Error:", emailError);
      }
    } else {
      console.warn("SMTP credentials missing. Skipping email.");
    }

    return NextResponse.json({ success: true, message: "Request received" });

  } catch (error) {
    console.error("Handler Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
