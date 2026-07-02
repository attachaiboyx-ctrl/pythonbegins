import type { Lesson, LessonStep, QuizQuestion } from "@/lib/lessons";

const COURSE_SLUG = "web-app-begins";

type StepInput = Omit<LessonStep, "imagePath" | "imageAlt"> & {
  imageAlt?: string;
};

type WebAppLessonInput = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  minutes: number;
  objectives: string[];
  importance: string;
  realUse: string;
  steps: StepInput[];
  commonErrors: string[];
  summary: string[];
  exerciseTitle: string;
  exerciseTasks: string[];
  starterCode: string;
  quiz: QuizQuestion[];
};

function buildSteps(number: number, steps: StepInput[]): LessonStep[] {
  return steps.map((step, index) => ({
    ...step,
    imagePath: `/courses/web-app-begins/lesson-${String(number).padStart(2, "0")}-step-${String(index + 1).padStart(2, "0")}.png`,
    imageAlt:
      step.imageAlt ||
      `ภาพประกอบบทที่ ${number} ขั้นตอนที่ ${index + 1}: ${step.stepTitle}`
  }));
}

function makeLesson(input: WebAppLessonInput): Lesson {
  return {
    id: 900 + input.number,
    slug: input.slug,
    title: `บทที่ ${input.number}: ${input.title}`,
    subtitle: input.subtitle,
    minutes: input.minutes,
    free: false,
    badge: "Web App",
    accent: "bg-cyan-600",
    order: input.number,
    purchaseCourseSlug: COURSE_SLUG,
    objectives: input.objectives,
    steps: buildSteps(input.number, input.steps),
    summary: input.summary,
    sections: [
      {
        heading: "บทนี้เรียนอะไร",
        body: input.subtitle
      },
      {
        heading: "ทำไมเรื่องนี้สำคัญ",
        body: input.importance
      },
      {
        heading: "ใช้ทำอะไรในเว็บจริง",
        body: input.realUse
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: input.commonErrors
          .map((error, index) => `${index + 1}. ${error}`)
          .join("\n")
      }
    ],
    exercise: {
      title: input.exerciseTitle,
      tasks: input.exerciseTasks,
      starterCode: input.starterCode
    },
    quiz: input.quiz
  };
}

export const webAppLessons: Lesson[] = [
  makeLesson({
    number: 1,
    slug: "web-app-tools-setup",
    title: "เตรียมเครื่องมือก่อนเริ่มสร้างเว็บแอป",
    subtitle:
      "ติดตั้ง VS Code และ Node.js พร้อมฝึกใช้ Terminal เพื่อเตรียมเครื่องให้พร้อมสำหรับโปรเจกต์แรก",
    minutes: 45,
    objectives: [
      "ติดตั้งเครื่องมือหลักได้ครบ",
      "ตรวจเวอร์ชัน Node.js และ npm ได้",
      "สร้างและเปิดโฟลเดอร์โปรเจกต์ผ่าน Terminal ได้"
    ],
    importance:
      "เครื่องมือที่พร้อมช่วยให้เราโฟกัสกับการเรียนเขียนเว็บได้เต็มที่ หาก Node.js หรือโฟลเดอร์โปรเจกต์ไม่ถูกต้อง คำสั่งในบทต่อไปจะทำงานไม่ได้",
    realUse:
      "นักพัฒนาใช้ editor และ Terminal ทุกวัน ทั้งตอนสร้างโปรเจกต์ ติดตั้งเครื่องมือ รันเว็บ และตรวจข้อผิดพลาด",
    steps: [
      {
        stepTitle: "ติดตั้ง VS Code",
        stepDescription:
          "ดาวน์โหลด VS Code จากเว็บไซต์ทางการ ติดตั้งด้วยค่ามาตรฐาน แล้วเปิดโปรแกรมให้เห็นหน้า Welcome",
        note: "เลือกดาวน์โหลดให้ตรงกับ Windows หรือ macOS ของเครื่อง",
        checklist: ["เปิด VS Code ได้", "เห็นเมนู File และ Terminal"]
      },
      {
        stepTitle: "ติดตั้ง Node.js รุ่น LTS",
        stepDescription:
          "Node.js ทำให้เครื่องรัน JavaScript และคำสั่งสร้าง Next.js ได้ เลือกรุ่น LTS ซึ่งเหมาะกับการใช้งานทั่วไปและเสถียรกว่า",
        checklist: ["ติดตั้ง Node.js LTS", "ปิดและเปิด VS Code ใหม่หลังติดตั้ง"]
      },
      {
        stepTitle: "เช็ก node และ npm",
        stepDescription:
          "เปิด Terminal ใน VS Code แล้วตรวจว่าเครื่องมองเห็น Node.js และ npm หรือไม่ ตัวเลขเวอร์ชันที่แสดงหมายถึงติดตั้งสำเร็จ",
        code: `node -v\nnpm -v`,
        codeExplanation:
          "node -v แสดงเวอร์ชัน Node.js ส่วน npm -v แสดงเวอร์ชันตัวจัดการ package ที่มากับ Node.js",
        note: "ถ้าขึ้นว่า command not found ให้เปิด Terminal ใหม่หรือรีสตาร์ตเครื่อง"
      },
      {
        stepTitle: "รู้จัก Terminal",
        stepDescription:
          "Terminal คือช่องที่เราใช้สั่งงานเครื่องด้วยข้อความ เริ่มจากดูตำแหน่งปัจจุบันและรายการไฟล์โดยไม่ต้องจำทุกคำสั่งในครั้งเดียว",
        code: `pwd\nls`,
        codeExplanation:
          "pwd บอกตำแหน่งโฟลเดอร์ปัจจุบัน ส่วน ls แสดงไฟล์และโฟลเดอร์ที่อยู่ข้างใน",
        checklist: ["เปิด Terminal ใน VS Code", "อ่านตำแหน่งโฟลเดอร์ปัจจุบันได้"]
      },
      {
        stepTitle: "สร้างโฟลเดอร์สำหรับโปรเจกต์",
        stepDescription:
          "สร้างพื้นที่เก็บงานชื่อ web-app-begins แล้วเข้าไปในโฟลเดอร์นี้ก่อนเริ่มสร้างโปรเจกต์",
        code: `mkdir web-app-begins\ncd web-app-begins\ncode .`,
        codeExplanation:
          "mkdir สร้างโฟลเดอร์, cd ย้ายเข้าโฟลเดอร์ และ code . เปิดโฟลเดอร์ปัจจุบันใน VS Code",
        checklist: ["มีโฟลเดอร์ web-app-begins", "VS Code เปิดโฟลเดอร์ถูกตำแหน่ง"]
      }
    ],
    commonErrors: [
      "ติดตั้ง Node.js แล้วแต่ยังใช้ Terminal เก่าที่เปิดค้างอยู่",
      "สร้างโปรเจกต์ไว้ในโฟลเดอร์ Downloads จนหาไฟล์ยาก",
      "พิมพ์เครื่องหมายคำพูดแบบภาษาไทยแทนเครื่องหมายมาตรฐาน"
    ],
    summary: [
      "VS Code ใช้เขียนและจัดการไฟล์",
      "Node.js และ npm ใช้รันเครื่องมือเว็บ",
      "Terminal ใช้สร้างและสั่งงานโปรเจกต์"
    ],
    exerciseTitle: "ตรวจสุขภาพเครื่องมือ",
    exerciseTasks: [
      "เปิด VS Code และ Terminal",
      "บันทึกผล node -v และ npm -v",
      "สร้างโฟลเดอร์ practice-web-app แล้วเปิดด้วย VS Code"
    ],
    starterCode: `node -v\nnpm -v\nmkdir practice-web-app\ncd practice-web-app`,
    quiz: [
      {
        question: "ควรติดตั้ง Node.js รุ่นใดสำหรับเริ่มต้น",
        options: ["LTS", "Nightly", "รุ่นทดลองเท่านั้น", "ไม่ต้องติดตั้ง"],
        answer: 0,
        explanation: "รุ่น LTS เน้นความเสถียรและเหมาะกับผู้เริ่มต้น"
      },
      {
        question: "คำสั่งใดใช้ตรวจเวอร์ชัน Node.js",
        options: ["npm start", "node -v", "node open", "version node"],
        answer: 1,
        explanation: "node -v จะแสดงเวอร์ชัน Node.js ที่ติดตั้งอยู่"
      },
      {
        question: "คำสั่ง cd ใช้ทำอะไร",
        options: ["ลบไฟล์", "สร้างเว็บ", "ย้ายเข้าโฟลเดอร์", "ปิด Terminal"],
        answer: 2,
        explanation: "cd ย่อมาจาก change directory ใช้เปลี่ยนโฟลเดอร์ปัจจุบัน"
      }
    ]
  }),
  makeLesson({
    number: 2,
    slug: "web-app-first-nextjs-project",
    title: "สร้างโปรเจกต์ Next.js แรก",
    subtitle:
      "ใช้ create-next-app สร้างโปรเจกต์ TypeScript รัน development server และเปิดหน้าเว็บแรกบน localhost",
    minutes: 55,
    objectives: [
      "สร้าง Next.js project ด้วยคำสั่งมาตรฐาน",
      "เลือกรูปแบบ TypeScript และ App Router ได้",
      "รันเว็บและเปิด localhost ได้"
    ],
    importance:
      "create-next-app เตรียมโครงสร้างและ package ที่จำเป็นให้เราอย่างถูกต้อง จึงเริ่มทำหน้าเว็บได้เร็วโดยไม่ต้องประกอบระบบเองทุกชิ้น",
    realUse:
      "โปรเจกต์ Next.js จริงจำนวนมากเริ่มจากคำสั่งนี้ แล้วทีมจึงเพิ่มหน้า component ฐานข้อมูล และระบบ deploy ตามลำดับ",
    steps: [
      {
        stepTitle: "เปิด Terminal ในโฟลเดอร์งาน",
        stepDescription:
          "เช็กว่าตำแหน่ง Terminal อยู่ในโฟลเดอร์ที่ต้องการเก็บโปรเจกต์ ก่อนรันคำสั่งสร้างแอป",
        code: `pwd`,
        codeExplanation: "คำสั่งนี้ช่วยป้องกันการสร้างโปรเจกต์ผิดตำแหน่ง",
        checklist: ["Terminal อยู่ในโฟลเดอร์งาน", "ไม่มีโปรเจกต์ชื่อซ้ำ"]
      },
      {
        stepTitle: "รัน create-next-app",
        stepDescription:
          "สร้างโปรเจกต์ชื่อ my-first-web-app โดยใช้เครื่องมือทางการของ Next.js",
        code: `npx create-next-app@latest my-first-web-app`,
        codeExplanation:
          "npx เรียก package ชั่วคราว, create-next-app คือเครื่องมือสร้างโปรเจกต์ และคำท้ายสุดคือชื่อโฟลเดอร์",
        note: "ถ้าระบบถามอนุญาตติดตั้ง package ให้ตรวจชื่อ create-next-app ก่อนตอบยืนยัน"
      },
      {
        stepTitle: "เลือก TypeScript และ App Router",
        stepDescription:
          "ตอบ Yes สำหรับ TypeScript, ESLint, Tailwind CSS และ App Router ส่วนตัวเลือกอื่นใช้ค่าที่แนะนำได้",
        checklist: ["เลือก TypeScript", "เลือก App Router", "เลือก Tailwind CSS"]
      },
      {
        stepTitle: "เข้าโฟลเดอร์และรันเว็บ",
        stepDescription:
          "หลังสร้างเสร็จ ให้ย้ายเข้าโฟลเดอร์โปรเจกต์แล้วเปิด development server",
        code: `cd my-first-web-app\nnpm run dev`,
        codeExplanation:
          "cd เข้าโปรเจกต์ ส่วน npm run dev เรียก script dev ใน package.json เพื่อเปิดเว็บสำหรับพัฒนา",
        checklist: ["Terminal แสดง Ready", "ไม่มี error สีแดง"]
      },
      {
        stepTitle: "เปิด localhost",
        stepDescription:
          "เปิดเบราว์เซอร์ไปที่ http://localhost:3000 หากเห็นหน้าเริ่มต้น Next.js แปลว่าโปรเจกต์ทำงานแล้ว",
        code: `http://localhost:3000`,
        codeExplanation:
          "localhost หมายถึงเครื่องของเราเอง และ 3000 คือ port ที่ Next.js ใช้โดยปกติ",
        note: "หยุด server ได้ด้วย Ctrl+C ใน Terminal"
      }
    ],
    commonErrors: [
      "รัน npm run dev ก่อน cd เข้าโฟลเดอร์โปรเจกต์",
      "มีโปรแกรมอื่นใช้ port 3000 แล้วและไม่สังเกต port ใหม่",
      "ปิด Terminal แล้วคาดว่า localhost จะยังเปิดอยู่"
    ],
    summary: [
      "create-next-app สร้างโครงโปรเจกต์ให้",
      "TypeScript ช่วยตรวจชนิดข้อมูล",
      "npm run dev เปิดเว็บบน localhost"
    ],
    exerciseTitle: "สร้างโปรเจกต์ทดลองของตัวเอง",
    exerciseTasks: [
      "สร้างโปรเจกต์ชื่อ student-course-app",
      "เลือก TypeScript, Tailwind และ App Router",
      "รันเว็บและบันทึก URL ที่เปิดได้"
    ],
    starterCode: `npx create-next-app@latest student-course-app\ncd student-course-app\nnpm run dev`,
    quiz: [
      {
        question: "เครื่องมือใดใช้สร้างโครง Next.js",
        options: ["create-next-app", "create-html", "npm delete", "git push"],
        answer: 0,
        explanation: "create-next-app เป็นเครื่องมือทางการสำหรับเริ่มโปรเจกต์ Next.js"
      },
      {
        question: "คำสั่งใดเปิด development server",
        options: ["npm run dev", "npm remove", "node -v", "cd .."],
        answer: 0,
        explanation: "npm run dev เรียก script สำหรับพัฒนาเว็บ"
      },
      {
        question: "localhost หมายถึงอะไร",
        options: ["เว็บของคนอื่น", "เครื่องของเรา", "ฐานข้อมูลออนไลน์", "GitHub"],
        answer: 1,
        explanation: "localhost คือที่อยู่สำหรับเข้าถึง server ที่รันอยู่บนเครื่องเรา"
      }
    ]
  }),
  makeLesson({
    number: 3,
    slug: "web-app-project-structure",
    title: "ทำความเข้าใจโครงสร้างไฟล์",
    subtitle:
      "อ่านแผนที่โปรเจกต์ Next.js ให้เป็น รู้หน้าที่ของ app, page.tsx, layout.tsx, components, public และ package.json",
    minutes: 45,
    objectives: [
      "อธิบายหน้าที่ของโฟลเดอร์หลักได้",
      "หาไฟล์หน้าแรกและ layout ได้",
      "แยก component และ asset ไว้ถูกตำแหน่ง"
    ],
    importance:
      "โครงสร้างที่ชัดช่วยให้หาไฟล์ง่าย ลดการแก้ผิดจุด และทำงานร่วมกับคนอื่นได้ดีขึ้น",
    realUse:
      "เว็บจริงมีหลายหน้าและหลาย component นักพัฒนาจึงแยก routing, UI, รูปภาพ และ config ออกจากกัน",
    steps: [
      {
        stepTitle: "สำรวจ app folder",
        stepDescription:
          "โฟลเดอร์ app เป็นศูนย์กลางของ App Router โฟลเดอร์ข้างในสามารถกลายเป็น URL ของเว็บได้",
        code: `app/\n  layout.tsx\n  page.tsx\n  globals.css`,
        codeExplanation: "page.tsx เป็นหน้า ส่วน layout.tsx เป็นกรอบที่ห่อหน้าต่าง ๆ"
      },
      {
        stepTitle: "อ่าน page.tsx",
        stepDescription:
          "ไฟล์ page.tsx export React component ที่ Next.js นำไปแสดงเมื่อเปิด URL ของโฟลเดอร์นั้น",
        code: `export default function HomePage() {\n  return <main>หน้าแรกของฉัน</main>;\n}`,
        codeExplanation:
          "ฟังก์ชัน HomePage คืน JSX และ export default เพื่อให้ Next.js รู้ว่าเป็นหน้าหลัก"
      },
      {
        stepTitle: "เข้าใจ layout.tsx",
        stepDescription:
          "layout ใช้ครอบหน้าลูกทั้งหมด เหมาะกับ Navbar, Footer, metadata และ style ที่ใช้ร่วมกัน",
        code: `export default function RootLayout({ children }) {\n  return <html lang=\"th\"><body>{children}</body></html>;\n}`,
        codeExplanation: "children คือตำแหน่งที่เนื้อหาของแต่ละ page ถูกนำมาแสดง"
      },
      {
        stepTitle: "สร้าง components folder",
        stepDescription:
          "UI ที่ใช้ซ้ำ เช่น Navbar หรือ Button ควรแยกออกจาก page เพื่อให้ไฟล์สั้นและดูแลง่าย",
        code: `components/\n  Navbar.tsx\n  Button.tsx\n  CourseCard.tsx`,
        codeExplanation: "ชื่อไฟล์ component นิยมขึ้นต้นด้วยตัวอักษรใหญ่"
      },
      {
        stepTitle: "รู้จัก public, styles และ package.json",
        stepDescription:
          "public เก็บไฟล์ที่เปิดผ่าน URL ได้, styles เก็บ CSS เพิ่มเติม และ package.json บอก dependency กับคำสั่งของโปรเจกต์",
        code: `public/logo.png\nstyles/lesson.css\npackage.json`,
        codeExplanation: "ไฟล์ public/logo.png จะเปิดในเว็บด้วย path /logo.png",
        checklist: ["หา script dev ใน package.json", "หา globals.css", "หา public folder"]
      }
    ],
    commonErrors: [
      "วาง page.tsx ผิดโฟลเดอร์แล้ว URL ไม่ตรงที่คิด",
      "ใส่รูปใน public แต่เขียน path มีคำว่า public ซ้ำ",
      "คัดลอก Navbar ไว้ทุกหน้าแทนใช้ layout หรือ component"
    ],
    summary: [
      "app ดูแล route และ layout",
      "components เก็บ UI ที่ใช้ซ้ำ",
      "public เก็บ asset และ package.json เก็บคำสั่งกับ dependency"
    ],
    exerciseTitle: "วาดแผนที่โปรเจกต์",
    exerciseTasks: [
      "เขียนรายการโฟลเดอร์หลักของโปรเจกต์",
      "เพิ่ม components/Navbar.tsx เปล่า ๆ",
      "อธิบายว่า /logo.png มาจากไฟล์ใด"
    ],
    starterCode: `app/\ncomponents/\npublic/\npackage.json`,
    quiz: [
      {
        question: "ไฟล์ใดสร้างหน้าใน App Router",
        options: ["page.tsx", "image.png", "package-lock.json", ".gitignore"],
        answer: 0,
        explanation: "page.tsx คือไฟล์หน้าของแต่ละ route"
      },
      {
        question: "UI ที่ใช้ซ้ำควรเก็บที่ใด",
        options: ["components", "node_modules", ".next", "logs"],
        answer: 0,
        explanation: "components ช่วยรวม UI ที่นำกลับมาใช้ได้"
      },
      {
        question: "public/logo.png เรียกผ่าน URL ใด",
        options: ["/public/logo.png", "/logo.png", "/app/logo.png", "/src/logo"],
        answer: 1,
        explanation: "ไฟล์ใน public เริ่ม path จาก / ได้ทันที"
      }
    ]
  }),
  makeLesson({
    number: 4,
    slug: "web-app-first-landing-page",
    title: "สร้างหน้า Landing Page แรก",
    subtitle:
      "ประกอบ Header, Hero, Feature, CTA และ Footer ให้เป็นหน้าเว็บที่มีลำดับข้อมูลชัดเจน",
    minutes: 65,
    objectives: [
      "วางลำดับ section ของหน้าเว็บได้",
      "เขียน JSX สำหรับโครงหน้าได้",
      "สร้าง CTA ที่สื่อสารชัดเจน"
    ],
    importance:
      "Landing Page เป็นแบบฝึกที่ดีเพราะมีส่วนประกอบหลักของเว็บไซต์ครบ และช่วยฝึกคิดจากเป้าหมายผู้ใช้ก่อนลงมือแต่งสี",
    realUse:
      "ธุรกิจใช้ Landing Page แนะนำสินค้า เก็บรายชื่อผู้สนใจ หรือพาผู้ใช้ไปสมัครและชำระเงิน",
    steps: [
      {
        stepTitle: "สร้าง Header",
        stepDescription:
          "Header ควรบอกชื่อเว็บและมีเมนูที่จำเป็นเท่านั้น เพื่อให้ผู้ใช้รู้ทันทีว่ากำลังอยู่ที่ไหน",
        code: `<header>\n  <strong>Web App Begins</strong>\n  <nav>หลักสูตร | ติดต่อ</nav>\n</header>`,
        codeExplanation: "header ครอบส่วนหัว ส่วน nav ครอบลิงก์นำทาง"
      },
      {
        stepTitle: "สร้าง Hero Section",
        stepDescription:
          "Hero อธิบายประโยชน์หลักของเว็บด้วยหัวข้อหนึ่งประโยค คำอธิบายสั้น และปุ่มหลัก",
        code: `<section>\n  <h1>สร้างเว็บแอปแรกของคุณ</h1>\n  <p>เรียนทีละขั้นพร้อมลงมือทำ</p>\n  <button>เริ่มเรียน</button>\n</section>`,
        codeExplanation: "h1 คือหัวข้อหลักและควรมีใจความเดียว ส่วน button คือการกระทำสำคัญ"
      },
      {
        stepTitle: "เพิ่ม Feature Section",
        stepDescription:
          "Feature อธิบายจุดเด่น 3 ข้อในรูปแบบการ์ด ทำให้ผู้ใช้อ่านสแกนได้เร็ว",
        code: `const features = ["เรียนทีละขั้น", "มีโค้ดตัวอย่าง", "ทำโปรเจกต์จริง"];`,
        codeExplanation: "เก็บข้อมูลใน array เพื่อเตรียมนำไปสร้างการ์ดหลายใบ"
      },
      {
        stepTitle: "เพิ่ม CTA Section",
        stepDescription:
          "CTA ช่วงท้ายย้ำสิ่งที่อยากให้ผู้ใช้ทำ เช่น สมัครสมาชิก ทดลองใช้ หรือติดต่อ",
        code: `<section>\n  <h2>พร้อมเริ่มสร้างเว็บหรือยัง</h2>\n  <a href=\"/register\">สมัครสมาชิก</a>\n</section>`,
        codeExplanation: "a ใช้นำทางไปหน้าสมัคร ส่วนข้อความบอกผลลัพธ์ที่ผู้ใช้จะได้รับ"
      },
      {
        stepTitle: "ปิดท้ายด้วย Footer",
        stepDescription:
          "Footer รวมข้อมูลเสริม เช่น ติดต่อ นโยบาย และลิขสิทธิ์ โดยไม่แย่งความสนใจจากเนื้อหาหลัก",
        code: `<footer>© 2026 My Web App</footer>`,
        codeExplanation: "footer เป็น landmark ช่วยให้ทั้งผู้ใช้และ screen reader เข้าใจโครงหน้า",
        checklist: ["มี Header", "มี Hero", "มี Feature", "มี CTA", "มี Footer"]
      }
    ],
    commonErrors: [
      "เริ่มแต่งสีละเอียดก่อนวางลำดับ section",
      "ใช้หัวข้อ h1 หลายข้อความที่แข่งขันกัน",
      "ใส่ปุ่มจำนวนมากจนผู้ใช้ไม่รู้ว่าควรกดอะไร"
    ],
    summary: [
      "หน้าเว็บที่ดีเริ่มจากลำดับข้อมูล",
      "Hero บอกคุณค่าหลัก",
      "Feature สร้างความเข้าใจและ CTA พาไปขั้นต่อไป"
    ],
    exerciseTitle: "ทำโครงหน้าเว็บคอร์ส",
    exerciseTasks: [
      "เขียน Hero สำหรับคอร์สที่อยากสอน",
      "เพิ่ม Feature 3 ข้อ",
      "เพิ่ม CTA หนึ่งปุ่มและ Footer"
    ],
    starterCode: `export default function HomePage() {\n  return (\n    <main>\n      {/* Header, Hero, Features, CTA, Footer */}\n    </main>\n  );\n}`,
    quiz: [
      {
        question: "ส่วนใดควรสื่อประโยชน์หลักทันที",
        options: ["Hero", "Footer", "ไฟล์ config", "console"],
        answer: 0,
        explanation: "Hero เป็นส่วนแรกที่ผู้ใช้เห็นและควรบอกคุณค่าหลัก"
      },
      {
        question: "CTA มีหน้าที่อะไร",
        options: ["ลบข้อมูล", "ชวนผู้ใช้ทำขั้นต่อไป", "ติดตั้ง Node", "เก็บ CSS"],
        answer: 1,
        explanation: "CTA ย่อมาจาก Call to Action ใช้พาผู้ใช้ไปทำสิ่งสำคัญ"
      },
      {
        question: "Feature หลายรายการควรเก็บแบบใด",
        options: ["array", "password", "cookie ลับ", "port"],
        answer: 0,
        explanation: "array เหมาะกับรายการข้อมูลรูปแบบเดียวกันหลายชิ้น"
      }
    ]
  }),
  makeLesson({
    number: 5,
    slug: "web-app-visual-design",
    title: "แต่งหน้าเว็บให้ดูดี",
    subtitle:
      "สร้างระบบสี ฟอนต์ spacing การ์ด ปุ่ม และ responsive เบื้องต้นให้หน้าเว็บอ่านง่ายบนทุกหน้าจอ",
    minutes: 70,
    objectives: [
      "เลือกสีและลำดับตัวอักษรได้",
      "ใช้ spacing อย่างสม่ำเสมอ",
      "ทำ layout ให้ปรับตามมือถือได้"
    ],
    importance:
      "ดีไซน์ที่ดีไม่ได้มีไว้แค่สวย แต่ช่วยให้ผู้ใช้รู้ว่าควรอ่านและกดตรงไหน ลดความสับสน และทำให้เว็บน่าเชื่อถือ",
    realUse:
      "เว็บขายสินค้า Dashboard และฟอร์มสมัคร ล้วนต้องใช้สี ตัวอักษร ระยะห่าง และ responsive เพื่อให้ใช้งานได้จริง",
    steps: [
      {
        stepTitle: "กำหนดสีหลัก",
        stepDescription:
          "เลือกสีหลักหนึ่งสี สีเน้นหนึ่งสี และสีเทาสำหรับข้อความ อย่าใช้ทุกสีในระดับความสำคัญเดียวกัน",
        code: `const colors = { primary: "#2563eb", accent: "#06b6d4", text: "#0f172a" };`,
        codeExplanation: "object นี้ช่วยบันทึกบทบาทของสีให้จำง่ายและใช้ซ้ำได้"
      },
      {
        stepTitle: "จัดลำดับ Font",
        stepDescription:
          "หัวข้อควรใหญ่และหนากว่าเนื้อหา ส่วนข้อความรองใช้สีอ่อนลงแต่ยังต้องอ่านง่าย",
        code: `<h1 className=\"text-4xl font-bold\">หัวข้อหลัก</h1>\n<p className=\"text-base text-slate-600\">รายละเอียด</p>`,
        codeExplanation: "text-4xl ขยายหัวข้อและ font-bold เพิ่มน้ำหนัก ส่วนข้อความใช้ขนาดปกติ"
      },
      {
        stepTitle: "สร้างจังหวะด้วย Spacing",
        stepDescription:
          "ใช้ชุดระยะห่างที่ซ้ำกัน เช่น 8, 16, 24 และ 32 พิกเซล เพื่อให้หน้าดูเป็นระบบ",
        code: `<section className=\"space-y-6 px-4 py-12\">...</section>`,
        codeExplanation: "space-y-6 เว้นระหว่างลูกแนวตั้ง ส่วน px และ py คือ padding รอบ section"
      },
      {
        stepTitle: "ออกแบบ Card และ Button",
        stepDescription:
          "Card ใช้จัดกลุ่มข้อมูล ส่วนปุ่มหลักควรเด่นกว่าปุ่มรองและมีพื้นที่กดเพียงพอ",
        code: `<article className=\"rounded-lg border bg-white p-5 shadow-sm\">\n  <button className=\"rounded-lg bg-blue-600 px-5 py-3 text-white\">เริ่มเรียน</button>\n</article>`,
        codeExplanation: "border และ shadow แยกการ์ดจากพื้นหลัง ส่วน padding ทำให้เนื้อหาไม่ชิดขอบ"
      },
      {
        stepTitle: "เพิ่ม Responsive",
        stepDescription:
          "เริ่มออกแบบจากมือถือหนึ่งคอลัมน์ แล้วเพิ่มคอลัมน์เมื่อหน้าจอกว้างขึ้น",
        code: `<div className=\"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3\">...</div>`,
        codeExplanation: "ค่าเริ่มต้นหนึ่งคอลัมน์, md สองคอลัมน์ และ lg สามคอลัมน์",
        checklist: ["ไม่มีข้อความล้น", "ปุ่มกดง่าย", "การ์ดเรียงหนึ่งคอลัมน์บนมือถือ"]
      }
    ],
    commonErrors: [
      "ใช้สีอ่อนบนพื้นขาวจนอ่านข้อความยาก",
      "กำหนด margin แบบสุ่มทุกจุด",
      "ทดสอบเฉพาะหน้าจอคอมพิวเตอร์"
    ],
    summary: [
      "ใช้สีตามบทบาท ไม่ใช่ตามความชอบอย่างเดียว",
      "font และ spacing สร้างลำดับสายตา",
      "responsive ควรเริ่มจากมือถือ"
    ],
    exerciseTitle: "สร้าง mini design system",
    exerciseTasks: [
      "เลือกสีหลัก สีเน้น และสีข้อความ",
      "ทำตัวอย่างหัวข้อ เนื้อหา Card และ Button",
      "ทดสอบ layout ที่ความกว้าง 375px"
    ],
    starterCode: `<div className=\"grid gap-4 md:grid-cols-2\">\n  <article className=\"rounded-lg border p-5\">Card 1</article>\n  <article className=\"rounded-lg border p-5\">Card 2</article>\n</div>`,
    quiz: [
      {
        question: "แนวทาง responsive ที่เหมาะกับมือใหม่คืออะไร",
        options: ["เริ่มจากมือถือ", "ล็อกความกว้าง 1200px", "ซ่อนเนื้อหา", "ใช้รูปใหญ่เสมอ"],
        answer: 0,
        explanation: "Mobile-first ช่วยให้เนื้อหาหลักใช้งานได้บนจอเล็กก่อน"
      },
      {
        question: "Padding คืออะไร",
        options: ["ระยะด้านในขอบ", "สีพื้นหลัง", "ชื่อไฟล์", "ฐานข้อมูล"],
        answer: 0,
        explanation: "Padding คือพื้นที่ระหว่างเนื้อหากับขอบของ element"
      },
      {
        question: "ปุ่มหลักควรเป็นอย่างไร",
        options: ["มองเห็นชัดและกดง่าย", "เล็กที่สุด", "เหมือนข้อความธรรมดา", "ซ่อนบนมือถือ"],
        answer: 0,
        explanation: "ปุ่มหลักต้องสื่อการกระทำสำคัญและมีพื้นที่กดเพียงพอ"
      }
    ]
  }),
  makeLesson({
    number: 6,
    slug: "web-app-components",
    title: "แยก Component",
    subtitle:
      "แยก Navbar, Button, CourseCard และ Footer ออกจากหน้า เพื่อให้โค้ดอ่านง่าย ใช้ซ้ำได้ และแก้ครั้งเดียว",
    minutes: 65,
    objectives: [
      "อธิบาย component แบบง่ายได้",
      "สร้าง component ที่รับ props ได้",
      "จัดไฟล์ UI ให้ดูแลง่าย"
    ],
    importance:
      "เมื่อหน้าเว็บใหญ่ขึ้น การเขียนทุกอย่างใน page.tsx ทำให้หาและแก้โค้ดยาก Component ช่วยแบ่งงานเป็นชิ้นเล็กที่ทดสอบและใช้ซ้ำได้",
    realUse:
      "Navbar, ปุ่ม, การ์ดสินค้า และ Footer มักปรากฏหลายหน้า การใช้ component ทำให้ดีไซน์ทั้งเว็บสม่ำเสมอ",
    steps: [
      {
        stepTitle: "แยก Navbar component",
        stepDescription:
          "ย้ายส่วนหัวไปไฟล์ components/Navbar.tsx แล้ว import กลับมาใช้ในหน้า",
        code: `export function Navbar() {\n  return <nav>Web App Begins</nav>;\n}`,
        codeExplanation: "ชื่อ component ขึ้นต้นตัวใหญ่และคืน JSX หนึ่งก้อน"
      },
      {
        stepTitle: "สร้าง Button component",
        stepDescription:
          "ทำปุ่มกลางที่รับข้อความผ่าน props เพื่อใช้รูปแบบเดียวกันทุกหน้า",
        code: `export function Button({ label }: { label: string }) {\n  return <button className=\"rounded-lg bg-blue-600 px-5 py-3 text-white\">{label}</button>;\n}`,
        codeExplanation: "label เป็น prop ชนิด string และถูกแสดงระหว่างปีกกาใน JSX"
      },
      {
        stepTitle: "สร้าง CourseCard component",
        stepDescription:
          "การ์ดรับ title และ lessonCount จึงใช้กับหลายคอร์สได้โดยไม่คัดลอกโครงเดิม",
        code: `type Props = { title: string; lessonCount: number };\nexport function CourseCard({ title, lessonCount }: Props) {\n  return <article><h3>{title}</h3><p>{lessonCount} บท</p></article>;\n}`,
        codeExplanation: "Props กำหนดรูปทรงข้อมูล ทำให้ TypeScript เตือนเมื่อส่งข้อมูลไม่ครบ"
      },
      {
        stepTitle: "แยก Footer component",
        stepDescription:
          "Footer เป็นส่วนที่ใช้ซ้ำทั้งเว็บ จึงเหมาะกับการวางใน layout.tsx",
        code: `export function Footer() {\n  return <footer>© Web App Begins</footer>;\n}`,
        codeExplanation: "เมื่อเรียก Footer ใน layout ทุกหน้าลูกจะได้รับ Footer โดยอัตโนมัติ"
      },
      {
        stepTitle: "ประกอบ component ใน page",
        stepDescription:
          "นำ component แต่ละชิ้นมาประกอบเหมือนตัวต่อ หน้าเว็บจึงอ่านเป็นส่วน ๆ ได้ทันที",
        code: `<Navbar />\n<CourseCard title=\"Next.js มือใหม่\" lessonCount={10} />\n<Button label=\"เริ่มเรียน\" />\n<Footer />`,
        codeExplanation: "แต่ละ tag คือ component และค่าหลังชื่อ attribute คือ props",
        checklist: ["ไม่มี UI ก้อนใหญ่ซ้ำกัน", "ชื่อ component สื่อหน้าที่", "props มี type"]
      }
    ],
    commonErrors: [
      "สร้าง component ย่อยเกินไปจนตามโค้ดยาก",
      "ลืม export หรือ import component",
      "ส่ง number เป็น string แล้ว TypeScript แจ้งเตือน"
    ],
    summary: [
      "Component แบ่ง UI เป็นชิ้น",
      "Props ส่งข้อมูลเข้าชิ้นส่วน",
      "แยกเฉพาะส่วนที่ใช้ซ้ำหรือมีหน้าที่ชัดเจน"
    ],
    exerciseTitle: "แยกหน้าเดิมเป็น 4 component",
    exerciseTasks: [
      "แยก Navbar และ Footer",
      "สร้าง Button ที่รับ label",
      "สร้าง CourseCard ที่รับ title และ lessonCount"
    ],
    starterCode: `// components/Button.tsx\ntype Props = { label: string };\n\nexport function Button({ label }: Props) {\n  return <button>{label}</button>;\n}`,
    quiz: [
      {
        question: "Component ช่วยเรื่องใด",
        options: ["แบ่งและใช้ UI ซ้ำ", "เก็บรหัสผ่าน", "แทนฐานข้อมูล", "เพิ่ม port"],
        answer: 0,
        explanation: "Component ช่วยแบ่ง UI และนำกลับมาใช้ซ้ำ"
      },
      {
        question: "Props ใช้ทำอะไร",
        options: ["ส่งข้อมูลเข้า component", "ลบไฟล์", "เปิด server", "สร้าง database"],
        answer: 0,
        explanation: "Props คือข้อมูลที่ parent ส่งให้ component ลูก"
      },
      {
        question: "ชื่อ React component ควรขึ้นต้นแบบใด",
        options: ["ตัวอักษรใหญ่", "ตัวเลข", "ขีดกลาง", "เว้นวรรค"],
        answer: 0,
        explanation: "React ใช้ตัวอักษรใหญ่แยก component ออกจาก HTML tag"
      }
    ]
  }),
  makeLesson({
    number: 7,
    slug: "web-app-dashboard",
    title: "สร้างหน้า Dashboard",
    subtitle:
      "ออกแบบ dashboard layout พร้อมข้อมูลผู้ใช้ รายการคอร์ส progress และ empty state ที่ใช้งานได้ทั้งมือถือและคอมพิวเตอร์",
    minutes: 75,
    objectives: [
      "วาง layout Dashboard ได้",
      "แสดงข้อมูลผ่านการ์ดได้",
      "ออกแบบ progress และ empty state ได้"
    ],
    importance:
      "Dashboard เป็นหน้าที่ผู้ใช้กลับมาใช้งานบ่อย ต้องสรุปสถานะและพาไปทำงานต่อได้เร็วโดยไม่ทำให้ข้อมูลแน่นเกินไป",
    realUse:
      "เว็บคอร์ส ระบบสมาชิก และเครื่องมือธุรกิจใช้ Dashboard เพื่อแสดงสิทธิ์ ความคืบหน้า รายการล่าสุด และคำสั่งสำคัญ",
    steps: [
      {
        stepTitle: "วาง Dashboard layout",
        stepDescription:
          "เริ่มจากหัวต้อนรับ ส่วนสรุป คอร์สของฉัน และพื้นที่ข้อมูลเพิ่มเติม เรียงตามสิ่งที่ผู้ใช้ต้องรู้ก่อน",
        code: `<main className=\"space-y-8\">\n  <Welcome />\n  <SummaryCards />\n  <MyCourses />\n</main>`,
        codeExplanation: "space-y-8 สร้างระยะคงที่ระหว่าง section หลัก"
      },
      {
        stepTitle: "สร้าง Card ข้อมูลผู้ใช้",
        stepDescription:
          "แสดงชื่อ อีเมล และสถานะสมาชิกเท่าที่จำเป็น ห้ามแสดง password หรือข้อมูลลับ",
        code: `<article><h2>สวัสดี Dev</h2><p>dev@example.com</p><span>Free</span></article>`,
        codeExplanation: "ข้อมูลที่เห็นเป็นข้อมูลสรุป ไม่รวมค่า secret"
      },
      {
        stepTitle: "สร้าง Card รายการคอร์ส",
        stepDescription:
          "การ์ดคอร์สควรมีชื่อ จำนวนบท สถานะ และปุ่มที่สอดคล้องกับสิทธิ์ผู้ใช้",
        code: `<CourseCard title=\"Web App Begins\" lessonCount={10} status=\"locked\" />`,
        codeExplanation: "status ทำให้ component เลือกแสดงปุ่มเข้าเรียนหรือปุ่มซื้อได้"
      },
      {
        stepTitle: "เพิ่ม Progress",
        stepDescription:
          "คำนวณเปอร์เซ็นต์จากจำนวนบทที่ผ่านหารจำนวนบททั้งหมด และจำกัดค่าระหว่าง 0 ถึง 100",
        code: `const progress = Math.round((completed / total) * 100);`,
        codeExplanation: "หารก่อนคูณ 100 แล้ว Math.round ปัดเป็นจำนวนเต็ม"
      },
      {
        stepTitle: "ออกแบบ Empty State",
        stepDescription:
          "ถ้ายังไม่มีคอร์ส อย่าปล่อยพื้นที่ว่าง ให้บอกสถานะและเสนอขั้นตอนที่ทำต่อได้",
        code: `{courses.length === 0 ? <p>ยังไม่มีคอร์ส ลองดูหลักสูตรทั้งหมด</p> : <CourseList />}`,
        codeExplanation: "conditional rendering เลือก UI ตามจำนวนข้อมูล",
        checklist: ["มีข้อความเมื่อไม่มีข้อมูล", "มีปุ่มไปขั้นต่อไป", "ไม่แสดงข้อมูลลับ"]
      }
    ],
    commonErrors: [
      "แสดงข้อมูลทุกอย่างในหน้าเดียวจนอ่านยาก",
      "คำนวณ progress ตอน total เป็น 0",
      "ปล่อยหน้าว่างเมื่อ array ไม่มีข้อมูล"
    ],
    summary: [
      "Dashboard ต้องตอบว่าผู้ใช้เป็นใครและทำอะไรต่อ",
      "Card ช่วยแบ่งข้อมูลเป็นกลุ่ม",
      "Empty state เป็นส่วนหนึ่งของ UX ไม่ใช่กรณีพิเศษที่มองข้ามได้"
    ],
    exerciseTitle: "สร้าง Learner Dashboard",
    exerciseTasks: [
      "ทำ Welcome card",
      "ทำ Course card อย่างน้อย 2 ใบ",
      "เพิ่ม Progress bar และ Empty state"
    ],
    starterCode: `const courses = [];\n\nexport default function DashboardPage() {\n  return <main>{/* summary, courses, empty state */}</main>;\n}`,
    quiz: [
      {
        question: "Dashboard ควรช่วยผู้ใช้เรื่องใดก่อน",
        options: ["เห็นสถานะและงานถัดไป", "อ่าน source code ทั้งหมด", "เห็น password", "ติดตั้ง Node"],
        answer: 0,
        explanation: "Dashboard ที่ดีสรุปสถานะและพาผู้ใช้ทำสิ่งต่อไป"
      },
      {
        question: "ถ้า total เป็น 0 ควรทำอย่างไร",
        options: ["จัดการก่อนหาร", "หารทันที", "ลบหน้า", "ตั้งเป็น password"],
        answer: 0,
        explanation: "ต้องกันการหารด้วยศูนย์และกำหนด progress เป็น 0"
      },
      {
        question: "Empty state คืออะไร",
        options: ["UI เมื่อยังไม่มีข้อมูล", "ไฟล์ CSS", "ฐานข้อมูลเต็ม", "server error"],
        answer: 0,
        explanation: "Empty state อธิบายสถานะเมื่อไม่มีข้อมูลและแนะนำสิ่งที่ทำต่อได้"
      }
    ]
  }),
  makeLesson({
    number: 8,
    slug: "web-app-login-ui",
    title: "สร้างหน้า Login เบื้องต้น",
    subtitle:
      "สร้างฟอร์มอีเมลและรหัสผ่าน พร้อม validation เบื้องต้นและ mock login เพื่อเข้าใจ flow ก่อนเชื่อมระบบ Auth จริง",
    minutes: 70,
    objectives: [
      "สร้าง login form ที่เข้าถึงได้",
      "validate ข้อมูลพื้นฐานได้",
      "แยก mock login ออกจาก auth จริงได้"
    ],
    importance:
      "ฟอร์ม Login เป็นประตูเข้าสู่ข้อมูลส่วนตัว จึงต้องสื่อสาร error ชัดเจนและตรวจสิทธิ์จริงที่ server ไม่ใช่แค่ซ่อนปุ่มฝั่ง browser",
    realUse:
      "เว็บคอร์ส Dashboard และระบบสมาชิกใช้ Login เพื่อระบุผู้ใช้และโหลดข้อมูลที่เป็นของบัญชีนั้น",
    steps: [
      {
        stepTitle: "วางโครง Login form",
        stepDescription:
          "ใช้ form ครอบ input และปุ่ม submit เพื่อให้ keyboard และ browser ทำงานตามมาตรฐาน",
        code: `<form>\n  <label htmlFor=\"email\">อีเมล</label>\n  <input id=\"email\" type=\"email\" />\n  <button type=\"submit\">เข้าสู่ระบบ</button>\n</form>`,
        codeExplanation: "htmlFor เชื่อม label กับ input และ type submit ส่งฟอร์ม"
      },
      {
        stepTitle: "เพิ่มช่องรหัสผ่าน",
        stepDescription:
          "ใช้ type password เพื่อซ่อนตัวอักษรบนหน้าจอ และมี label ชัดเจน",
        code: `<label htmlFor=\"password\">รหัสผ่าน</label>\n<input id=\"password\" type=\"password\" minLength={6} required />`,
        codeExplanation: "minLength ช่วยตรวจความยาวเบื้องต้นและ required ป้องกันค่าว่าง"
      },
      {
        stepTitle: "อ่านค่าจากฟอร์ม",
        stepDescription:
          "เริ่มด้วย state หรือ FormData เพื่อเข้าใจว่าข้อมูล email และ password เดินทางจาก input อย่างไร",
        code: `function handleSubmit(event) {\n  event.preventDefault();\n  const data = new FormData(event.currentTarget);\n  console.log(data.get("email"));\n}`,
        codeExplanation: "preventDefault หยุด reload และ FormData อ่านค่าตาม name ของ input"
      },
      {
        stepTitle: "ทำ Validation ที่ผู้ใช้เข้าใจ",
        stepDescription:
          "ตรวจอีเมลและความยาวรหัสผ่าน แล้วแสดงข้อความใกล้ช่องที่ผิดแทนการปล่อยให้หน้าเงียบ",
        code: `if (!email.includes("@")) {\n  setError("กรุณากรอกอีเมลให้ถูกต้อง");\n}`,
        codeExplanation: "เงื่อนไขนี้เป็นการตรวจ UX เบื้องต้น ไม่แทนการตรวจความถูกต้องฝั่ง server"
      },
      {
        stepTitle: "ทดลอง Mock Login อย่างปลอดภัย",
        stepDescription:
          "ในบทนี้ mock เพียงผลสำเร็จ/ไม่สำเร็จเพื่อฝึก UI ห้ามเก็บ password จริงใน localStorage หรือเขียนรหัสผ่านไว้ใน frontend",
        code: `const loginSucceeded = email === "student@example.com";`,
        codeExplanation: "ตัวแปรนี้มีไว้สาธิต flow เท่านั้น ระบบจริงต้องใช้ server, hash และ session",
        note: "ห้ามนำ mock login ไปใช้กับเว็บจริง",
        checklist: ["มี label ครบ", "มี error state", "ไม่เก็บ password ใน browser"]
      }
    ],
    commonErrors: [
      "ทำ validation เฉพาะ client แล้วถือว่าปลอดภัย",
      "เก็บ password ใน localStorage",
      "ใช้ placeholder แทน label จนผู้ใช้ไม่รู้ว่าช่องคืออะไรหลังพิมพ์"
    ],
    summary: [
      "Form มาตรฐานช่วยเรื่อง keyboard และ accessibility",
      "Client validation ช่วย UX แต่ server ต้องตรวจซ้ำ",
      "ระบบจริงต้อง hash password และใช้ session"
    ],
    exerciseTitle: "ทำ Login form พร้อมสามสถานะ",
    exerciseTasks: [
      "สร้างช่อง email และ password",
      "แสดง error เมื่อข้อมูลไม่ครบ",
      "แสดง loading และ success mock โดยไม่เก็บ password"
    ],
    starterCode: `export default function LoginPage() {\n  return <form>{/* email, password, error, submit */}</form>;\n}`,
    quiz: [
      {
        question: "ควรตรวจสิทธิ์จริงที่ใด",
        options: ["Server", "สีปุ่ม", "localStorage", "CSS"],
        answer: 0,
        explanation: "Server ต้องตรวจ session และสิทธิ์ก่อนส่งข้อมูลสำคัญ"
      },
      {
        question: "type password ช่วยอะไร",
        options: ["ซ่อนตัวอักษรบนจอ", "hash อัตโนมัติ", "สร้าง session", "เชื่อม database"],
        answer: 0,
        explanation: "type password ซ่อนการแสดงผล แต่ไม่ได้ hash หรือรักษาความปลอดภัยฝั่ง server"
      },
      {
        question: "ควรเก็บ password ใน localStorage หรือไม่",
        options: ["ไม่ควร", "ควรเสมอ", "เฉพาะมือถือ", "เฉพาะกลางคืน"],
        answer: 0,
        explanation: "ไม่ควรเก็บ password ใน localStorage เพราะ script ในหน้าอาจเข้าถึงได้"
      }
    ]
  }),
  makeLesson({
    number: 9,
    slug: "web-app-database-prisma",
    title: "เชื่อม Database เบื้องต้น",
    subtitle:
      "เข้าใจ database, Prisma, model และ relation ผ่าน schema ตัวอย่าง โดยยังไม่รัน migration จนกว่าจะตรวจการออกแบบเสร็จ",
    minutes: 80,
    objectives: [
      "อธิบาย database และ Prisma ได้",
      "อ่าน model User และ Course ได้",
      "วาง relation แบบพื้นฐานได้โดยไม่แก้ฐานข้อมูลจริง"
    ],
    importance:
      "เว็บแอปต้องจำข้อมูลข้ามการเปิดหน้า เช่น บัญชี คอร์ส และความคืบหน้า Database ทำหน้าที่นี้ ส่วน Prisma ช่วยให้ TypeScript ติดต่อฐานข้อมูลอย่างเป็นระบบ",
    realUse:
      "ระบบ Login, รายการคอร์ส, PaymentSlip และ CourseProgress ล้วนต้องอ่านและบันทึกข้อมูลที่สัมพันธ์กับผู้ใช้",
    steps: [
      {
        stepTitle: "เข้าใจ Database แบบง่าย",
        stepDescription:
          "นึกถึง database เป็นตู้เก็บข้อมูลที่แบ่งเป็นตาราง แต่ละแถวคือหนึ่งรายการและแต่ละคอลัมน์คือคุณสมบัติ",
        code: `users\n- id\n- name\n- email`,
        codeExplanation: "ตาราง users มีคอลัมน์สำหรับระบุและอธิบายผู้ใช้แต่ละคน"
      },
      {
        stepTitle: "รู้จัก Prisma",
        stepDescription:
          "Prisma เป็นตัวกลางที่อ่าน schema แล้วสร้าง client ให้โค้ด TypeScript query ข้อมูลได้",
        code: `const users = await prisma.user.findMany();`,
        codeExplanation: "findMany อ่านผู้ใช้หลายรายการและต้องทำงานฝั่ง server"
      },
      {
        stepTitle: "ออกแบบ User model",
        stepDescription:
          "เริ่มจาก field ที่จำเป็นและไม่เก็บข้อมูลเกินความต้องการ รหัสผ่านจริงต้องเก็บเป็น hash",
        code: `model User {\n  id           String @id @default(cuid())\n  name         String\n  email        String @unique\n  passwordHash String\n}`, 
        codeExplanation: "@id ระบุ primary key, @default สร้าง id และ @unique กันอีเมลซ้ำ"
      },
      {
        stepTitle: "ออกแบบ Course model",
        stepDescription:
          "Course มีชื่อและ slug สำหรับ URL โดย slug ควรไม่ซ้ำกัน",
        code: `model Course {\n  id    String @id @default(cuid())\n  title String\n  slug  String @unique\n}`, 
        codeExplanation: "slug เช่น web-app-begins อ่านง่ายและเหมาะกับ URL"
      },
      {
        stepTitle: "วาง Relation เบื้องต้น",
        stepDescription:
          "เมื่อผู้ใช้ซื้อคอร์ส เราอาจใช้ตารางกลาง UserCourseAccess เชื่อม userId กับ courseSlug",
        code: `model UserCourseAccess {\n  id         String @id @default(cuid())\n  userId     String\n  courseSlug String\n  user       User @relation(fields: [userId], references: [id])\n  @@unique([userId, courseSlug])\n}`, 
        codeExplanation: "relation เชื่อม access ไปยัง User และ unique ป้องกันสิทธิ์ซ้ำ",
        note: "บทนี้เตรียม schema เพื่อเรียนรู้เท่านั้น ห้ามรัน migrate หรือ db push จนตรวจแบบและสำรองข้อมูลแล้ว",
        checklist: ["แยก model ตามหน้าที่", "มี unique ที่จำเป็น", "ยังไม่รัน migration"]
      }
    ],
    commonErrors: [
      "เก็บ password แบบข้อความธรรมดา",
      "เปลี่ยน schema แล้วรันคำสั่งกับ production ทันที",
      "ไม่มี unique constraint จนเกิดสิทธิ์หรืออีเมลซ้ำ"
    ],
    summary: [
      "Database เก็บข้อมูลถาวร",
      "Prisma ช่วย query ด้วย TypeScript",
      "Schema ต้องตรวจและวางแผนก่อนเปลี่ยนฐานข้อมูลจริง"
    ],
    exerciseTitle: "ออกแบบ schema บนกระดาษ",
    exerciseTasks: [
      "เขียน field ของ User และ Course",
      "วาดลูกศร User ไป UserCourseAccess",
      "ระบุ field ที่ควร unique โดยไม่รันคำสั่งฐานข้อมูล"
    ],
    starterCode: `// แบบร่างเท่านั้น ยังไม่รัน migration\nmodel Course {\n  id    String @id @default(cuid())\n  title String\n  slug  String @unique\n}`,
    quiz: [
      {
        question: "Database ใช้ทำอะไร",
        options: ["เก็บข้อมูลถาวร", "แต่งสี", "สร้าง icon", "เปิด Terminal"],
        answer: 0,
        explanation: "Database เก็บข้อมูลที่ต้องอยู่ข้าม request และการเปิดหน้า"
      },
      {
        question: "ควรเก็บรหัสผ่านแบบใด",
        options: ["passwordHash", "ข้อความธรรมดา", "ใน CSS", "ใน URL"],
        answer: 0,
        explanation: "ระบบจริงต้อง hash password ก่อนบันทึก"
      },
      {
        question: "ก่อนรัน migration กับ production ควรทำอะไร",
        options: ["ตรวจแบบและสำรองข้อมูล", "รันทันที", "ลบ database", "ปิด TypeScript"],
        answer: 0,
        explanation: "ต้องตรวจ migration และมีแผนสำรองก่อนเปลี่ยนฐานข้อมูลจริง"
      }
    ]
  }),
  makeLesson({
    number: 10,
    slug: "web-app-deploy-vercel",
    title: "Deploy ขึ้นออนไลน์ด้วย Vercel",
    subtitle:
      "ตรวจโปรเจกต์ เลือก stage เฉพาะไฟล์ที่แก้ commit และ push อย่างมีสติ ก่อน deploy และตรวจเว็บจริงบน Vercel",
    minutes: 75,
    objectives: [
      "ตรวจ build และ git status ก่อน deploy ได้",
      "stage เฉพาะไฟล์ที่ต้องการได้",
      "ตรวจ deployment และหน้าเว็บจริงได้"
    ],
    importance:
      "Deploy คือการนำเว็บจากเครื่องเราไปให้คนอื่นเปิดได้ ขั้นตอน Git ที่ชัดช่วยป้องกัน secret หรือไฟล์ที่ไม่เกี่ยวข้องหลุดขึ้น repository",
    realUse:
      "ทีมพัฒนาใช้ GitHub เป็นแหล่งโค้ดและให้ Vercel build ทุก commit ที่ push ไปยัง branch ที่เชื่อมไว้",
    steps: [
      {
        stepTitle: "ตรวจโปรเจกต์ก่อนส่ง",
        stepDescription:
          "รัน build และแก้ error ให้หมดก่อน เพื่อไม่ใช้ Vercel เป็นที่ลองผิดลองถูก",
        code: `npm run build`,
        codeExplanation: "build ตรวจ TypeScript และสร้าง production bundle",
        checklist: ["Build ผ่าน", "ไม่มี error สำคัญ", "ทดสอบหน้าหลักแล้ว"]
      },
      {
        stepTitle: "ตรวจ git status",
        stepDescription:
          "อ่านรายชื่อไฟล์ที่เปลี่ยนและยืนยันว่าไม่มี .env, secret หรือไฟล์ส่วนตัว",
        code: `git status --short`,
        codeExplanation: "คำสั่งนี้แสดงสถานะไฟล์แบบสั้น ทำให้ตรวจรายการได้ง่าย",
        note: "อย่า stage จนกว่าจะเข้าใจทุกไฟล์ที่เห็น"
      },
      {
        stepTitle: "เพิ่มเฉพาะไฟล์ที่แก้",
        stepDescription:
          "ระบุ path ทีละไฟล์แทน git add . เพื่อควบคุมสิ่งที่จะเข้า commit",
        code: `git add app/page.tsx components/CourseCard.tsx`,
        codeExplanation: "git add เตรียมเฉพาะสองไฟล์ตัวอย่างเข้าสู่ commit",
        note: "ตรวจอีกครั้งด้วย git diff --cached"
      },
      {
        stepTitle: "Commit และ Push",
        stepDescription:
          "เขียนข้อความ commit ให้บอกสิ่งที่เปลี่ยน แล้ว push ไป branch ที่ตั้งใจ",
        code: `git commit -m "Add course landing page"\ngit push origin main`,
        codeExplanation: "commit บันทึกชุดการเปลี่ยน ส่วน push ส่ง commit ไป repository",
        note: "ในงานทีมควรใช้ branch และ pull request ตามกติกาของโปรเจกต์"
      },
      {
        stepTitle: "เชื่อม GitHub กับ Vercel",
        stepDescription:
          "Import repository ใน Vercel เลือก framework Next.js และตั้ง Environment Variables ผ่านหน้า Project Settings โดยไม่ใส่ secret ลงโค้ด",
        checklist: ["เลือก repository ถูกตัว", "ตั้ง environment ครบ", "ไม่พิมพ์ secret ลง console"]
      },
      {
        stepTitle: "ตรวจเว็บออนไลน์",
        stepDescription:
          "หลังสถานะ deployment เป็น Ready ให้เปิด URL จริง ทดสอบหน้า Home, Login, Dashboard และ flow สำคัญบนมือถือ",
        code: `https://your-project.vercel.app`,
        codeExplanation: "นี่คือตัวอย่าง production URL ที่ผู้ใช้ภายนอกเปิดได้",
        checklist: ["หน้าเว็บโหลดได้", "ไม่มี console error", "responsive ใช้งานได้", "ข้อมูลลับไม่ถูกเปิดเผย"]
      }
    ],
    commonErrors: [
      "ใช้ git add . โดยไม่ดูว่ามีไฟล์ใดติดไปบ้าง",
      "commit .env หรือ secret ลง repository",
      "เห็น deploy ผ่านแล้วแต่ไม่ทดสอบ flow จริงบน production"
    ],
    summary: [
      "Build ก่อน push",
      "ตรวจและ stage เฉพาะไฟล์ที่ตั้งใจ",
      "เก็บ secret ใน Vercel Environment Variables และทดสอบเว็บจริงหลัง deploy"
    ],
    exerciseTitle: "เตรียม deployment checklist",
    exerciseTasks: [
      "รัน build และบันทึกผล",
      "อ่าน git status แล้วเขียนรายชื่อไฟล์ที่จะ stage",
      "สร้าง checklist ตรวจ Home, Login, Dashboard และ Mobile"
    ],
    starterCode: `npm run build\ngit status --short\ngit diff --check\n# จากนั้นเลือก git add เฉพาะไฟล์ที่ตรวจแล้ว`,
    quiz: [
      {
        question: "ก่อน push ควรรันอะไร",
        options: ["npm run build", "ลบ database", "เปิดเผย .env", "ปิด Git"],
        answer: 0,
        explanation: "build ช่วยจับ error ก่อนส่งโค้ดขึ้นระบบ deploy"
      },
      {
        question: "เพราะเหตุใดจึงควรหลีกเลี่ยง git add .",
        options: ["อาจ stage ไฟล์ที่ไม่ตั้งใจ", "ทำให้ CSS หายเสมอ", "ใช้กับ Git ไม่ได้", "ทำให้ Node หยุด"],
        answer: 0,
        explanation: "การระบุไฟล์ช่วยควบคุมว่าอะไรจะเข้า commit"
      },
      {
        question: "Secret ของ production ควรเก็บที่ใด",
        options: ["Vercel Environment Variables", "ใน page.tsx", "ใน URL", "ใน README สาธารณะ"],
        answer: 0,
        explanation: "Environment Variables แยก secret ออกจาก source code"
      }
    ]
  })
];
