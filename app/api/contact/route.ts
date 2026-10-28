 import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const BUSINESS_NAME = "Nidhi Birds Service";
const BUSINESS_EMAIL = "mk7810209@gmail.com";
const BUSINESS_PHONE = "+91 8603237881";
const WEBSITE_URL = "https://nidhibirdservice.in";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const location = String(body.location || "").trim();

    // Validate contact form
    if (!name || !phone || !location) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, phone and location are required.",
        },
        { status: 400 }
      );
    }

    // Check Gmail configuration
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Gmail environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    // Configure Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Escape user-submitted values before inserting them into HTML
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeLocation = escapeHtml(location);

    // Send lead notification email
    await transporter.sendMail({
      from: `"${BUSINESS_NAME} Website" <${gmailUser}>`,
      to: process.env.CONTACT_RECEIVER || BUSINESS_EMAIL,
      replyTo: gmailUser,
      subject: `New Website Lead - ${name}`,

      text: `
New Website Lead - ${BUSINESS_NAME}

Name: ${name}
Phone: ${phone}
Location: ${location}

Business Phone: ${BUSINESS_PHONE}
Business Email: ${BUSINESS_EMAIL}
Website: ${WEBSITE_URL}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #222;">

          <h2 style="color: #ea580c;">
            New Website Lead
          </h2>

          <p>
            Someone submitted the contact form on the
            ${BUSINESS_NAME} website.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">
                <strong>Customer Name</strong>
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${safeName}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">
                <strong>Customer Phone</strong>
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${safePhone}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">
                <strong>Customer Location</strong>
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${safeLocation}
              </td>
            </tr>
          </table>

          <h3 style="margin-top: 24px;">Business Contact Details</h3>

          <p>
            <strong>Business:</strong> ${BUSINESS_NAME}
          </p>

          <p>
            <strong>Phone:</strong>
            <a href="tel:+918603237881">${BUSINESS_PHONE}</a>
          </p>

          <p>
            <strong>WhatsApp:</strong>
            <a href="https://wa.me/918603237881">Chat on WhatsApp</a>
          </p>

          <p>
            <strong>Email:</strong>
            <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a>
          </p>

          <p>
            <strong>Website:</strong>
            <a href="${WEBSITE_URL}">${WEBSITE_URL}</a>
          </p>

        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
