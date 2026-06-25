import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  CreditCard,
  Trophy
} from "lucide-react";
import { LessonCard } from "@/components/LessonCard";
import { PremiumUpgradeCard } from "@/components/PremiumUpgradeCard";
import { StatusBadge } from "@/components/StatusBadge";
import { canAccessLesson, pythonLessons } from "@/lib/lessons";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const query = await searchParams;
  const user = await requireUser();
  const [progressItems, slips] = await Promise.all([
    prisma.lessonProgress.findMany({
      where: { userId: user.id },
      orderBy: { lessonId: "asc" }
    }),
    prisma.paymentSlip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  const progressByLesson = new Map(
    progressItems.map((progress) => [progress.lessonId, progress])
  );
  const completedCount = progressItems.filter((progress) => progress.completed).length;
  const progressPercent = Math.round((completedCount / pythonLessons.length) * 100);
  const unlockedLessons = pythonLessons.filter((lesson) => canAccessLesson(user, lesson));
  const nextLesson =
    unlockedLessons.find((lesson) => !progressByLesson.get(lesson.id)?.completed) ||
    unlockedLessons[0];
  const latestSlip = slips[0];
  const isPremium = user.membership === "paid" || user.role === "admin";

  return (
    <div className="page-shell space-y-8">
      {query.payment === "uploaded" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          ส่งสลิปแล้ว รอแอดมินตรวจสอบ เมื่ออนุมัติแล้วสถานะจะเปลี่ยนเป็นพรีเมียม
        </div>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="panel overflow-hidden">
          <div className="bg-gradient-to-br from-brand-700 to-lavender-600 p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
                  Learner dashboard
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  สวัสดี {user.name}
                </h1>
                <p className="mt-3 max-w-2xl leading-7 text-blue-50">
                  ติดตามความคืบหน้า เรียนต่อจากบทล่าสุด และปลดล็อกบทเรียนพรีเมียมได้จากที่นี่
                </p>
              </div>
              <StatusBadge membership={user.membership} role={user.role} />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-brand-700">ความคืบหน้ารวม</p>
                <div className="mt-2 text-4xl font-black text-ink">{progressPercent}%</div>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <BarChart3 className="h-7 w-7" />
              </span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 to-lavender-600 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                [CheckCircle2, completedCount, "บทที่เรียนผ่านแล้ว"],
                [BookOpenCheck, unlockedLessons.length, "บทที่เปิดให้เรียน"],
                [Trophy, pythonLessons.length, "บทเรียนทั้งหมด"]
              ].map(([Icon, value, label]) => {
                const ItemIcon = Icon as typeof CheckCircle2;

                return (
                  <div key={String(label)} className="rounded-lg bg-slate-50 p-4">
                    <ItemIcon className="h-5 w-5 text-brand-600" />
                    <div className="mt-3 text-3xl font-black text-ink">
                      {String(value)}
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-600">
                      {String(label)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="panel p-6 sm:p-8">
          <p className="eyebrow">Next step</p>
          <h2 className="mt-3 text-2xl font-black text-ink">
            {nextLesson?.title || "เริ่มเรียนบทแรก"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {nextLesson?.subtitle ||
              "เลือกบทเรียนที่สนใจ แล้วเริ่มทำแบบทดสอบเพื่อบันทึกความคืบหน้า"}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {nextLesson ? (
              <Link className="btn-primary" href={`/lessons/${nextLesson.slug}`}>
                เรียนต่อ
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {!isPremium ? (
              <Link className="btn-secondary" href="/payment">
                อัปเกรดเป็นพรีเมียม
              </Link>
            ) : null}
          </div>
        </aside>
      </section>

      {!isPremium ? <PremiumUpgradeCard /> : null}

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Payment</p>
              <h2 className="mt-2 text-xl font-black text-ink">สถานะชำระเงิน</h2>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <CreditCard className="h-5 w-5" />
            </span>
          </div>

          {isPremium ? (
            <p className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
              บัญชีนี้เป็นพรีเมียมแล้ว เรียนได้ครบทุกบท
            </p>
          ) : latestSlip ? (
            <div className="mt-5 rounded-lg bg-slate-50 p-4">
              <div className="text-sm font-black text-slate-700">
                สลิปล่าสุด: {latestSlip.status}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                หากสลิปถูกต้อง แอดมินจะเปลี่ยนสถานะเป็นพรีเมียมให้
              </p>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-slate-600">
              ยังไม่มีสลิปที่ส่งเข้ามา อัปเกรดเพื่อเรียนบทที่ 3-20 ได้ทันทีหลังแอดมินอนุมัติ
            </p>
          )}

          <Link className="btn-secondary mt-5 w-full" href="/payment">
            เปิดหน้าชำระเงิน
          </Link>
        </div>

        <div className="panel p-6">
          <p className="eyebrow">Account</p>
          <h2 className="mt-2 text-xl font-black text-ink">{user.email}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-sm font-bold text-slate-500">ประเภทผู้ใช้</div>
              <div className="mt-1 text-lg font-black text-ink">{user.role}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-sm font-bold text-slate-500">สถานะสมาชิก</div>
              <div className="mt-1 text-lg font-black text-ink">
                {isPremium ? "premium" : "free"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">My lessons</p>
            <h2 className="section-title mt-3">บทเรียนของฉัน</h2>
          </div>
          <Link className="btn-secondary" href="/lessons">
            ดูหลักสูตรทั้งหมด
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pythonLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              progress={progressByLesson.get(lesson.id)}
              user={user}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
