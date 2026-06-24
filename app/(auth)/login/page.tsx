import Image from "next/image";
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
      <section className="grid w-full max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-course lg:grid-cols-[0.48fr_0.52fr]">
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-lavender-700 p-4 sm:min-h-[360px] sm:p-6 lg:min-h-[600px] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.32),transparent_34rem),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.28),transparent_30rem)]" />
          <div className="relative h-[210px] w-full max-w-[720px] sm:h-[290px] lg:h-[500px]">
            <Image
              priority
              alt="โปรโมชันคอร์ส Python Begins สำหรับผู้เริ่มต้น"
              className="object-contain drop-shadow-2xl"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              src="/images/login-python-begins-promo.png"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-lavender-600/10" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent p-5 text-white sm:p-7 lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              Welcome back
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              กลับมาเรียน Python ต่อ
            </h1>
            <p className="mt-4 max-w-md leading-7 text-blue-50">
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
