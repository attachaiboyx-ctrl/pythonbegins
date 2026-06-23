import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Python สำหรับมือใหม่ | คอร์สออนไลน์สำหรับผู้เริ่มต้น",
  description:
    "เรียน Python ตั้งแต่พื้นฐาน เหมาะสำหรับผู้ที่ไม่เคยเขียนโปรแกรมมาก่อน พร้อมบทเรียน แบบฝึกหัด โปรเจกต์จริง และระบบสมาชิก",
  openGraph: {
    title: "Python สำหรับมือใหม่",
    description:
      "เรียน Python ตั้งแต่พื้นฐาน เหมาะสำหรับผู้ที่ไม่เคยเขียนโปรแกรมมาก่อน",
    type: "website",
    images: [
      {
        url: "/images/course-hero.png",
        width: 1792,
        height: 1024,
        alt: "Python สำหรับมือใหม่"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
