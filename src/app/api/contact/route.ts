import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  fullName: string;
  email: string;
  institution: string;
  inquiryType: string;
  subject: string;
  message: string;
}

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "drjjosephine@gmail.com";
const RECIPIENT_WHATSAPP = process.env.CONTACT_RECIPIENT_WHATSAPP || "919940706395";

export async function POST(req: Request) {
  try {
    const body: ContactPayload = await req.json();

    const { fullName, email, institution, inquiryType, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    // Generate formatted WhatsApp URL for the inquiry
    const whatsappMessage = 
`*Academic Inquiry - Dr. Josephine Selle Jeyanathan*
*From:* ${fullName}
*Email:* ${email}
*Institution:* ${institution || "Not specified"}
*Nature:* ${inquiryType || "General Inquiry"}
*Subject:* ${subject}

*Details:*
${message}`;

    const whatsappUrl = `https://wa.me/${RECIPIENT_WHATSAPP}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Check if SMTP environment variables are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    let emailSent = false;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // 1. Send notification to Dr. Josephine Selle Jeyanathan
        await transporter.sendMail({
          from: `"Academic Portfolio" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject} - ${fullName} (${institution})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #ebe4d8; border-radius: 16px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #0d6e48; padding-bottom: 16px; margin-bottom: 20px;">
                <span style="display: inline-block; padding: 4px 12px; background-color: #0d6e4815; color: #0d6e48; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                  New Academic Inquiry
                </span>
                <h2 style="margin: 8px 0 0 0; color: #132b20; font-size: 20px; font-weight: 800;">
                  ${subject}
                </h2>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
                <tr>
                  <td style="padding: 8px 0; color: #5c6b60; width: 140px;"><strong>Sender Name:</strong></td>
                  <td style="padding: 8px 0; color: #1c2b22; font-weight: 600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5c6b60;"><strong>Email Address:</strong></td>
                  <td style="padding: 8px 0; color: #0d6e48; font-weight: 600;"><a href="mailto:${email}" style="color: #0d6e48; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5c6b60;"><strong>Affiliation:</strong></td>
                  <td style="padding: 8px 0; color: #1c2b22;">${institution}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5c6b60;"><strong>Inquiry Scope:</strong></td>
                  <td style="padding: 8px 0; color: #1c2b22; font-weight: 600;">${inquiryType}</td>
                </tr>
              </table>

              <div style="background-color: #faf6ee; padding: 16px; border-radius: 12px; border-left: 4px solid #0d6e48; margin-bottom: 24px;">
                <h4 style="margin: 0 0 8px 0; color: #132b20; font-size: 13px; font-weight: 700;">Collaboration / Inquiry Details:</h4>
                <p style="margin: 0; color: #1c2b22; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="font-size: 11px; color: #5c6b60; border-top: 1px solid #ebe4d8; padding-top: 16px;">
                Transmitted via Dr. Josephine Selle Jeyanathan Official Academic Portfolio • Kalasalingam Academy of Research and Education
              </div>
            </div>
          `,
        });

        // 2. Send professional auto-acknowledgment to sender
        await transporter.sendMail({
          from: `"Dr. Josephine Selle Jeyanathan" <${smtpUser}>`,
          to: email,
          subject: `Acknowledgment: Academic Inquiry Received - Dr. Josephine Selle Jeyanathan`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #ebe4d8; border-radius: 16px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #0d6e48; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #132b20; font-size: 18px; font-weight: 800;">
                  Thank You for Reviewing the Academic Portfolio
                </h2>
                <p style="margin: 6px 0 0 0; color: #5c6b60; font-size: 12px;">
                  Dr. Josephine Selle Jeyanathan • Associate Professor, Kalasalingam Academy of Research and Education
                </p>
              </div>

              <p style="font-size: 13px; color: #1c2b22; line-height: 1.6;">
                Dear <strong>${fullName}</strong>,
              </p>

              <p style="font-size: 13px; color: #1c2b22; line-height: 1.6;">
                Thank you for reviewing Dr. Josephine Selle Jeyanathan's academic portfolio and transmitting your inquiry regarding <strong>"${subject}"</strong>.
              </p>

              <div style="background-color: #faf6ee; padding: 14px 18px; border-radius: 12px; border: 1px solid #ebe4d8; margin: 18px 0; font-size: 12px; color: #1c2b22;">
                <strong>Inquiry Registered:</strong> ${inquiryType}<br/>
                <strong>Recipient Mailbox:</strong> drjjosephine@gmail.com<br/>
                <strong>Status:</strong> Queued for academic evaluation & reply
              </div>

              <p style="font-size: 13px; color: #1c2b22; line-height: 1.6;">
                Dr. Josephine will review your correspondence and transmit an official response to this email address shortly.
              </p>

              <p style="font-size: 13px; color: #1c2b22; line-height: 1.6; margin-top: 24px;">
                With academic regards,<br/>
                <strong>Office of Dr. Josephine Selle Jeyanathan</strong><br/>
                <span style="font-size: 11px; color: #5c6b60;">Associate Professor, ECE Department<br/>Kalasalingam Academy of Research and Education, Tamil Nadu, India</span>
              </p>
            </div>
          `,
        });

        emailSent = true;
      } catch (mailErr) {
        console.error("Nodemailer SMTP Error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      recipientEmail: RECIPIENT_EMAIL,
      recipientWhatsApp: RECIPIENT_WHATSAPP,
      whatsappUrl,
      message: "Academic inquiry registered successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing inquiry." },
      { status: 500 }
    );
  }
}
