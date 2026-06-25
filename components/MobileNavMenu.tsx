"use client";

import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogIn,
  Menu,
  Settings,
  Shield,
  UserPlus,
  X
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { StatusBadge } from "@/components/StatusBadge";
import type { CurrentUser } from "@/lib/session";

type MobileNavMenuProps = {
  user: CurrentUser | null;
};

type MobileMenuLinkProps = {
  children: ReactNode;
  href: string;
  onNavigate: () => void;
  primary?: boolean;
};

function MobileMenuLink({
  children,
  href,
  onNavigate,
  primary = false
}: MobileMenuLinkProps) {
  return (
    <Link
      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-black transition ${
        primary
          ? "bg-gradient-to-r from-brand-600 to-lavender-600 text-white shadow-lg shadow-blue-600/20"
          : "text-slate-700 hover:bg-brand-50 hover:text-brand-700"
      }`}
      href={href}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

export function MobileNavMenu({ user }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative flex items-center gap-2 lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-14 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-blue-600/15"
          id="mobile-navigation"
        >
          <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50 to-lavender-50 p-4">
            {user ? (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-ink">{user.name}</p>
                  <p className="mt-1 truncate text-xs font-bold text-slate-500">
                    {user.email}
                  </p>
                </div>
                <StatusBadge compact membership={user.membership} role={user.role} />
              </div>
            ) : (
              <div>
                <p className="text-sm font-black text-ink">Python Begins</p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  เริ่มเรียน Python ตั้งแต่พื้นฐาน
                </p>
              </div>
            )}
          </div>

          <nav className="grid gap-1 p-2">
            <MobileMenuLink href="/lessons" onNavigate={closeMenu}>
              <BookOpen className="h-4 w-4" />
              หลักสูตร
            </MobileMenuLink>

            {user ? (
              <>
                <MobileMenuLink href="/dashboard" onNavigate={closeMenu}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </MobileMenuLink>
                <MobileMenuLink href="/settings" onNavigate={closeMenu}>
                  <Settings className="h-4 w-4" />
                  ตั้งค่า
                </MobileMenuLink>
                <MobileMenuLink href="/payment" onNavigate={closeMenu}>
                  <CreditCard className="h-4 w-4" />
                  ชำระเงิน
                </MobileMenuLink>
                <MobileMenuLink href="/help" onNavigate={closeMenu}>
                  <HelpCircle className="h-4 w-4" />
                  ช่วยเหลือ / FAQ
                </MobileMenuLink>
                {user.role === "admin" ? (
                  <MobileMenuLink href="/admin" onNavigate={closeMenu}>
                    <Shield className="h-4 w-4" />
                    Admin
                  </MobileMenuLink>
                ) : null}
                <LogoutButton variant="mobile" />
              </>
            ) : (
              <>
                <MobileMenuLink href="/help" onNavigate={closeMenu}>
                  <HelpCircle className="h-4 w-4" />
                  ช่วยเหลือ / FAQ
                </MobileMenuLink>
                <MobileMenuLink href="/login" onNavigate={closeMenu}>
                  <LogIn className="h-4 w-4" />
                  Login
                </MobileMenuLink>
                <MobileMenuLink href="/register" onNavigate={closeMenu} primary>
                  <UserPlus className="h-4 w-4" />
                  Register
                </MobileMenuLink>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
