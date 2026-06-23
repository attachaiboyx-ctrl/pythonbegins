# Python สำหรับมือใหม่ Course Platform

เว็บคอร์สเรียน Python ภาษาไทยสำหรับผู้เริ่มต้นทุกวัย สร้างด้วย Next.js, Tailwind CSS, Prisma และ Neon PostgreSQL

## ฟีเจอร์หลัก

- สมัครสมาชิกและเข้าสู่ระบบด้วยอีเมล/รหัสผ่าน
- Dashboard นักเรียน พร้อมสถานะสมาชิกและความคืบหน้าบทเรียน
- บทเรียน Python 20 บท พร้อมแบบฝึกหัดและแบบทดสอบท้ายบท
- สมาชิก `free` ดูได้เฉพาะบทที่ 1-2
- สมาชิก `paid` หรือพรีเมียมดูบทเรียนทั้งหมดได้
- ชำระเงินด้วย PromptPay QR แบบ manual
- นักเรียนอัปโหลดสลิปได้
- หน้า admin สำหรับตรวจสลิป อนุมัติ/ปฏิเสธ และเปลี่ยนสถานะสมาชิก

## การติดตั้ง

ต้องมี Node.js ติดตั้งไว้ในเครื่องก่อน

```bash
npm install
```

## ตั้งค่า Environment

โปรเจกต์มีไฟล์ `.env` สำหรับตั้งค่าการเชื่อมต่อฐานข้อมูลและค่าระบบอื่น ๆ ให้ใส่ `DATABASE_URL` เป็น connection string ของ Neon PostgreSQL ชุดเดียวกับที่ตั้งไว้บน Vercel

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
SESSION_SECRET="replace-with-a-long-random-secret"
PROMPTPAY_ID="0923341049"
COURSE_PRICE="199"
MERCHANT_NAME="Python Beginner Academy"
```

อย่าใช้ `file:./dev.db` แล้ว เพราะ schema Prisma ตั้งค่าเป็น PostgreSQL สำหรับ Neon แล้ว

ค่า `PROMPTPAY_ID` ใส่ได้ทั้งเบอร์โทร PromptPay, เลขบัตรประชาชน หรือ e-wallet ID ที่รองรับ

## สร้างตารางใน Neon และข้อมูลทดลอง

```bash
npm run db:push
npm run db:seed
```

หรือใช้ Prisma CLI โดยตรง:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

บัญชีทดลองที่ seed จะสร้าง/อัปเดต:

- Admin: `admin@pythonm1.local` / `admin1234`
- นักเรียน free: `student@pythonm1.local` / `student1234`
- ผู้เรียนพรีเมียม: `paid@pythonm1.local` / `paid1234`

## รันเว็บ

```bash
npm run dev
```

เปิดเว็บที่ `http://localhost:3000`

## Flow การใช้งาน

1. สมัครสมาชิกใหม่ หรือ login ด้วยบัญชีทดลอง
2. เข้า Dashboard เพื่อดูบทเรียนและสถานะสมาชิก
3. สมาชิก free เข้าเรียนบทที่ 1-2 ได้
4. ไปหน้า `ชำระเงิน` เพื่อสแกน PromptPay QR และอัปโหลดสลิป
5. Login เป็น admin แล้วเข้า `/admin`
6. ตรวจสลิปและกด `อนุมัติพรีเมียม`
7. นักเรียนจะปลดล็อกบทที่ 3-20

## คำสั่งที่ใช้บ่อย

```bash
npm run dev
npm run build
npm run lint
npm run db:push
npm run db:seed
npm run db:reset
```

## หมายเหตุสำหรับ production

- เปลี่ยน `SESSION_SECRET` เป็นค่ายาวและสุ่มจริง
- ตรวจสอบบัญชี PromptPay ใน `.env` ก่อนเปิดใช้งานจริง
- ระบบอัปโหลดสลิปนี้เก็บไฟล์ไว้ใน `public/uploads/slips` เหมาะกับการรันบนเครื่องหรือ server ที่มี disk ถ้าจะ deploy บน platform ที่ filesystem ไม่ถาวร ควรเปลี่ยนไปใช้ object storage
- ระบบชำระเงินเป็น manual approval ไม่มีการตรวจยอดโอนอัตโนมัติ
