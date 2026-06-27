/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Crown,
  Radio,
  ReceiptText,
  UserRound,
  UsersRound,
  WalletCards
} from "lucide-react";
import { reviewSlipAction, setMembershipAction } from "@/app/actions/admin";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const slipFilters = [
  { label: "รอตรวจ", value: "pending" },
  { label: "อนุมัติแล้ว", value: "approved" },
  { label: "ปฏิเสธ", value: "rejected" },
  { label: "ทั้งหมด", value: "all" }
] as const;

type SlipFilter = (typeof slipFilters)[number]["value"];

const memberFilters = [
  { label: "ทั้งหมด", value: "all" },
  { label: "Premium", value: "premium" },
  { label: "Free", value: "free" }
] as const;

type MemberFilter = (typeof memberFilters)[number]["value"];

function getSlipFilter(status?: string): SlipFilter {
  if (status === "approved" || status === "rejected" || status === "all") {
    return status;
  }

  return "pending";
}

function getMemberFilter(member?: string): MemberFilter {
  if (member === "premium" || member === "free") {
    return member;
  }

  return "all";
}

function adminHref({
  status,
  member
}: {
  status?: SlipFilter;
  member?: MemberFilter;
}) {
  const params = new URLSearchParams();

  if (status && status !== "pending") {
    params.set("status", status);
  }

  if (member && member !== "all") {
    params.set("member", member);
  }

  const query = params.toString();

  return query ? `/admin?${query}` : "/admin";
}

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

function isPdfSlipUrl(imageUrl: string) {
  const lowerUrl = imageUrl.toLowerCase();
  const urlWithoutQuery = lowerUrl.split(/[?#]/)[0];

  return (
    lowerUrl.startsWith("data:application/pdf") ||
    urlWithoutQuery.endsWith(".pdf")
  );
}

function formatThaiDate(date: Date) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium"
  }).format(date);
}

function formatThaiDateTime(date: Date) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function gatewayStatusText(status: string) {
  if (status === "successful") return "สำเร็จ";
  if (status === "failed") return "ไม่สำเร็จ";
  if (status === "cancelled") return "ยกเลิก";
  return "รอชำระ";
}

function gatewayStatusClass(status: string) {
  if (status === "successful") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "failed" || status === "cancelled") {
    return "border-red-200 bg-red-50 text-red-700";
  }
  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{
    message?: string;
    error?: string;
    status?: string;
    member?: string;
  }>;
}) {
  const query = await searchParams;
  await requireAdmin();
  const activeFilter = getSlipFilter(query.status);
  const activeMemberFilter = getMemberFilter(query.member);
  const slipWhere = activeFilter === "all" ? undefined : { status: activeFilter };

  const [
    slips,
    users,
    pendingCount,
    approvedCount,
    rejectedCount,
    allCount,
    gatewayTransactions
  ] = await Promise.all([
    prisma.paymentSlip.findMany({
      where: slipWhere,
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
    }),
    prisma.paymentSlip.count({ where: { status: "pending" } }),
    prisma.paymentSlip.count({ where: { status: "approved" } }),
    prisma.paymentSlip.count({ where: { status: "rejected" } }),
    prisma.paymentSlip.count(),
    prisma.paymentTransaction.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 100
    })
  ]);

  const filterCounts: Record<SlipFilter, number> = {
    pending: pendingCount,
    approved: approvedCount,
    rejected: rejectedCount,
    all: allCount
  };

  const customerUsers = users.filter((user) => user.role !== "admin");
  const adminUsers = users.filter((user) => user.role === "admin");
  const premiumMembers = customerUsers.filter((user) => user.membership === "paid");
  const freeMembers = customerUsers.filter((user) => user.membership !== "paid");
  const memberCounts: Record<MemberFilter, number> = {
    all: customerUsers.length,
    premium: premiumMembers.length,
    free: freeMembers.length
  };
  const filteredMemberUsers =
    activeMemberFilter === "premium"
      ? premiumMembers
      : activeMemberFilter === "free"
        ? freeMembers
        : customerUsers;
  const premiumCount = premiumMembers.length;
  const activeFilterLabel =
    slipFilters.find((filter) => filter.value === activeFilter)?.label || "รอตรวจ";
  const activeMemberFilterLabel =
    memberFilters.find((filter) => filter.value === activeMemberFilter)?.label || "ทั้งหมด";

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
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-4 py-3 text-sm font-black text-brand-700 shadow-sm transition hover:bg-blue-50 sm:col-span-2"
              href="/admin/live"
            >
              <Radio className="h-4 w-4" />
              จัดการห้องเรียนสด
            </Link>
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

      <section className="panel p-6 sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Member overview</p>
            <h2 className="section-title mt-3">สรุปจำนวนสมาชิก</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              นับเฉพาะบัญชีผู้เรียน ไม่รวมบัญชีผู้ดูแลระบบ
              {adminUsers.length > 0 ? ` ${adminUsers.length.toLocaleString("th-TH")} บัญชี` : ""}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-white to-brand-50 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-lg bg-brand-100 p-3 text-brand-700">
                <UsersRound className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
                Student
              </span>
            </div>
            <div className="mt-5 text-4xl font-black text-ink">
              {memberCounts.all.toLocaleString("th-TH")}
            </div>
            <div className="mt-1 text-sm font-black text-slate-600">สมาชิกทั้งหมด</div>
          </div>

          <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700">
                <Crown className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
                Paid
              </span>
            </div>
            <div className="mt-5 text-4xl font-black text-ink">
              {memberCounts.premium.toLocaleString("th-TH")}
            </div>
            <div className="mt-1 text-sm font-black text-slate-600">สมาชิก Premium</div>
          </div>

          <div className="rounded-lg border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-lg bg-violet-100 p-3 text-violet-700">
                <UserRound className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-violet-700 shadow-sm">
                Free
              </span>
            </div>
            <div className="mt-5 text-4xl font-black text-ink">
              {memberCounts.free.toLocaleString("th-TH")}
            </div>
            <div className="mt-1 text-sm font-black text-slate-600">สมาชิก Free</div>
          </div>
        </div>
      </section>

      <section className="panel p-6 sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Payment gateway</p>
            <h2 className="section-title mt-3">รายการชำระผ่าน Opn</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              ข้อมูลส่วนนี้อ่านอย่างเดียว สถานะสำเร็จมาจาก webhook และการตรวจ charge กับ Opn เท่านั้น
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3 text-sm font-black text-brand-700">
            <WalletCards className="h-5 w-5" />
            {gatewayTransactions.length.toLocaleString("th-TH")} รายการ
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2">ผู้ใช้</th>
                <th className="px-3 py-2">อีเมล</th>
                <th className="px-3 py-2">ยอดเงิน</th>
                <th className="px-3 py-2">Provider Charge ID</th>
                <th className="px-3 py-2">สถานะ</th>
                <th className="px-3 py-2">วันที่จ่าย</th>
              </tr>
            </thead>
            <tbody>
              {gatewayTransactions.length === 0 ? (
                <tr className="bg-slate-50">
                  <td
                    className="rounded-lg px-3 py-6 text-center font-bold text-slate-500"
                    colSpan={6}
                  >
                    ยังไม่มีรายการชำระผ่าน Payment Gateway
                  </td>
                </tr>
              ) : (
                gatewayTransactions.map((transaction) => (
                  <tr key={transaction.id} className="bg-slate-50">
                    <td className="rounded-l-lg px-3 py-3 font-black text-ink">
                      {transaction.user.name}
                    </td>
                    <td className="px-3 py-3 font-bold text-slate-600">
                      {transaction.user.email}
                    </td>
                    <td className="px-3 py-3 font-black text-slate-700">
                      {(transaction.amount / 100).toLocaleString("th-TH")} {transaction.currency}
                    </td>
                    <td className="max-w-64 break-all px-3 py-3 font-mono text-xs text-slate-500">
                      {transaction.providerChargeId || "-"}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${gatewayStatusClass(transaction.status)}`}>
                        {gatewayStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="rounded-r-lg px-3 py-3 font-bold text-slate-600">
                      {transaction.paidAt
                        ? formatThaiDateTime(transaction.paidAt)
                        : "ยังไม่ชำระ"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Payment review</p>
            <h2 className="section-title mt-3">สลิปชำระเงิน: {activeFilterLabel}</h2>
          </div>
          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            {slipFilters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <Link
                  key={filter.value}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-gradient-to-r from-brand-600 to-lavender-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                  href={adminHref({ status: filter.value, member: activeMemberFilter })}
                >
                  {filter.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {filterCounts[filter.value].toLocaleString("th-TH")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {slips.length === 0 ? (
            <div className="panel p-6 text-sm font-bold text-slate-600">
              {activeFilter === "pending"
                ? "ไม่มีสลิปที่รอตรวจในตอนนี้"
                : `ยังไม่มีสลิปในแท็บ${activeFilterLabel}`}
            </div>
          ) : (
            slips.map((slip) => {
              const isPdf = isPdfSlipUrl(slip.imageUrl);
              const isPending = slip.status === "pending";

              return (
                <article key={slip.id} className="panel overflow-hidden">
                  <div className="grid gap-4 p-5 md:grid-cols-[0.75fr_1.25fr]">
                    <div className="rounded-lg bg-slate-50 p-3">
                      {isPdf ? (
                        <a
                          className="grid min-h-48 place-items-center rounded-lg border border-dashed border-slate-300 text-sm font-black text-brand-700"
                          href={slip.imageUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          เปิดไฟล์ PDF
                        </a>
                      ) : (
                        <img
                          alt="สลิปชำระเงิน"
                          className="h-56 w-full rounded-lg object-cover"
                          src={slip.imageUrl}
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
                        {!isPending && slip.adminNote ? (
                          <div className="rounded-lg bg-slate-50 px-4 py-3">
                            หมายเหตุแอดมิน: {slip.adminNote}
                          </div>
                        ) : null}
                      </div>

                      {isPending ? (
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
                      ) : (
                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
                          รายการนี้ตรวจแล้ว สามารถดูเป็นประวัติได้จากแท็บนี้
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <section className="panel p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Users</p>
            <h2 className="section-title mt-3">รายชื่อสมาชิก: {activeMemberFilterLabel}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              แสดงเฉพาะบัญชีผู้เรียน ส่วนบัญชี admin แยกไว้ด้านล่าง
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            {memberFilters.map((filter) => {
              const isActive = activeMemberFilter === filter.value;

              return (
                <Link
                  key={filter.value}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-gradient-to-r from-brand-600 to-lavender-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                  href={adminHref({ status: activeFilter, member: filter.value })}
                >
                  {filter.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {memberCounts[filter.value].toLocaleString("th-TH")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2">ชื่อ</th>
                <th className="px-3 py-2">อีเมล</th>
                <th className="px-3 py-2">สถานะสมาชิก</th>
                <th className="px-3 py-2">วันที่สมัคร</th>
                <th className="px-3 py-2">ปรับสถานะ</th>
              </tr>
            </thead>
            <tbody>
              {filteredMemberUsers.length === 0 ? (
                <tr className="bg-slate-50">
                  <td
                    className="rounded-lg px-3 py-6 text-center font-bold text-slate-500"
                    colSpan={5}
                  >
                    ยังไม่มีสมาชิกในแท็บนี้
                  </td>
                </tr>
              ) : (
                filteredMemberUsers.map((user) => (
                <tr key={user.id} className="bg-slate-50">
                  <td className="rounded-l-lg px-3 py-3 font-black text-ink">
                    {user.name}
                  </td>
                  <td className="px-3 py-3 font-bold text-slate-600">{user.email}</td>
                  <td className="px-3 py-3">
                    <StatusBadge
                      compact
                      membership={user.membership}
                      role={user.role}
                    />
                  </td>
                  <td className="px-3 py-3 font-bold text-slate-600">
                    {formatThaiDate(user.createdAt)}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {adminUsers.length > 0 ? (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-black text-ink">บัญชีผู้ดูแลระบบ</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {adminUsers.length.toLocaleString("th-TH")} บัญชี
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {adminUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-black text-ink">{user.name}</div>
                      <div className="mt-1 text-sm font-bold text-slate-600">{user.email}</div>
                      <div className="mt-1 text-xs font-bold text-slate-500">
                        สมัครเมื่อ {formatThaiDate(user.createdAt)}
                      </div>
                    </div>
                    <StatusBadge compact membership={user.membership} role={user.role} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
