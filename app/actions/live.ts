"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function liveRedirect(type: "message" | "error", message: string): never {
  const params = new URLSearchParams({ [type]: message });
  redirect(`/admin/live?${params.toString()}`);
}

function extractYouTubeVideoId(value: string) {
  const input = value.trim();

  if (YOUTUBE_VIDEO_ID_PATTERN.test(input)) {
    return input;
  }

  try {
    const url = new URL(
      /^https?:\/\//i.test(input) ? input : `https://${input}`
    );
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    let candidate = "";

    if (hostname === "youtu.be") {
      candidate = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname === "/watch") {
        candidate = url.searchParams.get("v") || "";
      } else {
        const [route, videoId] = url.pathname.split("/").filter(Boolean);

        if (["embed", "live", "shorts"].includes(route)) {
          candidate = videoId || "";
        }
      }
    }

    return YOUTUBE_VIDEO_ID_PATTERN.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

export async function saveLiveSessionAction(formData: FormData) {
  await requireAdmin();

  const sessionId = String(formData.get("sessionId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const youtubeInput = String(formData.get("youtubeInput") || "").trim();
  const youtubeVideoId = extractYouTubeVideoId(youtubeInput);
  const isActive = formData.get("isActive") === "on";

  if (!title) {
    liveRedirect("error", "กรุณากรอกชื่อไลฟ์");
  }

  if (title.length > 140) {
    liveRedirect("error", "ชื่อไลฟ์ต้องไม่เกิน 140 ตัวอักษร");
  }

  if (description.length > 2000) {
    liveRedirect("error", "คำอธิบายต้องไม่เกิน 2,000 ตัวอักษร");
  }

  if (!youtubeVideoId) {
    liveRedirect("error", "กรุณากรอก YouTube video ID หรือ URL ที่ถูกต้อง");
  }

  if (sessionId) {
    const existingSession = await prisma.liveSession.findUnique({
      where: { id: sessionId },
      select: { id: true }
    });

    if (!existingSession) {
      liveRedirect("error", "ไม่พบข้อมูลไลฟ์ที่ต้องการแก้ไข");
    }
  }

  try {
    await prisma.$transaction(async (transaction) => {
      if (isActive) {
        await transaction.liveSession.updateMany({
          where: { isActive: true },
          data: { isActive: false }
        });
      }

      const data = {
        title,
        description: description || null,
        youtubeVideoId,
        isActive
      };

      if (sessionId) {
        await transaction.liveSession.update({
          where: { id: sessionId },
          data
        });
      } else {
        await transaction.liveSession.create({ data });
      }
    });
  } catch (error) {
    console.error("Live session save failed:", error);
    liveRedirect("error", "บันทึกข้อมูลไลฟ์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }

  revalidatePath("/live");
  revalidatePath("/admin/live");
  liveRedirect(
    "message",
    isActive ? "บันทึกและเปิดไลฟ์เรียบร้อยแล้ว" : "บันทึกข้อมูลไลฟ์แบบออฟไลน์แล้ว"
  );
}

export async function disableLiveSessionAction(formData: FormData) {
  await requireAdmin();

  const sessionId = String(formData.get("sessionId") || "").trim();

  if (!sessionId) {
    liveRedirect("error", "ไม่พบข้อมูลไลฟ์ที่ต้องการปิด");
  }

  let updatedCount = 0;

  try {
    const result = await prisma.liveSession.updateMany({
      where: { id: sessionId, isActive: true },
      data: { isActive: false }
    });
    updatedCount = result.count;
  } catch (error) {
    console.error("Live session disable failed:", error);
    liveRedirect("error", "ปิดไลฟ์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }

  if (updatedCount === 0) {
    liveRedirect("error", "ไลฟ์นี้ถูกปิดอยู่แล้วหรือไม่พบข้อมูล");
  }

  revalidatePath("/live");
  revalidatePath("/admin/live");
  liveRedirect("message", "ปิดไลฟ์เรียบร้อยแล้ว");
}
