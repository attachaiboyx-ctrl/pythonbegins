"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

function adminFail(message: string): never {
  redirect(`/admin?error=${encodeURIComponent(message)}`);
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

  redirect("/admin?message=อัปเดตสถานะสมาชิกเรียบร้อย");
}
