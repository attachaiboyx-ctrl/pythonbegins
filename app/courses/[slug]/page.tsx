import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, Crown, GraduationCap } from "lucide-react";
import { LessonCard } from "@/components/LessonCard";
import { PremiumUpgradeCard } from "@/components/PremiumUpgradeCard";
import { courses, getCourseBySlug } from "@/lib/courses";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const routeParams = await params;
  const course = getCourseBySlug(routeParams.slug);

  if (!course) {
    notFound();
  }

  const user = await getCurrentUser();
  const progressItems = user
    ? await prisma.lessonProgress.findMany({
        where: { userId: user.id }
      })
    : [];
  const progressByLesson = new Map(
    progressItems.map((progress) => [progress.lessonId, progress])
  );
  const completedCount = progressItems.filter((progress) => progress.completed).length;
  const freeCount = course.lessons.filter((lesson) => lesson.free).length;
  const isPremium = user?.membership === "paid" || user?.role === "admin";
  const shouldShowPremiumUpgrade = Boolean(user && !isPremium);

  return (
    <div className="page-shell space-y-10">
      <section className="panel overflow-hidden">
        <div className="grid gap-8 bg-gradient-to-br from-brand-50 via-white to-lavender-50 p-6 sm:p-8 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-black text-brand-700 hover:text-brand-900"
              href="/lessons"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับหน้าคอร์สทั้งหมด
            </Link>
            <p className="eyebrow mt-6">Course curriculum</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {course.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" href={user ? "/dashboard" : "/register"}>
                เริ่มเรียนฟรี
              </Link>
              {!isPremium ? (
                <Link className="btn-secondary" href="/payment">
                  อัปเกรดเป็น Premium
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [BookOpen, `${course.lessons.length} บทเรียน`, "รวมอยู่ใน Python มือใหม่"],
              [CheckCircle2, `${completedCount} บทที่ผ่าน`, "ติดตามผลได้ใน Dashboard"],
              [Crown, `${freeCount} บทฟรี`, "บทที่เหลือใช้สิทธิ์พรีเมียม"]
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof BookOpen;

              return (
                <div key={String(title)} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <ItemIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-black text-ink">{String(title)}</p>
                      <p className="mt-1 text-sm font-medium leading-5 text-slate-500">
                        {String(text)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {shouldShowPremiumUpgrade ? <PremiumUpgradeCard /> : null}

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Python มือใหม่</p>
            <h2 className="section-title mt-3">บทเรียนทั้งหมดในคอร์สนี้</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm">
            <GraduationCap className="h-4 w-4 text-brand-600" />
            เรียงจากง่ายไปยาก เหมาะกับผู้เริ่มต้น
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {course.lessons.map((lesson) => (
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
