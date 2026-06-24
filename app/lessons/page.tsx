import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  Crown,
  Layers3,
  Sparkles
} from "lucide-react";
import { courses, futureCourses } from "@/lib/courses";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export default async function LessonsPage() {
  const user = await getCurrentUser();
  const progressItems = user
    ? await prisma.lessonProgress.findMany({
        where: { userId: user.id }
      })
    : [];
  const completedLessonIds = new Set(
    progressItems
      .filter((progress) => progress.completed)
      .map((progress) => progress.lessonId)
  );

  return (
    <div className="page-shell space-y-10">
      <section className="panel overflow-hidden">
        <div className="grid gap-8 bg-gradient-to-br from-brand-50 via-white to-lavender-50 p-6 sm:p-8 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <p className="eyebrow">Courses</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              เลือกคอร์สที่อยากเรียน
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              บทเรียน Python ทั้งหมดถูกรวมไว้ในคอร์ส “Python มือใหม่”
              เพื่อให้เรียนเป็นเส้นทางเดียวชัดเจน และเตรียมรองรับคอร์สภาษาอื่นในอนาคต
            </p>
          </div>

          <div className="rounded-lg border border-brand-100 bg-white p-5 shadow-sm">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <Layers3 className="h-6 w-6" />
            </span>
            <p className="mt-4 text-2xl font-black text-ink">
              {courses.length} คอร์สพร้อมเรียน
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              เริ่มจาก Python แล้วต่อยอดเป็น HTML, CSS, JavaScript และ SQL ได้ในอนาคต
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Available course</p>
            <h2 className="section-title mt-3">คอร์สเรียนของ Python Begins</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-600" />
            เรียงเนื้อหาจากง่ายไปยาก
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.38fr]">
          <div className="grid gap-5">
            {courses.map((course) => {
              const completedCount = course.lessons.filter((lesson) =>
                completedLessonIds.has(lesson.id)
              ).length;
              const freeCount = course.lessons.filter((lesson) => lesson.free).length;

              return (
                <article
                  key={course.slug}
                  className="panel group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-blue-600/15"
                >
                  <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
                    <div>
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black text-brand-700">
                        <Code2 className="h-3.5 w-3.5" />
                        {course.level}
                      </div>
                      <h3 className="text-3xl font-black tracking-tight text-ink group-hover:text-brand-700">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-lg font-bold text-slate-700">
                        {course.subtitle}
                      </p>
                      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                        {course.description}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg bg-slate-50 p-4">
                          <BookOpen className="h-5 w-5 text-brand-600" />
                          <div className="mt-3 text-2xl font-black text-ink">
                            {course.lessons.length}
                          </div>
                          <div className="text-sm font-bold text-slate-600">
                            บทเรียน
                          </div>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-4">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <div className="mt-3 text-2xl font-black text-ink">
                            {user ? completedCount : freeCount}
                          </div>
                          <div className="text-sm font-bold text-slate-600">
                            {user ? "บทที่เรียนผ่าน" : "บทฟรี"}
                          </div>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-4">
                          <Crown className="h-5 w-5 text-lavender-600" />
                          <div className="mt-3 text-2xl font-black text-ink">
                            Premium
                          </div>
                          <div className="text-sm font-bold text-slate-600">
                            ปลดล็อกครบทุกบท
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gradient-to-br from-brand-600 via-blue-500 to-lavender-600 p-5 text-white">
                      <Clock3 className="h-7 w-7" />
                      <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-blue-100">
                        Course path
                      </p>
                      <p className="mt-2 text-2xl font-black">
                        บทที่ 1-2 ฟรี
                      </p>
                      <p className="mt-2 text-sm font-bold leading-6 text-blue-50">
                        สมาชิกพรีเมียมเรียนบทที่ 3-20 ได้
                      </p>
                      <Link
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-brand-700 transition hover:-translate-y-0.5"
                        href={`/courses/${course.slug}`}
                      >
                        เข้าเรียนคอร์สนี้
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="panel p-6">
            <p className="eyebrow">Coming soon</p>
           
            <div className="mt-5 grid gap-3">
              {futureCourses.map((courseName) => (
                <div
                  key={courseName}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"
                >
                  <span>{courseName}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500">
                    เร็ว ๆ นี้
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
