import "server-only";
import nodemailer from "nodemailer";

export function getMailTransporter() {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || "465");
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    const user =
        process.env.SMTP_USER ||
        process.env.EMAIL_USER;

    const pass =
        process.env.SMTP_PASS ||
        process.env.EMAIL_PASS;

    if (!user || !pass) {
        throw new Error("SMTP credentials are not configured");
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

export async function sendBrochureEmail(toEmail: string) {
    const transporter = getMailTransporter();

    const fromAddress =
        process.env.SMTP_FROM ||
        process.env.EMAIL_FROM ||
        process.env.EMAIL_USER;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ICON 2026 Event Brochure</title>
</head>

<body style="font-family: Arial, sans-serif; background:#0d0f17; color:#e2e8f0; padding:20px;">
    <div style="max-width:600px;margin:auto;background:#111827;padding:30px;border-radius:16px;">
        <h1 style="color:white;text-align:center;">ICON 2026</h1>

        <p>
            Thank you for requesting the official brochure for
            <strong>ICON 2026</strong>.
        </p>

        <p>
            <strong>Dates:</strong> 13th & 14th February 2026<br/>
            <strong>Venue:</strong> K J Somaiya Campus, Vidyavihar, Mumbai
        </p>

        <h2 style="color:white;">Featured Competitions</h2>

        <p>
            <strong>CodeIcon Hackathon</strong><br/>
            Prize Pool: ₹22,500
        </p>

        <p>
            <strong>Treasure Hunt & Tech Fair</strong>
        </p>

        <p>
            <strong>Gaming & Sports</strong><br/>
            Football • FIFA • Pickleball • Chess
        </p>

        <p style="text-align:center;margin-top:30px;">
            <a
                href="https://YOUR-NETLIFY-SITE.netlify.app/#register"
                style="background:#06b6d4;color:#000;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:bold;"
            >
                Register for Events
            </a>
        </p>

        <p style="font-size:13px;color:#94a3b8;text-align:center;">
            Contact: icon.simsr@somaiya.edu
        </p>
    </div>
</body>
</html>
`;

    const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject: "ICON 2026 Official Event Brochure & Schedule",
        text: `Thank you for your interest in ICON 2026!

Events Date: 13th & 14th February 2026
Venue: K J Somaiya Institute of Management, Mumbai

Featured Events:
- CodeIcon Hackathon
- Treasure Hunt & Tech Fair
- Football
- FIFA
- Pickleball
- Chess`,
        html: htmlContent,
    });

    return {
        success: true,
        messageId: info.messageId,
    };
}