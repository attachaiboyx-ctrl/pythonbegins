import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Python Begins | เรียนเขียนโปรแกรมและทำเว็บสำหรับมือใหม่",
  description:
    "เรียนเขียนโปรแกรมและทำเว็บจากศูนย์ด้วยบทเรียนภาษาไทย ตัวอย่างโค้ด แบบฝึกหัด Quiz และโปรเจกต์จริงสำหรับผู้เริ่มต้น",
  openGraph: {
    title: "Python Begins | คอร์สเขียนโปรแกรมสำหรับมือใหม่",
    description:
      "เรียน Python, JavaScript และพื้นฐานการทำเว็บด้วยบทเรียนภาษาไทยที่เข้าใจง่าย",
    type: "website",
    images: [
      {
        url: "/images/course-hero.png",
        width: 1792,
        height: 1024,
        alt: "แพลตฟอร์มเรียนเขียนโปรแกรม Python Begins"
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
