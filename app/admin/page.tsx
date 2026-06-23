import Image from "next/image";
import { AlertCircle, CheckCircle2, ReceiptText, UsersRound } from "lucide-react";
import { reviewSlipAction, setMembershipAction } from "@/app/actions/admin";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

function slipStatusClass(status: string) {
  if (status === "approved") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "rejected") return "border-red-200 bg-red-50 text-red-700";
  return "border-blue-200 bg-brand-50 text-brand-700";
}

function slipStatusText(status: string) {
  if (status === "approved") return "อนุมัติแล้ว";
  if (status === "rejected") return "ไม่ผ่าน";
  return "รอตรวจ";
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const query = await searchParams;
  await requireAdmin();

  const [slips, users] = await Promise.all([
    prisma.paymentSlip.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            membership: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        membership: true,
        role: true,
        createdAt: true
      }
    })
  ]);

  const pendingCount = slips.filter((slip) => slip.status === "pending").length;
  const premiumCount = users.filter((user) => user.membership === "paid" || user.role === "admin").length;

  return (
    <div className="page-shell space-y-8">
      <section className="panel overflow-hidden">
        <div className="grid gap-6 bg-gradient-to-br from-slate-950 to-brand-700 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.52fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              Admin console
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              ตรวจสลิปและจัดการสมาชิก
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-blue-50">
              ตรวจหลักฐาน PromptPay แบบ manual แล้วอนุมัติเพื่อเปลี่ยนผู้ใช้เป็นพรีเมียม
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white/15 p-5">
              <ReceiptText className="h-6 w-6 text-blue-100" />
              <div className="mt-3 text-3xl font-black">{pendingCount}</div>
              <div className="text-sm font-bold text-blue-100">สลิปรอตรวจ</div>
            </div>
            <div className="rounded-lg bg-white/15 p-5">
              <UsersRound className="h-6 w-6 text-blue-100" />
              <div className="mt-3 text-3xl font-black">{premiumCount}</div>
              <div className="text-sm font-bold text-blue-100">สมาชิกพรีเมียม</div>
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
        <div className="rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {query.error}
        </div>
      ) : null}

      <section>
        <div className="mb-5">
          <p className="eyebrow">Payment review</p>
          <h2 className="section-title mt-3">สลิปชำระเงินล่าสุด</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {slips.length === 0 ? (
            <div className="panel p-6 text-sm font-bold text-slate-600">
              ยังไม่มีสลิปที่ส่งเข้ามา
            </div>
          ) : (
            slips.map((slip) => {
              const isPdf = slip.imageUrl.toLowerCase().endsWith(".pdf");

              return (
                <article key={slip.id} className="panel overflow-hidden">
                  <div className="grid gap-4 p-5 md:grid-cols-[0.75fr_1.25fr]">
                    <div className="rounded-lg bg-slate-50 p-3">
                      {isPdf ? (
                        <a
                          className="grid min-h-48 place-items-center rounded-lg border border-dashed border-slate-300 text-sm font-black text-brand-700"
                          href={slip.imageUrl}
                          target="_blank"
                        >
                          เปิดไฟล์ PDF
                        </a>
                      ) : (
                        <Image
                          alt="สลิปชำระเงิน"
                          className="h-56 w-full rounded-lg object-cover"
                          height={224}
                          src={slip.imageUrl}
                          unoptimized
                          width={320}
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="font-black text-ink">{slip.user.name}</h3>
                          <p className="mt-1 text-sm font-bold text-slate-500">
                            {slip.user.email}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-black ${slipStatusClass(
                            slip.status
                          )}`}
                        >
                          {slipStatusText(slip.status)}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
                        <div className="rounded-lg bg-slate-50 px-4 py-3">
                          ยอด {slip.amount.toLocaleString("th-TH")} บาท
                        </div>
                        <div className="rounded-lg bg-slate-50 px-4 py-3">
                          สมาชิกปัจจุบัน: {slip.user.membership === "paid" ? "premium" : "free"}
                        </div>
                        {slip.note ? (
                          <div className="rounded-lg bg-slate-50 px-4 py-3">
                            หมายเหตุ: {slip.note}
                          </div>
                        ) : null}
                      </div>

                      <form action={reviewSlipAction} className="mt-4 space-y-3">
                        <input name="slipId" type="hidden" value={slip.id} />
                        <textarea
                          className="input min-h-20"
                          name="adminNote"
                          placeholder="หมายเหตุการตรวจสลิป"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="btn-primary"
                            name="status"
                            type="submit"
                            value="approved"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            อนุมัติพรีเมียม
                          </button>
                          <button
                            className="btn-secondary"
                            name="status"
                            type="submit"
                            value="rejected"
                          >
                            <AlertCircle className="h-4 w-4" />
                            ปฏิเสธ
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <section className="panel p-6">
        <div className="mb-5">
          <p className="eyebrow">Users</p>
          <h2 className="section-title mt-3">จัดการสถานะสมาชิก</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2">ชื่อ</th>
                <th className="px-3 py-2">อีเมล</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">สถานะ</th>
                <th className="px-3 py-2">ปรับสถานะ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-slate-50">
                  <td className="rounded-l-lg px-3 py-3 font-black text-ink">
                    {user.name}
                  </td>
                  <td className="px-3 py-3 font-bold text-slate-600">{user.email}</td>
                  <td className="px-3 py-3 font-bold text-slate-600">{user.role}</td>
                  <td className="px-3 py-3">
                    <StatusBadge
                      compact
                      membership={user.membership}
                      role={user.role}
                    />
                  </td>
                  <td className="rounded-r-lg px-3 py-3">
                    <form action={setMembershipAction} className="flex gap-2">
                      <input name="userId" type="hidden" value={user.id} />
                      <select
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-bold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                        defaultValue={user.membership}
                        name="membership"
                      >
                        <option value="free">free</option>
                        <option value="paid">premium</option>
                      </select>
                      <button className="btn-secondary py-2" type="submit">
                        บันทึก
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
