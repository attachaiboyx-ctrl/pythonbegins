import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import {
  changePasswordAction,
  updateDisplayNameAction
} from "@/app/actions/settings";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "ตั้งค่าบัญชี | Python Begins",
  description: "จัดการข้อมูลบัญชี เปลี่ยนชื่อที่แสดง และเปลี่ยนรหัสผ่านของผู้เรียน Python Begins"
};

function formatThaiDate(date: Date) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium"
  }).format(date);
}

function membershipLabel(membership: string, role: string) {
  if (membership === "paid" || role === "admin") {
    return "Premium";
  }

  return "Free";
}

export default async function SettingsPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const query = await searchParams;
  const currentUser = await requireUser();
  const account = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      membership: true,
      createdAt: true
    }
  });

  if (!account) {
    return null;
  }

  const statusLabel = membershipLabel(account.membership, account.role);

  return (
    <div className="page-shell space-y-8">
      <section className="panel overflow-hidden">
        <div className="grid gap-6 bg-gradient-to-br from-brand-700 via-indigo-700 to-lavender-600 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.45fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              Account settings
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              ตั้งค่าบัญชีของฉัน
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-blue-50">
              ตรวจสอบข้อมูลบัญชี เปลี่ยนชื่อที่แสดง และอัปเดตรหัสผ่านได้อย่างปลอดภัย
            </p>
          </div>
          <div className="rounded-lg bg-white/15 p-5">
            <ShieldCheck className="h-7 w-7 text-blue-100" />
            <div className="mt-3 text-3xl font-black">{statusLabel}</div>
            <div className="text-sm font-bold text-blue-100">สถานะสมาชิกปัจจุบัน</div>
          </div>
        </div>
      </section>

      {query.message ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          {query.message}
        </div>
      ) : null}

      {query.error ? (
        <div className="rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {query.error}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="panel p-6 sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Profile</p>
              <h2 className="mt-3 text-2xl font-black text-ink">ข้อมูลบัญชี</h2>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <UserRound className="h-6 w-6" />
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-500">ชื่อที่แสดง</div>
              <div className="mt-1 text-lg font-black text-ink">{account.name}</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <Mail className="h-4 w-4" />
                อีเมล
              </div>
              <div className="mt-1 break-all text-base font-black text-ink">
                {account.email}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-sm font-bold text-slate-500">สถานะสมาชิก</div>
                <div className="mt-2">
                  <StatusBadge membership={account.membership} role={account.role} />
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <CalendarDays className="h-4 w-4" />
                  วันที่สมัคร
                </div>
                <div className="mt-1 text-base font-black text-ink">
                  {formatThaiDate(account.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <Link className="btn-secondary mt-6 w-full" href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            กลับไป Dashboard
          </Link>
        </aside>

        <div className="space-y-6">
          <section className="panel p-6 sm:p-7">
            <div className="mb-5">
              <p className="eyebrow">Display name</p>
              <h2 className="mt-3 text-2xl font-black text-ink">แก้ไขชื่อที่แสดง</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                ชื่อนี้จะแสดงใน Dashboard และหน้าที่เกี่ยวข้องกับบัญชีของคุณ
              </p>
            </div>

            <form action={updateDisplayNameAction} className="space-y-4">
              <div>
                <label className="label" htmlFor="name">
                  ชื่อที่แสดง
                </label>
                <input
                  className="input mt-2"
                  defaultValue={account.name}
                  id="name"
                  minLength={2}
                  name="name"
                  placeholder="เช่น Python Begins"
                  required
                />
              </div>

              <button className="btn-primary" type="submit">
                บันทึกชื่อที่แสดง
              </button>
            </form>
          </section>

          <section className="panel p-6 sm:p-7">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-lavender-50 text-lavender-600">
                <KeyRound className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow">Password</p>
                <h2 className="mt-2 text-2xl font-black text-ink">เปลี่ยนรหัสผ่าน</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  เพื่อความปลอดภัย ต้องกรอกรหัสผ่านปัจจุบันให้ถูกต้องก่อนเปลี่ยนรหัสผ่านใหม่
                </p>
              </div>
            </div>

            <form action={changePasswordAction} className="grid gap-4">
              <div>
                <label className="label" htmlFor="currentPassword">
                  รหัสผ่านปัจจุบัน
                </label>
                <input
                  autoComplete="current-password"
                  className="input mt-2"
                  id="currentPassword"
                  name="currentPassword"
                  required
                  type="password"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="newPassword">
                    รหัสผ่านใหม่
                  </label>
                  <input
                    autoComplete="new-password"
                    className="input mt-2"
                    id="newPassword"
                    minLength={6}
                    name="newPassword"
                    required
                    type="password"
                  />
                </div>

                <div>
                  <label className="label" htmlFor="confirmPassword">
                    ยืนยันรหัสผ่านใหม่
                  </label>
                  <input
                    autoComplete="new-password"
                    className="input mt-2"
                    id="confirmPassword"
                    minLength={6}
                    name="confirmPassword"
                    required
                    type="password"
                  />
                </div>
              </div>

              <button className="btn-primary w-full sm:w-fit" type="submit">
                เปลี่ยนรหัสผ่าน
              </button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}
