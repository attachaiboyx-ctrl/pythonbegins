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
const BLOB_PACKAGE_NAME = "@vercel/blob";

type BlobPutResult = {
  url: string;
};

type BlobModule = {
  put: (
    pathname: string,
    body: File,
    options: {
      access: "public";
      addRandomSuffix?: boolean;
      contentType?: string;
    }
  ) => Promise<BlobPutResult>;
};

function fail(message: string): never {
  redirect(`/payment?error=${encodeURIComponent(message)}`);
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

async function uploadSlipToBlob(pathname: string, file: File) {
  const importBlob = new Function(
    "packageName",
    "return import(packageName)"
  ) as (packageName: string) => Promise<BlobModule>;
  const { put } = await importBlob(BLOB_PACKAGE_NAME);

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type
  });
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

  let imageUrl: string;

  try {
    const timestamp = Date.now();
    const safeFilename = sanitizeFilename(file.name, extension);
    const blob = await uploadSlipToBlob(
      `slips/${user.id}-${timestamp}-${safeFilename}`,
      file
    );

    imageUrl = blob.url;
  } catch {
    fail("อัปโหลดสลิปไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }

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
