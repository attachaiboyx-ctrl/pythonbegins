import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Code2,
  Crown,
  Layers3,
  LockKeyhole,
  Sparkles
} from "lucide-react";
import { CourseLogoPanel } from "@/components/CourseLogoPanel";
import { courseCatalog, courses, upcomingCourses } from "@/lib/courses";
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
              เลือกเส้นทางเรียนที่เหมาะกับเป้าหมายของคุณ ทั้ง Python, JavaScript
              และคอร์สสายทำเว็บที่กำลังจะเปิด เรียงจากพื้นฐานไปสู่โปรเจกต์จริง
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
              พร้อมอีก {upcomingCourses.length} คอร์สใหม่ที่จะเปิดในวันที่ 1 กรกฎาคมนี้
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Course paths</p>
            <h2 className="section-title mt-3">คอร์สเรียนของ Python Begins</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-600" />
            เรียงเนื้อหาจากง่ายไปยาก
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.38fr]">
          <div className="grid gap-5">
            {courseCatalog.map((course) => {
              const isComingSoon = course.status === "coming-soon";
              const completedCount = isComingSoon
                ? 0
                : course.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
              const freeCount = isComingSoon
                ? 0
                : course.lessons.filter((lesson) => lesson.free).length;

              return (
                <article
                  key={course.slug}
                  className="panel group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-blue-600/15"
                >
                  <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
                    <div>
                      <div
                        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${
                          isComingSoon
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-brand-100 bg-brand-50 text-brand-700"
                        }`}
                      >
                        {isComingSoon ? (
                          <LockKeyhole className="h-3.5 w-3.5" />
                        ) : (
                          <Code2 className="h-3.5 w-3.5" />
                        )}
                        {course.level}
                      </div>
                      {isComingSoon ? (
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white shadow-sm">
                          <CalendarDays className="h-3.5 w-3.5 text-amber-300" />
                          {course.launchLabel || "เปิด 1 กรกฎาคมนี้"}
                        </div>
                      ) : null}
                      <h3 className="text-3xl font-black tracking-tight text-ink group-hover:text-brand-700">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-lg font-bold text-slate-700">
                        {course.subtitle}
                      </p>
                      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                        {course.description}
                      </p>

                      {isComingSoon ? (
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-lg bg-slate-50 p-4">
                            <CalendarDays className="h-5 w-5 text-amber-600" />
                            <div className="mt-3 text-lg font-black text-ink">
                              1 ก.ค.
                            </div>
                            <div className="text-sm font-bold text-slate-600">
                              วันเปิดคอร์ส
                            </div>
                          </div>
                          <div className="rounded-lg bg-slate-50 p-4">
                            <LockKeyhole className="h-5 w-5 text-slate-600" />
                            <div className="mt-3 text-lg font-black text-ink">
                              ยังไม่เปิด
                            </div>
                            <div className="text-sm font-bold text-slate-600">
                              ล็อกไว้ทุกสิทธิ์
                            </div>
                          </div>
                          <div className="rounded-lg bg-slate-50 p-4">
                            <Crown className="h-5 w-5 text-lavender-600" />
                            <div className="mt-3 text-lg font-black text-ink">
                              เตรียมเปิด
                            </div>
                            <div className="text-sm font-bold text-slate-600">
                              ไม่มีบทเรียนให้เข้าก่อนเปิด
                            </div>
                          </div>
                        </div>
                      ) : (
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
                      )}
                    </div>

                    <div>
                      <CourseLogoPanel course={course} locked={isComingSoon} />
                      {isComingSoon ? (
                        <button
                          className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-black text-slate-500 shadow-sm"
                          disabled
                          type="button"
                        >
                          เร็ว ๆ นี้
                          <LockKeyhole className="h-4 w-4" />
                        </button>
                      ) : (
                        <Link
                          className="btn-primary mt-4 w-full"
                          href={`/courses/${course.slug}`}
                        >
                          เข้าเรียนคอร์สนี้
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="panel p-6">
            <p className="eyebrow">Update</p>
            <h3 className="mt-3 text-2xl font-black text-ink">
              อัปเดตใหม่ 1 กรกฎาคม
            </h3>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
              กำลังเตรียมเปิด {upcomingCourses.length} คอร์สใหม่ในสายทำเว็บและโปรเจกต์จริง
              การ์ดคอร์สจะแสดงไว้ล่วงหน้า แต่ยังล็อกไว้สำหรับทุกคนจนกว่าจะเปิดตัว
            </p>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-800">
              <div className="flex items-center gap-2 font-black">
                <LockKeyhole className="h-4 w-4" />
                ยังไม่มีบทเรียนให้เข้าใช้งาน
              </div>
              <p className="mt-2 text-amber-700">
                Python และ JavaScript ยังเข้าเรียนได้ตามปกติ ส่วนคอร์สใหม่จะแสดงสถานะ Coming Soon
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
