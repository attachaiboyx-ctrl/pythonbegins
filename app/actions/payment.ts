"use server";

import { redirect } from "next/navigation";
import { getPaymentSettings } from "@/lib/promptpay";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

const MAX_FILE_SIZE = 1024 * 1024;
const FILE_SIZE_ERROR = "ไฟล์ใหญ่เกินไป กรุณาอัปโหลดรูปภาพไม่เกิน 1MB";
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
    fail(FILE_SIZE_ERROR);
  }

  const extension = ALLOWED_TYPES.get(file.type);

  if (!extension) {
    fail("รองรับเฉพาะไฟล์ PNG, JPG, WEBP หรือ PDF");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = bytes.toString("base64");
  const imageUrl = `data:${file.type};base64,${base64}`;

  await prisma.paymentSlip.create({
    data: {
      userId: user.id,
      amount,
      imageUrl,
      note: note || null
    }
  });

  redirect("/dashboard?payment=uploaded");
}
