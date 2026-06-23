import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  FolderKanban,
  Laptop,
  Sparkles,
  Users
} from "lucide-react";
import { LessonCard } from "@/components/LessonCard";
import { lessons } from "@/lib/lessons";
import { getCurrentUser } from "@/lib/session";

const features = [
  {
    title: "เหมาะสำหรับมือใหม่",
    description: "เริ่มจากศูนย์ ไม่ต้องมีพื้นฐานเขียนโปรแกรมมาก่อน",
    icon: Users
  },
  {
    title: "เรียนเป็นขั้นตอน",
    description: "บทเรียนเรียงจากง่ายไปยาก พร้อมสรุปและแบบฝึกหัดทุกบท",
    icon: BookOpenCheck
  },
  {
    title: "ฝึกทำโปรเจกต์จริง",
    description: "ต่อยอดเป็นเกมทายเลขและแอปแบบทดสอบเพื่อเห็นภาพการใช้งานจริง",
    icon: FolderKanban
  },
  {
    title: "เรียนได้ทุกอุปกรณ์",
    description: "ออกแบบ responsive สำหรับมือถือ แท็บเล็ต และคอมพิวเตอร์",
    icon: Laptop
  }
];

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-lavender-50" />
        <div className="page-shell relative grid min-h-[calc(100vh-76px)] items-center gap-12 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-black text-brand-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Python สำหรับมือใหม่
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              เริ่มต้นเขียนโปรแกรมด้วย Python
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              เรียนรู้ Python ตั้งแต่ศูนย์ ผ่านบทเรียนที่เข้าใจง่าย พร้อมแบบฝึกหัดและโปรเจกต์จริง
            </p>
            <p className="mt-3 text-base leading-7 text-slate-500">
              เรียน Python ตั้งแต่พื้นฐาน เหมาะสำหรับผู้ที่ไม่เคยเขียนโปรแกรมมาก่อน
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6 py-4" href={user ? "/dashboard" : "/register"}>
                เริ่มเรียนฟรี
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="btn-secondary px-6 py-4" href="/lessons">
                ดูหลักสูตร
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur">
              {[
                [String(lessons.length), "บทเรียน"],
                ["2", "บทฟรี"],
                ["60%", "คะแนนผ่าน"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-slate-50 px-4 py-3 text-center">
                  <div className="text-2xl font-black text-ink">{value}</div>
                  <div className="mt-1 text-xs font-bold text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-200/70 to-lavender-200/70 blur-2xl" />
            <div className="panel relative overflow-hidden p-3">
              <Image
                priority
                alt="ผู้เรียนกำลังเรียน Python ผ่านแล็ปท็อป"
                className="h-auto w-full rounded-lg object-cover"
                height={1024}
                src="/images/course-hero.png"
                width={1792}
              />
            </div>
            <div className="absolute -bottom-5 left-5 hidden rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-course sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black text-ink">Beginner friendly</p>
                  <p className="text-sm font-bold text-slate-500">เรียนง่าย ทำตามได้จริง</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Why this course</p>
          <h2 className="section-title mt-3">ออกแบบมาเพื่อคนเริ่มต้นจริง ๆ</h2>
          <p className="mt-4 leading-7 text-slate-600">
            โครงสร้างคอร์สเหมาะกับผู้เรียนทุกวัย ผู้ปกครองสามารถซื้อให้ลูกเรียนได้
            และผู้ใหญ่ที่อยากเริ่มสายเทคโนโลยีก็เรียนตามได้อย่างมั่นใจ
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="panel p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200"
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-brand-50 to-lavender-50 text-brand-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-black text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="page-shell py-0">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Curriculum</p>
              <h2 className="section-title mt-3">บทเรียน Python ที่เรียนต่อได้ทันที</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                เริ่มจากคำสั่งพื้นฐาน ตัวแปร เงื่อนไข loop ไปจนถึง mini project
                ที่ช่วยให้เห็นภาพการเขียนโปรแกรมจริง
              </p>
            </div>
            <Link className="btn-secondary" href="/lessons">
              ดูหลักสูตรทั้งหมด
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {lessons.slice(0, 4).map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} user={user} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="panel overflow-hidden bg-gradient-to-r from-brand-700 to-lavender-600 p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.38fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                <CheckCircle2 className="h-4 w-4" />
                พร้อมเริ่มเรียนวันนี้
              </p>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                ปลดล็อกทุกบทเรียน พร้อมแบบฝึกหัดและโปรเจกต์จริง
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-50">
                สมาชิกฟรีเริ่มเรียนบทที่ 1-2 ได้ทันที และอัปเกรดเป็นพรีเมียมด้วย PromptPay
                เพื่อเรียนครบทุกบทแบบต่อเนื่อง
              </p>
            </div>
            <div className="rounded-lg bg-white p-5 text-ink">
              <div className="text-sm font-black text-brand-700">Premium course</div>
              <div className="mt-2 text-4xl font-black">199 บาท</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                เหมาะสำหรับผู้เรียนส่วนตัวหรือผู้ปกครองที่ต้องการซื้อให้ลูกเรียน
              </p>
              <Link className="btn-primary mt-5 w-full" href="/payment">
                อัปเกรดเป็นพรีเมียม
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
