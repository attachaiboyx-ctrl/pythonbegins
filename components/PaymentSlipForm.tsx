"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type PaymentSlipFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  amount: number;
  isPaid: boolean;
};

export function PaymentSlipForm({
  action,
  amount,
  isPaid
}: PaymentSlipFormProps) {
  return (
    <form
      action={action}
      className="mt-6 space-y-4"
      encType="multipart/form-data"
    >
      <input name="amount" type="hidden" value={amount} />
      <PaymentSlipFormFields isPaid={isPaid} />
    </form>
  );
}

function PaymentSlipFormFields({ isPaid }: { isPaid: boolean }) {
  const { pending } = useFormStatus();
  const disabled = isPaid || pending;

  return (
    <>
      {pending ? (
        <div
          aria-live="polite"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 px-4 backdrop-blur-sm"
          role="status"
        >
          <div className="w-full max-w-sm rounded-lg border border-brand-100 bg-white p-6 text-center shadow-2xl">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-700">
              <Loader2 className="h-6 w-6 animate-spin" />
            </span>
            <p className="mt-4 text-base font-black text-ink">
              กำลังอัปโหลดสลิป กรุณารอสักครู่...
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              ระบบกำลังส่งหลักฐานให้แอดมินตรวจ
            </p>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="label" htmlFor="slip">
          ไฟล์สลิป
        </label>
        <input
          accept="image/png,image/jpeg,image/webp,application/pdf"
          aria-disabled={disabled}
          className="input disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          disabled={disabled}
          id="slip"
          name="slip"
          required
          type="file"
        />
      </div>

      <div className="space-y-2">
        <label className="label" htmlFor="note">
          หมายเหตุเพิ่มเติม (ถ้ามี)
        </label>
        <textarea
          aria-disabled={disabled}
          className="input min-h-28 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          disabled={disabled}
          id="note"
          name="note"
          placeholder="งดโอนช่วง 00:00-01:00 นะครับ"
        />
      </div>

      <button
        aria-disabled={disabled}
        className="btn-primary"
        disabled={disabled}
        type="submit"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            กำลังส่งสลิป...
          </>
        ) : (
          "ส่งสลิป"
        )}
      </button>
    </>
  );
}
