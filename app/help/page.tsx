import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserPlus
} from "lucide-react";

export const metadata: Metadata = {
  title: "ช่วยเหลือ / FAQ | Python Begins",
  description:
    "วิธีสมัคร เข้าเรียน ชำระเงิน อัปโหลดสลิป และคำถามที่พบบ่อยสำหรับคอร์ส Python มือใหม่"
};

const learningSteps = [
  "กดสมัครสมาชิก",
  "กรอกชื่อ อีเมล และรหัสผ่าน",
  "Login เข้าสู่ระบบ",
  "ไปที่หน้า “ชำระเงิน”",
  "สแกน QR PromptPay หรือโอนเงินตามข้อมูลที่แสดง",
  "อัปโหลดสลิป",
  "รอแอดมินตรวจสอบ",
  "เมื่ออนุมัติแล้วจะเป็นสมาชิก Premium และเข้าเรียนบทที่ 1-20 ได้"
];

const faqs = [
  {
    question: "คอร์สนี้เหมาะกับใคร?",
    answer:
      "เหมาะกับผู้เริ่มต้นที่ยังไม่เคยเขียนโปรแกรม หรือเคยลองแล้วแต่ยังไม่เข้าใจพื้นฐาน"
  },
  {
    question: "ไม่มีพื้นฐานเรียนได้ไหม?",
    answer:
      "เรียนได้ เพราะคอร์สเริ่มจากพื้นฐาน เช่น print, ตัวแปร, input, if else, loop และค่อย ๆ เพิ่มระดับ"
  },
  {
    question: "เรียนผ่านมือถือได้ไหม?",
    answer:
      "เปิดอ่านบทเรียนผ่านมือถือได้ แต่ถ้าจะเขียนโค้ดจริง แนะนำใช้คอมพิวเตอร์หรือโน้ตบุ๊กจะสะดวกกว่า"
  },
  {
    question: "ใช้โปรแกรมอะไรในการเขียนโค้ด?",
    answer: "แนะนำให้ใช้ VS Code และติดตั้ง Python ในเครื่อง"
  },
  {
    question: "จ่ายเงินแล้วต้องรอนานไหม?",
    answer:
      "เป็นระบบตรวจสลิปแบบ manual แอดมินจะตรวจและอนุมัติให้เร็วที่สุด หากชำระช่วงดึกอาจต้องรอสักพัก"
  },
  {
    question: "หลังอนุมัติแล้วเข้าเรียนยังไง?",
    answer:
      "Login เข้าระบบ แล้วไปที่หน้า Dashboard หรือหน้า Python มือใหม่ จากนั้นเริ่มเรียนบทพรีเมียมได้ทันที"
  },
  {
    question: "เรียนได้ตลอดชีพไหม?",
    answer:
      "สมัครแล้วสามารถกลับมาเรียนซ้ำได้ และในอนาคตหากมีการอัปเดตบทเรียนใหม่ในคอร์สนี้ ผู้เรียนจะได้รับอัปเดตตามไปด้วย"
  },
  {
    question: "ตอนนี้มีวิดีโอสอนไหม?",
    answer:
      "ตอนนี้เป็นบทเรียนแบบอ่าน พร้อมตัวอย่างโค้ดและแบบฝึกหัด ส่วนวิดีโอสอนอยู่ในแผนอัปเดตเพิ่มเติมภายหลัง"
  },
  {
    question: "ติดต่อแอดมินได้ทางไหน?",
    answer:
      "ติดต่อได้ทางอีเมล pythonbegins1@gmail.com หรือ LINE:@883oiwcd ตามช่องทางติดต่อใน Footer ของเว็บไซต์"
  }
];

export default function HelpPage() {
  return (
    <div className="page-shell space-y-10">
      <section className="panel overflow-hidden">
        <div className="grid gap-8 bg-gradient-to-br from-brand-700 via-blue-600 to-lavender-600 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              Help center
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              ช่วยเหลือ / FAQ
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
              รวมวิธีสมัคร เข้าเรียน ชำระเงิน อัปโหลดสลิป และคำถามที่พบบ่อย
              เพื่อให้เริ่มเรียนคอร์ส Python มือใหม่ได้ง่ายขึ้น
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary text-white hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40" href="/register">
                สมัครสมาชิก
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20" href="/courses/python-beginner">
                ดูคอร์ส Python มือใหม่
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/15 p-5 backdrop-blur">
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-white/20 text-white">
              <HelpCircle className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-black">ต้องการความช่วยเหลือ?</h2>
            <p className="mt-3 text-sm font-bold leading-6 text-blue-50">
              อ่านขั้นตอนด้านล่างก่อนเริ่มเรียน หากยังติดปัญหา สามารถติดต่อแอดมินได้ทางอีเมลหรือ LINE
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_0.25fr]">
        <div className="panel p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <UserPlus className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Getting started</p>
              <h2 className="mt-2 text-3xl font-black text-ink">
                วิธีสมัครและเข้าเรียน
              </h2>
            </div>
          </div>

          <ol className="grid gap-3">
            {learningSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-lavender-600 text-sm font-black text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm font-bold leading-6 text-slate-700 sm:text-base">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-5">
          <div className="panel p-6">
            <CreditCard className="h-6 w-6 text-brand-600" />
            <h3 className="mt-4 text-xl font-black text-ink">
              ชำระเงินแบบ manual
            </h3>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
              หลังอัปโหลดสลิป แอดมินจะตรวจสอบและเปลี่ยนสถานะเป็น Premium ให้เมื่อข้อมูลถูกต้อง
            </p>
            <Link className="btn-secondary mt-5 w-full" href="/payment">
              ไปหน้าชำระเงิน
            </Link>
          </div>

          <div className="panel p-6">
            <ShieldCheck className="h-6 w-6 text-lavender-600" />
            <h3 className="mt-4 text-xl font-black text-ink">
              Premium เรียนได้ครบ
            </h3>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
              เมื่ออนุมัติแล้ว สามารถเข้าเรียนบทที่ 1-20 ได้จาก Dashboard หรือหน้าคอร์ส Python มือใหม่
            </p>
          </div>
        </aside>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="mb-6">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-ink">
            คำถามที่พบบ่อย
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-black leading-6 text-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 text-3xl font-black text-ink">
              ติดต่อแอดมิน
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-slate-600">
              หากชำระเงินแล้วรอนาน หรือพบปัญหาระหว่างเรียน ส่งข้อความมาพร้อมอีเมลที่สมัครและเวลาชำระเงินได้เลย
            </p>
          </div>
          <div className="grid gap-3 text-sm font-black text-slate-700">
            <a
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-brand-200 hover:bg-brand-50"
              href="mailto:pythonbegins1@gmail.com"
            >
              <Mail className="h-4 w-4 text-brand-600" />
              pythonbegins1@gmail.com
            </a>
            <a
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-brand-200 hover:bg-brand-50"
              href="https://line.me/R/ti/p/@883oiwcd"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4 text-brand-600" />
              LINE:@883oiwcd
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
