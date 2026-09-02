import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { assets: true },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    // Check if user exists, else fallback or create sample
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "NDStudio Creator",
          email: "creator@ndstudio.ai",
        },
      });
    }

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        title: title || "Untitled Reel",
        description: description || "",
        status: "draft",
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
