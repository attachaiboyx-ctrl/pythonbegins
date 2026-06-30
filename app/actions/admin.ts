"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const notificationTargetGroups = ["free", "premium", "all"] as const;
type NotificationTargetGroup = (typeof notificationTargetGroups)[number];

function adminFail(message: string): never {
  redirect(`/admin?error=${encodeURIComponent(message)}`);
}

function normalizeNotificationLink(value: string) {
  const link = value.trim();

  if (!link) {
    return null;
  }

  if (!link.startsWith("/") || link.startsWith("//")) {
    adminFail("ลิงก์ต้องเป็น path ภายในเว็บ เช่น /payment");
  }

  return link;
}

export async function reviewSlipAction(formData: FormData) {
  await requireAdmin();

  const slipId = String(formData.get("slipId") || "");
  const status = String(formData.get("status") || "");
  const adminNote = String(formData.get("adminNote") || "").trim();

  if (!slipId) {
    adminFail("ไม่พบรหัสสลิป");
  }

  if (!["approved", "rejected"].includes(status)) {
    adminFail("สถานะสลิปไม่ถูกต้อง");
  }

  const slip = await prisma.paymentSlip.update({
    where: { id: slipId },
    data: {
      status,
      adminNote: adminNote || null,
      reviewedAt: new Date()
    },
    select: {
      userId: true
    }
  });

  if (status === "approved") {
    await prisma.user.update({
      where: { id: slip.userId },
      data: { membership: "paid" }
    });
  }

  redirect(
    `/admin?message=${encodeURIComponent(
      status === "approved" ? "อนุมัติสลิปและปลดล็อกพรีเมียมแล้ว" : "ปฏิเสธสลิปแล้ว"
    )}`
  );
}

export async function setMembershipAction(formData: FormData) {
  await requireAdmin();

  const userId = String(formData.get("userId") || "");
  const membership = String(formData.get("membership") || "");

  if (!userId || !["free", "paid"].includes(membership)) {
    adminFail("ข้อมูลสมาชิกไม่ถูกต้อง");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { membership }
  });

  redirect(
    `/admin?message=${encodeURIComponent("อัปเดตสถานะสมาชิกเรียบร้อย")}`
  );
}

export async function sendNotificationAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const link = normalizeNotificationLink(String(formData.get("link") || ""));
  const targetGroup = String(formData.get("targetGroup") || "free") as NotificationTargetGroup;
  const confirm = String(formData.get("confirm") || "");

  if (!title || title.length > 120) {
    adminFail("กรุณากรอกหัวข้อประกาศไม่เกิน 120 ตัวอักษร");
  }

  if (!message || message.length > 800) {
    adminFail("กรุณากรอกข้อความประกาศไม่เกิน 800 ตัวอักษร");
  }

  if (!notificationTargetGroups.includes(targetGroup)) {
    adminFail("กลุ่มผู้รับไม่ถูกต้อง");
  }

  if (confirm !== "yes") {
    adminFail("กรุณายืนยันก่อนส่งประกาศ");
  }

  const where =
    targetGroup === "free"
      ? { role: { not: "admin" }, membership: { not: "paid" } }
      : targetGroup === "premium"
        ? { role: { not: "admin" }, membership: "paid" }
        : { role: { not: "admin" } };

  const recipients = await prisma.user.findMany({
    where,
    select: { id: true }
  });

  if (recipients.length === 0) {
    adminFail("ไม่พบสมาชิกในกลุ่มที่เลือก");
  }

  await prisma.userNotification.createMany({
    data: recipients.map((recipient) => ({
      userId: recipient.id,
      title,
      message,
      link,
      type: "admin_broadcast"
    }))
  });

  redirect(
    `/admin?message=${encodeURIComponent(
      `ส่งแจ้งเตือนสำเร็จ ${recipients.length.toLocaleString("th-TH")} คน`
    )}`
  );
}
