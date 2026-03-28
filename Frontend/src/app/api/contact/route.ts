
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this exists, verify later or use direct import if needed
import nodemailer from 'nodemailer';

// If @/lib/prisma doesn't exist, we might need to fix this import.
// Usually standard Next.js prisma setup is in lib/prisma.ts or db.ts.
// I'll assume standard, if error, I'll fix.

import { getSupportEmailTemplate } from '@/lib/templates/supportEmail';
import { getPartnershipEmailTemplate } from '@/lib/templates/partnershipEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      message,
      source = 'SUPPORT', // Default to SUPPORT
      company,
      phone,
      type
    } = body;

    // Common Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare DB Data and Email Content based on Source
    let dbMessage = message;
    let emailContent;

    if (source === 'PARTNERSHIP') {
      // For Partnership: Combine extra fields into DB message
      dbMessage = `
[YÊU CẦU HỢP TÁC]
Công ty: ${company || 'N/A'}
SĐT: ${phone || 'N/A'}
Loại hình: ${type || 'N/A'}
----------------
Nội dung:
${message}
      `.trim();

      // Use Partnership Template
      emailContent = getPartnershipEmailTemplate(
        name,
        email,
        company || 'N/A',
        phone || 'N/A',
        type || 'N/A',
        message
      );

    } else {
      // For Support: Use Standard Template
      emailContent = getSupportEmailTemplate(name, email, message);
    }

    // 1. Save to Database
    try {
      const ticket = await prisma.supportRequest.create({
        data: {
          name,
          email,
          message: dbMessage, // Store combined string
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
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Send using the selected content
        await transporter.sendMail({
          from: `"Food Rescue Support" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || "admin@foodrescue.vn",
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html,
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
