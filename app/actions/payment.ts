"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { getPaymentSettings } from "@/lib/promptpay";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["application/pdf", "pdf"]
]);

function fail(message: string): never {
  redirect(`/payment?error=${encodeURIComponent(message)}`);
}

export async function uploadSlipAction(formData: FormData) {
  const user = await requireUser();
  const fileValue = formData.get("slip");
  const note = String(formData.get("note") || "").trim();
  const amount = Number(formData.get("amount") || getPaymentSettings().price);

  if (!fileValue || typeof fileValue === "string") {
    fail("กรุณาเลือกไฟล์สลิปก่อนส่ง");
  }

  const file = fileValue as File;

  if (file.size <= 0) {
    fail("ไฟล์สลิปว่างเปล่า กรุณาเลือกไฟล์ใหม่");
  }

  if (file.size > MAX_FILE_SIZE) {
    fail("ไฟล์ใหญ่เกิน 5MB กรุณาย่อไฟล์ก่อนอัปโหลด");
  }

  const extension = ALLOWED_TYPES.get(file.type);

  if (!extension) {
    fail("รองรับเฉพาะไฟล์ PNG, JPG, WEBP หรือ PDF");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "slips");
  const filename = `${Date.now()}-${user.id}.${extension}`;
  const filepath = path.join(uploadDir, filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filepath, bytes);

  await prisma.paymentSlip.create({
    data: {
      userId: user.id,
      amount,
      imageUrl: `/uploads/slips/${filename}`,
      note: note || null
    }
  });

  redirect("/dashboard?payment=uploaded");
}
