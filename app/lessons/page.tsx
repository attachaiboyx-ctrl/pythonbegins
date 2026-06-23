import Link from "next/link";
import { BookOpen, CheckCircle2, Crown, GraduationCap } from "lucide-react";
import { LessonCard } from "@/components/LessonCard";
import { lessons } from "@/lib/lessons";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export default async function LessonsPage() {
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

  return (
    <div className="page-shell space-y-10">
      <section className="panel overflow-hidden">
        <div className="grid gap-8 bg-gradient-to-br from-brand-50 via-white to-lavender-50 p-6 sm:p-8 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <p className="eyebrow">Course curriculum</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              หลักสูตร Python สำหรับมือใหม่
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              เรียน Python ตั้งแต่พื้นฐาน เหมาะสำหรับผู้ที่ไม่เคยเขียนโปรแกรมมาก่อน
              มีบทเรียนทั้งหมด 20 บท พร้อมแบบฝึกหัด แบบทดสอบ และโปรเจกต์จริง
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" href={user ? "/dashboard" : "/register"}>
                เริ่มเรียนฟรี
              </Link>
              {user?.membership !== "paid" && user?.role !== "admin" ? (
                <Link className="btn-secondary" href="/payment">
                  ปลดล็อกพรีเมียม
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [BookOpen, "20 บทเรียน", "ตั้งแต่พื้นฐานถึงโปรเจกต์"],
              [CheckCircle2, `${completedCount} บทที่ผ่าน`, "ติดตามผลได้ใน Dashboard"],
              [Crown, "Free + Premium", "บทที่ 1-2 เริ่มฟรีทันที"]
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

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">All lessons</p>
            <h2 className="section-title mt-3">เส้นทางเรียนทั้งหมด</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm">
            <GraduationCap className="h-4 w-4 text-brand-600" />
            เรียงจากง่ายไปยาก เหมาะกับผู้เริ่มต้น
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
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
