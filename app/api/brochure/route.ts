import { NextRequest, NextResponse } from "next/server";
import { sendBrochureEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Valid email address is required",
                },
                { status: 400 }
            );
        }

        // Basic email regex format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address",
                },
                { status: 400 }
            );
        }

        // Check if SMTP is configured
        if (!process.env.EMAIL_USER && !process.env.SMTP_USER) {
            console.warn(
                "[Nodemailer] Warning: Neither EMAIL_USER nor SMTP_USER is configured in environment variables."
            );
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Email service is not configured yet. Please set EMAIL_USER and EMAIL_PASS in .env.local",
                },
                { status: 503 }
            );
        }

        const result = await sendBrochureEmail(email.trim());

        return NextResponse.json({
            success: true,
            message: "Brochure sent successfully! Please check your inbox.",
            messageId: result.messageId,
        });
    } catch (error: unknown) {
        console.error("Error sending brochure email:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Failed to send email";

        return NextResponse.json(
            {
                success: false,
                message: `Failed to send email: ${errorMessage}`,
            },
            { status: 500 }
        );
    }
}
