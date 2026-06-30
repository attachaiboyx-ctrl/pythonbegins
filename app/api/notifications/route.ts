import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ notifications: [] }, { status: 401 });
  }

  const notifications = await prisma.userNotification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      id: true,
      title: true,
      message: true,
      link: true,
      type: true,
      isRead: true,
      createdAt: true
    }
  });

  return NextResponse.json({ notifications });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { ids?: unknown; markAllRead?: unknown };

  try {
    body = (await request.json()) as { ids?: unknown; markAllRead?: unknown };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ids = Array.isArray(body.ids)
    ? body.ids.filter((id): id is string => typeof id === "string" && id.length > 0)
    : [];
  const shouldMarkAllRead = body.markAllRead === true;

  if (!shouldMarkAllRead && ids.length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await prisma.userNotification.updateMany({
    where: {
      userId: user.id,
      isRead: false,
      ...(shouldMarkAllRead ? {} : { id: { in: ids } })
    },
    data: {
      isRead: true,
      readAt: new Date()
    }
  });

  return NextResponse.json({ ok: true });
}
