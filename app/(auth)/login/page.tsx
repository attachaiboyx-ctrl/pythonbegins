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
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-course lg:grid-cols-[0.42fr_0.58fr]">
        <div className="relative overflow-hidden bg-[#050505] px-6 py-8 text-white sm:px-8 sm:py-10 lg:min-h-[480px] lg:px-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24rem)]" />
          <div className="relative max-w-md">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
              WELCOME BACK
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              กลับมาเรียน Python ต่อ
            </h1>
            <p className="mt-4 leading-7 text-slate-300">
              เข้าสู่ระบบเพื่อเปิด Dashboard ดูความคืบหน้า และเรียนบทต่อไปได้ทันที
            </p>
          </div>
        </div>

        <div className="flex items-center p-6 sm:p-10">
          <div className="w-full">
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
        </div>
      </section>
    </div>
  );
}
