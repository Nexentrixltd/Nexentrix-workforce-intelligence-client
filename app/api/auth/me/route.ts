import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            department: true,
            departmentId: true,
            emailVerified: true,
            isFirstLogin: true,
            remember: true,
            sessions: true,
          },
        },
      },
    });

    if (!session || session.expires < new Date()) {
      const res = NextResponse.json(
        { error: "Session expired" },
        { status: 401 },
      );

      res.cookies.set("sessionToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      });

      return res;
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    console.error("[AUTH_ME_GET]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
