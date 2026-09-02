import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const users = [
      {
        id: "usr-1",
        name: "Aarav Sharma",
        email: "aarav@creator.studio",
        role: "USER",
        plan: "PRO CREATOR",
        creditsRemaining: 1850,
        projectsCount: 24,
        rendersCount: 42,
        joinedAt: "2026-08-15",
      },
      {
        id: "usr-2",
        name: "Priya Patel",
        email: "priya.p@socialmedia.in",
        role: "USER",
        plan: "STARTER",
        creditsRemaining: 340,
        projectsCount: 8,
        rendersCount: 14,
        joinedAt: "2026-08-20",
      },
      {
        id: "usr-3",
        name: "Vikram Malhotra",
        email: "vikram@ndstudio.ai",
        role: "ADMIN",
        plan: "ENTERPRISE",
        creditsRemaining: 99999,
        projectsCount: 156,
        rendersCount: 312,
        joinedAt: "2026-08-01",
      },
      {
        id: "usr-4",
        name: "Rohan Verma",
        email: "rohan@mythologyreels.com",
        role: "USER",
        plan: "PRO CREATOR",
        creditsRemaining: 2400,
        projectsCount: 38,
        rendersCount: 76,
        joinedAt: "2026-08-22",
      },
      {
        id: "usr-5",
        name: "Ananya Deshmukh",
        email: "ananya@gitaquotes.org",
        role: "USER",
        plan: "CREATOR",
        creditsRemaining: 890,
        projectsCount: 19,
        rendersCount: 35,
        joinedAt: "2026-08-29",
      },
    ];

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
