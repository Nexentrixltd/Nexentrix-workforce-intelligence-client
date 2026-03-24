import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

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
