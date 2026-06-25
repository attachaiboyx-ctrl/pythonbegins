import { javascriptLessons, pythonLessons, type Lesson } from "@/lib/lessons";

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  status: "available" | "coming-soon";
  lessons: Lesson[];
  accent: string;
  logoImage?: string;
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
    logoImage: "/images/python-course-logo.png"
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
    logoImage: "/images/javascript-course-logo.png"
  }
];

export const futureCourses = [
  "สร้างเว็บไซต์ด้วย React",
  "HTML พื้นฐาน", 
  "CSS พื้นฐาน",
  "SQL เบื้องต้น"
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCourseByLessonSlug(lessonSlug: string) {
  return courses.find((course) =>
    course.lessons.some((lesson) => lesson.slug === lessonSlug)
  );
}
