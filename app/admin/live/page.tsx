import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Power,
  Radio,
  Save,
  ShieldCheck,
  Video
} from "lucide-react";
import {
  disableLiveSessionAction,
  saveLiveSessionAction
} from "@/app/actions/live";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = {
  title: "จัดการไลฟ์สด | Admin | Python Begins"
};

export const dynamic = "force-dynamic";

function AdminLiveStatus({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${
        isActive
          ? "border-red-300 bg-red-50 text-red-700"
          : "border-slate-200 bg-slate-100 text-slate-600"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${isActive ? "bg-red-500" : "bg-slate-400"}`} />
      {isActive ? "กำลังไลฟ์สด" : "ออฟไลน์"}
    </span>
  );
}

export default async function AdminLivePage({
  searchParams
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const query = await searchParams;
  await requireAdmin();

  const activeSession = await prisma.liveSession.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: "desc" }
  });
  const liveSession =
    activeSession ||
    (await prisma.liveSession.findFirst({
      orderBy: { updatedAt: "desc" }
    }));

  return (
    <div className="page-shell space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="btn-secondary px-4 py-2" href="/admin">
          <ArrowLeft className="h-4 w-4" />
          กลับหน้า Admin
        </Link>
        <Link className="btn-secondary px-4 py-2" href="/live" target="_blank">
          <ExternalLink className="h-4 w-4" />
          เปิดหน้าผู้เรียน
        </Link>
      </div>

      <section className="overflow-hidden rounded-lg bg-gradient-to-br from-slate-950 via-indigo-950 to-brand-800 p-6 text-white shadow-course sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
                Admin live control
              </p>
              <AdminLiveStatus isActive={Boolean(activeSession)} />
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              จัดการห้องเรียนสด
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-blue-100">
              ตั้งค่าวิดีโอ YouTube Live แล้วเปิดหรือปิดการแสดงผลสำหรับผู้เรียน Premium
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3">
            <ShieldCheck className="h-6 w-6 text-blue-200" />
            <div>
              <div className="text-xs font-bold text-blue-200">สิทธิ์การจัดการ</div>
              <div className="font-black">Admin only</div>
            </div>
          </div>
        </div>
      </section>

      {query.message ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          {query.message}
        </div>
      ) : null}
      {query.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {query.error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Live settings</p>
              <h2 className="mt-3 text-2xl font-black text-ink">ข้อมูลการถ่ายทอดสด</h2>
            </div>
            <Radio className="h-7 w-7 text-brand-600" />
          </div>

          <form action={saveLiveSessionAction} className="mt-6 space-y-5">
            {liveSession ? (
              <input name="sessionId" type="hidden" value={liveSession.id} />
            ) : null}

            <label className="block space-y-2">
              <span className="label">ชื่อไลฟ์</span>
              <input
                className="input"
                defaultValue={liveSession?.title || ""}
                maxLength={140}
                name="title"
                placeholder="เช่น ทบทวน Python: ตัวแปรและเงื่อนไข"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="label">YouTube video ID หรือ URL</span>
              <input
                className="input font-mono"
                defaultValue={liveSession?.youtubeVideoId || ""}
                name="youtubeInput"
                placeholder="dQw4w9WgXcQ หรือ https://youtube.com/watch?v=..."
                required
              />
              <span className="block text-xs font-bold leading-5 text-slate-500">
                รองรับลิงก์ watch, live, embed, shorts, youtu.be และ video ID 11 ตัวอักษร
              </span>
            </label>

            <label className="block space-y-2">
              <span className="label">คำอธิบาย (ไม่บังคับ)</span>
              <textarea
                className="input min-h-32 resize-y"
                defaultValue={liveSession?.description || ""}
                maxLength={2000}
                name="description"
                placeholder="หัวข้อที่จะสอน หรือสิ่งที่ผู้เรียนควรเตรียมก่อนเข้าไลฟ์"
              />
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <input
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                defaultChecked={liveSession?.isActive || false}
                name="isActive"
                type="checkbox"
              />
              <span>
                <span className="block font-black text-ink">เปิดให้ผู้เรียนดูไลฟ์นี้</span>
                <span className="mt-1 block text-sm font-bold leading-6 text-slate-500">
                  เมื่อเปิด วิดีโอจะปรากฏบนหน้า /live สำหรับแอดมินและสมาชิก Premium
                </span>
              </span>
            </label>

            <button className="btn-primary w-full sm:w-auto" type="submit">
              <Save className="h-4 w-4" />
              บันทึกการตั้งค่า
            </button>
          </form>

          {activeSession ? (
            <form action={disableLiveSessionAction} className="mt-4 border-t border-slate-100 pt-4">
              <input name="sessionId" type="hidden" value={activeSession.id} />
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100 sm:w-auto"
                type="submit"
              >
                <Power className="h-4 w-4" />
                ปิดไลฟ์ทันที
              </button>
            </form>
          ) : null}
        </section>

        <section className="panel overflow-hidden">
          <div className="border-b border-slate-100 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Preview</p>
                <h2 className="mt-3 text-2xl font-black text-ink">ตัวอย่างวิดีโอ</h2>
              </div>
              <Video className="h-7 w-7 text-lavender-600" />
            </div>
          </div>

          {liveSession ? (
            <>
              <div className="bg-slate-950 p-2 sm:p-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-black">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={`https://www.youtube-nocookie.com/embed/${liveSession.youtubeVideoId}?rel=0`}
                    title={`ตัวอย่าง ${liveSession.title}`}
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-black text-ink">{liveSession.title}</h3>
                  <AdminLiveStatus isActive={liveSession.isActive} />
                </div>
                {liveSession.description ? (
                  <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                    {liveSession.description}
                  </p>
                ) : (
                  <p className="mt-3 text-sm font-bold text-slate-500">ยังไม่มีคำอธิบายไลฟ์</p>
                )}
              </div>
            </>
          ) : (
            <div className="grid min-h-80 place-items-center px-6 py-12 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-500">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-xl font-black text-ink">ยังไม่มีข้อมูลไลฟ์</h3>
                <p className="mt-2 max-w-sm leading-7 text-slate-600">
                  กรอกข้อมูลทางซ้ายและบันทึกเพื่อสร้างห้องเรียนสดครั้งแรก
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
