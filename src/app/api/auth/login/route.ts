import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

interface DBUser {
    id: string;
    email: string;
    password: string;
    name?: string;
    role: "USER" | "ADMIN" | "COMPANY";
}

// POST /api/auth/login
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await db.user.findUnique({
            where: { email },
        }) as DBUser | null;

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = await signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        setAuthCookie(token);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
