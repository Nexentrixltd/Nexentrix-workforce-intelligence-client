import { requireRole } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireRole(["ADMIN"]);

  if (!auth.ok) return auth.response;

  return NextResponse.json({
    message: "Allowed data",
    user: auth.user,
  });
}
