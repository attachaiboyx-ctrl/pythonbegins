import Link from "next/link";
import { BookOpen, CreditCard, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/session";
import { StatusBadge } from "@/components/StatusBadge";

export async function NavBar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
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

        <nav className="flex w-full flex-wrap items-center gap-2 text-sm font-bold text-slate-700 sm:w-auto sm:justify-end">
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
              <StatusBadge
                compact
                membership={user.membership}
                role={user.role}
              />
              <form action={logoutAction}>
                <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                  <LogOut className="h-4 w-4" />
                  ออกจากระบบ
                </button>
              </form>
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
      </div>
    </header>
  );
}
