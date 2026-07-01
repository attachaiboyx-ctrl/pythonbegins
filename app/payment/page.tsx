import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  FileUp,
  Landmark,
  QrCode,
  ShieldCheck
} from "lucide-react";
import { createGatewayPaymentAction } from "@/app/actions/gateway-payment";
import { uploadSlipAction } from "@/app/actions/payment";
import { GatewayPaymentCard } from "@/components/GatewayPaymentCard";
import { PaymentSlipForm } from "@/components/PaymentSlipForm";
import { SpecialCourseBadge } from "@/components/SpecialCourseBadge";
import { getPaymentSettings } from "@/lib/promptpay";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

function statusText(status: string) {
  if (status === "approved") return "อนุมัติแล้ว";
  if (status === "rejected") return "ไม่ผ่าน";
  return "รอตรวจ";
}

function statusClass(status: string) {
  if (status === "approved") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "rejected") return "border-red-200 bg-red-50 text-red-700";
  return "border-blue-200 bg-brand-50 text-brand-700";
}

function gatewayStatusText(status: string) {
  if (status === "successful") return "ชำระสำเร็จ";
  if (status === "failed") return "ไม่สำเร็จ";
  if (status === "cancelled") return "ยกเลิกแล้ว";
  return "รอชำระ";
}

function gatewayStatusClass(status: string) {
  if (status === "successful") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "failed" || status === "cancelled") {
    return "border-red-200 bg-red-50 text-red-700";
  }
  return "border-amber-200 bg-amber-50 text-amber-700";
}

const LANDING_PAGE_PRICE = 200;
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

type ProductType = "premium" | "landing-page-begins";

function getSelectedProduct(product?: string): ProductType {
  return product === "landing-page-begins" ? product : "premium";
}

function slipProductText(productType: string) {
  return productType === "landing-page-begins"
    ? "Landing Page Begins"
    : "Premium";
}

export default async function PaymentPage({
  searchParams
}: {
  searchParams: Promise<{
    error?: string;
    gateway?: string;
    gatewayError?: string;
    gatewayMessage?: string;
    product?: string;
    uploaded?: string;
  }>;
}) {
  const query = await searchParams;
  const user = await requireUser();
  const settings = getPaymentSettings();
  const selectedProduct = getSelectedProduct(query.product);
  const [slips, gatewayTransactions] = await Promise.all([
    prisma.paymentSlip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 8
    }),
    prisma.paymentTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 8
    })
  ]);
  const isPaid = user.membership === "paid" || user.role === "admin";
  const ownsLanding =
    user.role === "admin" ||
    user.courseAccesses.some(
      (access) => access.courseSlug === "landing-page-begins"
    );
  const isLandingSelected = selectedProduct === "landing-page-begins";
  const selectedPrice = isLandingSelected ? LANDING_PAGE_PRICE : settings.price;
  const selectedProductTitle = isLandingSelected
    ? "Landing Page Begins"
    : "Premium";
  const isSelectedOwned = isLandingSelected ? ownsLanding : isPaid;
  const selectedGatewayTransaction =
    gatewayTransactions.find((transaction) => transaction.id === query.gateway) ||
    gatewayTransactions.find((transaction) => transaction.status === "pending") ||
    gatewayTransactions[0] ||
    null;

  return (
    <div className="page-shell space-y-8">
      <section className="panel overflow-hidden">
        <div className="grid gap-8 bg-gradient-to-br from-brand-700 to-lavender-600 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              Secure checkout
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              เลือกสินค้าและชำระเงิน
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-blue-50">
              เลือก Premium สำหรับคอร์สหลัก 9 คอร์ส หรือซื้อ Landing Page Begins แยก แล้วชำระผ่าน PromptPay ตามยอดของสินค้าที่เลือก
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 text-ink">
            <div className="text-sm font-black text-brand-700">รายการที่เลือก</div>
            <div className="mt-1 text-lg font-black">{selectedProductTitle}</div>
            <div className="mt-2 text-4xl font-black">
              {selectedPrice.toLocaleString("th-TH")} บาท
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isLandingSelected
                ? "คอร์ส Landing Page แยก ไม่รวมใน Premium"
                : "ปลดล็อกคอร์สหลัก 9 คอร์ส รวม 82 บทเรียน"}
            </p>
          </div>
        </div>
      </section>

      <section className="panel p-6 sm:p-7">
        <div>
          <p className="eyebrow">Choose product</p>
          <h2 className="mt-3 text-2xl font-black text-ink">เลือกสินค้าที่ต้องการชำระ</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
            QR และฟอร์มสลิปด้านล่างจะเปลี่ยนยอดเงินตามรายการที่เลือก
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Link
            className={`rounded-lg border-2 p-5 transition ${
              !isLandingSelected
                ? "border-brand-500 bg-gradient-to-br from-brand-50 to-lavender-50 shadow-lg shadow-blue-600/10"
                : "border-slate-200 bg-white hover:border-brand-200"
            }`}
            href="/payment?product=premium"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xl font-black text-ink">Premium</div>
                <div className="mt-1 text-3xl font-black text-brand-700">399 บาท</div>
              </div>
              <span className="rounded-full bg-gradient-to-r from-brand-600 to-lavender-600 px-3 py-1 text-xs font-black text-white">
                {!isLandingSelected ? "เลือกอยู่" : isPaid ? "มีสิทธิ์แล้ว" : "เลือก"}
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
          </Link>

          <Link
            className={`rounded-lg border-2 p-5 transition ${
              isLandingSelected
                ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg shadow-cyan-600/10"
                : "border-slate-200 bg-white hover:border-cyan-200"
            }`}
            href="/payment?product=landing-page-begins"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <SpecialCourseBadge />
                <div className="mt-3 text-xl font-black text-ink">Landing Page Begins</div>
                <div className="mt-1 text-3xl font-black text-cyan-700">200 บาท</div>
              </div>
              <span className="rounded-full bg-cyan-700 px-3 py-1 text-xs font-black text-white">
                {isLandingSelected ? "เลือกอยู่" : ownsLanding ? "มีสิทธิ์แล้ว" : "เลือก"}
              </span>
            </div>
            <p className="mt-3 font-bold text-slate-700">
              คอร์ส Landing Page แยก สำหรับสร้างผลงานเว็บหน้าเดียว
            </p>
            <p className="mt-3 text-sm font-black text-cyan-800">ไม่รวมใน Premium</p>
          </Link>
        </div>
      </section>

      {isSelectedOwned ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          {isLandingSelected
            ? "บัญชีนี้มีสิทธิ์ Landing Page Begins แล้ว สามารถเริ่มเรียนได้ทันที"
            : "บัญชีนี้เป็น Premium แล้ว เรียนคอร์สหลักได้ครบทุกบท"}
        </div>
      ) : null}

      {query.uploaded ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          ส่งสลิปสำหรับ {selectedProductTitle} แล้ว กรุณารอแอดมินตรวจสอบ
        </div>
      ) : null}

      {query.error ? (
        <div className="rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {query.error}
        </div>
      ) : null}

      {query.gatewayMessage ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          {query.gatewayMessage}
        </div>
      ) : null}

      {query.gatewayError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {query.gatewayError}
        </div>
      ) : null}

      {!isSelectedOwned ? (
        <div className="py-2 text-center">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="flex items-center gap-2 text-sm font-black text-slate-600">
              <Landmark className="h-4 w-4 shrink-0" />
              ชำระ {selectedProductTitle} ด้วย PromptPay และอัปโหลดสลิป
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-6 text-slate-500">
            โอนผ่าน PromptPay แล้วอัปโหลดสลิปให้แอดมินตรวจ เหมาะสำหรับผู้ที่ต้องการชำระแบบเดิม
          </p>
        </div>
      ) : null}

      {!isSelectedOwned ? (
        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="panel p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <QrCode className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black text-ink">PromptPay QR</p>
                <p className="text-sm font-bold text-slate-500">สแกนด้วยแอปธนาคาร</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
              <Image
                alt="PromptPay QR"
                className="mx-auto h-auto w-full max-w-xs rounded-lg"
                height={420}
                src={`/api/promptpay-qr?amount=${selectedPrice}`}
                unoptimized
                width={420}
              />
            </div>

            <div className="mt-5 space-y-2 text-sm font-bold text-slate-700">
              <div className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                <span>ยอดชำระ</span>
                <span>{selectedPrice.toLocaleString("th-TH")} บาท</span>
              </div>
              <div className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                <span>PromptPay</span>
                <span>{settings.promptpayId}</span>
              </div>
              <div className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                <span>ชื่อบัญชี</span>
                <span>{settings.merchantName}</span>
              </div>
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-lavender-50 text-lavender-600">
                <FileUp className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow">Upload slip</p>
                <h2 className="mt-2 text-2xl font-black text-ink">
                  อัปโหลดสลิปสำหรับ {selectedProductTitle} {selectedPrice.toLocaleString("th-TH")} บาท
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  รองรับ PNG, JPG, WEBP หรือ PDF ขนาดไม่เกิน 1MB
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                [CreditCard, "1. โอนเงิน"],
                [FileUp, "2. อัปโหลดสลิป"],
                [ShieldCheck, "3. รอตรวจ"]
              ].map(([Icon, label]) => {
                const StepIcon = Icon as typeof CreditCard;
                return (
                  <div key={String(label)} className="rounded-lg bg-slate-50 p-4 text-sm font-black text-slate-700">
                    <StepIcon className="mb-3 h-5 w-5 text-brand-600" />
                    {String(label)}
                  </div>
                );
              })}
            </div>

            <PaymentSlipForm
              action={uploadSlipAction}
              amount={selectedPrice}
              isPaid={isSelectedOwned}
              productType={selectedProduct}
            />
          </div>
        </section>
      ) : null}

      {!isLandingSelected && !isPaid ? (
        <div className="py-2 text-center">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="flex items-center gap-2 text-sm font-black text-slate-600">
              <CreditCard className="h-4 w-4 shrink-0" />
              อีกช่องทาง: ชำระอัตโนมัติผ่าน Payment Gateway
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-6 text-slate-500">
            สแกน QR ผ่านระบบ Opn/Omise ระบบจะตรวจสอบและปลดล็อก Premium ให้อัตโนมัติหลังชำระสำเร็จ
          </p>
        </div>
      ) : null}

      {!isLandingSelected ? (
        <GatewayPaymentCard
          key={`${selectedGatewayTransaction?.id || "new"}-${selectedGatewayTransaction?.status || "idle"}-${isPaid}`}
          action={createGatewayPaymentAction}
          isPaid={isPaid}
          price={settings.price}
          transaction={selectedGatewayTransaction}
        />
      ) : null}

      {!isLandingSelected ? <section className="panel p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Gateway history</p>
            <h2 className="mt-2 text-2xl font-black text-ink">
              ประวัติการชำระอัตโนมัติ
            </h2>
          </div>
          <span className="text-sm font-bold text-slate-500">Opn Payments · Test mode</span>
        </div>

        <div className="grid gap-3">
          {gatewayTransactions.length === 0 ? (
            <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
              ยังไม่มีรายการชำระผ่าน Payment Gateway
            </p>
          ) : (
            gatewayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 sm:grid-cols-[0.7fr_1fr_auto] sm:items-center"
              >
                <span>{(transaction.amount / 100).toLocaleString("th-TH")} บาท</span>
                <span className="break-all font-mono text-xs text-slate-500">
                  {transaction.providerChargeId || "กำลังสร้าง Charge ID"}
                </span>
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${gatewayStatusClass(transaction.status)}`}>
                  {gatewayStatusText(transaction.status)}
                </span>
              </div>
            ))
          )}
        </div>
      </section> : null}

      <section className="panel p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Payment history</p>
            <h2 className="mt-2 text-2xl font-black text-ink">ประวัติสลิปของฉัน</h2>
          </div>
          <Link className="btn-secondary" href="/dashboard">
            กลับ Dashboard
          </Link>
        </div>

        <div className="grid gap-3">
          {slips.length === 0 ? (
            <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
              ยังไม่มีการส่งสลิป
            </p>
          ) : (
            slips.map((slip) => (
              <div
                key={slip.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
              >
                <span>
                  {slipProductText(slip.productType)} • {slip.amount.toLocaleString("th-TH")} บาท
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass(slip.status)}`}>
                  {statusText(slip.status)}
                </span>
                <a
                  className="text-brand-700 hover:text-brand-900"
                  href={slip.imageUrl}
                  target="_blank"
                >
                  เปิดสลิป
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
