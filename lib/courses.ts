import { lessons, type Lesson } from "@/lib/lessons";

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  status: "available" | "coming-soon";
  lessons: Lesson[];
  accent: string;
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
    lessons,
    accent: "from-brand-600 via-blue-500 to-lavender-600"
  }
];

export const futureCourses = [
  "สร้างเว็บไซต์ด้วย React",
  "HTML พื้นฐาน", 
  "CSS พื้นฐาน",
  "JavaScript มือใหม่",
  "SQL เบื้องต้น"
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
