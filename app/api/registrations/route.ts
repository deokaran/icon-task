import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/registration";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            name,
            email,
            phone,
            college,
            course,
            year,
            event,
        } = body;

        if (
            !name ||
            !email ||
            !phone ||
            !college ||
            !course ||
            !year ||
            !event
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const registration = await Registration.create({
            name,
            email,
            phone,
            college,
            course,
            year,
            event,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                registration,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}