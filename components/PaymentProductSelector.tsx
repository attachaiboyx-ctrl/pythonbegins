"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { SpecialCourseBadge } from "@/components/SpecialCourseBadge";

export type PaymentProductType = "premium" | "landing-page-begins";

const premiumCourseNames = [
  "Python มือใหม่",
  "JavaScript มือใหม่",
  "HTML พื้นฐาน",
  "CSS พื้นฐาน",
  "Git & GitHub",
  "React เบื้องต้น",
  "Next.js เบื้องต้น",
  "SQL / Database",
  "โปรเจกต์ทำเว็บจริง"
];

type PaymentProductSelectorProps = {
  ownsLanding: boolean;
  premiumPrice: number;
  isPremium: boolean;
  selectedProduct: PaymentProductType;
};

export function PaymentProductSelector({
  ownsLanding,
  premiumPrice,
  isPremium,
  selectedProduct
}: PaymentProductSelectorProps) {
  const router = useRouter();
  const [pendingProduct, setPendingProduct] = useState<PaymentProductType | null>(null);
  const [isPending, startTransition] = useTransition();

  function selectProduct(product: PaymentProductType) {
    if (product === selectedProduct || isPending) {
      return;
    }

    setPendingProduct(product);
    startTransition(() => {
      router.push(`/payment?product=${product}`);
    });
  }

  const loadingText = pendingProduct === "landing-page-begins"
    ? "กำลังเตรียมข้อมูล Landing Page Begins..."
    : "กำลังเตรียมข้อมูล Premium...";

  return (
    <section className="panel relative overflow-hidden p-6 sm:p-7" aria-busy={isPending}>
      <div>
        <p className="eyebrow">Choose product</p>
        <h2 className="mt-3 text-2xl font-black text-ink">เลือกสินค้าที่ต้องการชำระ</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
          QR และฟอร์มสลิปด้านล่างจะเปลี่ยนยอดเงินตามรายการที่เลือก
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <button
          aria-pressed={selectedProduct === "premium"}
          className={`relative rounded-lg border-2 p-5 text-left transition disabled:cursor-wait ${
            selectedProduct === "premium"
              ? "border-brand-500 bg-gradient-to-br from-brand-50 to-lavender-50 shadow-lg shadow-blue-600/10"
              : "border-slate-200 bg-white hover:border-brand-200"
          } ${isPending ? "opacity-70" : ""}`}
          disabled={isPending}
          onClick={() => selectProduct("premium")}
          type="button"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xl font-black text-ink">Premium</div>
              <div className="mt-1 text-3xl font-black text-brand-700">
                {premiumPrice.toLocaleString("th-TH")} บาท
              </div>
            </div>
            <span className="rounded-full bg-gradient-to-r from-brand-600 to-lavender-600 px-3 py-1 text-xs font-black text-white">
              {selectedProduct === "premium" ? "เลือกอยู่" : isPremium ? "มีสิทธิ์แล้ว" : "เลือก"}
            </span>
          </div>
          <p className="mt-3 font-bold text-slate-700">
            ปลดล็อกคอร์สหลัก 9 คอร์สใน Python Begins
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {premiumCourseNames.map((courseName) => (
              <span key={courseName} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                {courseName}
              </span>
            ))}
          </div>
          {isPending && pendingProduct === "premium" ? (
            <LoadingOverlay text={loadingText} tone="premium" />
          ) : null}
        </button>

        <button
          aria-pressed={selectedProduct === "landing-page-begins"}
          className={`relative rounded-lg border-2 p-5 text-left transition disabled:cursor-wait ${
            selectedProduct === "landing-page-begins"
              ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg shadow-cyan-600/10"
              : "border-slate-200 bg-white hover:border-cyan-200"
          } ${isPending ? "opacity-70" : ""}`}
          disabled={isPending}
          onClick={() => selectProduct("landing-page-begins")}
          type="button"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <SpecialCourseBadge />
              <div className="mt-3 text-xl font-black text-ink">Landing Page Begins</div>
              <div className="mt-1 text-3xl font-black text-cyan-700">200 บาท</div>
            </div>
            <span className="rounded-full bg-cyan-700 px-3 py-1 text-xs font-black text-white">
              {selectedProduct === "landing-page-begins" ? "เลือกอยู่" : ownsLanding ? "มีสิทธิ์แล้ว" : "เลือก"}
            </span>
          </div>
          <p className="mt-3 font-bold text-slate-700">
            คอร์ส Landing Page แยก สำหรับสร้างผลงานเว็บหน้าเดียว
          </p>
          <p className="mt-3 text-sm font-black text-cyan-800">ไม่รวมใน Premium</p>
          {isPending && pendingProduct === "landing-page-begins" ? (
            <LoadingOverlay text={loadingText} tone="landing" />
          ) : null}
        </button>
      </div>

      <div className="sr-only" aria-live="polite">
        {isPending ? loadingText : ""}
      </div>
    </section>
  );
}

function LoadingOverlay({
  text,
  tone
}: {
  text: string;
  tone: "premium" | "landing";
}) {
  const toneClass = tone === "landing"
    ? "border-cyan-200 bg-cyan-50/95 text-cyan-900"
    : "border-brand-200 bg-brand-50/95 text-brand-900";

  return (
    <span className={`absolute inset-2 z-10 flex items-center justify-center rounded-lg border backdrop-blur-sm ${toneClass}`}>
      <span className="flex items-center gap-3 rounded-lg bg-white/90 px-4 py-3 text-sm font-black shadow-sm">
        <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        {text}
      </span>
    </span>
  );
}
