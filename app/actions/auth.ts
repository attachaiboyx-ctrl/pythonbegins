"use server";

import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { clearSession, setSession } from "@/lib/session";

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function fail(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function registerAction(formData: FormData) {
  const name = getText(formData, "name");
  const email = getText(formData, "email").toLowerCase();
  const password = String(formData.get("password") || "");

  if (name.length < 2) {
    fail("/register", "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร");
  }

  if (!email.includes("@")) {
    fail("/register", "กรุณากรอกอีเมลให้ถูกต้อง");
  }

  if (password.length < 6) {
    fail("/register", "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    fail("/register", "อีเมลนี้สมัครไว้แล้ว ลองเข้าสู่ระบบได้เลย");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password)
    },
    select: { id: true }
  });

  await setSession(user.id);
  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const email = getText(formData, "email").toLowerCase();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, passwordHash: true }
  });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    fail("/login", "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }

  await setSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
