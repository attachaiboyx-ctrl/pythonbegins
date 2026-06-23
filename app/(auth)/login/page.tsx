import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/session";

export default async function LoginPage({
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
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-course lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-gradient-to-br from-brand-700 to-lavender-600 p-8 text-white sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
            Welcome back
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">
            กลับมาเรียน Python ต่อ
          </h1>
          <p className="mt-4 leading-7 text-blue-50">
            เข้าสู่ระบบเพื่อเปิด Dashboard ดูความคืบหน้า และเรียนบทต่อไปได้ทันที
          </p>
          <div className="mt-8 rounded-lg bg-white/15 p-4 text-sm font-bold leading-6">
            บัญชีทดลอง: student@pythonm1.local / student1234
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-6">
            <p className="eyebrow">Login</p>
            <h2 className="mt-3 text-3xl font-black text-ink">เข้าสู่ระบบ</h2>
          </div>

          {query.error ? (
            <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {query.error}
            </div>
          ) : null}

          <form action={loginAction} className="space-y-4">
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
              เข้าสู่ระบบ
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-slate-600">
            ยังไม่มีบัญชี?{" "}
            <Link className="text-brand-700 hover:text-brand-900" href="/register">
              สมัครเรียนฟรี
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
