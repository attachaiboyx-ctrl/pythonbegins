import Image from "next/image";
import {
  CheckCircle2,
  Code2,
  ImageIcon,
  Lightbulb,
  MonitorSmartphone
} from "lucide-react";
import type { LessonStep } from "@/lib/lessons";

export function LessonStepCard({
  number,
  step
}: {
  number: number;
  step: LessonStep;
}) {
  return (
    <article className="panel overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-black text-cyan-200 shadow-lg shadow-blue-950/10">
            {number}
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">
              Step {number}
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-ink">
              {step.stepTitle}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[0.42fr_0.58fr] xl:items-start">
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
            {step.imageReady ? (
              <Image
                alt={step.imageAlt}
                className="object-contain"
                fill
                sizes="(max-width: 1280px) 100vw, 42vw"
                src={step.imagePath}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_48%),linear-gradient(145deg,#020617,#0f172a)] p-5 text-center text-white">
                <div>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg border border-white/15 bg-white/10 text-cyan-200">
                    <MonitorSmartphone className="h-7 w-7" />
                  </span>
                  <p className="mt-4 text-sm font-black">พื้นที่ภาพอธิบายขั้นตอน</p>
                  <p className="mt-2 break-all font-mono text-[11px] leading-5 text-slate-400">
                    {step.imagePath}
                  </p>
                </div>
              </div>
            )}
          </div>
          <figcaption className="mt-3 flex items-start gap-2 text-xs font-bold leading-5 text-slate-500">
            <ImageIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
            {step.imageAlt}
          </figcaption>
        </figure>

        <div className="min-w-0">
          <p className="whitespace-pre-line leading-8 text-slate-600">
            {step.stepDescription}
          </p>

          {step.code ? (
            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                <Code2 className="h-4 w-4" /> Code example
              </div>
              <pre className="code-window overflow-x-auto">
                <code>{step.code}</code>
              </pre>
              {step.codeExplanation ? (
                <p className="mt-3 rounded-lg border border-blue-100 bg-brand-50 px-4 py-3 text-sm font-bold leading-6 text-brand-900">
                  {step.codeExplanation}
                </p>
              ) : null}
            </div>
          ) : null}

          {step.note ? (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{step.note}</span>
            </div>
          ) : null}

          {step.checklist?.length ? (
            <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
              <p className="text-sm font-black text-emerald-900">เช็กก่อนผ่านขั้นนี้</p>
              <ul className="mt-3 space-y-2">
                {step.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-bold leading-6 text-emerald-900">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
