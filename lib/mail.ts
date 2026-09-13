import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Create reusable transporter object using SMTP transport
export function getMailTransporter() {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (!user || !pass) {
        console.warn(
            "[Nodemailer] Warning: EMAIL_USER or EMAIL_PASS is not set in environment variables. Email sending may fail."
        );
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });
}

export interface SendBrochureResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

/**
 * Send ICON 2026 Brochure email to the given recipient
 */
export async function sendBrochureEmail(toEmail: string): Promise<SendBrochureResult> {
    const transporter = getMailTransporter();
    const fromAddress =
        process.env.EMAIL_FROM ||
        process.env.SMTP_FROM ||
        (process.env.EMAIL_USER ? `"ICON 2026" <${process.env.EMAIL_USER}>` : '"ICON 2026" <no-reply@icon-fest.com>');

    // Check if any brochure PDF exists in public folder to attach
    const attachments: Array<{ filename: string; path: string }> = [];
    const possiblePdfs = [
        path.join(process.cwd(), "public", "ICON_2026_Brochure.pdf"),
        path.join(process.cwd(), "public", "brochure.pdf"),
        path.join(process.cwd(), "public", "events-brochure.pdf"),
    ];

    for (const pdfPath of possiblePdfs) {
        if (fs.existsSync(pdfPath)) {
            attachments.push({
                filename: "ICON_2026_Brochure.pdf",
                path: pdfPath,
            });
            break;
        }
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ICON 2026 Event Brochure</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0d0f17;
            color: #e2e8f0;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #111827;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #1f2937;
        }
        .header {
            background: linear-gradient(135deg, #0b132b 0%, #1c2541 100%);
            padding: 32px 24px;
            text-align: center;
            border-bottom: 2px solid #06b6d4;
        }
        .logo-text {
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 2px;
            color: #ffffff;
            margin: 0;
        }
        .sub-logo {
            color: #06b6d4;
            font-size: 13px;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-top: 6px;
        }
        .content {
            padding: 32px 24px;
            line-height: 1.6;
            color: #cbd5e1;
        }
        .h1 {
            color: #ffffff;
            font-size: 22px;
            margin-top: 0;
        }
        .card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 16px;
            margin: 16px 0;
        }
        .card-title {
            color: #38bdf8;
            font-weight: bold;
            font-size: 16px;
            margin: 0 0 6px 0;
        }
        .btn {
            display: inline-block;
            background: #06b6d4;
            color: #000000 !important;
            font-weight: bold;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 9999px;
            margin: 24px 0 12px 0;
            text-align: center;
        }
        .footer {
            background: #0a0e1a;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #1e293b;
        }
        .footer a {
            color: #06b6d4;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo-text">ICON 2026</h1>
            <div class="sub-logo">DATATRON • TECHFEST</div>
        </div>
        
        <div class="content">
            <h2 class="h1">Hello! Here is your Event Guide & Brochure</h2>
            <p>
                Thank you for requesting the official brochure for <strong>ICON 2026</strong>, organized by the <strong>Department of Data Science and Technology</strong> at <strong>K J Somaiya Institute of Management</strong>.
            </p>
            
            <p><strong>Dates:</strong> 13th & 14th February 2026<br/>
            <strong>Venue:</strong> K J Somaiya Campus, Vidyavihar, Mumbai</p>

            <h3 style="color: #ffffff; margin-top: 24px; font-size: 18px;">Featured Competitions</h3>
            
            <div class="card">
                <div class="card-title">💻 Technical: CodeIcon Hackathon</div>
                <div style="font-size: 13px; color: #94a3b8;">
                    <strong>Date:</strong> 13 Feb 2026 • <strong>Fee:</strong> ₹500 • <strong>Prize Pool:</strong> ₹22,500<br/>
                    Build innovative data & software solutions in an intense coding showdown.
                </div>
            </div>

            <div class="card">
                <div class="card-title">🔍 Non-Technical: Treasure Hunt & Tech Fair</div>
                <div style="font-size: 13px; color: #94a3b8;">
                    <strong>Treasure Hunt:</strong> 14 Feb 2026 • Fee: ₹250 • Prize: ₹2,000<br/>
                    <strong>Tech Fair:</strong> 13 Feb 2026 • Amphitheatre Showcase
                </div>
            </div>

            <div class="card">
                <div class="card-title">🎮 Gaming & Sports Events</div>
                <div style="font-size: 13px; color: #94a3b8;">
                    Football (₹5,000 Prize) • FIFA (₹2,000 Prize) • Pickleball (₹2,000 Prize) • Chess (₹1,000 Prize)
                </div>
            </div>

            <div style="text-align: center;">
                <a href="http://localhost:3000/#register" class="btn">Register for Events</a>
            </div>

            <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 16px;">
                Have questions? Reach out to us at <a href="mailto:icon.simsr@somaiya.edu" style="color: #06b6d4;">icon.simsr@somaiya.edu</a>
            </p>
        </div>

        <div class="footer">
            <p>© 2026 Department of Data Science and Technology, K J Somaiya Institute of Management.</p>
            <p>All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`;

    const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject: "ICON 2026 Official Event Brochure & Schedule",
        text: `Thank you for your interest in ICON 2026!\n\nEvents Date: 13th & 14th February 2026\nVenue: K J Somaiya Institute of Management, Mumbai\n\nFeatured Events:\n- CodeIcon Hackathon (Prize: ₹22,500)\n- Treasure Hunt & Tech Fair\n- Football, FIFA, Pickleball, Chess\n\nRegister online at our portal or contact us at icon.simsr@somaiya.edu`,
        html: htmlContent,
        attachments,
    });

    return {
        success: true,
        messageId: info.messageId,
    };
}
