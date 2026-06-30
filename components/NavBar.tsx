import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  LayoutDashboard,
  Radio,
  Settings,
  Shield
} from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { LogoutButton } from "@/components/LogoutButton";
import { MobileNavMenu } from "@/components/MobileNavMenu";
import { PremiumNotificationBell } from "@/components/PremiumNotificationBell";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";

export async function NavBar() {
  const user = await getCurrentUser();
  const initialNotifications = user
    ? await prisma.userNotification.findMany({
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
      })
    : [];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-11 w-auto"
          />
          <span className="min-w-0">
            <span className="block truncate text-base font-black text-ink sm:text-lg">
              Python Begins
            </span>
            <span className="hidden text-xs font-bold text-slate-500 sm:block">
              เรียนเขียนโปรแกรมตั้งแต่ศูนย์
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-bold text-slate-700 lg:flex">
          <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700" href="/lessons">
            <BookOpen className="h-4 w-4" />
            หลักสูตร
          </Link>

          {user ? (
            <>
              <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700" href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700" href="/live">
                <Radio className="h-4 w-4" />
                ห้องเรียนสด
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700" href="/settings">
                <Settings className="h-4 w-4" />
                ตั้งค่า
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700" href="/payment">
                <CreditCard className="h-4 w-4" />
                ชำระเงิน
              </Link>
              {user.role === "admin" ? (
                <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700" href="/admin">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              ) : null}
            </>
          ) : (
            <div className="ml-auto flex items-center gap-2 sm:ml-0">
              <Link className="rounded-lg px-4 py-2 hover:bg-brand-50 hover:text-brand-700" href="/login">
                Login
              </Link>
              <Link className="btn-primary px-4 py-2" href="/register">
                Register
              </Link>
            </div>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <PremiumNotificationBell
                initialNotifications={initialNotifications.map((notification) => ({
                  ...notification,
                  createdAt: notification.createdAt.toISOString()
                }))}
                membership={user.membership}
                role={user.role}
                userId={user.id}
              />
              <div className="hidden items-center gap-2 lg:flex">
                <StatusBadge
                  compact
                  membership={user.membership}
                  role={user.role}
                />
                <LogoutButton />
              </div>
            </>
          ) : null}
          <MobileNavMenu user={user} />
        </div>
      </div>
    </header>
  );
}
