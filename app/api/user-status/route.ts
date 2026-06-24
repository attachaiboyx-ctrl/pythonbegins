import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { isAuthenticated: false, role: null, isPremium: false },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      isAuthenticated: true,
      role: user.role,
      membership: user.membership,
      isPremium: user.membership === "paid" || user.role === "admin"
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
