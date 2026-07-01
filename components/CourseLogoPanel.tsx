import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import type { Course } from "@/lib/courses";

type CourseLogoPanelProps = {
  course: Course;
  locked?: boolean;
};

function ShieldLogo({
  color,
  shade,
  label,
  number
}: {
  color: string;
  shade: string;
  label: string;
  number: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className="h-32 w-32 sm:h-36 sm:w-36"
      role="img"
      viewBox="0 0 128 144"
    >
      <path d="M14 8h100l-9 104-41 24-41-24L14 8Z" fill={color} />
      <path d="M64 18h38l-7 88-31 18V18Z" fill={shade} opacity="0.95" />
      <text
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="900"
        textAnchor="middle"
        x="64"
        y="42"
      >
        {label}
      </text>
      <text
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="62"
        fontWeight="900"
        textAnchor="middle"
        x="64"
        y="98"
      >
        {number}
      </text>
    </svg>
  );
}

function JavaScriptLogo() {
  return (
    <svg aria-hidden="true" className="h-28 w-28 sm:h-32 sm:w-32" viewBox="0 0 128 128">
      <rect fill="#f7df1e" height="128" width="128" />
      <text
        fill="#111827"
        fontFamily="Arial, sans-serif"
        fontSize="46"
        fontWeight="900"
        letterSpacing="-3"
        x="35"
        y="101"
      >
        JS
      </text>
    </svg>
  );
}

function GitLogo() {
  return (
    <svg aria-hidden="true" className="h-32 w-32 sm:h-36 sm:w-36" viewBox="0 0 128 128">
      <rect fill="#f05033" height="74" rx="10" transform="rotate(45 64 64)" width="74" x="27" y="27" />
      <path
        d="M47 42 86 81M58 53v27"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="9"
      />
      <circle cx="47" cy="42" fill="white" r="9" />
      <circle cx="58" cy="53" fill="white" r="9" />
      <circle cx="86" cy="81" fill="white" r="9" />
      <text
        fill="#111827"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fontWeight="900"
        textAnchor="middle"
        x="64"
        y="122"
      >
        Git
      </text>
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg aria-hidden="true" className="h-32 w-32 sm:h-36 sm:w-36" viewBox="0 0 128 128">
      <g fill="none" stroke="#61dafb" strokeWidth="6">
        <ellipse cx="64" cy="64" rx="50" ry="18" />
        <ellipse cx="64" cy="64" rx="50" ry="18" transform="rotate(60 64 64)" />
        <ellipse cx="64" cy="64" rx="50" ry="18" transform="rotate(120 64 64)" />
      </g>
      <circle cx="64" cy="64" fill="#61dafb" r="8" />
      <text
        fill="#0f172a"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="900"
        textAnchor="middle"
        x="64"
        y="122"
      >
        React
      </text>
    </svg>
  );
}

function NextLogo() {
  return (
    <svg aria-hidden="true" className="h-28 w-36 sm:h-32 sm:w-40" viewBox="0 0 180 128">
      <circle cx="64" cy="64" fill="#111827" r="52" />
      <path d="M44 88V40h10l38 52V40h10v48H92L54 36v52H44Z" fill="white" />
      <text
        fill="#111827"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="900"
        x="118"
        y="72"
      >
        .js
      </text>
    </svg>
  );
}

function SqlLogo() {
  return (
    <svg aria-hidden="true" className="h-32 w-32 sm:h-36 sm:w-36" viewBox="0 0 128 128">
      <ellipse cx="64" cy="32" fill="#10b981" rx="40" ry="16" />
      <path d="M24 32v58c0 9 18 16 40 16s40-7 40-16V32" fill="#059669" />
      <ellipse cx="64" cy="90" fill="#34d399" rx="40" ry="16" />
      <path d="M24 51c0 9 18 16 40 16s40-7 40-16M24 70c0 9 18 16 40 16s40-7 40-16" fill="none" stroke="#a7f3d0" strokeWidth="4" />
      <text
        fill="#064e3b"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fontWeight="900"
        textAnchor="middle"
        x="64"
        y="124"
      >
        SQL
      </text>
    </svg>
  );
}

function ProjectLogo() {
  return (
    <svg aria-hidden="true" className="h-32 w-32 sm:h-36 sm:w-36" viewBox="0 0 128 128">
      <path d="M16 34h39l10 12h47v52a10 10 0 0 1-10 10H26a10 10 0 0 1-10-10V34Z" fill="#f59e0b" />
      <path d="M16 46h96v52a10 10 0 0 1-10 10H26a10 10 0 0 1-10-10V46Z" fill="#fbbf24" />
      <path d="m47 72-13 12 13 12M81 72l13 12-13 12M70 68 58 100" fill="none" stroke="#111827" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <text
        fill="#111827"
        fontFamily="Arial, sans-serif"
        fontSize="15"
        fontWeight="900"
        textAnchor="middle"
        x="64"
        y="124"
      >
        Project
      </text>
    </svg>
  );
}

function CourseMark({ course }: { course: Course }) {
  switch (course.slug) {
    case "python-beginner":
      return course.logoImage ? (
        <Image
          alt={`โลโก้คอร์ส ${course.title}`}
          className="h-28 w-28 object-contain sm:h-32 sm:w-32"
          height={192}
          priority={false}
          src={course.logoImage}
          width={192}
        />
      ) : (
        <span className="text-5xl font-black text-brand-700">Py</span>
      );
    case "javascript-beginner":
      return <JavaScriptLogo />;
    case "html-basics":
      return <ShieldLogo color="#e44d26" label="HTML" number="5" shade="#f16529" />;
    case "css-basics":
      return <ShieldLogo color="#1572b6" label="CSS" number="3" shade="#33a9dc" />;
    case "git-github":
      return <GitLogo />;
    case "react-basics":
      return <ReactLogo />;
    case "nextjs-basics":
      return <NextLogo />;
    case "sql-database":
      return <SqlLogo />;
    case "real-web-project":
      return <ProjectLogo />;
    case "landing-page-begins":
      return (
        <div className="text-center text-slate-950">
          <div className="text-6xl font-black tracking-tight text-cyan-600">LP</div>
          <div className="mt-2 text-sm font-black uppercase tracking-[0.16em]">
            Landing Page Begins
          </div>
        </div>
      );
    default:
      return <span className="text-4xl font-black text-slate-800">{course.iconLabel || "Code"}</span>;
  }
}

export function CourseLogoPanel({ course, locked = false }: CourseLogoPanelProps) {
  return (
    <div className="relative grid min-h-[220px] place-items-center p-5">
      {locked ? (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-600 shadow-sm">
          <LockKeyhole className="h-3 w-3 text-amber-600" />
          ล็อก
        </span>
      ) : null}

      <div className={locked ? "opacity-70 grayscale-[20%]" : ""}>
        <CourseMark course={course} />
      </div>
    </div>
  );
}
