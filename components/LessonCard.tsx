import Link from "next/link";
import { CheckCircle2, Clock3, Crown, LockKeyhole, PlayCircle } from "lucide-react";
import type { Lesson } from "@/lib/lessons";
import { canAccessLesson, getLessonStatusLabel } from "@/lib/lessons";
import type { CurrentUser } from "@/lib/session";

type LessonProgress = {
  completed: boolean;
  quizScore: number | null;
};

export function LessonCard({
  lesson,
  user,
  progress
}: {
  lesson: Lesson;
  user: Pick<CurrentUser, "role" | "membership"> | null;
  progress?: LessonProgress;
}) {
  const unlocked = canAccessLesson(user, lesson);
  const statusLabel = getLessonStatusLabel(user, lesson);
  const actionHref = unlocked ? `/lessons/${lesson.slug}` : "/payment";
  const actionLabel = unlocked ? "เริ่มเรียน" : "อัปเกรดเป็น Premium";

  return (
    <article className="group panel flex min-h-72 flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-blue-600/15">
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-brand-600 via-blue-500 to-lavender-600 p-5 text-white">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black backdrop-blur">
            บทที่ {lesson.id}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/20 backdrop-blur">
            {unlocked ? <PlayCircle className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-black ${
              unlocked
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-violet-200 bg-lavender-50 text-lavender-600"
            }`}
          >
            {lesson.free ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Crown className="h-3.5 w-3.5" />}
            {lesson.free ? "ฟรี" : statusLabel}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            <Clock3 className="h-3.5 w-3.5" />
            {lesson.minutes} นาที
          </span>
        </div>

        <h3 className="text-xl font-black leading-snug text-ink group-hover:text-brand-700">
          {lesson.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {lesson.subtitle}
        </p>

        {!unlocked ? (
          <div className="mt-5 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900">
            Premium ปลดล็อกบทนี้ พร้อมตัวอย่างโค้ด แบบฝึกหัด และแบบทดสอบท้ายบท
          </div>
        ) : null}

        {progress?.completed ? (
          <div className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
            ผ่านแล้ว คะแนน {progress.quizScore ?? 0}%
          </div>
        ) : progress?.quizScore !== null && progress?.quizScore !== undefined ? (
          <div className="mt-5 rounded-lg bg-brand-50 px-4 py-3 text-sm font-black text-brand-700">
            คะแนนล่าสุด {progress.quizScore}%
          </div>
        ) : null}

        <Link className={unlocked ? "btn-secondary mt-5 w-full" : "btn-primary mt-5 w-full"} href={actionHref}>
          {actionLabel}
        </Link>
      </div>
    </article>
  );
}
