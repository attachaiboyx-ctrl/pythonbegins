import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  Crown,
  GraduationCap,
  Laptop,
  Sparkles
} from "lucide-react";
import { CourseLogoPanel } from "@/components/CourseLogoPanel";
import { SpecialCourseBadge } from "@/components/SpecialCourseBadge";
import { premiumCourses, separateCourses } from "@/lib/courses";

const premiumBenefits = [
  "บทเรียนภาษาไทย เข้าใจง่าย",
  "ตัวอย่างโค้ดที่นำไปทดลองได้",
  "แบบฝึกหัดท้ายบท",
  "Quiz สำหรับทบทวน",
  "เรียนผ่านเว็บได้ทุกอุปกรณ์",
  "มีคอร์สใหม่ทยอยเพิ่ม"
];

export default function HomePage() {
  const premiumLessonCount = premiumCourses.reduce(
    (total, course) => total + course.lessons.length,
    0
  );
  const separateCourse = separateCourses[0];

  return (
    <div>
      <section className="relative isolate min-h-[620px] overflow-hidden">
        <Image
          alt="แพลตฟอร์มเรียนเขียนโปรแกรม Python Begins"
          className="-z-20 object-cover object-center"
          fill
          priority
          src="/images/course-hero.png"
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/80" />
        <div className="page-shell flex min-h-[620px] items-center py-16">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Online course platform สำหรับมือใหม่
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              เริ่มเรียนเขียนโปรแกรมและทำเว็บจากศูนย์
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              เรียนพื้นฐานการเขียนโปรแกรม การทำเว็บ และเครื่องมือสำหรับนักพัฒนา
              ผ่านบทเรียนภาษาไทยที่เข้าใจง่าย มีตัวอย่างโค้ด แบบฝึกหัด Quiz
              และโปรเจกต์ให้ฝึกจริง
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6 py-4" href="/lessons">
                ดูหลักสูตรทั้งหมด <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/20" href="/payment">
                ดู Premium 399 บาท
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                [String(premiumCourses.length), "คอร์สหลัก"],
                [String(premiumLessonCount), "บทเรียน"],
                ["1", "คอร์สแยก"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4 text-center backdrop-blur">
                  <div className="text-2xl font-black">{value}</div>
                  <div className="mt-1 text-xs font-bold text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Premium curriculum</p>
            <h2 className="section-title mt-3">คอร์สหลักทั้งหมดใน Python Begins</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              เรียงเนื้อหาจากพื้นฐาน Python และ JavaScript ไปจนถึง HTML, CSS,
              Git, React, Next.js, SQL และโปรเจกต์ทำเว็บจริง
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm font-black text-amber-800">
            <Crown className="h-4 w-4" />
            {premiumLessonCount} บทเรียน
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {premiumCourses.map((course) => (
            <article key={course.slug} className="panel group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
              <div className={`bg-gradient-to-br ${course.accent} p-1`} />
              <CourseLogoPanel course={course} />
              <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-800">
                    <Crown className="h-3.5 w-3.5" /> Premium
                  </span>
                  <span className="text-sm font-black text-slate-500">
                    {course.lessons.length} บท
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-black text-ink">{course.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {course.description}
                </p>
                <Link className="btn-secondary mt-5 w-full" href={`/courses/${course.slug}`}>
                  ดูคอร์ส <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="page-shell py-0">
          <div className="panel overflow-hidden border-amber-200">
            <div className="grid gap-8 bg-gradient-to-br from-slate-950 via-brand-900 to-violet-950 p-7 text-white sm:p-10 lg:grid-cols-[1fr_0.36fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-4 py-2 text-sm font-black text-amber-200">
                  <Crown className="h-4 w-4" /> Premium access
                </p>
                <h2 className="mt-5 text-3xl font-black sm:text-4xl">Premium 399 บาท</h2>
                <p className="mt-4 max-w-3xl leading-7 text-blue-100">
                  ปลดล็อกคอร์สหลัก {premiumCourses.length} คอร์สใน Python Begins รวม {premiumLessonCount} บทเรียน
                  สำหรับผู้เริ่มต้นที่อยากเรียนเขียนโปรแกรมและต่อยอดสู่การทำเว็บจริง
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {premiumBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-bold text-blue-50">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 text-slate-950">
                <GraduationCap className="h-8 w-8 text-brand-700" />
                <div className="mt-4 text-sm font-black text-brand-700">คอร์สหลัก Premium</div>
                <div className="mt-1 text-4xl font-black">399 บาท</div>
                <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                  Landing Page Begins เป็นคอร์สแยกและไม่รวมในแพ็กเกจนี้
                </p>
                <Link className="btn-primary mt-5 w-full" href="/payment">ดูวิธีชำระเงิน</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="grid gap-8 overflow-hidden rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 shadow-course sm:p-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
          <div className="rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-slate-950 p-8 text-center text-white">
            <div className="text-7xl font-black tracking-tight">LP</div>
            <div className="mt-2 text-sm font-black uppercase tracking-[0.18em]">Landing Page Begins</div>
          </div>
          <div>
            <SpecialCourseBadge />
            <h2 className="mt-4 text-3xl font-black text-ink">Landing Page Begins</h2>
            <p className="mt-3 leading-7 text-slate-600">{separateCourse.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-black text-cyan-800">200 บาท</span>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">ไม่รวมใน Premium</span>
              <span className="text-sm font-bold text-slate-600">{separateCourse.lessons.length} บทเรียน</span>
            </div>
            <Link className="btn-primary mt-6" href="/courses/landing-page-begins">
              ดูรายละเอียดคอร์ส <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-4 py-8 sm:grid-cols-3">
        {[
          [Code2, "เริ่มจากพื้นฐาน", "เนื้อหาภาษาไทยและตัวอย่างที่ทำตามได้"],
          [BookOpenCheck, "ฝึกทุกบท", "มีแบบฝึกหัดและ Quiz สำหรับทบทวน"],
          [Laptop, "รองรับทุกหน้าจอ", "อ่านบทเรียนได้ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์"]
        ].map(([Icon, title, description]) => {
          const ItemIcon = Icon as typeof Code2;
          return (
            <article key={String(title)} className="panel p-6">
              <ItemIcon className="h-7 w-7 text-brand-700" />
              <h3 className="mt-4 text-lg font-black text-ink">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{String(description)}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
