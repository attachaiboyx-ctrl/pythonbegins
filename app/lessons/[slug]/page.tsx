import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Clock3,
  PlayCircle,
  Target
} from "lucide-react";
import { submitQuizAction } from "@/app/actions/progress";
import { PremiumUpgradeCard } from "@/components/PremiumUpgradeCard";
import { LessonDiagram } from "@/components/LessonDiagram";
import { getCourseByLessonSlug } from "@/lib/courses";
import { allLessons, canAccessLesson, getLessonBySlug, lessons } from "@/lib/lessons";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export function generateStaticParams() {
  return allLessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ score?: string }>;
}) {
  const routeParams = await params;
  const query = await searchParams;
  const user = await requireUser();
  const lesson = getLessonBySlug(routeParams.slug);

  if (!lesson) {
    notFound();
  }

  const course = getCourseByLessonSlug(lesson.slug);
  const courseHref = course ? `/courses/${course.slug}` : "/courses";
  const courseTitle = course?.title || "คอร์สทั้งหมด";
  const courseLessonCount = course?.lessons.length || lessons.length;

  const unlocked = canAccessLesson(user, lesson);
  const progress = await prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id
      }
    }
  });
  const score = query.score ? Number(query.score) : null;
  const lessonNumber = course
    ? course.lessons.findIndex((courseLesson) => courseLesson.id === lesson.id) + 1
    : lesson.id;

  if (!unlocked) {
    return (
      <div className="page-shell">
        <section className="panel overflow-hidden">
          <div className="grid gap-8 bg-gradient-to-br from-brand-50 via-white to-lavender-50 p-6 sm:p-8 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="eyebrow">Premium lesson</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
                {lesson.title}
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                บทนี้เป็นบทเรียน Premium สำหรับผู้ที่ต้องการเรียนต่อให้ครบทั้งคอร์ส
                บัญชี Free เรียนได้เฉพาะบทที่ 1-2 ส่วน Premium จะปลดล็อกบทที่ 1-{courseLessonCount} พร้อมแบบฝึกหัดและแบบทดสอบทุกบท
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-primary" href="/payment">
                  อัปเกรดเป็น Premium
                </Link>
                <Link className="btn-secondary" href={courseHref}>
                  <ArrowLeft className="h-4 w-4" />
                  กลับไปคอร์ส {courseTitle}
                </Link>
              </div>
            </div>

            <PremiumUpgradeCard
              compact
              courseTitle={courseTitle}
              embedded
              lessonCount={courseLessonCount}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-8">
      <section className="panel overflow-hidden">
        <div className="bg-gradient-to-br from-brand-700 to-lavender-600 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
                Lesson {lessonNumber}
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                {lesson.title}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-blue-50">
                {lesson.subtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-3 text-sm font-black backdrop-blur">
              <Clock3 className="h-4 w-4" />
              {lesson.minutes} นาที
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-3">
          {lesson.objectives.map((objective) => (
            <div key={objective} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
              <Target className="mb-3 h-5 w-5 text-brand-600" />
              {objective}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.35fr]">
        <div className="space-y-5">
          {lesson.sections.map((section) => (
            <article key={section.heading} className="panel p-6 sm:p-8">
              <h2 className="text-2xl font-black text-ink">{section.heading}</h2>
              <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">{section.body}</p>
              {section.diagram ? <LessonDiagram type={section.diagram} /> : null}
              {section.code ? (
                <pre className="code-window mt-5">
                  <code>{section.code}</code>
                </pre>
              ) : null}
            </article>
          ))}

          <article className="panel p-6 sm:p-8">
            <p className="eyebrow">Practice</p>
            <h2 className="mt-3 text-2xl font-black text-ink">
              {lesson.exercise.title}
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-bold leading-6 text-slate-700">
              {lesson.exercise.tasks.map((task) => (
                <li key={task} className="flex gap-3 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {task}
                </li>
              ))}
            </ul>
            <pre className="code-window mt-5">
              <code>{lesson.exercise.starterCode}</code>
            </pre>
          </article>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="eyebrow">Progress</p>
            <div className="mt-3 text-4xl font-black text-ink">
              {progress?.quizScore ?? 0}%
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 to-lavender-600"
                style={{ width: `${progress?.quizScore ?? 0}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-600">
              {progress?.completed ? "ผ่านบทนี้แล้ว" : "ทำแบบทดสอบให้ได้อย่างน้อย 60%"}
            </p>
          </div>

          <div className="panel p-5">
            <p className="eyebrow">Navigation</p>
            <div className="mt-4 flex flex-col gap-3">
              <Link className="btn-secondary" href={courseHref}>
                <ArrowLeft className="h-4 w-4" />
                กลับคอร์ส {courseTitle}
              </Link>
              <Link className="btn-secondary" href="/dashboard">
                ไป Dashboard
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Quiz</p>
            <h2 className="mt-3 text-2xl font-black text-ink">แบบทดสอบท้ายบท</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              ตอบให้ได้ 60% เพื่อผ่านบทนี้
            </p>
          </div>
          {score !== null ? (
            <div className={`rounded-lg border px-4 py-3 text-sm font-black ${
              score >= 60
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-blue-200 bg-brand-50 text-brand-800"
            }`}>
              คะแนนล่าสุด {score}%
            </div>
          ) : null}
        </div>

        <form action={submitQuizAction} className="space-y-5">
          <input name="lessonId" type="hidden" value={lesson.id} />
          {lesson.quiz.map((question, questionIndex) => (
            <fieldset key={question.question} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <legend className="flex items-start gap-2 text-base font-black text-ink">
                <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                {questionIndex + 1}. {question.question}
              </legend>
              <div className="mt-4 grid gap-3">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    <input
                      className="h-4 w-4 accent-brand-600"
                      name={`question-${questionIndex}`}
                      required
                      type="radio"
                      value={optionIndex}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {score !== null ? (
                <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                  เฉลย: {question.explanation}
                </p>
              ) : null}
            </fieldset>
          ))}

          <button className="btn-primary" type="submit">
            <PlayCircle className="h-4 w-4" />
            ส่งคำตอบและบันทึกคะแนน
          </button>
        </form>
      </section>
    </div>
  );
}
