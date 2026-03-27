import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expires < new Date()) {
    await prisma.session.delete({
      where: { sessionToken },
    });
    return null;
  }

  return session.user;
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    user,
  };
}
