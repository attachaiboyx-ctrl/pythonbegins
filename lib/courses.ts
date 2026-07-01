import { javascriptLessons, pythonLessons, type Lesson } from "@/lib/lessons";
import {
  cssLessons as cssCoreLessons,
  gitLessons as gitCoreLessons,
  htmlLessons as htmlCoreLessons,
  nextjsLessons as nextjsCoreLessons,
  reactLessons as reactCoreLessons,
  realWebProjectLessons as projectCoreLessons,
  sqlLessons as sqlCoreLessons
} from "@/lib/upcoming-lessons";
import {
  cssSupplementalLessons,
  gitSupplementalLessons,
  htmlSupplementalLessons,
  landingPageLessons,
  nextjsSupplementalLessons,
  projectSupplementalLessons,
  reactSupplementalLessons,
  sqlSupplementalLessons
} from "@/lib/supplemental-lessons";

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  status: "available" | "coming-soon";
  premiumOnly?: boolean;
  separatePurchase?: {
    productType: string;
    price: number;
  };
  lessons: Lesson[];
  accent: string;
  logoImage?: string;
  iconLabel?: string;
  launchLabel?: string;
};

function numberLessons(lessonItems: Lesson[], titles?: string[]) {
  return lessonItems.map((lesson, index) => ({
    ...lesson,
    order: index + 1,
    title: `บทที่ ${index + 1}: ${
      titles?.[index] || lesson.title.replace(/^บทที่ \d+:\s*/, "")
    }`
  }));
}

const lessonTitles = {
  html: [
    "HTML คืออะไร และโครงสร้างหน้าเว็บ",
    "Heading, Paragraph และ Text Formatting",
    "Link และ Image",
    "List และ Table",
    "Form เบื้องต้น",
    "Semantic HTML",
    "การจัดโครงหน้าเว็บแบบพื้นฐาน",
    "Mini Project: หน้าโปรไฟล์อย่างง่าย"
  ],
  css: [
    "CSS คืออะไร และการเชื่อม CSS",
    "Color, Font และ Spacing",
    "Box Model",
    "Display และ Position เบื้องต้น",
    "Flexbox",
    "Responsive Design เบื้องต้น",
    "Hover, Transition และ Effect ง่าย ๆ",
    "Mini Project: แต่งหน้าโปรไฟล์ให้สวยขึ้น"
  ],
  git: [
    "Git คืออะไร ทำไมต้องใช้",
    "git init, status, add, commit",
    "Branch เบื้องต้น",
    "GitHub Repository",
    "push / pull",
    "Workflow สำหรับโปรเจกต์จริง"
  ],
  react: [
    "React คืออะไร",
    "Component",
    "Props",
    "State",
    "Event Handling",
    "Conditional Rendering",
    "List Rendering",
    "Mini Project: Todo List"
  ],
  nextjs: [
    "Next.js คืออะไร",
    "App Router เบื้องต้น",
    "page.tsx และ layout.tsx",
    "Navigation และ Link",
    "Server Component vs Client Component แบบเข้าใจง่าย",
    "Dynamic Route",
    "API Route เบื้องต้น",
    "แนวคิดการ Deploy เว็บ Next.js"
  ],
  sql: [
    "Database คืออะไร",
    "Table, Row และ Column",
    "SELECT",
    "WHERE และ ORDER BY",
    "INSERT / UPDATE / DELETE",
    "Relation เบื้องต้น"
  ],
  project: [
    "วางแผนโปรเจกต์เว็บจริง",
    "สร้าง Landing Page",
    "ทำ Responsive Layout",
    "เพิ่ม Navigation",
    "ทำ Form / Contact Section",
    "เชื่อมข้อมูลจำลอง",
    "เตรียม Deploy",
    "สรุปโปรเจกต์และแนวทางต่อยอด"
  ],
  landing: [
    "Landing Page คืออะไร และใช้ทำอะไร",
    "วางเป้าหมายของหน้าเว็บ",
    "วางโครงหน้า Landing Page",
    "ทำ Hero Section",
    "ทำปุ่ม LINE / Facebook / โทร",
    "ทำ Section บริการ ราคา จุดเด่น",
    "ทำ Section รีวิวและความน่าเชื่อถือ",
    "ทำ Responsive สำหรับมือถือ",
    "Deploy ขึ้น Vercel",
    "ทำ Portfolio และแนวทางเสนอรับงาน"
  ]
};

const htmlLessons = numberLessons([
  htmlCoreLessons[0],
  htmlSupplementalLessons[0],
  htmlCoreLessons[1],
  htmlSupplementalLessons[1],
  htmlCoreLessons[2],
  ...htmlSupplementalLessons.slice(2)
], lessonTitles.html);
const cssLessons = numberLessons([
  cssSupplementalLessons[0],
  cssSupplementalLessons[1],
  cssCoreLessons[0],
  cssSupplementalLessons[2],
  cssCoreLessons[1],
  cssCoreLessons[2],
  cssSupplementalLessons[3],
  cssSupplementalLessons[4]
], lessonTitles.css);
const gitLessons = numberLessons([
  gitSupplementalLessons[0],
  gitCoreLessons[0],
  gitCoreLessons[1],
  gitSupplementalLessons[1],
  gitCoreLessons[2],
  gitSupplementalLessons[2]
], lessonTitles.git);
const reactLessons = numberLessons([
  reactSupplementalLessons[0],
  reactCoreLessons[0],
  reactCoreLessons[1],
  reactCoreLessons[2],
  ...reactSupplementalLessons.slice(1)
], lessonTitles.react);
const nextjsLessons = numberLessons([
  nextjsSupplementalLessons[0],
  nextjsCoreLessons[0],
  nextjsSupplementalLessons[1],
  nextjsSupplementalLessons[2],
  nextjsCoreLessons[1],
  nextjsSupplementalLessons[3],
  nextjsSupplementalLessons[4],
  nextjsSupplementalLessons[5]
], lessonTitles.nextjs);
const sqlLessons = numberLessons([
  sqlSupplementalLessons[0],
  sqlCoreLessons[0],
  sqlCoreLessons[2],
  sqlSupplementalLessons[1],
  sqlSupplementalLessons[2],
  sqlCoreLessons[1]
], lessonTitles.sql);
const realWebProjectLessons = numberLessons([
  projectCoreLessons[0],
  ...projectSupplementalLessons
], lessonTitles.project);
const numberedLandingPageLessons = numberLessons(
  landingPageLessons,
  lessonTitles.landing
);

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

export const premiumCourses: Course[] = [...courses, ...upcomingCourses];

export const separateCourses: Course[] = [
  {
    slug: "landing-page-begins",
    title: "Landing Page Begins",
    subtitle: "สร้างเว็บหน้าเดียวสำหรับร้านค้า บริการ และ Portfolio",
    description:
      "เรียนรู้การสร้าง Landing Page สำหรับร้านค้า ธุรกิจเล็ก และคนที่อยากโปรโมทบริการ ตั้งแต่การวางโครงหน้าเว็บ ทำ Hero Section ปุ่มติดต่อ Responsive Design ไปจนถึง Deploy ขึ้นออนไลน์ เพื่อใช้เป็นผลงานใน Portfolio และต่อยอดเป็นทักษะรับงานเสริมในอนาคต",
    level: "คอร์สแยก",
    status: "available",
    separatePurchase: {
      productType: "landing-page-begins",
      price: 200
    },
    lessons: numberedLandingPageLessons,
    accent: "from-cyan-500 via-blue-600 to-slate-950",
    iconLabel: "LP"
  }
];

courseCatalog.push(...separateCourses);

export const futureCourses = upcomingCourses.map((course) => course.title);

export function getCourseBySlug(slug: string) {
  return courseCatalog.find((course) => course.slug === slug);
}

export function getCourseByLessonSlug(lessonSlug: string) {
  return courseCatalog.find((course) =>
    course.lessons.some((lesson) => lesson.slug === lessonSlug)
  );
}
