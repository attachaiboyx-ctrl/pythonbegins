import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Radio, RefreshCw } from "lucide-react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "ห้องเรียนสด | Python Begins",
  description: "เข้าร่วมห้องเรียนสดของ Python Begins ผ่าน YouTube Live"
};

export const dynamic = "force-dynamic";

function LiveStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${
        isActive
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-slate-200 bg-white text-slate-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : "bg-slate-400"
        }`}
      />
      {isActive ? "กำลังไลฟ์สด" : "ออฟไลน์"}
    </span>
  );
}

export default async function LivePage() {
  const user = await requireUser();

  if (user.role !== "admin" && user.membership !== "paid") {
    redirect("/payment");
  }

  const activeSession = await prisma.liveSession.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="page-shell space-y-6 sm:space-y-8">
      <section className="overflow-hidden rounded-lg bg-gradient-to-br from-slate-950 via-indigo-950 to-brand-800 px-6 py-8 text-white shadow-course sm:px-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
                Live classroom
              </p>
              <LiveStatusBadge isActive={Boolean(activeSession)} />
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              ห้องเรียนสด Python Begins
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-blue-100">
              เรียนสดไปพร้อมกับผู้สอน ทบทวนเนื้อหา และดูตัวอย่างการเขียนโค้ดแบบเป็นขั้นตอน
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <Radio className="h-5 w-5 text-blue-200" />
            <div>
              <div className="text-xs font-bold text-blue-200">ผู้เรียน</div>
              <div className="font-black">{user.name}</div>
            </div>
          </div>
        </div>
      </section>

      {activeSession ? (
        <section className="panel mx-auto max-w-6xl overflow-hidden">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
                  Now streaming
                </p>
                <h2 className="mt-2 text-2xl font-black text-ink sm:text-3xl">
                  {activeSession.title}
                </h2>
                {activeSession.description ? (
                  <p className="mt-3 max-w-3xl whitespace-pre-line leading-7 text-slate-600">
                    {activeSession.description}
                  </p>
                ) : null}
              </div>
              <LiveStatusBadge isActive />
            </div>
          </div>

          <div className="bg-slate-950 p-2 sm:p-4">
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                src={`https://www.youtube-nocookie.com/embed/${activeSession.youtubeVideoId}?autoplay=1&rel=0`}
                title={activeSession.title}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600 sm:px-6">
            <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <p>หากวิดีโอไม่ขึ้น กรุณารีเฟรชหน้าเว็บอีกครั้ง</p>
          </div>
        </section>
      ) : (
        <section className="panel mx-auto grid max-w-3xl place-items-center px-6 py-14 text-center sm:py-20">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-500">
            <Clock3 className="h-8 w-8" />
          </div>
          <div className="mt-4">
            <LiveStatusBadge isActive={false} />
          </div>
          <h2 className="mt-5 text-2xl font-black text-ink sm:text-3xl">
            ยังไม่มีไลฟ์ตอนนี้ กรุณากลับมาใหม่ภายหลัง
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-slate-600">
            เมื่อแอดมินเปิดห้องเรียนสด วิดีโอและรายละเอียดจะปรากฏในหน้านี้หลังรีเฟรช
          </p>
          <Link className="btn-secondary mt-6" href="/dashboard">
            กลับไป Dashboard
          </Link>
        </section>
      )}
    </div>
  );
}
