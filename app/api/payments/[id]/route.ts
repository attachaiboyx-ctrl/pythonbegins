import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { id } = await params;
  const transaction = await prisma.paymentTransaction.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      status: true,
      paidAt: true,
      updatedAt: true
    }
  });

  if (!transaction || (transaction.userId !== user.id && user.role !== "admin")) {
    return NextResponse.json(
      { error: "not_found" },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      id: transaction.id,
      status: transaction.status,
      paidAt: transaction.paidAt,
      updatedAt: transaction.updatedAt
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
