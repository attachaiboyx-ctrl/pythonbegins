import Link from "next/link";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            
            <div>
              <p className="font-black text-ink">Python สำหรับมือใหม่</p>
              <p className="text-sm font-medium text-slate-500">
                Online Course Platform
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            เรียน Python ตั้งแต่พื้นฐาน เหมาะสำหรับผู้ที่ไม่เคยเขียนโปรแกรมมาก่อน
            พร้อมแบบฝึกหัด แบบทดสอบ และโปรเจกต์จริง
          </p>
        </div>

        <div>
          <h3 className="font-black text-ink">เกี่ยวกับคอร์ส</h3>
          <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
            <Link className="hover:text-brand-600" href="/lessons">
              หลักสูตรทั้งหมด
            </Link>
            <Link className="hover:text-brand-600" href="/payment">
              สมัครสมาชิกพรีเมียม
            </Link>
            <Link className="hover:text-brand-600" href="/dashboard">
              Dashboard ผู้เรียน
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-black text-ink">ติดต่อเรา</h3>
          <div className="mt-4 space-y-3 text-sm font-bold text-slate-600">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-600" />
              pythonbegins1@gmail.com
            </p>
            <a
              className="flex items-center gap-2 hover:text-brand-600"
              href="https://line.me/R/ti/p/@883oiwcd"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4 text-brand-600" />
              LINE:@883oiwcd
            </a>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-600" />
              นโยบายความเป็นส่วนตัว
            </p>
          </div>
          <p className="mt-5 text-xs font-semibold text-slate-400">
            © 2026 Python สำหรับมือใหม่. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
