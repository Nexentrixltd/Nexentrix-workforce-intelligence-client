import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (sessionToken) {
    await prisma.session.delete({
      where: { sessionToken },
    });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("sessionToken", "", {
    expires: new Date(0),
  });

  return response;
}