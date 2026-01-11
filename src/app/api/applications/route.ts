import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const session = await getSession();
        
        if (!session) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const applications = await db.application.findMany({
            where: { userId: session.userId },
            include: {
                job: {
                    include: {
                        company: {
                            select: {
                                id: true,
                                name: true,
                                logoUrl: true,
                            },
                        },
                    },
                },
            },
            orderBy: { submittedAt: "desc" },
        });

        return NextResponse.json({
            success: true,
            applications,
        });
    } catch (error) {
        console.error("Get applications error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}