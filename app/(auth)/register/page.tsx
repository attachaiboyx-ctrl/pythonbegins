import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { registerAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/session";

export default async function RegisterPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const query = await searchParams;
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="page-shell grid min-h-[calc(100vh-120px)] place-items-center">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-course lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-10">
          <div className="mb-6">
            <p className="eyebrow">Start free</p>
            <h1 className="mt-3 text-3xl font-black text-ink">สมัครเรียนฟรี</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              เริ่มบทที่ 1-2 ได้ทันที แล้วอัปเกรดเป็นพรีเมียมเมื่อพร้อมเรียนครบทั้งคอร์ส
            </p>
          </div>

          {query.error ? (
            <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {query.error}
            </div>
          ) : null}

          <form action={registerAction} className="space-y-4">
            <div className="space-y-2">
              <label className="label" htmlFor="name">
                ชื่อผู้เรียน
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="input pl-11"
                  id="name"
                  name="name"
                  placeholder="เช่น มะลิ"
                  required
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="label" htmlFor="email">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="input pl-11"
                  id="email"
                  name="email"
                  placeholder="student@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="label" htmlFor="password">
                รหัสผ่าน
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="input pl-11"
                  id="password"
                  minLength={6}
                  name="password"
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  required
                  type="password"
                />
              </div>
            </div>
            <button className="btn-primary w-full" type="submit">
              สมัครสมาชิก
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-slate-600">
            มีบัญชีแล้ว?{" "}
            <Link className="text-brand-700 hover:text-brand-900" href="/login">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>

        <div className="bg-gradient-to-br from-brand-700 to-lavender-600 p-8 text-white sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
            Python สำหรับมือใหม่
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight">
            เริ่มเขียนโปรแกรมได้อย่างมั่นใจ
          </h2>
          <p className="mt-4 leading-7 text-blue-50">
            เหมาะสำหรับผู้เรียนทุกวัย รวมถึงผู้ปกครองที่ต้องการซื้อคอร์สให้ลูกเริ่มต้นด้านเทคโนโลยี
          </p>
          <div className="mt-8 grid gap-3 text-sm font-bold">
            <div className="rounded-lg bg-white/15 px-4 py-3">เรียนฟรีบทที่ 1-2</div>
            <div className="rounded-lg bg-white/15 px-4 py-3">อัปเกรดผ่าน PromptPay</div>
            <div className="rounded-lg bg-white/15 px-4 py-3">ติดตามผลผ่าน Dashboard</div>
          </div>
        </div>
      </section>
    </div>
  );
}
