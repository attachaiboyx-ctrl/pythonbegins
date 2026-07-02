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
import {
  PaymentProductSelector,
  type PaymentProductType
} from "@/components/PaymentProductSelector";
import { PaymentSlipForm } from "@/components/PaymentSlipForm";
import { getPaymentSettings } from "@/lib/promptpay";
import {
  isManualPaymentProductType,
  manualPaymentProducts,
  MANUAL_PREMIUM_PRICE_THB,
  WEB_APP_BEGINS_PRODUCT_TYPE
} from "@/lib/manual-payment-config";
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

function getSelectedProduct(product?: string): PaymentProductType {
  return product && isManualPaymentProductType(product)
    ? product
    : WEB_APP_BEGINS_PRODUCT_TYPE;
}

function slipProductText(productType: string) {
  return isManualPaymentProductType(productType)
    ? manualPaymentProducts[productType].title
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
  const ownsWebApp =
    user.role === "admin" ||
    user.courseAccesses.some(
      (access) => access.courseSlug === WEB_APP_BEGINS_PRODUCT_TYPE
    );
  const isLandingSelected = selectedProduct === "landing-page-begins";
  const isWebAppSelected = selectedProduct === WEB_APP_BEGINS_PRODUCT_TYPE;
  const isPremiumSelected = selectedProduct === "premium";
  const selectedProductConfig = manualPaymentProducts[selectedProduct];
  const selectedPrice = selectedProductConfig.price;
  const selectedProductTitle = selectedProductConfig.title;
  const isSelectedOwned = isWebAppSelected
    ? ownsWebApp
    : isLandingSelected
      ? ownsLanding
      : isPaid;
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
              เลือก Web App Begins, Premium หรือ Landing Page Begins แล้วชำระผ่าน PromptPay ตามยอดของสินค้าที่เลือก
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 text-ink">
            <div className="text-sm font-black text-brand-700">รายการที่เลือก</div>
            <div className="mt-1 text-lg font-black">{selectedProductTitle}</div>
            <div className="mt-2 text-4xl font-black">
              {selectedPrice.toLocaleString("th-TH")} บาท
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isPremiumSelected
                ? "ปลดล็อกคอร์สหลัก 9 คอร์ส รวม 82 บทเรียน"
                : `คอร์ส ${selectedProductTitle} แยก ไม่รวมใน Premium`}
            </p>
          </div>
        </div>
      </section>

      <PaymentProductSelector
        isPremium={isPaid}
        ownsLanding={ownsLanding}
        ownsWebApp={ownsWebApp}
        premiumPrice={MANUAL_PREMIUM_PRICE_THB}
        selectedProduct={selectedProduct}
      />

      {isSelectedOwned ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          {isPremiumSelected
            ? "บัญชีนี้เป็น Premium แล้ว เรียนคอร์สหลักได้ครบทุกบท"
            : `บัญชีนี้มีสิทธิ์ ${selectedProductTitle} แล้ว สามารถเริ่มเรียนได้ทันที`}
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
                alt={`PromptPay QR สำหรับ ${selectedProductTitle} ยอด ${selectedPrice.toLocaleString("th-TH")} บาท`}
                className="mx-auto h-auto w-full max-w-xs rounded-lg"
                height={420}
                src={`/api/promptpay-qr?amount=${selectedPrice}`}
                unoptimized
                width={420}
              />
            </div>

            <div className="mt-5 space-y-2 text-sm font-bold text-slate-700">
              <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
                <span>ยอดชำระ</span>
                <span>{selectedPrice.toLocaleString("th-TH")} บาท</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
                <span>วิธีชำระ</span>
                <span>สแกน QR PromptPay</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
                <span>ผู้รับเงิน</span>
                <span>{settings.merchantName}</span>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-brand-50 px-4 py-3 text-brand-800">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <span>ตรวจสอบชื่อผู้รับเงินในแอปธนาคารก่อนยืนยันการชำระ</span>
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

      {isPremiumSelected && !isPaid ? (
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

      {isPremiumSelected ? (
        <GatewayPaymentCard
          key={`${selectedGatewayTransaction?.id || "new"}-${selectedGatewayTransaction?.status || "idle"}-${isPaid}`}
          action={createGatewayPaymentAction}
          isPaid={isPaid}
          price={settings.price}
          transaction={selectedGatewayTransaction}
        />
      ) : null}

      {isPremiumSelected ? <section className="panel p-6">
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
