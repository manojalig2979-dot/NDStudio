import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  // In development, find or create an admin user
  let user = await prisma.user.findFirst();
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "NDStudio SuperAdmin",
        email: "admin@ndstudio.ai",
      },
    });
  }

  return user;
}
