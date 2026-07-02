import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Crown,
  GraduationCap,
  LockKeyhole,
  Sparkles
} from "lucide-react";
import { CourseLogoPanel } from "@/components/CourseLogoPanel";
import { LessonCard } from "@/components/LessonCard";
import { PremiumUpgradeCard } from "@/components/PremiumUpgradeCard";
import { SpecialCourseBadge } from "@/components/SpecialCourseBadge";
import { courseCatalog, getCourseBySlug, type Course } from "@/lib/courses";
import { MANUAL_PREMIUM_PRICE_THB } from "@/lib/manual-payment-config";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export function generateStaticParams() {
  return courseCatalog.map((course) => ({ slug: course.slug }));
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

  if (course.status === "coming-soon") {
    return <ComingSoonCoursePage canPreview={user?.role === "admin"} course={course} />;
  }

  const progressItems = user
    ? await prisma.lessonProgress.findMany({
        where: { userId: user.id }
      })
    : [];
  const progressByLesson = new Map(
    progressItems.map((progress) => [progress.lessonId, progress])
  );
  const courseLessonIds = new Set(course.lessons.map((lesson) => lesson.id));
  const completedCount = progressItems.filter(
    (progress) => progress.completed && courseLessonIds.has(progress.lessonId)
  ).length;
  const freeCount = course.lessons.filter((lesson) => lesson.free).length;
  const isPremium = user?.membership === "paid" || user?.role === "admin";
  const ownsSeparateCourse = Boolean(
    user?.role === "admin" ||
      (course.separatePurchase &&
        user?.courseAccesses.some((access) => access.courseSlug === course.slug))
  );
  const hasCourseAccess = course.separatePurchase
    ? ownsSeparateCourse
    : !course.premiumOnly || isPremium;
  const shouldShowPremiumUpgrade = Boolean(
    course.premiumOnly && user && !isPremium
  );
  const firstLesson = course.lessons[0];
  const primaryHref = !user
    ? "/register"
    : hasCourseAccess && firstLesson
      ? `/lessons/${firstLesson.slug}`
      : course.separatePurchase
        ? `/payment?product=${course.slug}`
        : "/payment";
  const primaryLabel = !user
    ? course.premiumOnly || course.separatePurchase
      ? "สมัครสมาชิกเพื่อเรียน"
      : "เริ่มเรียนฟรี"
    : hasCourseAccess
      ? "เริ่มเรียน"
      : course.separatePurchase
        ? `ซื้อคอร์สนี้ ${course.separatePurchase.price} บาท`
        : "อัปเกรดเพื่อเรียน";
  const accessStatTitle = course.separatePurchase
    ? `${course.separatePurchase.price} บาท`
    : course.premiumOnly
      ? "Premium"
      : `${freeCount} บทฟรี`;
  const accessStatText = course.separatePurchase
    ? "คอร์สแยก ไม่รวมใน Premium"
    : course.premiumOnly
      ? "เปิดครบทุกบทสำหรับ Premium และ Admin"
      : "บทที่เหลือใช้สิทธิ์พรีเมียม";

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
            {course.premiumOnly ? (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-800">
                <Crown className="h-3.5 w-3.5" />
                Premium • เปิดให้เรียนแล้ว
              </div>
            ) : null}
            {course.separatePurchase ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <SpecialCourseBadge
                  label={course.slug === "web-app-begins" ? "NEW • คอร์สแยก" : "Landing"}
                  tone={course.slug === "web-app-begins" ? "blue" : "cyan"}
                />
                <span className="text-sm font-black text-cyan-800">
                  ไม่รวมใน Premium • ซื้อแยก {course.separatePurchase.price} บาท
                </span>
              </div>
            ) : null}
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {course.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="btn-primary"
                href={primaryHref}
              >
                {primaryLabel}
              </Link>
              {!isPremium && !course.premiumOnly ? (
                <Link className="btn-secondary" href="/payment">
                  อัปเกรดเป็น Premium
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [BookOpen, `${course.lessons.length} บทเรียน`, `รวมอยู่ในคอร์ส ${course.title}`],
              [CheckCircle2, `${completedCount} บทที่ผ่าน`, "ติดตามผลได้ใน Dashboard"],
              [Crown, accessStatTitle, accessStatText]
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

      {shouldShowPremiumUpgrade ? (
        <PremiumUpgradeCard courseTitle={course.title} lessonCount={course.lessons.length} />
      ) : null}

      {course.separatePurchase && !hasCourseAccess ? (
        <section className="panel overflow-hidden border-cyan-200">
          <div className="grid gap-5 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SpecialCourseBadge
                label={course.slug === "web-app-begins" ? "NEW • คอร์สแยก" : "Landing"}
                tone={course.slug === "web-app-begins" ? "blue" : "cyan"}
              />
              <h2 className="mt-4 text-2xl font-black text-ink">
                ซื้อ {course.title} แยกจาก Premium
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                คอร์สนี้ราคา {course.separatePurchase.price} บาท ไม่รวมใน Premium {MANUAL_PREMIUM_PRICE_THB} บาท
                เมื่อแอดมินอนุมัติสลิป ระบบจะปลดล็อกเฉพาะคอร์สนี้
              </p>
            </div>
            <Link className="btn-primary" href={`/payment?product=${course.slug}`}>
              ซื้อคอร์สนี้ {course.separatePurchase.price} บาท
            </Link>
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{course.title}</p>
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

function ComingSoonCoursePage({
  canPreview,
  course
}: {
  canPreview: boolean;
  course: Course;
}) {
  return (
    <div className="page-shell space-y-8">
      <section className="panel overflow-hidden">
        <div className={`bg-gradient-to-br ${course.accent} p-6 text-white sm:p-8`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:items-center">
            <div>
              <Link
                className="inline-flex items-center gap-2 text-sm font-black text-white/80 hover:text-white"
                href="/lessons"
              >
                <ArrowLeft className="h-4 w-4" />
                กลับหน้าคอร์สทั้งหมด
              </Link>

              <div className="mt-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-black text-white">
                  <CalendarDays className="h-3.5 w-3.5 text-amber-200" />
                  {course.launchLabel || "เปิด 1 กรกฎาคมนี้"}
                </div>
                <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                  {course.title}
                </h1>
                <p className="mt-4 text-xl font-bold text-white/90">{course.subtitle}</p>
                <p className="mt-4 text-lg leading-8 text-white/80">{course.description}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/15 px-6 py-3 text-sm font-black text-white/80"
                    disabled
                    type="button"
                  >
                    เร็ว ๆ นี้
                    <LockKeyhole className="h-4 w-4" />
                  </button>
                  <Link
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
                    href="/lessons"
                  >
                    ดูคอร์สที่เปิดอยู่
                  </Link>
                </div>
              </div>
            </div>

            <CourseLogoPanel course={course} locked />
          </div>
        </div>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-5">
            <LockKeyhole className="h-6 w-6 text-slate-700" />
            <h2 className="mt-4 text-lg font-black text-ink">ล็อกไว้ก่อนเปิดตัว</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
              Free, Premium และ Admin จะยังไม่เห็นบทเรียนจริงของคอร์สนี้ก่อนวันเปิด
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 p-5">
            <CalendarDays className="h-6 w-6 text-amber-600" />
            <h2 className="mt-4 text-lg font-black text-ink">เปิด 1 กรกฎาคมนี้</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
              เมื่อคอร์สพร้อมเปิด จึงค่อยเพิ่มบทเรียนและปุ่มเข้าเรียนจริง
            </p>
          </div>
          <div className="rounded-lg bg-brand-50 p-5">
            <Sparkles className="h-6 w-6 text-brand-700" />
            <h2 className="mt-4 text-lg font-black text-ink">เรียนคอร์สเดิมได้ต่อ</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
              Python มือใหม่และ JavaScript มือใหม่ยังเข้าเรียนได้ตามระบบเดิม
            </p>
          </div>
        </div>
      </section>

      {canPreview && course.lessons.length > 0 ? (
        <section className="panel p-6 sm:p-8">
          <p className="eyebrow">Admin preview</p>
          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-black text-ink">ตรวจเนื้อหาก่อนเปิดคอร์ส</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                ลิงก์พรีวิวนี้แสดงเฉพาะ Admin สมาชิก Free และ Premium ยังเปิดบทเรียนไม่ได้
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
              {course.lessons.length} บทพร้อมตรวจ
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {course.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:bg-brand-50"
                href={`/lessons/${lesson.slug}`}
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-sm font-black text-brand-700">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-black leading-6 text-ink group-hover:text-brand-700">
                      {lesson.title}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-5 text-slate-500">
                      {lesson.minutes} นาที • มี diagram และ quiz
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
