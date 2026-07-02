import Link from "next/link";
import {
  BookOpenText,
  Box,
  Braces,
  Calculator,
  CheckCircle2,
  Clock3,
  Code2,
  Crown,
  Database,
  Dice5,
  Gamepad2,
  GitBranch,
  Keyboard,
  KeyRound,
  List,
  ListChecks,
  ListPlus,
  LockKeyhole,
  PlayCircle,
  RefreshCw,
  Repeat2,
  Rocket,
  Ruler,
  Terminal,
  Trophy,
  Type
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Lesson } from "@/lib/lessons";
import { canAccessLesson, getLessonStatusLabel } from "@/lib/lessons";
import {
  isManualPaymentProductType,
  manualPaymentProducts
} from "@/lib/manual-payment-config";
import type { CurrentUser } from "@/lib/session";

type LessonProgress = {
  completed: boolean;
  quizScore: number | null;
};

type LessonCoverTheme = {
  icon: LucideIcon;
  gradient: string;
  glow: string;
  pattern: string;
  label: string;
};

const lessonCoverThemes: Record<number, LessonCoverTheme> = {
  1: {
    icon: Terminal,
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    glow: "bg-sky-300/35",
    pattern: "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.28) 0 2px, transparent 2px 18px)",
    label: "Hello code"
  },
  2: {
    icon: Database,
    gradient: "from-violet-600 via-fuchsia-600 to-indigo-800",
    glow: "bg-fuchsia-300/30",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.16) 0 1px, transparent 1px 14px)",
    label: "Data types"
  },
  3: {
    icon: Keyboard,
    gradient: "from-cyan-500 via-teal-500 to-emerald-700",
    glow: "bg-cyan-200/35",
    pattern: "radial-gradient(circle at 24% 28%, rgba(255,255,255,0.2) 0 3px, transparent 3px 20px)",
    label: "Input"
  },
  4: {
    icon: GitBranch,
    gradient: "from-orange-500 via-rose-500 to-violet-700",
    glow: "bg-orange-200/35",
    pattern: "linear-gradient(90deg, rgba(255,255,255,0.13) 0 2px, transparent 2px 18px)",
    label: "Decision"
  },
  5: {
    icon: Repeat2,
    gradient: "from-slate-950 via-blue-900 to-indigo-700",
    glow: "bg-blue-300/25",
    pattern: "radial-gradient(circle at 75% 24%, rgba(147,197,253,0.28) 0 2px, transparent 2px 16px)",
    label: "Loops"
  },
  6: {
    icon: List,
    gradient: "from-purple-600 via-pink-500 to-rose-600",
    glow: "bg-pink-200/30",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.14) 25%, transparent 25% 50%, rgba(255,255,255,0.14) 50% 75%, transparent 75%)",
    label: "List"
  },
  7: {
    icon: Braces,
    gradient: "from-indigo-700 via-blue-700 to-slate-950",
    glow: "bg-indigo-300/30",
    pattern: "linear-gradient(90deg, rgba(255,255,255,0.16) 0 1px, transparent 1px 22px)",
    label: "Function"
  },
  8: {
    icon: KeyRound,
    gradient: "from-emerald-600 via-teal-700 to-slate-900",
    glow: "bg-emerald-200/30",
    pattern: "radial-gradient(circle at 20% 70%, rgba(255,255,255,0.18) 0 3px, transparent 3px 18px)",
    label: "Key value"
  },
  9: {
    icon: Gamepad2,
    gradient: "from-amber-500 via-orange-600 to-fuchsia-700",
    glow: "bg-amber-200/40",
    pattern: "radial-gradient(circle at 70% 35%, rgba(255,255,255,0.2) 0 4px, transparent 4px 22px)",
    label: "Mini game"
  },
  10: {
    icon: Trophy,
    gradient: "from-yellow-500 via-amber-600 to-slate-900",
    glow: "bg-yellow-200/40",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 16px)",
    label: "Quiz app"
  },
  11: {
    icon: Calculator,
    gradient: "from-blue-600 via-cyan-600 to-slate-900",
    glow: "bg-cyan-200/30",
    pattern: "radial-gradient(circle at 22% 25%, rgba(255,255,255,0.2) 0 2px, transparent 2px 14px)",
    label: "Numbers"
  },
  12: {
    icon: Type,
    gradient: "from-fuchsia-600 via-violet-700 to-slate-950",
    glow: "bg-fuchsia-200/30",
    pattern: "linear-gradient(90deg, rgba(255,255,255,0.16) 0 1px, transparent 1px 18px)",
    label: "Text"
  },
  13: {
    icon: Ruler,
    gradient: "from-lime-500 via-emerald-600 to-teal-900",
    glow: "bg-lime-200/35",
    pattern: "linear-gradient(90deg, rgba(255,255,255,0.18) 0 2px, transparent 2px 12px)",
    label: "Length"
  },
  14: {
    icon: ListChecks,
    gradient: "from-indigo-600 via-purple-600 to-pink-700",
    glow: "bg-purple-200/30",
    pattern: "radial-gradient(circle at 18% 28%, rgba(255,255,255,0.2) 0 3px, transparent 3px 19px)",
    label: "Array"
  },
  15: {
    icon: ListPlus,
    gradient: "from-rose-500 via-orange-500 to-amber-600",
    glow: "bg-amber-200/35",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 18px)",
    label: "Append"
  },
  16: {
    icon: RefreshCw,
    gradient: "from-cyan-600 via-blue-700 to-indigo-900",
    glow: "bg-blue-200/30",
    pattern: "radial-gradient(circle at 78% 24%, rgba(255,255,255,0.2) 0 3px, transparent 3px 18px)",
    label: "Loop list"
  },
  17: {
    icon: Box,
    gradient: "from-emerald-700 via-cyan-700 to-blue-900",
    glow: "bg-emerald-200/30",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 13px)",
    label: "Dictionary"
  },
  18: {
    icon: Code2,
    gradient: "from-indigo-700 via-violet-700 to-slate-950",
    glow: "bg-indigo-200/30",
    pattern: "radial-gradient(circle at 28% 30%, rgba(255,255,255,0.22) 0 2px, transparent 2px 16px)",
    label: "Function"
  },
  19: {
    icon: Dice5,
    gradient: "from-purple-700 via-fuchsia-700 to-slate-950",
    glow: "bg-fuchsia-200/30",
    pattern: "radial-gradient(circle at 70% 28%, rgba(255,255,255,0.22) 0 3px, transparent 3px 18px)",
    label: "Random"
  },
  20: {
    icon: Rocket,
    gradient: "from-amber-400 via-yellow-600 to-slate-950",
    glow: "bg-yellow-200/40",
    pattern: "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.28) 0 2px, transparent 2px 16px)",
    label: "Final project"
  },
  101: {
    icon: Code2,
    gradient: "from-yellow-400 via-amber-500 to-slate-950",
    glow: "bg-yellow-200/40",
    pattern: "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.28) 0 2px, transparent 2px 16px)",
    label: "JS intro"
  },
  102: {
    icon: Terminal,
    gradient: "from-slate-950 via-zinc-900 to-yellow-500",
    glow: "bg-yellow-200/35",
    pattern: "linear-gradient(90deg, rgba(250,204,21,0.18) 0 1px, transparent 1px 18px)",
    label: "Console"
  },
  103: {
    icon: Box,
    gradient: "from-amber-500 via-blue-900 to-slate-950",
    glow: "bg-amber-200/35",
    pattern: "radial-gradient(circle at 24% 30%, rgba(255,255,255,0.22) 0 3px, transparent 3px 18px)",
    label: "Variables"
  },
  104: {
    icon: Database,
    gradient: "from-yellow-500 via-indigo-800 to-slate-950",
    glow: "bg-yellow-200/35",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 14px)",
    label: "Data types"
  },
  105: {
    icon: Calculator,
    gradient: "from-cyan-500 via-blue-800 to-slate-950",
    glow: "bg-cyan-200/30",
    pattern: "radial-gradient(circle at 76% 28%, rgba(250,204,21,0.26) 0 3px, transparent 3px 20px)",
    label: "Calculate"
  },
  106: {
    icon: GitBranch,
    gradient: "from-orange-400 via-yellow-600 to-slate-950",
    glow: "bg-orange-200/35",
    pattern: "linear-gradient(90deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 18px)",
    label: "If else"
  },
  107: {
    icon: Repeat2,
    gradient: "from-blue-950 via-indigo-800 to-yellow-500",
    glow: "bg-blue-200/25",
    pattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.22) 0 2px, transparent 2px 16px)",
    label: "Loops"
  },
  108: {
    icon: List,
    gradient: "from-yellow-400 via-sky-800 to-slate-950",
    glow: "bg-yellow-200/35",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.16) 25%, transparent 25% 50%, rgba(255,255,255,0.16) 50% 75%, transparent 75%)",
    label: "Array"
  },
  109: {
    icon: Braces,
    gradient: "from-indigo-950 via-blue-800 to-amber-500",
    glow: "bg-amber-200/35",
    pattern: "radial-gradient(circle at 22% 28%, rgba(255,255,255,0.22) 0 2px, transparent 2px 16px)",
    label: "Function"
  },
  110: {
    icon: Trophy,
    gradient: "from-amber-300 via-yellow-600 to-slate-950",
    glow: "bg-yellow-200/45",
    pattern: "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.32) 0 2px, transparent 2px 16px)",
    label: "JS project"
  }
};

const fallbackCoverTheme: LessonCoverTheme = {
  icon: BookOpenText,
  gradient: "from-brand-600 via-blue-500 to-lavender-600",
  glow: "bg-blue-200/30",
  pattern: "radial-gradient(circle at 20% 25%, rgba(255,255,255,0.2) 0 2px, transparent 2px 18px)",
  label: "Lesson"
};

function getLessonCoverTheme(lessonId: number) {
  return lessonCoverThemes[lessonId] || fallbackCoverTheme;
}

export function LessonCard({
  lesson,
  user,
  progress
}: {
  lesson: Lesson;
  user: Pick<CurrentUser, "role" | "membership" | "courseAccesses"> | null;
  progress?: LessonProgress;
}) {
  const unlocked = canAccessLesson(user, lesson);
  const statusLabel = getLessonStatusLabel(user, lesson);
  const separateProduct =
    lesson.purchaseCourseSlug &&
    isManualPaymentProductType(lesson.purchaseCourseSlug)
      ? manualPaymentProducts[lesson.purchaseCourseSlug]
      : null;
  const actionHref = unlocked
    ? `/lessons/${lesson.slug}`
    : lesson.purchaseCourseSlug
      ? `/payment?product=${lesson.purchaseCourseSlug}`
      : "/payment";
  const actionLabel = unlocked
    ? "เริ่มเรียน"
    : lesson.purchaseCourseSlug
      ? `ซื้อคอร์สนี้ ${separateProduct?.price ?? ""} บาท`
      : "อัปเกรดเป็น Premium";
  const coverTheme = getLessonCoverTheme(lesson.id);
  const CoverIcon = coverTheme.icon;

  return (
    <article className="group panel flex min-h-72 flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-blue-600/15">
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${coverTheme.gradient} p-5 text-white`}>
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: coverTheme.pattern, backgroundSize: "42px 42px" }}
        />
        <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full ${coverTheme.glow} blur-2xl transition duration-500 group-hover:scale-125`} />
        <div className="absolute -bottom-16 left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black backdrop-blur">
            บทที่ {lesson.order ?? lesson.id}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/20 backdrop-blur">
            {unlocked ? <PlayCircle className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
          </span>
        </div>
        <div className="relative mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] text-white/70">
              {coverTheme.label}
            </div>
            <div className="mt-1 h-1.5 w-14 rounded-full bg-white/35" />
          </div>
          <span className="grid h-14 w-14 place-items-center rounded-lg border border-white/20 bg-white/15 shadow-lg shadow-black/10 backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
            <CoverIcon className="h-7 w-7" />
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
