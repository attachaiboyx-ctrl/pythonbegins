"use server";

import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { MANUAL_PREMIUM_PRICE_THB } from "@/lib/manual-payment-config";
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

const LANDING_PAGE_PRICE = 200;

function fail(message: string, returnPath = "/payment"): never {
  const separator = returnPath.includes("?") ? "&" : "?";
  redirect(`${returnPath}${separator}error=${encodeURIComponent(message)}`);
}

function sanitizeFilename(filename: string, extension: string) {
  const fallback = `slip.${extension}`;
  const safeName = (filename || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  if (!safeName) {
    return fallback;
  }

  return safeName.includes(".") ? safeName : `${safeName}.${extension}`;
}

export async function uploadSlipAction(formData: FormData) {
  const user = await requireUser();
  const fileValue = formData.get("slip");
  const note = String(formData.get("note") || "").trim();
  const productType = String(formData.get("productType") || "premium");
  const isLandingPagePurchase = productType === "landing-page-begins";
  const returnPath = isLandingPagePurchase
    ? "/payment?product=landing-page-begins"
    : "/payment?product=premium";

  if (!["premium", "landing-page-begins"].includes(productType)) {
    fail("ประเภทการชำระเงินไม่ถูกต้อง", returnPath);
  }

  const amount = isLandingPagePurchase
    ? LANDING_PAGE_PRICE
    : MANUAL_PREMIUM_PRICE_THB;

  if (!fileValue || typeof fileValue === "string") {
    fail("กรุณาเลือกไฟล์สลิปก่อนส่ง", returnPath);
  }

  const file = fileValue as File;

  if (file.size <= 0) {
    fail("ไฟล์สลิปว่างเปล่า กรุณาเลือกไฟล์ใหม่", returnPath);
  }

  if (file.size > MAX_FILE_SIZE) {
    fail(FILE_SIZE_ERROR, returnPath);
  }

  const extension = ALLOWED_TYPES.get(file.type);

  if (!extension) {
    fail("รองรับเฉพาะไฟล์ PNG, JPG, WEBP หรือ PDF", returnPath);
  }

  let imageUrl: string;

  try {
    const timestamp = Date.now();
    const safeFilename = sanitizeFilename(file.name, extension);
    const blob = await put(
      `slips/${user.id}-${timestamp}-${safeFilename}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type
      }
    );

    imageUrl = blob.url;
  } catch (error) {
    console.error("Payment slip upload failed:", error);
    fail("อัปโหลดสลิปไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", returnPath);
  }

  await prisma.paymentSlip.create({
    data: {
      userId: user.id,
      amount,
      productType,
      imageUrl,
      note: note || null
    }
  });

  redirect(
    isLandingPagePurchase
      ? "/payment?product=landing-page-begins&uploaded=1"
      : "/dashboard?payment=uploaded"
  );
}
