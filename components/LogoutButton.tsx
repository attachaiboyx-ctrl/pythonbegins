"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

type LogoutButtonProps = {
  variant?: "desktop" | "mobile";
};

export function LogoutButton({ variant = "desktop" }: LogoutButtonProps) {
  const buttonClassName =
    variant === "mobile"
      ? "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
      : "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900";

  return (
    <form action={logoutAction}>
      <button className={buttonClassName} type="submit">
        <LogOut className="h-4 w-4" />
        ออกจากระบบ
      </button>
    </form>
  );
}
