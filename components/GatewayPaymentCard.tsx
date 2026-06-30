/* eslint-disable @next/next/no-img-element */
"use client";

import {
  CheckCircle2,
  CircleAlert,
  Loader2,
  QrCode,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

type GatewayTransaction = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  qrCodeUrl: string | null;
  providerChargeId: string | null;
};

type GatewayPaymentCardProps = {
  action: (formData: FormData) => void | Promise<void>;
  isPaid: boolean;
  price: number;
  transaction: GatewayTransaction | null;
};

function statusText(status: string) {
  if (status === "successful") return "ชำระสำเร็จ";
  if (status === "failed") return "ชำระไม่สำเร็จ";
  if (status === "cancelled") return "รายการถูกยกเลิก";
  return "รอการชำระเงิน";
}

function statusClass(status: string) {
  if (status === "successful") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "failed" || status === "cancelled") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function GatewaySubmitButton({ retry = false }: { retry?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button className="btn-primary w-full sm:w-auto" disabled={pending} type="submit">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          กำลังสร้างรายการ...
        </>
      ) : retry ? (
        <>
          <RefreshCw className="h-4 w-4" />
          สร้าง QR ใหม่
        </>
      ) : (
        <>
          <QrCode className="h-4 w-4" />
          สร้าง QR เพื่อชำระอัตโนมัติ
        </>
      )}
    </button>
  );
}

export function GatewayPaymentCard({
  action,
  isPaid,
  price,
  transaction
}: GatewayPaymentCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState(transaction?.status || "idle");

  useEffect(() => {
    if (!transaction || status !== "pending") {
      return;
    }

    let isActive = true;
    const transactionId = transaction.id;

    async function checkStatus() {
      try {
        const response = await fetch(`/api/payments/${transactionId}`, {
          cache: "no-store"
        });

        if (!response.ok || !isActive) {
          return;
        }

        const data = (await response.json()) as { status?: string };

        if (data.status && data.status !== "pending") {
          setStatus(data.status);
          router.refresh();
        }
      } catch {
        // A temporary polling error must not interrupt the payment page.
      }
    }

    const intervalId = window.setInterval(checkStatus, 10_000);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [router, status, transaction]);

  const isPending = status === "pending";
  const isFailed = status === "failed" || status === "cancelled";

  return (
    <section className="panel overflow-hidden">
      <div className="grid gap-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-brand-800 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-300/50 bg-amber-300/15 px-3 py-1 text-xs font-black text-amber-100">
              Test mode
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight">
            ชำระอัตโนมัติผ่าน PromptPay QR
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            สแกนจ่ายผ่านแอปธนาคาร ระบบจะตรวจสอบการชำระเงินและปลดล็อก Premium ให้อัตโนมัติหลังชำระสำเร็จ
          </p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/10 px-6 py-4 text-center backdrop-blur-sm">
          <div className="text-xs font-bold text-blue-100">ยอดชำระ</div>
          <div className="mt-1 text-4xl font-black">{price.toLocaleString("th-TH")}</div>
          <div className="text-sm font-black text-blue-100">บาท</div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {isPaid || status === "successful" ? (
          <div className="flex items-start gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-emerald-600" />
            <div>
              <h3 className="text-xl font-black text-emerald-900">ชำระเงินสำเร็จแล้ว</h3>
              <p className="mt-2 leading-7 text-emerald-800">
                ระบบปลดล็อก Premium ให้คุณเรียบร้อยแล้ว สามารถกลับไปเรียนต่อได้ทันที
              </p>
              <Link className="btn-primary mt-4" href="/dashboard">
                ไปที่ Dashboard
              </Link>
            </div>
          </div>
        ) : transaction && isPending && transaction.qrCodeUrl ? (
          <div className="grid gap-6 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
              <img
                alt="QR ชำระเงิน PromptPay ผ่าน Opn Payments"
                className="mx-auto aspect-square h-auto w-full max-w-sm rounded-lg object-contain"
                referrerPolicy="no-referrer"
                src={transaction.qrCodeUrl}
              />
            </div>
            <div>
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusClass(status)}`}>
                {statusText(status)}
              </span>
              <h3 className="mt-4 text-2xl font-black text-ink">สแกน QR ด้วยแอปธนาคาร</h3>
              <p className="mt-3 leading-7 text-slate-600">
                หลังชำระเงิน ระบบจะรอการยืนยันจาก Opn และตรวจสอบรายการให้อัตโนมัติ อาจใช้เวลาประมาณ 10–30 วินาที
              </p>
              <div className="mt-5 space-y-2 text-sm font-bold text-slate-600">
                <div className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <span>ยอดชำระ</span>
                  <span>{(transaction.amount / 100).toLocaleString("th-TH")} บาท</span>
                </div>
                <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-4 py-3 sm:flex-row sm:justify-between">
                  <span>Charge ID</span>
                  <span className="break-all font-mono text-xs">{transaction.providerChargeId}</span>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-lg border border-blue-100 bg-brand-50 p-4 text-sm font-bold leading-6 text-brand-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                ช่องทางนี้ไม่ต้องอัปโหลดสลิป ระบบจะปลดล็อก Premium ให้อัตโนมัติเมื่อรายการชำระเงินสำเร็จ
              </div>
            </div>
          </div>
        ) : isFailed ? (
          <div className="flex flex-col items-start gap-4 rounded-lg border border-red-200 bg-red-50 p-5 sm:flex-row">
            <CircleAlert className="mt-0.5 h-7 w-7 shrink-0 text-red-600" />
            <div className="flex-1">
              <h3 className="text-xl font-black text-red-900">ชำระเงินไม่สำเร็จ</h3>
              <p className="mt-2 leading-7 text-red-800">
                ระบบยังไม่พบการชำระเงินสำเร็จ คุณสามารถสร้าง QR ใหม่อีกครั้ง หรือเลือกโอนผ่าน PromptPay แล้วอัปโหลดสลิปด้านล่างได้
              </p>
              <form action={action} className="mt-4">
                <GatewaySubmitButton retry />
              </form>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h3 className="text-xl font-black text-ink">พร้อมชำระผ่าน PromptPay Gateway</h3>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                กดสร้าง QR แล้วสแกนชำระ 399 บาท ระบบจะอัปเกรดบัญชีเมื่อ Opn ยืนยันว่ารายการสำเร็จจริง
              </p>
            </div>
            <form action={action}>
              <GatewaySubmitButton />
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
