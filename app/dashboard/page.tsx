import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Layers3,
  LockKeyhole,
  PlayCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound
} from "lucide-react";
import { SpecialCourseBadge } from "@/components/SpecialCourseBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { premiumCourses, separateCourses, type Course } from "@/lib/courses";
import { MANUAL_PREMIUM_PRICE_THB } from "@/lib/manual-payment-config";
import { canAccessLesson } from "@/lib/lessons";
import { prisma } from "@/lib/prisma";
import { requireUser, type CurrentUser } from "@/lib/session";

const dashboardCourses = [...premiumCourses, ...separateCourses];

function slipStatusText(status: string) {
  if (status === "approved") return "อนุมัติแล้ว";
  if (status === "rejected") return "ไม่ผ่าน";
  return "รอตรวจ";
}

function slipProductText(productType: string) {
  return productType === "landing-page-begins"
    ? "Landing Page Begins"
    : "Premium";
}

function getCourseAccess(course: Course, user: CurrentUser) {
  const accessibleLessons = course.lessons.filter((lesson) =>
    canAccessLesson(user, lesson)
  );
  const isFullyUnlocked = accessibleLessons.length === course.lessons.length;
  const hasFreeAccess = accessibleLessons.length > 0;

  if (isFullyUnlocked) {
    return {
      href: `/courses/${course.slug}`,
      label: "เข้าเรียน",
      status: "เรียนได้",
      statusClass: "border-emerald-200 bg-emerald-50 text-emerald-700"
    };
  }

  if (hasFreeAccess) {
    return {
      href: `/courses/${course.slug}`,
      label: "เริ่มบทฟรี",
      status: "มีบทเรียนฟรี",
      statusClass: "border-blue-200 bg-brand-50 text-brand-700"
    };
  }

  if (course.separatePurchase) {
    return {
      href: "/payment?product=landing-page-begins",
      label: "ซื้อคอร์ส 200 บาท",
      status: "ล็อก",
      statusClass: "border-cyan-200 bg-cyan-50 text-cyan-800"
    };
  }

  return {
    href: "/payment?product=premium",
    label: "อัปเกรด Premium",
    status: "ล็อก",
    statusClass: "border-violet-200 bg-violet-50 text-violet-700"
  };
}

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

  const isAdmin = user.role === "admin";
  const hasPremiumAccess = user.membership === "paid" || isAdmin;
  const hasLandingAccess =
    isAdmin ||
    user.courseAccesses.some(
      (access) => access.courseSlug === "landing-page-begins"
    );
  const allLessons = dashboardCourses.flatMap((course) => course.lessons);
  const allLessonIds = new Set(allLessons.map((lesson) => lesson.id));
  const completedLessonIds = new Set(
    progressItems
      .filter((progress) => progress.completed && allLessonIds.has(progress.lessonId))
      .map((progress) => progress.lessonId)
  );
  const accessibleLessons = allLessons.filter((lesson) =>
    canAccessLesson(user, lesson)
  );
  const accessibleLessonIds = new Set(accessibleLessons.map((lesson) => lesson.id));
  const completedAccessibleCount = [...completedLessonIds].filter((lessonId) =>
    accessibleLessonIds.has(lessonId)
  ).length;
  const progressPercent = accessibleLessons.length
    ? Math.round((completedAccessibleCount / accessibleLessons.length) * 100)
    : 0;
  const accessibleCourseCount = dashboardCourses.filter((course) =>
    course.lessons.some((lesson) => canAccessLesson(user, lesson))
  ).length;
  const nextLessonEntry = dashboardCourses
    .flatMap((course) =>
      course.lessons
        .filter((lesson) => canAccessLesson(user, lesson))
        .map((lesson) => ({ course, lesson }))
    )
    .find(({ lesson }) => !completedLessonIds.has(lesson.id));
  const fallbackLessonEntry = dashboardCourses
    .flatMap((course) =>
      course.lessons
        .filter((lesson) => canAccessLesson(user, lesson))
        .map((lesson) => ({ course, lesson }))
    )[0];
  const nextStep = nextLessonEntry || fallbackLessonEntry;
  const latestSlip = slips[0];

  const summaryCards = [
    {
      icon: CheckCircle2,
      value: completedAccessibleCount,
      label: "บทที่เรียนผ่านแล้ว",
      tone: "bg-emerald-50 text-emerald-700"
    },
    {
      icon: BookOpenCheck,
      value: accessibleLessons.length,
      label: "บทที่เปิดให้เรียน",
      tone: "bg-brand-50 text-brand-700"
    },
    {
      icon: Trophy,
      value: allLessons.length,
      label: "บทเรียนทั้งหมด",
      tone: "bg-amber-50 text-amber-700"
    },
    {
      icon: Layers3,
      value: accessibleCourseCount,
      label: "คอร์สที่เข้าเรียนได้",
      tone: "bg-cyan-50 text-cyan-700"
    },
    {
      icon: BarChart3,
      value: `${progressPercent}%`,
      label: "ความคืบหน้ารวม",
      tone: "bg-violet-50 text-violet-700"
    }
  ];

  return (
    <div className="page-shell space-y-8 pb-10">
      {query.payment === "uploaded" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          ส่งสลิปแล้ว กรุณารอแอดมินตรวจสอบ เมื่ออนุมัติแล้วสิทธิ์จะอัปเดตอัตโนมัติ
        </div>
      ) : null}

      <section className="panel overflow-hidden border-0 bg-gradient-to-br from-slate-950 via-brand-900 to-violet-900 text-white shadow-2xl shadow-blue-900/15">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.38fr] lg:items-center lg:p-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-cyan-200">
              <Sparkles className="h-4 w-4" /> Learner dashboard
            </p>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">
              สวัสดี {user.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              กลับมาเรียนต่อ ติดตามความคืบหน้า และดูคอร์สทั้งหมดที่คุณเข้าถึงได้จากหน้าเดียว
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge membership={user.membership} role={user.role} />
              {hasLandingAccess && !isAdmin ? <SpecialCourseBadge /> : null}
              {isAdmin ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">
                  <ShieldCheck className="h-3.5 w-3.5" /> เข้าถึงทุกคอร์ส
                </span>
              ) : null}
            </div>

            {!hasPremiumAccess ? (
              <Link className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-brand-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50" href="/payment?product=premium">
                ดู Premium {MANUAL_PREMIUM_PRICE_THB} บาท <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-blue-100">ความคืบหน้าจากบทที่เปิด</p>
                <div className="mt-2 text-5xl font-black">{progressPercent}%</div>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-white/10 text-cyan-200">
                <BarChart3 className="h-7 w-7" />
              </span>
            </div>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-blue-100">
              ผ่านแล้ว {completedAccessibleCount} จาก {accessibleLessons.length} บทที่เข้าเรียนได้
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map(({ icon: Icon, value, label, tone }) => (
          <article key={label} className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <span className={`grid h-10 w-10 place-items-center rounded-lg ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="mt-4 break-words text-3xl font-black text-ink">{value}</div>
            <div className="mt-1 text-sm font-bold leading-5 text-slate-600">{label}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        <article className="panel overflow-hidden">
          <div className="grid h-full gap-6 bg-gradient-to-br from-brand-50 via-white to-lavender-50 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Next step</p>
              <div className="mt-4 flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-700 text-white shadow-lg shadow-blue-600/20">
                  <PlayCircle className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-black text-brand-700">
                    {nextStep?.course.title || "เริ่มต้นเส้นทางเรียน"}
                  </p>
                  <h2 className="mt-2 text-2xl font-black leading-tight text-ink sm:text-3xl">
                    {nextStep?.lesson.title || "เริ่มเรียนบทแรกของ Python"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {nextStep?.lesson.subtitle || "เริ่มจากบทเรียนฟรีและค่อย ๆ สร้างพื้นฐานไปทีละขั้น"}
                  </p>
                </div>
              </div>
            </div>
            {nextStep ? (
              <Link className="btn-primary w-full lg:w-auto" href={`/lessons/${nextStep.lesson.slug}`}>
                เรียนต่อ <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link className="btn-primary w-full lg:w-auto" href="/lessons">
                ดูหลักสูตร <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </article>

        <MembershipCard
          hasLandingAccess={hasLandingAccess}
          hasPremiumAccess={hasPremiumAccess}
          isAdmin={isAdmin}
          latestSlip={latestSlip}
        />
      </section>

      <section>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">My courses</p>
            <h2 className="section-title mt-3">คอร์สของฉัน</h2>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-slate-500">
              คอร์สที่เรียนได้จะแสดงปุ่มเข้าเรียน ส่วนคอร์สที่ยังล็อกสามารถอัปเกรดหรือซื้อแยกได้
            </p>
          </div>
          <Link className="btn-secondary" href="/lessons">ดูหลักสูตรทั้งหมด</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCourses.map((course) => (
            <DashboardCourseCard
              key={course.slug}
              completedLessonIds={completedLessonIds}
              course={course}
              user={user}
            />
          ))}
        </div>
      </section>

      <AccountCard
        hasLandingAccess={hasLandingAccess}
        hasPremiumAccess={hasPremiumAccess}
        user={user}
      />
    </div>
  );
}

function DashboardCourseCard({
  completedLessonIds,
  course,
  user
}: {
  completedLessonIds: Set<number>;
  course: Course;
  user: CurrentUser;
}) {
  const access = getCourseAccess(course, user);
  const completedCount = course.lessons.filter((lesson) =>
    completedLessonIds.has(lesson.id)
  ).length;
  const progress = course.lessons.length
    ? Math.round((completedCount / course.lessons.length) * 100)
    : 0;
  const isLocked = access.status === "ล็อก";

  return (
    <article className="panel group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
      <div className={`relative bg-gradient-to-br ${course.accent} p-5 text-white`}>
        <div className="flex items-start justify-between gap-3">
          <span className="text-2xl font-black">{course.iconLabel || "Course"}</span>
          {course.separatePurchase ? (
            <SpecialCourseBadge />
          ) : (
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">
              Premium
            </span>
          )}
        </div>
        <p className="mt-8 text-sm font-bold text-white/80">{course.lessons.length} บทเรียน</p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black text-ink">{course.title}</h3>
          <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-black ${access.statusClass}`}>
            {access.status}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm font-bold leading-6 text-slate-500">{course.subtitle}</p>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 text-xs font-black text-slate-500">
            <span>ความคืบหน้า</span>
            <span>{completedCount}/{course.lessons.length} บท</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-lavender-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link className={isLocked ? "btn-secondary mt-5 w-full" : "btn-primary mt-5 w-full"} href={access.href}>
          {isLocked ? <LockKeyhole className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
          {access.label}
        </Link>
      </div>
    </article>
  );
}

function MembershipCard({
  hasLandingAccess,
  hasPremiumAccess,
  isAdmin,
  latestSlip
}: {
  hasLandingAccess: boolean;
  hasPremiumAccess: boolean;
  isAdmin: boolean;
  latestSlip?: {
    productType: string;
    status: string;
  };
}) {
  return (
    <aside className="panel p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Membership</p>
          <h2 className="mt-2 text-xl font-black text-ink">สิทธิ์การเรียนของคุณ</h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
          <CreditCard className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {isAdmin ? (
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm font-bold leading-6 text-cyan-900">
            บัญชี Admin เข้าถึงและตรวจสอบได้ทุกคอร์ส
          </div>
        ) : null}
        {hasPremiumAccess && !isAdmin ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
            บัญชีนี้เป็น Premium แล้ว เข้าคอร์สหลักทั้ง 9 คอร์สได้
          </div>
        ) : null}
        {hasLandingAccess && !isAdmin ? (
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm font-bold leading-6 text-cyan-900">
            มีสิทธิ์ Landing Page Begins
          </div>
        ) : null}
        {!hasPremiumAccess && latestSlip ? (
          <div className="rounded-lg bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
            สลิปล่าสุดสำหรับ {slipProductText(latestSlip.productType)}: {slipStatusText(latestSlip.status)}
          </div>
        ) : null}
        {!hasPremiumAccess && !latestSlip ? (
          <p className="text-sm font-bold leading-6 text-slate-600">
            บัญชี Free เริ่มเรียนบทฟรีได้ทันที หรือดูแพ็กเกจเพื่อปลดล็อกคอร์สเพิ่มเติม
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
        {!hasPremiumAccess ? (
          <Link className="btn-primary w-full" href="/payment?product=premium">ดูแพ็กเกจ Premium</Link>
        ) : null}
        {!hasLandingAccess && !isAdmin ? (
          <Link className="btn-secondary w-full" href="/payment?product=landing-page-begins">ดู Landing Page Begins</Link>
        ) : null}
        {hasPremiumAccess && (hasLandingAccess || isAdmin) ? (
          <Link className="btn-secondary w-full" href="/lessons">ไปหน้าหลักสูตร</Link>
        ) : null}
      </div>
    </aside>
  );
}

function AccountCard({
  hasLandingAccess,
  hasPremiumAccess,
  user
}: {
  hasLandingAccess: boolean;
  hasPremiumAccess: boolean;
  user: CurrentUser;
}) {
  return (
    <section className="panel p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.3fr_0.7fr] lg:items-center">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-lavender-600 text-white">
            <UserRound className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="eyebrow">Account</p>
            <h2 className="mt-2 break-words text-xl font-black text-ink">{user.email}</h2>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-black uppercase text-slate-500">Role</div>
            <div className="mt-2 font-black text-ink">{user.role}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-black uppercase text-slate-500">Membership</div>
            <div className="mt-2 font-black text-ink">{hasPremiumAccess ? "Premium" : "Free"}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-black uppercase text-slate-500">Course access</div>
            <div className="mt-2 font-black text-ink">
              {user.role === "admin"
                ? "ทุกคอร์ส"
                : hasPremiumAccess && hasLandingAccess
                  ? "Premium + Landing"
                  : hasLandingAccess
                    ? "Landing"
                    : hasPremiumAccess
                      ? "Premium"
                      : "บทเรียนฟรี"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Link className="btn-secondary w-full sm:w-auto" href="/settings">
          <Settings className="h-4 w-4" /> ตั้งค่าบัญชี
        </Link>
      </div>
    </section>
  );
}
