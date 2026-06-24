"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function settingsRedirect(type: "message" | "error", message: string): never {
  const params = new URLSearchParams({ [type]: message });

  redirect(`/settings?${params.toString()}`);
}

export async function updateDisplayNameAction(formData: FormData) {
  const user = await requireUser();
  const name = getText(formData, "name");

  if (!name) {
    settingsRedirect("error", "กรุณากรอกชื่อที่แสดง");
  }

  if (name.length < 2) {
    settingsRedirect("error", "ชื่อที่แสดงต้องมีอย่างน้อย 2 ตัวอักษร");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name }
  });

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  settingsRedirect("message", "บันทึกชื่อที่แสดงเรียบร้อยแล้ว");
}

export async function changePasswordAction(formData: FormData) {
  const user = await requireUser();
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    settingsRedirect("error", "กรุณากรอกรหัสผ่านให้ครบทุกช่อง");
  }

  if (newPassword.length < 6) {
    settingsRedirect("error", "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
  }

  if (newPassword !== confirmPassword) {
    settingsRedirect("error", "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
  }

  const account = await prisma.user.findUnique({
    where: { id: user.id },
    select: { passwordHash: true }
  });

  if (!account || !verifyPassword(currentPassword, account.passwordHash)) {
    settingsRedirect("error", "รหัสผ่านปัจจุบันไม่ถูกต้อง");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hashPassword(newPassword) }
  });

  revalidatePath("/settings");
  settingsRedirect("message", "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
}
