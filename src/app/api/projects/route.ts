import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ projects: [] });
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { assets: true },
    }).catch(() => []);

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title = "Untitled Reel", description = "" } = body;

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        project: {
          id: `proj-${Date.now()}`,
          title,
          description,
          status: "draft",
          createdAt: new Date().toISOString(),
        },
      });
    }

    let user = await prisma.user.findFirst().catch(() => null);
    if (!user) {
      user = await prisma.user
        .create({
          data: {
            name: "NDStudio Creator",
            email: "creator@ndstudio.ai",
          },
        })
        .catch(() => null);
    }

    if (user) {
      const project = await prisma.project.create({
        data: {
          userId: user.id,
          title,
          description,
          status: "draft",
        },
      });
      return NextResponse.json({ success: true, project });
    }

    return NextResponse.json({
      success: true,
      project: {
        id: `proj-${Date.now()}`,
        title,
        description,
        status: "draft",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      project: {
        id: `proj-${Date.now()}`,
        title: "Untitled Reel",
        description: "",
        status: "draft",
      },
    });
  }
}
