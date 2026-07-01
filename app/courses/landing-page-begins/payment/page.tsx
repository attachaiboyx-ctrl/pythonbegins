import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, FileUp, QrCode, ShieldCheck } from "lucide-react";
import { uploadSlipAction } from "@/app/actions/payment";
import { PaymentSlipForm } from "@/components/PaymentSlipForm";
import { SpecialCourseBadge } from "@/components/SpecialCourseBadge";
import { prisma } from "@/lib/prisma";
import { getPaymentSettings } from "@/lib/promptpay";
import { requireUser } from "@/lib/session";

const PRODUCT_TYPE = "landing-page-begins";
const COURSE_PRICE = 200;

export default async function LandingPagePaymentPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; uploaded?: string }>;
}) {
  const query = await searchParams;
  const user = await requireUser();
  const settings = getPaymentSettings();
  const ownsCourse =
    user.role === "admin" ||
    user.courseAccesses.some((access) => access.courseSlug === PRODUCT_TYPE);
  const slips = await prisma.paymentSlip.findMany({
    where: { userId: user.id, productType: PRODUCT_TYPE },
    orderBy: { createdAt: "desc" },
    take: 6
  });

  return (
    <div className="page-shell space-y-8">
      <section className="panel overflow-hidden">
        <div className="grid gap-6 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SpecialCourseBadge />
            <h1 className="mt-4 text-4xl font-black tracking-tight">
              ซื้อคอร์ส Landing Page Begins
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-cyan-50">
              คอร์สแยกราคา 200 บาท ไม่รวมใน Premium 399 บาท
              ชำระผ่าน PromptPay และอัปโหลดสลิปให้แอดมินตรวจสอบ
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 text-center text-slate-950">
            <div className="text-sm font-black text-cyan-700">ราคาคอร์สแยก</div>
            <div className="mt-2 text-4xl font-black">200 บาท</div>
          </div>
        </div>
      </section>

      {ownsCourse ? (
        <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" />
            <div>
              <h2 className="text-xl font-black">คุณมีสิทธิ์เข้าเรียนคอร์สนี้แล้ว</h2>
              <Link className="btn-primary mt-4" href="/courses/landing-page-begins">
                เริ่มเรียน
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="panel p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
                <QrCode className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-black text-ink">PromptPay QR</h2>
                <p className="text-sm font-bold text-slate-500">ยอดชำระ 200 บาท</p>
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-center">
              <Image
                alt="PromptPay QR สำหรับ Landing Page Begins"
                className="mx-auto h-auto w-full max-w-xs rounded-lg"
                height={420}
                src={`/api/promptpay-qr?amount=${COURSE_PRICE}`}
                unoptimized
                width={420}
              />
            </div>
            <div className="mt-4 space-y-2 text-sm font-bold text-slate-700">
              <div className="flex justify-between rounded-lg bg-slate-50 px-4 py-3"><span>ยอดชำระ</span><span>200 บาท</span></div>
              <div className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3"><span>PromptPay</span><span>{settings.promptpayId}</span></div>
              <div className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3"><span>ชื่อบัญชี</span><span>{settings.merchantName}</span></div>
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700"><FileUp className="h-5 w-5" /></span>
              <div>
                <h2 className="text-2xl font-black text-ink">อัปโหลดสลิปซื้อคอร์สนี้</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                  สลิปนี้ใช้ซื้อ Landing Page Begins เท่านั้น ไม่ได้อัปเกรด Premium
                </p>
              </div>
            </div>
            {query.error ? <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{query.error}</div> : null}
            {query.uploaded ? <div className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">ส่งสลิปแล้ว กรุณารอแอดมินตรวจสอบ</div> : null}
            <PaymentSlipForm action={uploadSlipAction} amount={COURSE_PRICE} isPaid={false} productType={PRODUCT_TYPE} />
            <div className="mt-5 flex items-start gap-2 rounded-lg bg-cyan-50 p-4 text-sm font-bold leading-6 text-cyan-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              แอดมินจะอนุมัติสิทธิ์เฉพาะคอร์ส Landing Page Begins บัญชี Premium จะไม่เปลี่ยนแปลง
            </div>
          </div>
        </section>
      )}

      <section className="panel p-6">
        <h2 className="text-xl font-black text-ink">ประวัติสลิปคอร์สนี้</h2>
        <div className="mt-4 grid gap-3">
          {slips.length === 0 ? (
            <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">ยังไม่มีสลิปสำหรับ Landing Page Begins</p>
          ) : slips.map((slip) => (
            <div key={slip.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">
              <span>{slip.amount.toLocaleString("th-TH")} บาท</span>
              <span>{slip.status === "approved" ? "อนุมัติแล้ว" : slip.status === "rejected" ? "ไม่ผ่าน" : "รอตรวจ"}</span>
              <a className="text-cyan-700" href={slip.imageUrl} rel="noreferrer" target="_blank">เปิดสลิป</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
