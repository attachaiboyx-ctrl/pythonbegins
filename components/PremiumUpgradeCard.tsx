import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { MANUAL_PREMIUM_PRICE_THB } from "@/lib/manual-payment-config";

type PremiumUpgradeCardProps = {
  compact?: boolean;
  embedded?: boolean;
  courseTitle?: string;
  lessonCount?: number;
};

export function PremiumUpgradeCard({
  compact = false,
  embedded = false,
  courseTitle = "Python มือใหม่",
  lessonCount = 20
}: PremiumUpgradeCardProps) {
  const containerClassName = embedded
    ? "overflow-hidden rounded-lg border border-amber-200/70 bg-white shadow-sm"
    : "panel overflow-hidden";
  const premiumBenefits = [
    `ปลดล็อกบทเรียนทั้งหมด ${lessonCount} บท`,
    "มีตัวอย่างโค้ดให้ลองทำตาม",
    "มีแบบฝึกหัดทุกบท",
    "มีแบบทดสอบเพื่อเช็กความเข้าใจ",
    "เรียนซ้ำได้ตลอด",
    "ได้รับอัปเดตบทเรียนใหม่ในคอร์สนี้ตามไปด้วย"
  ];

  return (
    <section className={containerClassName}>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-lavender-700 p-6 text-white sm:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" />

        <div className={`relative grid gap-6 ${compact ? "" : "lg:grid-cols-[1fr_0.42fr] lg:items-center"}`}>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge membership="paid" role="student" />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-amber-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Premium {MANUAL_PREMIUM_PRICE_THB} บาท
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              ปลดล็อก Premium เพื่อเรียน {courseTitle} ได้ครบทุกบท
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-blue-50">
              ปรับราคาใหม่ให้เข้าถึงง่ายขึ้น เหมาะสำหรับผู้เรียนที่อยากไปต่อจากพื้นฐานให้ครบคอร์ส พร้อมตัวอย่าง โจทย์ฝึก และแบบทดสอบที่ช่วยเช็กความเข้าใจทีละบท
            </p>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-200/20 text-amber-100">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-black text-amber-100">Premium access</div>
                <div className="text-2xl font-black">{lessonCount} บทเรียน</div>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-blue-50">
              ชำระผ่าน PromptPay และอัปโหลดสลิป รอแอดมินตรวจสอบ
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_0.34fr] lg:items-start">
        <ul className="grid gap-3 sm:grid-cols-2">
          {premiumBenefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <Link className="btn-primary w-full" href="/payment">
            อัปเกรดเป็น Premium
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-black text-brand-700 hover:bg-brand-50"
            href="/help"
          >
            <HelpCircle className="h-4 w-4" />
            ดูวิธีสมัคร / วิธีชำระเงิน
          </Link>
        </div>
      </div>
    </section>
  );
}
