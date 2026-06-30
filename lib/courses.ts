import { javascriptLessons, pythonLessons, type Lesson } from "@/lib/lessons";
import {
  cssLessons,
  gitLessons,
  htmlLessons,
  nextjsLessons,
  reactLessons,
  realWebProjectLessons,
  sqlLessons
} from "@/lib/upcoming-lessons";

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  status: "available" | "coming-soon";
  premiumOnly?: boolean;
  lessons: Lesson[];
  accent: string;
  logoImage?: string;
  iconLabel?: string;
  launchLabel?: string;
};

export const courses: Course[] = [
  {
    slug: "python-beginner",
    title: "Python มือใหม่",
    subtitle: "เริ่มเขียนโปรแกรมจากศูนย์ด้วย Python",
    description:
      "คอร์สสำหรับผู้เริ่มต้นที่ไม่เคยเขียนโปรแกรมมาก่อน เรียนเป็นขั้นตอนตั้งแต่คำสั่งพื้นฐาน ตัวแปร เงื่อนไข loop ไปจนถึงโปรเจกต์เกมทายตัวเลข",
    level: "Beginner",
    status: "available",
    lessons: pythonLessons,
    accent: "from-brand-600 via-blue-500 to-lavender-600",
    logoImage: "/images/python-course-logo.png",
    iconLabel: "PY"
  },
  {
    slug: "javascript-beginner",
    title: "JavaScript มือใหม่",
    subtitle: "เริ่มต้นเรียน JavaScript จากศูนย์",
    description:
      "เริ่มต้นเรียน JavaScript จากศูนย์ เหมาะสำหรับผู้เริ่มต้นที่อยากเข้าใจพื้นฐานการเขียนโปรแกรมและการทำเว็บ",
    level: "Beginner",
    status: "available",
    lessons: javascriptLessons,
    accent: "from-yellow-400 via-amber-500 to-slate-950",
    logoImage: "/images/javascript-course-logo.png",
    iconLabel: "JS"
  }
];

export const upcomingCourses: Course[] = [
  {
    slug: "html-basics",
    title: "HTML พื้นฐาน",
    subtitle: "เริ่มวางโครงสร้างหน้าเว็บอย่างถูกต้อง",
    description:
      "เรียนโครงสร้างหน้าเว็บตั้งแต่ศูนย์ เตรียมพื้นฐานก่อนเข้าสู่การทำเว็บจริง",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: htmlLessons,
    accent: "from-orange-500 via-rose-500 to-slate-950",
    iconLabel: "HTML",
  },
  {
    slug: "css-basics",
    title: "CSS พื้นฐาน",
    subtitle: "แต่งหน้าเว็บให้สวยและใช้งานได้ทุกหน้าจอ",
    description:
      "แต่งหน้าเว็บให้สวยงาม จัด layout สี ฟอนต์ และ responsive เบื้องต้น",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: cssLessons,
    accent: "from-sky-500 via-indigo-500 to-lavender-700",
    iconLabel: "CSS",
  },
  {
    slug: "git-github",
    title: "Git & GitHub",
    subtitle: "เก็บเวอร์ชันโค้ดและอัปโปรเจกต์แบบนักพัฒนา",
    description:
      "เรียนการเก็บเวอร์ชันโค้ด อัปโปรเจกต์ขึ้น GitHub และทำงานแบบนักพัฒนา",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: gitLessons,
    accent: "from-slate-950 via-slate-800 to-violet-700",
    iconLabel: "Git",
  },
  {
    slug: "react-basics",
    title: "React เบื้องต้น",
    subtitle: "เริ่มสร้าง UI แบบ component",
    description:
      "เริ่มสร้าง UI แบบ component และเข้าใจพื้นฐาน React สำหรับทำเว็บยุคใหม่",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: reactLessons,
    accent: "from-cyan-400 via-blue-500 to-slate-950",
    iconLabel: "React",
  },
  {
    slug: "nextjs-basics",
    title: "Next.js เบื้องต้น",
    subtitle: "ต่อยอด React ไปสู่เว็บจริง",
    description:
      "ต่อยอด React ไปสู่การทำเว็บจริงด้วย Next.js และโครงสร้างโปรเจกต์แบบมืออาชีพ",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: nextjsLessons,
    accent: "from-slate-950 via-zinc-900 to-brand-700",
    iconLabel: "Next.js",
  },
  {
    slug: "sql-database",
    title: "SQL / Database",
    subtitle: "เข้าใจฐานข้อมูลสำหรับระบบจริง",
    description:
      "เรียนพื้นฐานฐานข้อมูล ตาราง ข้อมูล และการ query สำหรับทำระบบจริง",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: sqlLessons,
    accent: "from-emerald-500 via-teal-600 to-slate-950",
    iconLabel: "SQL",
  },
  {
    slug: "real-web-project",
    title: "โปรเจกต์ทำเว็บจริง",
    subtitle: "ฝึกทำเว็บจริงตั้งแต่ต้นจนขึ้นออนไลน์",
    description:
      "ฝึกทำเว็บจริงแบบเป็นขั้นตอน ตั้งแต่หน้าเว็บ ระบบผู้ใช้ ไปจนถึงการนำขึ้นออนไลน์",
    level: "Premium",
    status: "available",
    premiumOnly: true,
    lessons: realWebProjectLessons,
    accent: "from-amber-400 via-orange-500 to-slate-950",
    iconLabel: "Project",
  }
];

export const courseCatalog: Course[] = [...courses, ...upcomingCourses];

export const futureCourses = upcomingCourses.map((course) => course.title);

export function getCourseBySlug(slug: string) {
  return courseCatalog.find((course) => course.slug === slug);
}

export function getCourseByLessonSlug(lessonSlug: string) {
  return courseCatalog.find((course) =>
    course.lessons.some((lesson) => lesson.slug === lessonSlug)
  );
}
