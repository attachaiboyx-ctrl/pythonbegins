import { Loader2 } from "lucide-react";

export function GlobalLoading() {
  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-white/80 px-4 backdrop-blur-sm"
      role="status"
    >
      <div className="w-full max-w-sm rounded-lg border border-brand-100 bg-white p-6 text-center shadow-2xl shadow-blue-600/10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-50 to-lavender-50 text-brand-700">
          <Loader2 className="h-7 w-7 animate-spin" />
        </span>
        <p className="mt-5 text-base font-black leading-7 text-ink">
          ขณะนี้มีผู้ใช้จำนวนมาก ขออภัยหากล่าช้า
        </p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
          ระบบกำลังโหลดหน้าเว็บ กรุณารอสักครู่
        </p>
      </div>
    </div>
  );
}
