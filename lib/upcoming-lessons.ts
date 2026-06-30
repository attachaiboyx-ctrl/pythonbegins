import type {
  Lesson,
  LessonDiagramType,
  QuizQuestion
} from "@/lib/lessons";

type LessonDraft = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  minutes: number;
  accent: string;
  objectives: string[];
  concept: string;
  why: string;
  realWorld: string;
  diagram: LessonDiagramType;
  diagramIntro: string;
  codeIntro: string;
  code: string;
  walkthrough: string[];
  mistakes: string[];
  summary: string;
  exerciseTitle: string;
  exerciseTasks: string[];
  starterCode: string;
  quiz: QuizQuestion[];
};

function buildLesson(draft: LessonDraft): Lesson {
  return {
    id: draft.id,
    slug: draft.slug,
    title: draft.title,
    subtitle: draft.subtitle,
    minutes: draft.minutes,
    free: false,
    badge: "Premium",
    accent: draft.accent,
    objectives: draft.objectives,
    sections: [
      {
        heading: "เรื่องนี้คืออะไร",
        body: draft.concept
      },
      {
        heading: "ทำไมต้องเรียน และใช้ทำอะไรในเว็บจริง",
        body: `${draft.why}\n\nในเว็บจริง: ${draft.realWorld}`
      },
      {
        heading: "มองภาพรวมก่อนลงมือ",
        body: draft.diagramIntro,
        diagram: draft.diagram
      },
      {
        heading: "ตัวอย่างโค้ดสั้น ๆ",
        body: draft.codeIntro,
        code: draft.code
      },
      {
        heading: "อธิบายโค้ดทีละส่วน",
        body: draft.walkthrough
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")
      },
      {
        heading: "ข้อผิดพลาดที่มือใหม่มักเจอ",
        body: draft.mistakes.map((item) => `• ${item}`).join("\n")
      },
      {
        heading: "สรุปท้ายบท",
        body: draft.summary
      }
    ],
    exercise: {
      title: draft.exerciseTitle,
      tasks: draft.exerciseTasks,
      starterCode: draft.starterCode
    },
    quiz: draft.quiz
  };
}

export const htmlLessons: Lesson[] = [
  buildLesson({
    id: 201,
    slug: "html-document-structure",
    title: "บทที่ 1: โครงสร้างเอกสาร HTML",
    subtitle: "รู้จักหน้าที่ของ HTML และสร้างหน้าเว็บแรกอย่างเป็นขั้นตอน",
    minutes: 30,
    accent: "bg-orange-500",
    objectives: [
      "อธิบายได้ว่า HTML ทำหน้าที่อะไร",
      "รู้จัก html, head และ body",
      "สร้างไฟล์ index.html ที่เปิดในเบราว์เซอร์ได้"
    ],
    concept:
      "HTML คือภาษาที่ใช้บอกโครงสร้างของหน้าเว็บ ลองนึกถึงบ้านหนึ่งหลัง HTML คือเสา ผนัง ประตู และห้องต่าง ๆ ที่บอกว่าอะไรอยู่ตรงไหน ส่วนสีสันกับการตกแต่งจะเป็นหน้าที่ของ CSS และการโต้ตอบจะเป็นหน้าที่ของ JavaScript เราเขียน HTML ด้วยแท็ก เช่น <h1> สำหรับหัวข้อ และ <p> สำหรับย่อหน้า เบราว์เซอร์จะอ่านแท็กเหล่านี้แล้วจัดเป็นหน้าเว็บให้เราเห็น",
    why:
      "ทุกเว็บไซต์ต้องมีโครงสร้างที่ชัดเจน ถ้าเราเข้าใจโครงสร้างตั้งแต่ต้น จะอ่านโค้ดของคนอื่นง่าย แก้หน้าเว็บได้ตรงจุด และต่อยอดไป CSS, JavaScript, React หรือ Next.js ได้โดยไม่สับสน",
    realWorld:
      "หน้าแรกของร้านค้าออนไลน์ใช้ HTML แบ่งส่วนเมนู ชื่อสินค้า ราคา และปุ่มสั่งซื้อ หน้าเรียนออนไลน์ก็ใช้ HTML แบ่งหัวข้อ เนื้อหา ตัวอย่างโค้ด และแบบทดสอบ",
    diagram: "html-document",
    diagramIntro:
      "ภาพนี้มองเอกสาร HTML เหมือนกล่องซ้อนกัน กล่อง <html> ครอบทุกอย่าง ด้านในมี <head> สำหรับข้อมูลของหน้า และ <body> สำหรับสิ่งที่ผู้ใช้มองเห็นจริง",
    codeIntro:
      "สร้างไฟล์ชื่อ index.html แล้ววางโค้ดนี้ จากนั้นดับเบิลคลิกไฟล์เพื่อเปิดด้วยเบราว์เซอร์",
    code: `<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <title>เว็บแรกของฉัน</title>
  </head>
  <body>
    <h1>สวัสดี HTML</h1>
    <p>นี่คือหน้าเว็บแรกของฉัน</p>
  </body>
</html>`,
    walkthrough: [
      "<!doctype html> บอกเบราว์เซอร์ว่าไฟล์นี้ใช้ HTML รุ่นปัจจุบัน",
      "<html lang=\"th\"> เป็นกล่องใหญ่สุด และ lang=\"th\" บอกว่าหน้านี้ใช้ภาษาไทย",
      "<head> เก็บข้อมูลเกี่ยวกับหน้า เช่น encoding และชื่อบนแท็บเบราว์เซอร์",
      "<body> เก็บสิ่งที่ผู้ใช้มองเห็น โดย <h1> เป็นหัวข้อใหญ่และ <p> เป็นข้อความหนึ่งย่อหน้า"
    ],
    mistakes: [
      "ลืมปิดแท็ก เช่น เปิด <p> แต่ไม่เขียน </p>",
      "บันทึกไฟล์เป็น .txt แทน .html ทำให้เบราว์เซอร์ไม่มองเป็นหน้าเว็บ",
      "วางเนื้อหาที่ต้องการให้เห็นไว้ใน <head> แทนที่จะวางใน <body>"
    ],
    summary:
      "HTML เป็นโครงกระดูกของหน้าเว็บ เอกสารพื้นฐานมี html, head และ body เมื่อแยกหน้าที่ของแต่ละส่วนได้ เราก็พร้อมเติมเนื้อหาจริงลงในหน้าเว็บแล้ว",
    exerciseTitle: "สร้างหน้าแนะนำตัว",
    exerciseTasks: [
      "สร้างไฟล์ index.html พร้อมโครงสร้างพื้นฐาน",
      "ตั้งชื่อแท็บว่า แนะนำตัวของฉัน",
      "ใส่หัวข้อชื่อของตัวเองและย่อหน้าบอกสิ่งที่อยากเรียน"
    ],
    starterCode: `<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <title>...</title>
  </head>
  <body>
    <!-- เขียนหัวข้อและย่อหน้าตรงนี้ -->
  </body>
</html>`,
    quiz: [
      {
        question: "ส่วนใดเก็บเนื้อหาที่ผู้ใช้มองเห็นบนหน้าเว็บ",
        options: ["<head>", "<body>", "<title>", "<!doctype>"],
        answer: 1,
        explanation: "สิ่งที่แสดงในหน้าเว็บ เช่น หัวข้อและย่อหน้า จะอยู่ใน <body>"
      },
      {
        question: "แท็ก <title> แสดงข้อความที่ใด",
        options: ["บนแท็บเบราว์เซอร์", "กลางหน้าเว็บ", "ใต้รูปภาพ", "ในปุ่ม"],
        answer: 0,
        explanation: "<title> กำหนดชื่อเอกสารที่เห็นบนแท็บของเบราว์เซอร์"
      },
      {
        question: "ควรบันทึกหน้าเว็บ HTML ด้วยนามสกุลใด",
        options: [".docx", ".css", ".html", ".png"],
        answer: 2,
        explanation: "ไฟล์ HTML ใช้นามสกุล .html เช่น index.html"
      }
    ]
  }),
  buildLesson({
    id: 202,
    slug: "html-content-elements",
    title: "บทที่ 2: จัดเนื้อหาด้วยหัวข้อ รูปภาพ และลิงก์",
    subtitle: "เปลี่ยนหน้าเปล่าให้เป็นหน้าเว็บที่อ่านง่ายและเชื่อมไปหน้าอื่นได้",
    minutes: 35,
    accent: "bg-amber-500",
    objectives: [
      "เลือกใช้ heading และ paragraph ได้เหมาะสม",
      "เพิ่มรูปภาพพร้อมข้อความอธิบาย",
      "สร้างลิงก์ไปยังหน้าอื่นได้"
    ],
    concept:
      "หน้าเว็บที่ดีไม่ได้มีข้อความกองรวมกัน แต่แบ่งเป็นหัวข้อ ย่อหน้า รูปภาพ และลิงก์อย่างมีความหมาย แท็ก <h1> ถึง <h6> ใช้สร้างลำดับหัวข้อ <p> ใช้สร้างย่อหน้า <img> ใช้แสดงรูป และ <a> ใช้สร้างลิงก์ การเลือกแท็กให้ตรงหน้าที่ช่วยทั้งผู้ใช้ โปรแกรมอ่านหน้าจอ และเครื่องมือค้นหาเข้าใจหน้าเว็บ",
    why:
      "เมื่อเนื้อหามีลำดับ คนอ่านจะกวาดสายตาแล้วรู้ทันทีว่าส่วนไหนสำคัญ การใส่ alt ให้รูปและข้อความลิงก์ที่ชัดเจนยังทำให้เว็บเข้าถึงได้ดีขึ้น ไม่ใช่แค่สวยขึ้นเท่านั้น",
    realWorld:
      "หน้าคอร์สใช้ h1 เป็นชื่อคอร์ส ใช้ p อธิบายรายละเอียด ใช้ img แสดงปก และใช้ a พาไปหน้าบทเรียนหรือหน้าชำระเงิน",
    diagram: "html-page-elements",
    diagramIntro:
      "ภาพจำลองหน้าเว็บด้านล่างแสดงตำแหน่งของหัวข้อ ย่อหน้า รูปภาพ และลิงก์ แต่ละชิ้นมีหน้าที่ต่างกันและเรียงจากข้อมูลสำคัญไปสู่รายละเอียด",
    codeIntro: "ตัวอย่างนี้สร้างการ์ดแนะนำคอร์สแบบ HTML ล้วน",
    code: `<article>
  <h1>HTML พื้นฐาน</h1>
  <p>เรียนสร้างโครงสร้างหน้าเว็บตั้งแต่ศูนย์</p>
  <img src="html-cover.png" alt="ปกคอร์ส HTML พื้นฐาน" />
  <a href="/lessons">ดูบทเรียนทั้งหมด</a>
</article>`,
    walkthrough: [
      "<article> รวมเนื้อหาหนึ่งเรื่องที่สามารถอ่านแยกได้ เช่น การ์ดคอร์สหนึ่งใบ",
      "<h1> เป็นชื่อหลักของเนื้อหา และ <p> เป็นรายละเอียดที่อธิบายต่อ",
      "src ของ <img> บอกตำแหน่งไฟล์ ส่วน alt อธิบายรูปเมื่อรูปโหลดไม่ได้หรือผู้ใช้ใช้โปรแกรมอ่านหน้าจอ",
      "href ของ <a> บอกปลายทาง เมื่อกดข้อความ ดูบทเรียนทั้งหมด เบราว์เซอร์จะพาไป /lessons"
    ],
    mistakes: [
      "ใช้ <h1> หลายอันเพียงเพราะอยากได้ตัวหนังสือใหญ่ โดยไม่คิดถึงลำดับหัวข้อ",
      "ใส่รูปแต่ไม่เขียน alt ทำให้ผู้ใช้บางกลุ่มไม่รู้ว่ารูปสื่ออะไร",
      "เขียน href ผิดหรือชี้ไปไฟล์ที่ไม่มี ทำให้กดลิงก์แล้วเจอหน้า 404"
    ],
    summary:
      "หัวข้อช่วยจัดลำดับ ย่อหน้าช่วยเล่าเรื่อง รูปภาพช่วยสื่อความหมาย และลิงก์ช่วยเชื่อมหน้าต่าง ๆ เข้าด้วยกัน เมื่อใช้แท็กให้ตรงหน้าที่ หน้าเว็บจะอ่านง่ายและพร้อมนำไปตกแต่งด้วย CSS",
    exerciseTitle: "ทำหน้าแนะนำคอร์สหนึ่งหน้า",
    exerciseTasks: [
      "เพิ่มชื่อคอร์สด้วย h1 และหัวข้อย่อยด้วย h2",
      "เพิ่มคำอธิบายอย่างน้อย 2 ย่อหน้า",
      "เพิ่มรูปพร้อม alt และลิงก์กลับไปหน้าแรก"
    ],
    starterCode: `<article>
  <h1>...</h1>
  <h2>สิ่งที่จะได้เรียน</h2>
  <p>...</p>
  <!-- เพิ่มรูปและลิงก์ -->
</article>`,
    quiz: [
      {
        question: "attribute ใดใช้อธิบายความหมายของรูปภาพ",
        options: ["href", "alt", "lang", "titleOnly"],
        answer: 1,
        explanation: "alt เป็นข้อความทดแทนที่อธิบายรูปภาพ"
      },
      {
        question: "แท็กใดใช้สร้างลิงก์",
        options: ["<a>", "<p>", "<img>", "<h2>"],
        answer: 0,
        explanation: "<a> ใช้สร้างลิงก์และกำหนดปลายทางด้วย href"
      },
      {
        question: "เหตุใดจึงควรเรียง h1, h2 และ h3 อย่างมีลำดับ",
        options: ["เพื่อให้ไฟล์เล็กลง", "เพื่อให้โครงสร้างอ่านง่าย", "เพื่อเปลี่ยนสี", "เพื่อเปิดรูปได้"],
        answer: 1,
        explanation: "ลำดับ heading ช่วยให้คนและเครื่องมือเข้าใจโครงสร้างของเนื้อหา"
      }
    ]
  }),
  buildLesson({
    id: 203,
    slug: "html-simple-form",
    title: "บทที่ 3: สร้างฟอร์มรับข้อมูล",
    subtitle: "รู้จัก input, label และ button ผ่านฟอร์มสมัครสมาชิกอย่างง่าย",
    minutes: 40,
    accent: "bg-rose-500",
    objectives: [
      "อธิบายหน้าที่ของ form ได้",
      "จับคู่ label กับ input ได้ถูกต้อง",
      "สร้างฟอร์มชื่อ อีเมล และปุ่มส่งได้"
    ],
    concept:
      "ฟอร์มคือส่วนของหน้าเว็บที่เปิดให้ผู้ใช้ส่งข้อมูลกลับเข้าระบบ เช่น สมัครสมาชิก เข้าสู่ระบบ ค้นหาสินค้า หรือกรอกที่อยู่ แท็ก <form> ทำหน้าที่ครอบช่องทั้งหมด <label> บอกว่าช่องนั้นต้องกรอกอะไร <input> รับค่า และ <button> เป็นคำสั่งให้ส่งข้อมูล",
    why:
      "เว็บไซต์จริงแทบทุกแห่งต้องรับข้อมูลจากผู้ใช้ การวางโครงฟอร์มให้ถูกต้องตั้งแต่ HTML ช่วยให้กรอกง่าย ใช้งานด้วยคีย์บอร์ดได้ และลดความสับสนก่อนเราจะต่อฟอร์มเข้ากับระบบหลังบ้าน",
    realWorld:
      "หน้า Login ใช้ input แบบ email และ password หน้าชำระเงินใช้ input แบบ file สำหรับสลิป ส่วนหน้าค้นหาใช้ input แบบ search",
    diagram: "html-form",
    diagramIntro:
      "ภาพฟอร์มแสดงลำดับง่าย ๆ คืออ่านข้อความ label กรอกค่าใน input แล้วกด button การวางแต่ละช่องจากบนลงล่างทำให้มือถือใช้งานสะดวก",
    codeIntro: "ตัวอย่างนี้ยังไม่บันทึกข้อมูลจริง แต่ช่วยให้เราเข้าใจโครงสร้างฟอร์มก่อน",
    code: `<form>
  <label for="name">ชื่อที่แสดง</label>
  <input id="name" name="name" type="text" required />

  <label for="email">อีเมล</label>
  <input id="email" name="email" type="email" required />

  <button type="submit">สมัครสมาชิก</button>
</form>`,
    walkthrough: [
      "for=\"name\" ของ label จับคู่กับ id=\"name\" ของ input ทำให้กดข้อความแล้วเคอร์เซอร์ไปที่ช่องได้",
      "name เป็นชื่อข้อมูลที่ระบบฝั่ง server จะใช้รับค่า",
      "type=\"email\" ช่วยให้เบราว์เซอร์ตรวจรูปแบบอีเมลเบื้องต้น",
      "required บอกว่าห้ามปล่อยช่องว่าง และ button type=\"submit\" ใช้ส่งฟอร์ม"
    ],
    mistakes: [
      "มีข้อความบอกชื่อช่อง แต่ไม่ได้ใช้ label หรือไม่ได้จับคู่ for กับ id",
      "ลืมใส่ name ทำให้ฝั่ง server หาค่าช่องนั้นไม่เจอ",
      "ใช้ button โดยไม่กำหนด type แล้วไม่แน่ใจว่าปุ่มควรส่งฟอร์มหรือเป็นปุ่มทั่วไป"
    ],
    summary:
      "ฟอร์มที่ดีต้องบอกชัดว่ากรอกอะไร ใช้ input type ให้ตรงข้อมูล และมีปุ่มส่งที่ชัดเจน บทนี้เน้นโครงสร้างก่อน ส่วนการตรวจข้อมูลและบันทึกลงฐานข้อมูลจะเรียนในขั้นต่อไป",
    exerciseTitle: "สร้างฟอร์มติดต่อ",
    exerciseTasks: [
      "เพิ่มช่องชื่อและอีเมล พร้อม label ที่จับคู่ถูกต้อง",
      "เพิ่มช่องข้อความด้วย textarea",
      "กำหนดช่องสำคัญเป็น required และเพิ่มปุ่ม ส่งข้อความ"
    ],
    starterCode: `<form>
  <!-- เพิ่ม label และ input ชื่อ -->
  <!-- เพิ่ม label และ input อีเมล -->
  <!-- เพิ่ม textarea และปุ่ม submit -->
</form>`,
    quiz: [
      {
        question: "สิ่งใดช่วยบอกผู้ใช้ว่า input ใช้กรอกอะไร",
        options: ["<label>", "<title>", "<article>", "<meta>"],
        answer: 0,
        explanation: "label เป็นชื่อกำกับช่องกรอกข้อมูล"
      },
      {
        question: "ปุ่มส่งฟอร์มควรใช้ type ใด",
        options: ["text", "email", "submit", "form"],
        answer: 2,
        explanation: "button type=\"submit\" ใช้ส่งข้อมูลในฟอร์ม"
      },
      {
        question: "required มีหน้าที่อะไร",
        options: ["ซ่อนช่อง", "บังคับกรอกก่อนส่ง", "เปลี่ยนสีช่อง", "ล้างข้อมูล"],
        answer: 1,
        explanation: "required ทำให้เบราว์เซอร์ไม่ยอมส่งฟอร์มเมื่อช่องนั้นยังว่าง"
      }
    ]
  })
];

export const cssLessons: Lesson[] = [
  buildLesson({
    id: 301,
    slug: "css-box-model",
    title: "บทที่ 1: CSS และ Box Model",
    subtitle: "เข้าใจพื้นที่ content, padding, border และ margin ของทุกกล่องบนเว็บ",
    minutes: 35,
    accent: "bg-sky-500",
    objectives: [
      "เชื่อม CSS เข้ากับ HTML ได้",
      "แยก content, padding, border และ margin ได้",
      "กำหนดขนาดและระยะห่างของการ์ดได้"
    ],
    concept:
      "CSS คือภาษาที่ใช้กำหนดหน้าตาของ HTML เช่น สี ขนาด ระยะห่าง และตำแหน่ง สิ่งสำคัญมากคือ Box Model เพราะเบราว์เซอร์มอง element แทบทุกชิ้นเป็นกล่อง กลางสุดคือ content รอบ content คือ padding ถัดไปคือ border และพื้นที่ด้านนอกสุดคือ margin",
    why:
      "มือใหม่มักสงสัยว่าทำไมกล่องกว้างเกิน หรือทำไมสองส่วนติดกันเกินไป Box Model คือแผนที่ที่ช่วยตอบคำถามเหล่านี้ เมื่อเข้าใจแล้วเราจะจัดช่องว่างได้แม่นและแก้ layout ได้เร็วขึ้น",
    realWorld:
      "การ์ดบทเรียนมี content เป็นข้อความ มี padding ให้ข้อความไม่ชิดขอบ มี border แบ่งขอบเขต และมี margin หรือ gap เว้นระหว่างการ์ด",
    diagram: "css-box-model",
    diagramIntro:
      "มองจากนอกเข้าใน: margin เว้นระยะจากกล่องอื่น border คือเส้นขอบ padding คือช่องว่างภายใน และ content คือข้อความหรือรูปจริง",
    codeIntro: "โค้ดนี้ตกแต่งการ์ดคอร์สหนึ่งใบและใช้ box-sizing เพื่อคุมขนาดง่ายขึ้น",
    code: `.course-card {
  box-sizing: border-box;
  width: 320px;
  padding: 24px;
  border: 1px solid #dbeafe;
  margin: 16px;
  background: white;
}`,
    walkthrough: [
      "selector .course-card เลือก element ที่มี class ชื่อนี้",
      "box-sizing: border-box ทำให้ width รวม padding และ border แล้ว จึงคำนวณขนาดง่าย",
      "padding เพิ่มพื้นที่ด้านใน ส่วน margin เพิ่มพื้นที่ด้านนอก",
      "border วาดเส้นบางรอบกล่อง และ background กำหนดพื้นหลังสีขาว"
    ],
    mistakes: [
      "สลับหน้าที่ padding กับ margin จนแก้ระยะผิดด้าน",
      "กำหนด width เต็มแล้วเติม padding โดยไม่ใช้ border-box ทำให้กล่องล้น",
      "ใส่ margin ทุกชิ้นจนระยะซ้อนกัน แทนที่จะใช้ gap ที่ container"
    ],
    summary:
      "ทุกกล่องประกอบด้วย content, padding, border และ margin ถ้ากล่องล้นหรือระยะไม่พอดี ให้ไล่ดูจาก Box Model ทีละชั้นก่อนเสมอ",
    exerciseTitle: "ตกแต่งการ์ดโปรไฟล์",
    exerciseTasks: [
      "สร้างกล่องกว้าง 300px และใช้ box-sizing: border-box",
      "เพิ่ม padding 20px และ border 1px",
      "ทดลองเปลี่ยน margin แล้วสังเกตพื้นที่ด้านนอก"
    ],
    starterCode: `.profile-card {
  /* กำหนด width, padding, border และ margin */
}`,
    quiz: [
      {
        question: "พื้นที่ระหว่าง content กับ border เรียกว่าอะไร",
        options: ["margin", "padding", "width", "gap"],
        answer: 1,
        explanation: "padding คือพื้นที่ด้านในระหว่างเนื้อหากับเส้นขอบ"
      },
      {
        question: "margin อยู่บริเวณใด",
        options: ["ด้านนอก border", "ใน content", "บนตัวอักษร", "ในรูปภาพ"],
        answer: 0,
        explanation: "margin เป็นพื้นที่นอกสุดที่เว้นกล่องนี้ออกจากกล่องอื่น"
      },
      {
        question: "border-box ช่วยเรื่องใด",
        options: ["เปลี่ยนฟอนต์", "รวม padding และ border ใน width", "ซ่อน element", "จัดข้อความกลาง"],
        answer: 1,
        explanation: "border-box ทำให้ขนาดที่กำหนดรวม padding และ border แล้ว"
      }
    ]
  }),
  buildLesson({
    id: 302,
    slug: "css-flexbox-layout",
    title: "บทที่ 2: จัด Layout ด้วย Flexbox",
    subtitle: "เรียงกล่องแนวนอน แนวตั้ง และจัดตำแหน่งโดยไม่ต้องเดาระยะ",
    minutes: 40,
    accent: "bg-indigo-500",
    objectives: [
      "สร้าง flex container ได้",
      "แยก main axis และ cross axis ได้",
      "ใช้ gap และการจัดตำแหน่งพื้นฐานได้"
    ],
    concept:
      "Flexbox เป็นระบบจัด layout สำหรับกล่องหนึ่งมิติ หมายถึงเราต้องการเรียงของเป็นแถวหรือเป็นคอลัมน์ เมื่อใส่ display: flex ที่กล่องแม่ ลูกด้านในจะเรียงตามแกนหลัก เราเปลี่ยนทิศด้วย flex-direction จัดตำแหน่งตามแกนหลักด้วย justify-content และจัดอีกแกนด้วย align-items",
    why:
      "ก่อนมี Flexbox การจัดเมนูหรือปุ่มให้อยู่กึ่งกลางต้องใช้เทคนิคหลายขั้น ปัจจุบัน Flexbox ช่วยให้โค้ดสั้น อ่านง่าย และปรับตามพื้นที่หน้าจอได้ดี",
    realWorld:
      "Navbar ใช้ Flexbox เรียงโลโก้กับเมนู การ์ดคอร์สใช้ Flexbox เรียงไอคอนกับข้อความ และแถวปุ่มใช้ gap เว้นระยะสม่ำเสมอ",
    diagram: "css-flexbox",
    diagramIntro:
      "ภาพแรกคือ flex-direction: row ที่เรียงซ้ายไปขวา ส่วนภาพที่สองคือ column ที่เรียงบนลงล่าง กล่องแม่เป็นคนกำหนดทิศให้ลูกทั้งหมด",
    codeIntro: "ตัวอย่างนี้สร้างแถวปุ่มที่มีระยะเท่ากันและอยู่กึ่งกลางแนวตั้ง",
    code: `.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}`,
    walkthrough: [
      "display: flex เปลี่ยน .actions ให้เป็น flex container",
      "flex-direction: row ให้ลูกเรียงจากซ้ายไปขวา",
      "align-items: center จัดลูกให้อยู่กลางในแนวตั้งเมื่อใช้ row",
      "justify-content: space-between กระจายลูกไปหัวและท้าย ส่วน gap เว้นระหว่างลูก"
    ],
    mistakes: [
      "ใส่ justify-content ที่กล่องลูก แทนที่จะใส่ที่ flex container",
      "จำสลับ justify-content กับ align-items โดยไม่ดูก่อนว่า flex-direction เป็น row หรือ column",
      "ใช้ margin ทีละปุ่มทั้งที่ gap จัดระยะได้สม่ำเสมอกว่า"
    ],
    summary:
      "เริ่ม Flexbox ด้วยการเลือกทิศ row หรือ column แล้วค่อยจัดแกนหลักและแกนขวาง ถ้าของไม่อยู่ตำแหน่งที่คิด ให้กลับมาตรวจ flex-direction ก่อน",
    exerciseTitle: "จัด Navbar อย่างง่าย",
    exerciseTasks: [
      "สร้าง container ที่มีโลโก้และกลุ่มลิงก์",
      "ใช้ Flexbox ให้โลโก้อยู่ซ้ายและลิงก์อยู่ขวา",
      "ใช้ gap เว้นลิงก์อย่างน้อย 16px"
    ],
    starterCode: `.navbar {
  /* เริ่มด้วย display: flex */
}

.nav-links {
  /* เรียงลิงก์และเพิ่ม gap */
}`,
    quiz: [
      {
        question: "คำสั่งใดเริ่มใช้งาน Flexbox",
        options: ["position: flex", "display: flex", "layout: row", "flex: display"],
        answer: 1,
        explanation: "ต้องกำหนด display: flex ให้ container"
      },
      {
        question: "flex-direction: column เรียงลูกแบบใด",
        options: ["บนลงล่าง", "ซ้ายไปขวาเสมอ", "ซ้อนทับกัน", "ซ่อนทั้งหมด"],
        answer: 0,
        explanation: "column ทำให้แกนหลักวิ่งจากบนลงล่าง"
      },
      {
        question: "property ใดใช้เว้นระหว่าง flex items",
        options: ["gap", "font-size", "opacity", "border-style"],
        answer: 0,
        explanation: "gap สร้างระยะห่างระหว่างลูกใน container"
      }
    ]
  }),
  buildLesson({
    id: 303,
    slug: "css-responsive-design",
    title: "บทที่ 3: Responsive สำหรับมือถือและ Desktop",
    subtitle: "ทำให้หน้าเดียวอ่านง่ายได้ทั้งจอเล็กและจอใหญ่",
    minutes: 45,
    accent: "bg-violet-500",
    objectives: [
      "อธิบาย responsive design ได้",
      "เขียน media query พื้นฐานได้",
      "ออกแบบแบบ mobile-first ได้"
    ],
    concept:
      "Responsive design คือการทำให้หน้าเว็บปรับตัวตามพื้นที่ ไม่ใช่ย่อหน้า Desktop ทั้งก้อนให้เล็กลง บนมือถือการ์ดอาจเรียงหนึ่งคอลัมน์ ปุ่มควรกดง่าย และข้อความต้องไม่ล้น พอจอกว้างขึ้นเราค่อยเพิ่มจำนวนคอลัมน์ด้วย media query",
    why:
      "ผู้เรียนจำนวนมากเปิดเว็บจากมือถือ ถ้าหน้าต้องซูมหรือเลื่อนไปด้านข้าง ผู้ใช้จะเหนื่อยและอาจออกจากเว็บ การคิดแบบ mobile-first ช่วยให้เราเริ่มจากข้อจำกัดที่สำคัญที่สุดก่อน",
    realWorld:
      "หน้าคอร์สบนมือถือเรียงการ์ดทีละใบ แต่ Desktop แสดง 2-3 ใบต่อแถว Navbar บนมือถือเปลี่ยนเป็น hamburger menu และวิดีโอปรับความกว้างตามหน้าจอ",
    diagram: "css-responsive",
    diagramIntro:
      "ภาพเปรียบเทียบแสดงข้อมูลชุดเดียวกัน บนมือถือเรียงลงมาเพื่อรักษาความกว้าง ส่วน Desktop ใช้พื้นที่เพิ่มเป็นหลายคอลัมน์โดยไม่เปลี่ยนเนื้อหา",
    codeIntro: "เริ่มจากหนึ่งคอลัมน์ แล้วเปลี่ยนเป็นสามคอลัมน์เมื่อหน้าจอกว้างอย่างน้อย 768px",
    code: `.course-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .course-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
    walkthrough: [
      "ค่าปกติเป็น 1fr หนึ่งคอลัมน์ จึงเหมาะกับมือถือก่อน",
      "gap เว้นระยะระหว่างการ์ดโดยไม่ต้องใส่ margin ทีละใบ",
      "@media จะทำงานเมื่อ viewport กว้างอย่างน้อย 768px",
      "repeat(3, 1fr) แบ่งพื้นที่เท่า ๆ กันเป็นสามคอลัมน์"
    ],
    mistakes: [
      "กำหนดความกว้างตายตัว เช่น 900px ทำให้มือถือเกิดการเลื่อนแนวนอน",
      "เขียน media query หลายจุดเกินไปก่อนทดสอบค่าพื้นฐาน",
      "ทดสอบเฉพาะ Desktop แล้วเพิ่งมาพบว่าปุ่มหรือข้อความล้นบนมือถือ"
    ],
    summary:
      "Responsive ที่ดีเริ่มจากหน้าจอเล็ก ใช้ขนาดยืดหยุ่น แล้วเพิ่ม layout เมื่อมีพื้นที่ Media query ควรใช้เมื่อเนื้อหาเริ่มดูอึดอัด ไม่ใช่เลือกตามชื่อรุ่นโทรศัพท์",
    exerciseTitle: "ทำรายการการ์ดให้ responsive",
    exerciseTasks: [
      "เริ่มจากการ์ดหนึ่งคอลัมน์บนจอเล็ก",
      "เปลี่ยนเป็นสองคอลัมน์ที่ 640px และสามคอลัมน์ที่ 1024px",
      "เปิด responsive mode และตรวจว่าไม่มีการเลื่อนแนวนอน"
    ],
    starterCode: `.cards {
  display: grid;
  grid-template-columns: 1fr;
}

/* เพิ่ม media query ที่นี่ */`,
    quiz: [
      {
        question: "mobile-first หมายถึงอะไร",
        options: ["ทำเฉพาะแอปมือถือ", "เริ่ม style จอเล็กแล้วค่อยเพิ่มจอใหญ่", "ซ่อนเนื้อหาบน Desktop", "ใช้มือถือเขียนโค้ดเท่านั้น"],
        answer: 1,
        explanation: "mobile-first เริ่มจากข้อจำกัดจอเล็ก แล้วขยาย layout เมื่อพื้นที่มากขึ้น"
      },
      {
        question: "@media (min-width: 768px) ทำงานเมื่อใด",
        options: ["จอแคบกว่า 768px", "จอกว้างอย่างน้อย 768px", "เฉพาะ iPhone", "เฉพาะตอนพิมพ์"],
        answer: 1,
        explanation: "min-width หมายถึงความกว้างตั้งแต่ค่านั้นขึ้นไป"
      },
      {
        question: "อาการใดบอกว่า layout มือถือมีปัญหา",
        options: ["มีพื้นที่พอดี", "ต้องเลื่อนแนวนอน", "อ่านข้อความได้", "ปุ่มกดได้"],
        answer: 1,
        explanation: "การเลื่อนแนวนอนมักเกิดจาก element กว้างเกิน viewport"
      }
    ]
  })
];

export const gitLessons: Lesson[] = [
  buildLesson({
    id: 401,
    slug: "git-save-workflow",
    title: "บทที่ 1: บันทึกเวอร์ชันด้วย Git",
    subtitle: "เข้าใจ Working Directory, Staging Area และ Commit แบบไม่ต้องท่องจำ",
    minutes: 35,
    accent: "bg-slate-800",
    objectives: ["อธิบายหน้าที่ของ Git ได้", "แยก add กับ commit ได้", "บันทึกงานหนึ่งเวอร์ชันได้"],
    concept:
      "Git คือระบบบันทึกประวัติของโค้ด ลองนึกถึงการเซฟเกมเป็นหลายช่อง เราสามารถกลับไปดูได้ว่าแต่ละช่วงเปลี่ยนอะไร ขั้นตอนหลักมีสามจุด: Working Directory คือไฟล์ที่กำลังแก้, Staging Area คือรายการไฟล์ที่เลือกไว้สำหรับรอบนี้ และ Commit คือภาพบันทึกถาวรพร้อมข้อความอธิบาย",
    why:
      "การกด Save ช่วยเก็บไฟล์ล่าสุด แต่ไม่ได้เล่าว่าเราเปลี่ยนอะไร Git ช่วยแบ่งงานเป็นช่วงเล็ก ๆ ทำให้ย้อนกลับ ตรวจข้อผิดพลาด และทำงานร่วมกับคนอื่นได้โดยไม่ส่งไฟล์ชื่อ final-final-จริงๆ.zip",
    realWorld:
      "นักพัฒนามัก commit หลังทำงานหนึ่งเรื่องจบ เช่น เพิ่มหน้า Login หรือแก้ปุ่มบนมือถือ แล้วใช้ประวัตินี้ตรวจว่า bug เริ่มเกิดจากเวอร์ชันใด",
    diagram: "git-workflow",
    diagramIntro:
      "การเปลี่ยนแปลงเดินจากไฟล์ที่กำลังแก้ ไปพื้นที่เตรียมด้วย git add แล้วกลายเป็นเวอร์ชันด้วย git commit จากนั้นจึงค่อยส่งขึ้น GitHub",
    codeIntro: "เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วลองคำสั่งตามลำดับ",
    code: `git init
git status
git add index.html
git commit -m "สร้างหน้า HTML แรก"`,
    walkthrough: [
      "git init เริ่มใช้ Git ในโฟลเดอร์นี้เพียงครั้งแรก",
      "git status บอกว่าไฟล์ใดเปลี่ยนและไฟล์ใดถูกเตรียมแล้ว",
      "git add index.html เลือกไฟล์เข้าสู่ Staging Area",
      "git commit พร้อมข้อความสั้น ๆ สร้างจุดบันทึกหนึ่งเวอร์ชัน"
    ],
    mistakes: [
      "คิดว่า git add คือการอัปโหลดขึ้นอินเทอร์เน็ต ทั้งที่ยังอยู่ในเครื่อง",
      "เขียนข้อความ commit กว้างเกินไป เช่น update จนย้อนอ่านไม่รู้ว่าเปลี่ยนอะไร",
      "ใช้ git add . โดยไม่อ่าน git status แล้วเผลอใส่ไฟล์ลับ"
    ],
    summary:
      "Git แยกการแก้ไฟล์ การเลือกไฟล์ และการบันทึกเวอร์ชันออกจากกัน ใช้ git status เป็นเข็มทิศทุกครั้ง แล้วสร้าง commit เล็ก ๆ ที่อธิบายงานหนึ่งเรื่องให้ชัด",
    exerciseTitle: "สร้าง commit แรกของโปรเจกต์",
    exerciseTasks: ["สร้างไฟล์ README.md", "ตรวจด้วย git status แล้ว add เฉพาะ README.md", "commit ด้วยข้อความที่บอกงานชัดเจน"],
    starterCode: `git status
# เติมคำสั่ง add
# เติมคำสั่ง commit`,
    quiz: [
      { question: "git add ทำหน้าที่อะไร", options: ["ลบไฟล์", "เลือกการเปลี่ยนแปลงเข้าพื้นที่เตรียม", "ส่ง GitHub", "เปิดเว็บไซต์"], answer: 1, explanation: "git add ย้ายการเปลี่ยนแปลงที่เลือกเข้าสู่ Staging Area" },
      { question: "คำสั่งใดใช้ดูสถานะปัจจุบัน", options: ["git look", "git status", "git open", "git start"], answer: 1, explanation: "git status แสดงไฟล์ที่เปลี่ยนและสถานะ staging" },
      { question: "Commit เปรียบได้กับอะไร", options: ["จุดบันทึกหนึ่งเวอร์ชัน", "ถังขยะ", "เบราว์เซอร์", "รหัสผ่าน"], answer: 0, explanation: "Commit คือ snapshot ของการเปลี่ยนแปลง ณ ช่วงหนึ่ง" }
    ]
  }),
  buildLesson({
    id: 402,
    slug: "git-branch-basics",
    title: "บทที่ 2: Branch และการรวมงาน",
    subtitle: "ทดลองฟีเจอร์ใหม่บนเส้นทางแยกโดยไม่รบกวนงานหลัก",
    minutes: 40,
    accent: "bg-violet-700",
    objectives: ["อธิบาย branch ได้", "สร้างและสลับ branch ได้", "เข้าใจการ merge เบื้องต้น"],
    concept:
      "Branch คือเส้นทางการทำงานที่แยกออกจากงานหลัก เปรียบเหมือนถ่ายสำเนาสมุดมาแก้บทหนึ่ง ถ้าทดลองแล้วดีจึงรวมกลับเข้าเล่มหลัก เส้นหลักมักชื่อ main ส่วน branch ใหม่ควรตั้งตามงาน เช่น feature-login หรือ fix-mobile-menu",
    why:
      "ถ้าแก้ทุกอย่างบน main ตลอด งานที่ยังไม่เสร็จอาจปนกับเวอร์ชันที่ใช้งานได้ Branch ช่วยให้ทดลอง เปลี่ยนใจ หรือแบ่งงานกับเพื่อนได้อย่างเป็นระเบียบ",
    realWorld:
      "ทีมเว็บสร้าง branch สำหรับหน้า payment ใหม่ เมื่อทดสอบผ่านและ review แล้วจึง merge เข้า main เพื่อ deploy โดยหน้าเว็บหลักยังเสถียรระหว่างพัฒนา",
    diagram: "git-branch",
    diagramIntro:
      "เส้น main เดินต่อไปตามปกติ ขณะที่ feature แยกไปสร้าง commit ของตัวเอง เมื่อพร้อมจึงรวมกลับเข้าจุดเดียวกัน",
    codeIntro: "ตัวอย่างนี้สร้าง branch สำหรับหน้า Help แล้วรวมกลับ main",
    code: `git switch -c feature-help-page
# แก้ไฟล์และ commit งาน
git add .
git commit -m "เพิ่มหน้า Help"
git switch main
git merge feature-help-page`,
    walkthrough: [
      "git switch -c สร้าง branch ใหม่และสลับไปทันที",
      "เราแก้ไฟล์และ commit บน feature branch โดย main ยังไม่เปลี่ยน",
      "git switch main กลับสู่เส้นหลัก",
      "git merge นำ commit จาก feature-help-page มารวมใน main"
    ],
    mistakes: [
      "เริ่มแก้ไฟล์ก่อนเช็กว่าตัวเองอยู่ branch ไหน",
      "ตั้งชื่อ branch กว้าง เช่น test1 จนคนอื่นไม่รู้ว่างานอะไร",
      "กลัว merge conflict แล้วลบโค้ดทั้งก้อน แทนที่จะอ่านสองฝั่งและเลือกอย่างระมัดระวัง"
    ],
    summary:
      "Branch ให้พื้นที่ปลอดภัยสำหรับงานหนึ่งเรื่อง ควรเช็ก branch ก่อนเริ่ม ทำ commit ให้เรียบร้อย และรวมกลับ main เมื่อทดสอบแล้ว",
    exerciseTitle: "ทดลอง branch หน้า About",
    exerciseTasks: ["สร้าง branch feature-about", "เพิ่มไฟล์ about.html แล้ว commit", "กลับ main และ merge branch"],
    starterCode: `git branch
# สร้างและสลับ branch
# commit งาน แล้ว merge กลับ main`,
    quiz: [
      { question: "เหตุผลหลักของการใช้ branch คืออะไร", options: ["ทำให้โค้ดมีสี", "แยกงานออกจากเส้นหลัก", "ลบประวัติ", "ลดขนาดรูป"], answer: 1, explanation: "Branch ช่วยพัฒนางานแยกโดยไม่รบกวน main" },
      { question: "คำสั่งใดสร้างและสลับ branch ใหม่", options: ["git switch -c", "git status -c", "git push -c", "git add -c"], answer: 0, explanation: "git switch -c ชื่อสาขา ใช้สร้างและสลับในคำสั่งเดียว" },
      { question: "merge ทำอะไร", options: ["รวมประวัติจาก branch", "ลบ repository", "สร้าง HTML", "ปิด Terminal"], answer: 0, explanation: "Merge รวมการเปลี่ยนแปลงจาก branch หนึ่งสู่อีก branch" }
    ]
  }),
  buildLesson({
    id: 403,
    slug: "github-push-project",
    title: "บทที่ 3: ส่งโปรเจกต์ขึ้น GitHub",
    subtitle: "เชื่อม repository ในเครื่องกับพื้นที่ออนไลน์และอัปเดตงานอย่างถูกลำดับ",
    minutes: 45,
    accent: "bg-slate-950",
    objectives: ["แยก Git กับ GitHub ได้", "เชื่อม remote ได้", "push และ pull งานได้"],
    concept:
      "Git คือเครื่องมือบันทึกเวอร์ชันในเครื่อง ส่วน GitHub คือบริการออนไลน์สำหรับเก็บ Git repository แชร์โค้ด และทำงานร่วมกัน เราเชื่อมทั้งสองฝั่งด้วย remote ที่มักตั้งชื่อว่า origin แล้วใช้ push ส่ง commit ขึ้น และ pull รับการเปลี่ยนแปลงกลับมา",
    why:
      "การเก็บไว้แค่เครื่องเดียวเสี่ยงเมื่อเครื่องเสียและแชร์กับทีมยาก GitHub เป็นทั้งสำรองงาน พอร์ตโฟลิโอ และพื้นที่ review แต่ต้องจำว่า push ส่งเฉพาะสิ่งที่ commit แล้ว ไม่ได้ส่งไฟล์ที่เพิ่งแก้แต่ยังไม่ commit",
    realWorld:
      "หลังทำหน้าเว็บเสร็จ นักพัฒนา push ขึ้น GitHub เพื่อให้ Vercel deploy หรือส่งลิงก์ repository ให้ทีมตรวจงาน",
    diagram: "git-push",
    diagramIntro:
      "Workflow ที่ปลอดภัยคือแก้ไฟล์ ตรวจสถานะ add commit แล้ว push ขึ้น GitHub รอบถัดไปให้ pull ก่อนเมื่อทำงานหลายเครื่องหรือหลายคน",
    codeIntro: "สร้าง repository เปล่าบน GitHub ก่อน แล้วใช้ URL ของตัวเองแทนค่าตัวอย่าง",
    code: `git remote add origin https://github.com/username/my-course.git
git branch -M main
git push -u origin main

# รอบถัดไป
git pull
git push`,
    walkthrough: [
      "remote add origin จดจำ URL ของ repository ออนไลน์",
      "branch -M main ตั้งชื่อ branch หลักเป็น main",
      "push -u origin main ส่งครั้งแรกและผูก main ในเครื่องกับฝั่งออนไลน์",
      "รอบต่อไป pull รับงานใหม่ก่อน แล้ว push commit ของเรา"
    ],
    mistakes: [
      "push secret เช่น .env หรือ key ขึ้น repository สาธารณะ",
      "คิดว่า push จะส่งไฟล์ที่ยังไม่ได้ commit",
      "ใช้ force push โดยไม่เข้าใจและเขียนทับประวัติของทีม"
    ],
    summary:
      "GitHub รับประวัติจาก Git ผ่าน remote ก่อน push ต้องตรวจว่าไม่มีข้อมูลลับและ commit งานแล้ว หากทำงานร่วมกันให้ pull และอ่านความเปลี่ยนแปลงก่อนส่งงานของตัวเอง",
    exerciseTitle: "เผยแพร่ repository ทดลอง",
    exerciseTasks: ["สร้าง repository เปล่าบน GitHub", "เชื่อม remote origin และ push main", "แก้ README, commit และ push รอบที่สอง"],
    starterCode: `git remote -v
# เพิ่ม origin ของคุณ
# push branch main`,
    quiz: [
      { question: "GitHub ต่างจาก Git อย่างไร", options: ["GitHub เป็นบริการออนไลน์", "GitHub เป็นแท็ก HTML", "Git ใช้ได้เฉพาะมือถือ", "เหมือนกันทุกอย่าง"], answer: 0, explanation: "Git ทำงานจัดการเวอร์ชัน ส่วน GitHub ให้พื้นที่ออนไลน์สำหรับ repository" },
      { question: "ก่อน push ไฟล์ต้องอยู่ในสถานะใด", options: ["ถูก commit แล้ว", "อยู่ในถังขยะ", "เปิดในเบราว์เซอร์", "เปลี่ยนเป็น PDF"], answer: 0, explanation: "Push ส่ง commit ไม่ได้ส่งไฟล์ที่ยังไม่ได้บันทึกเป็น commit" },
      { question: "ไฟล์ใดไม่ควร push", options: ["README.md", "index.html", ".env ที่มี secret", "styles.css"], answer: 2, explanation: "Secret และ credential ต้องไม่อยู่ใน repository" }
    ]
  })
];

export const reactLessons: Lesson[] = [
  buildLesson({
    id: 501,
    slug: "react-component-tree",
    title: "บทที่ 1: คิด UI เป็น Component",
    subtitle: "แบ่งหน้าใหญ่เป็นชิ้นเล็กที่อ่านง่ายและนำกลับมาใช้ซ้ำได้",
    minutes: 40,
    accent: "bg-cyan-500",
    objectives: ["อธิบาย component ได้", "อ่าน JSX พื้นฐานได้", "แบ่งหน้าเป็น component tree ได้"],
    concept:
      "React ช่วยสร้างหน้าจอจาก component หรือชิ้นส่วน UI ที่มีหน้าที่ชัดเจน หน้า Dashboard หนึ่งหน้าอาจประกอบด้วย Header, ProgressCard และ CourseCard หลายใบ Component เป็นฟังก์ชัน JavaScript ที่คืน JSX ซึ่งหน้าตาคล้าย HTML แต่เขียนอยู่ในโค้ด JavaScript",
    why:
      "เมื่อหน้าเว็บโตขึ้น การเขียนทุกอย่างในไฟล์เดียวทำให้แก้ยาก Component ช่วยให้เราโฟกัสทีละส่วน ทดสอบง่าย และนำ CourseCard เดิมไปแสดงหลายคอร์สโดยไม่คัดลอกโค้ด",
    realWorld:
      "Navbar, StatusBadge, LessonCard และ Footer มักเป็น component แยก แต่ถูกประกอบเข้าด้วยกันในหน้าเดียวเหมือนตัวต่อ",
    diagram: "react-tree",
    diagramIntro:
      "Component tree เริ่มจาก App ด้านบน แล้วแตกเป็นลูก เช่น Header และ CourseList ส่วน CourseList มี CourseCard หลายใบ",
    codeIntro: "สร้าง CourseCard แล้วเรียกใช้ใน App เหมือนแท็ก HTML ที่เราตั้งชื่อเอง",
    code: `function CourseCard() {
  return (
    <article>
      <h2>HTML พื้นฐาน</h2>
      <p>เรียนสร้างหน้าเว็บจากศูนย์</p>
    </article>
  );
}

export default function App() {
  return <CourseCard />;
}`,
    walkthrough: [
      "CourseCard เป็นฟังก์ชันชื่อขึ้นต้นด้วยตัวใหญ่ ซึ่งเป็นกติกาสำคัญของ React component",
      "return ส่ง JSX ที่บอกหน้าตาของ component",
      "App เป็น component หลักและเรียก <CourseCard /> เหมือนสร้างชิ้นส่วนนั้นบนหน้า",
      "เมื่ออยากแสดงหลายใบ เราสามารถเรียก CourseCard ซ้ำหรือใช้ array map"
    ],
    mistakes: ["ตั้งชื่อ component ด้วยตัวเล็กจน React มองเป็นแท็ก HTML", "คืน JSX หลายกล่องระดับบนโดยไม่มี parent ครอบ", "ทำ component ใหญ่จนรับผิดชอบทุกอย่างในหน้า"],
    summary: "React มอง UI เป็นต้นไม้ของ component เริ่มแบ่งตามหน้าที่ที่มองเห็นได้ ตั้งชื่อให้สื่อความหมาย และเก็บ component ให้เล็กพอที่จะอ่านเข้าใจได้ในครั้งเดียว",
    exerciseTitle: "แบ่งหน้าโปรไฟล์เป็น Component",
    exerciseTasks: ["สร้าง ProfileHeader", "สร้าง SkillList", "นำสอง component มาประกอบใน ProfilePage"],
    starterCode: `function ProfileHeader() {
  return <header>...</header>;
}

function ProfilePage() {
  return (
    <main>{/* เรียก component ที่นี่ */}</main>
  );
}`,
    quiz: [
      { question: "React component คืออะไร", options: ["ชิ้นส่วน UI ที่นำมาประกอบกัน", "ฐานข้อมูล", "ไฟล์รูปเท่านั้น", "คำสั่ง Git"], answer: 0, explanation: "Component คือหน่วย UI ที่มีหน้าที่ของตัวเอง" },
      { question: "ชื่อ component ควรเริ่มแบบใด", options: ["ตัวพิมพ์ใหญ่", "ตัวเลข", "ขีดกลาง", "ช่องว่าง"], answer: 0, explanation: "React ใช้ตัวพิมพ์ใหญ่แยก custom component จาก HTML element" },
      { question: "JSX ใช้ทำอะไร", options: ["อธิบายหน้าตา UI ใน JavaScript", "เขียน SQL", "เก็บรูป", "สร้าง password"], answer: 0, explanation: "JSX เป็น syntax สำหรับอธิบาย UI ที่ component จะ render" }
    ]
  }),
  buildLesson({
    id: 502,
    slug: "react-props",
    title: "บทที่ 2: ส่งข้อมูลด้วย Props",
    subtitle: "ใช้ component เดิมกับข้อมูลหลายชุดโดยส่งค่าจาก parent ไป child",
    minutes: 40,
    accent: "bg-blue-500",
    objectives: ["อธิบาย props ได้", "ส่ง string และ number ผ่าน props ได้", "สร้าง component ที่ใช้ซ้ำได้"],
    concept:
      "Props คือข้อมูลที่ component แม่ส่งให้ component ลูก เปรียบเหมือนกรอกข้อมูลลงแบบพิมพ์เดียวกัน CourseCard มีหน้าตาเหมือนกัน แต่ใบหนึ่งรับ title เป็น HTML อีกใบรับ title เป็น CSS ลูกอ่าน props ได้ แต่ไม่ควรแก้ props โดยตรง",
    why:
      "ถ้าไม่มี props เราอาจสร้าง CourseCardHtml, CourseCardCss และ CourseCardReact ที่มีโค้ดซ้ำ Props ทำให้เก็บรูปแบบไว้ที่เดียว แล้วเปลี่ยนเฉพาะข้อมูล",
    realWorld:
      "การ์ดบทเรียนรับชื่อบท ระยะเวลา และสถานะล็อกผ่าน props ส่วน StatusBadge รับสถานะ Free หรือ Premium เพื่อเลือกข้อความและสี",
    diagram: "react-props",
    diagramIntro: "ลูกศรแสดงข้อมูลไหลทางเดียวจาก parent ไป child เช่น App ส่ง title และ minutes ให้ CourseCard",
    codeIntro: "ตัวอย่างนี้ใช้ CourseCard ตัวเดียวสร้างการ์ดสองใบที่มีข้อมูลต่างกัน",
    code: `function CourseCard({ title, minutes }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>ใช้เวลา {minutes} นาที</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <CourseCard title="HTML พื้นฐาน" minutes={30} />
      <CourseCard title="CSS พื้นฐาน" minutes={40} />
    </main>
  );
}`,
    walkthrough: ["CourseCard รับ object props แล้ว destructure title กับ minutes", "วงเล็บปีกกาใน JSX ใช้แทรกค่า JavaScript", "ข้อความใช้ quote ส่วน number ใช้ minutes={30}", "App เป็น parent ที่ส่งค่าต่างกันให้ child สองครั้ง"],
    mistakes: ["ลืมวงเล็บปีกกาเมื่อส่ง number ทำให้ได้ string แทน", "สะกดชื่อ prop ฝั่งส่งและฝั่งรับไม่ตรงกัน", "พยายามแก้ props ใน child แทนที่จะให้ parent ส่งค่าใหม่"],
    summary: "Props ทำให้ component ใช้ซ้ำได้ ข้อมูลไหลจาก parent ลง child และชื่อ prop ควรบอกความหมายชัดเจน หาก UI เหมือนเดิมแต่ข้อมูลต่างกัน มักเป็นสัญญาณว่าควรใช้ props",
    exerciseTitle: "สร้าง StudentCard ที่ใช้ซ้ำ",
    exerciseTasks: ["รับ name, level และ completedLessons", "แสดงข้อมูลทั้งสามค่า", "เรียก StudentCard สองครั้งด้วยข้อมูลต่างกัน"],
    starterCode: `function StudentCard({ name, level, completedLessons }) {
  return <article>{/* แสดง props */}</article>;
}`,
    quiz: [
      { question: "Props ไหลจากทิศใด", options: ["Parent ไป Child", "Child ไปฐานข้อมูลเสมอ", "CSS ไป HTML", "Git ไป GitHub"], answer: 0, explanation: "Parent ส่ง props ลงไปให้ child" },
      { question: "วิธีส่ง number ที่ถูกต้องคือข้อใด", options: ["minutes=30 นาที", "minutes={30}", "{minutes}=30", "number(minutes)"], answer: 1, explanation: "ใช้วงเล็บปีกกาเพื่อส่งค่า JavaScript number" },
      { question: "ประโยชน์หลักของ props คืออะไร", options: ["ใช้ component เดิมกับข้อมูลต่างกัน", "ซ่อนทุก element", "แทนฐานข้อมูล", "สร้าง commit"], answer: 0, explanation: "Props แยกข้อมูลออกจากโครง UI ที่ใช้ซ้ำ" }
    ]
  }),
  buildLesson({
    id: 503,
    slug: "react-state-ui",
    title: "บทที่ 3: State เปลี่ยนแล้ว UI เปลี่ยน",
    subtitle: "สร้างปุ่มโต้ตอบและเข้าใจข้อมูลที่เปลี่ยนระหว่างใช้งาน",
    minutes: 45,
    accent: "bg-indigo-600",
    objectives: ["แยก props กับ state ได้", "ใช้ useState เบื้องต้นได้", "อัปเดต UI จาก event ได้"],
    concept:
      "State คือข้อมูลที่ component จำไว้และเปลี่ยนได้ระหว่างผู้ใช้ใช้งาน เช่น จำนวนสินค้าในตะกร้า เมนูเปิดหรือปิด และคำตอบที่เลือก เมื่อเราอัปเดต state React จะ render UI ใหม่จากค่าล่าสุดให้เอง",
    why:
      "เว็บที่มีแต่ข้อมูลคงที่จะโต้ตอบได้น้อย State เป็นหัวใจของปุ่ม แบบฟอร์ม dropdown และ quiz แต่ควรเก็บเฉพาะข้อมูลที่จำเป็น ไม่เก็บทุกอย่างโดยไม่คิด",
    realWorld: "กระดิ่งแจ้งเตือนใช้ state จำว่า dropdown เปิดอยู่หรือไม่ ฟอร์มใช้ state แสดง error และปุ่มนับคะแนนใช้ state เก็บคะแนนปัจจุบัน",
    diagram: "react-state",
    diagramIntro: "ผู้ใช้กดปุ่ม เกิด event แล้วฟังก์ชันอัปเดต state จากนั้น React render หน้าจอด้วยค่าใหม่โดยไม่ reload ทั้งหน้า",
    codeIntro: "ตัวอย่าง Counter เพิ่มจำนวนครั้งที่ผู้ใช้กดปุ่ม",
    code: `"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      กดแล้ว {count} ครั้ง
    </button>
  );
}`,
    walkthrough: ["use client บอก Next.js ว่า component นี้ต้องโต้ตอบใน browser", "useState(0) สร้าง count เริ่มที่ 0 และ setCount สำหรับเปลี่ยนค่า", "onClick ทำงานเมื่อผู้ใช้กด", "setCount เปลี่ยนค่าและ React แสดงตัวเลขใหม่"],
    mistakes: ["เขียน count = count + 1 โดยตรงแทน setCount", "เรียก setCount ทันทีระหว่าง render จนเกิด loop", "เก็บค่าที่คำนวณจาก state ได้อยู่แล้วเป็น state ซ้ำอีกชุด"],
    summary: "State คือความจำภายใน component เมื่อ event เกิด ให้ใช้ setter อัปเดตค่า แล้วปล่อยให้ React render UI ใหม่ Props มาจาก parent ส่วน state ถูกดูแลใน component",
    exerciseTitle: "ทำปุ่มเปิดและปิดคำอธิบาย",
    exerciseTasks: ["สร้าง state ชื่อ isOpen เริ่มเป็น false", "กดปุ่มแล้วสลับ true/false", "แสดงข้อความเฉพาะตอน isOpen เป็น true"],
    starterCode: `"use client";
import { useState } from "react";

export default function Details() {
  const [isOpen, setIsOpen] = useState(false);
  return <section>{/* เพิ่มปุ่มและข้อความ */}</section>;
}`,
    quiz: [
      { question: "State เหมาะกับข้อมูลแบบใด", options: ["ข้อมูลที่เปลี่ยนระหว่างใช้งาน", "ชื่อแท็ก HTML", "URL ของ Git", "คำสั่ง SQL เท่านั้น"], answer: 0, explanation: "State เก็บข้อมูลที่เปลี่ยนและมีผลต่อ UI" },
      { question: "ควรเปลี่ยน count ด้วยวิธีใด", options: ["แก้ตัวแปรตรง ๆ", "เรียก setCount", "แก้ HTML ด้วยมือ", "reload หน้า"], answer: 1, explanation: "Setter แจ้ง React ให้ render ด้วยค่าใหม่" },
      { question: "เมื่อ state เปลี่ยน React ทำอะไร", options: ["render UI ใหม่", "ลบ component", "สร้างฐานข้อมูล", "push Git"], answer: 0, explanation: "React คำนวณและอัปเดต UI ที่เกี่ยวข้องจาก state ใหม่" }
    ]
  })
];

export const nextjsLessons: Lesson[] = [
  buildLesson({
    id: 601,
    slug: "nextjs-app-router-structure",
    title: "บทที่ 1: โครงสร้าง App Router",
    subtitle: "อ่านโฟลเดอร์ app และสร้าง route จากไฟล์ได้อย่างเป็นระบบ",
    minutes: 40,
    accent: "bg-zinc-950",
    objectives: ["อธิบายหน้าที่ของ app ได้", "แยก page กับ layout ได้", "สร้าง dynamic route เบื้องต้นได้"],
    concept:
      "Next.js เป็น framework ที่ต่อยอดจาก React และจัดเครื่องมือสำคัญสำหรับเว็บจริงมาให้ App Router ใช้โครงสร้างโฟลเดอร์เป็นเส้นทาง URL ไฟล์ app/page.tsx คือหน้า / ส่วน app/courses/page.tsx คือ /courses และโฟลเดอร์ [slug] ใช้รับค่าที่เปลี่ยนได้ เช่น /courses/html-basics",
    why:
      "เมื่อ route สะท้อนโครงสร้างไฟล์ เราหาหน้าได้เร็วและไม่ต้องเขียนรายการ route แยกทุกหน้า layout ช่วยเก็บส่วนที่ใช้ร่วมกัน เช่น Navbar กับ Footer โดยไม่คัดลอก",
    realWorld:
      "เว็บคอร์สใช้ app/courses/[slug]/page.tsx แสดงรายละเอียดคอร์สจาก slug เดียวกัน และใช้ app/layout.tsx ครอบทุกหน้าด้วยโครงหลัก",
    diagram: "next-app-router",
    diagramIntro: "ภาพต้นไม้แสดงว่าโฟลเดอร์หนึ่งระดับกลายเป็น URL หนึ่งช่วง ส่วน page.tsx เป็นหน้าที่เปิดได้และ layout.tsx เป็นกรอบร่วมของลูกด้านใน",
    codeIntro: "ตัวอย่างหน้า dynamic route รับ slug แล้วนำมาแสดง",
    code: `// app/courses/[slug]/page.tsx
export default async function CoursePage({ params }) {
  const { slug } = await params;

  return (
    <main>
      <h1>คอร์ส: {slug}</h1>
    </main>
  );
}`,
    walkthrough: ["ชื่อโฟลเดอร์ [slug] หมายถึงค่าช่วง URL นี้เปลี่ยนได้", "Next.js ส่ง params ให้ page ตาม URL", "await params แล้ว destructure ค่า slug", "JSX แสดง slug ที่ผู้ใช้เปิด เช่น html-basics"],
    mistakes: ["สร้างไฟล์ชื่อ pages.tsx แทน page.tsx", "วาง route ผิดระดับจน URL ไม่ตรงที่คิด", "ใช้ค่าจาก URL โดยไม่ตรวจว่ามีข้อมูลจริงก่อนนำไป query"],
    summary: "App Router เปลี่ยนโครงสร้างโฟลเดอร์ให้เป็นเส้นทาง หน้าแต่ละ route ใช้ page.tsx ส่วน layout.tsx เก็บ UI ร่วม และ [slug] รองรับหน้าที่ข้อมูลเปลี่ยนตาม URL",
    exerciseTitle: "สร้าง route บทเรียนแบบ dynamic",
    exerciseTasks: ["สร้าง app/lessons/[slug]/page.tsx", "อ่าน slug จาก params", "แสดงข้อความ กำลังเปิดบทเรียน พร้อม slug"],
    starterCode: `export default async function LessonPage({ params }) {
  // อ่าน slug
  return <main>...</main>;
}`,
    quiz: [
      { question: "ไฟล์ใดแทนหน้า / ใน App Router", options: ["app/page.tsx", "app/root.tsx", "app/index.html", "app/home.css"], answer: 0, explanation: "app/page.tsx คือหน้า root route" },
      { question: "[slug] หมายถึงอะไร", options: ["route ที่มีค่าช่วงนั้นเปลี่ยนได้", "ไฟล์ CSS", "ฐานข้อมูล", "รูปภาพ"], answer: 0, explanation: "วงเล็บเหลี่ยมสร้าง dynamic segment" },
      { question: "layout.tsx เหมาะกับอะไร", options: ["UI ที่ใช้ร่วมกับหน้าลูก", "เก็บ password", "เขียน SQL เท่านั้น", "แทนทุก API"], answer: 0, explanation: "Layout ครอบหน้าลูกและเหมาะกับ Navbar หรือโครงร่วม" }
    ]
  }),
  buildLesson({
    id: 602,
    slug: "nextjs-server-client-components",
    title: "บทที่ 2: Server และ Client Components",
    subtitle: "เลือกให้ถูกว่าส่วนไหนทำงานบน server และส่วนไหนต้องโต้ตอบใน browser",
    minutes: 45,
    accent: "bg-slate-800",
    objectives: ["แยก Server กับ Client Component ได้", "รู้ว่าเมื่อใดต้องใช้ use client", "ไม่ส่ง secret ไป browser"],
    concept:
      "ใน App Router component เป็น Server Component โดยค่าเริ่มต้น จึงอ่านฐานข้อมูลหรือ secret ฝั่ง server ได้ ส่วน Client Component ใช้เมื่อจำเป็นต้องมี state, event เช่น onClick หรือ browser API เราเปิดด้วยบรรทัด \"use client\" ที่บนสุดของไฟล์",
    why:
      "การเลือกฝั่งให้เหมาะช่วยลด JavaScript ที่ส่งไปมือถือและปกป้องข้อมูลลับ ไม่จำเป็นต้องเปลี่ยนทั้งหน้าเป็น Client เพียงเพราะมีปุ่มหนึ่งอัน เราแยกปุ่มโต้ตอบเป็น component เล็ก ๆ ได้",
    realWorld:
      "หน้า Dashboard แบบ Server Component อ่าน session และ query progress ส่วน hamburger menu เป็น Client Component เพราะต้องจำสถานะเปิด/ปิด",
    diagram: "next-server-client",
    diagramIntro: "ฝั่ง Server เหมาะกับข้อมูลและ secret จากนั้นส่งผลลัพธ์ที่จำเป็นไป UI ฝั่ง Client รับผิดชอบการคลิก state และสิ่งที่เกิดใน browser",
    codeIntro: "Server page อ่านข้อมูล แล้วส่งค่าเรียบง่ายให้ Client button",
    code: `// app/dashboard/page.tsx (Server Component)
import LikeButton from "./LikeButton";

export default async function Dashboard() {
  const lessonTitle = "HTML พื้นฐาน";
  return <LikeButton title={lessonTitle} />;
}

// app/dashboard/LikeButton.tsx
"use client";
import { useState } from "react";

export default function LikeButton({ title }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "ชอบแล้ว" : "ชอบ " + title}</button>;
}`,
    walkthrough: ["Dashboard ไม่มี use client จึงเป็น Server Component", "Server ส่งเพียง title ที่ client ต้องใช้", "LikeButton ประกาศ use client เพราะใช้ useState และ onClick", "เมื่อกดปุ่ม setter เปลี่ยนข้อความโดยไม่ reload หน้า"],
    mistakes: ["ใส่ use client ทุกไฟล์โดยไม่จำเป็น", "import Prisma หรือ secret เข้า Client Component", "ส่ง object ใหญ่จาก server ไป client ทั้งที่ใช้เพียงสอง field"],
    summary: "เริ่มจาก Server Component แล้วเพิ่ม Client Component เฉพาะจุดที่ต้องโต้ตอบ ข้อมูลลับอยู่ฝั่ง server เสมอ และส่งไป client เท่าที่ UI ต้องใช้",
    exerciseTitle: "แยกปุ่มเปิดคำตอบออกจากหน้า Server",
    exerciseTasks: ["สร้าง Server page ที่ส่งคำตอบเป็น prop", "สร้าง AnswerToggle แบบ Client", "ใช้ state เปิดและปิดคำตอบ"],
    starterCode: `// AnswerToggle.tsx
"use client";

export default function AnswerToggle({ answer }) {
  // เพิ่ม state และปุ่ม
}`,
    quiz: [
      { question: "Component ใน App Router เป็นชนิดใดโดยค่าเริ่มต้น", options: ["Server Component", "Client Component", "CSS Component", "Database Component"], answer: 0, explanation: "หากไม่ประกาศ use client จะเป็น Server Component" },
      { question: "เมื่อใดควรใช้ Client Component", options: ["เมื่อใช้ onClick หรือ state", "เมื่อ query secret", "เมื่อเชื่อม Prisma", "ทุกไฟล์เสมอ"], answer: 0, explanation: "Event และ state ต้องทำงานใน browser" },
      { question: "สิ่งใดห้ามนำเข้า Client Component", options: ["ข้อความ title", "secret key", "boolean", "className"], answer: 1, explanation: "โค้ด client ส่งถึง browser จึงห้ามมี secret" }
    ]
  }),
  buildLesson({
    id: 603,
    slug: "nextjs-page-request-flow",
    title: "บทที่ 3: Flow เมื่อผู้ใช้เปิดหน้าเว็บ",
    subtitle: "ตามเส้นทางจาก URL ผ่าน server ไปจนเห็นหน้าและกดใช้งานได้",
    minutes: 45,
    accent: "bg-brand-700",
    objectives: ["อธิบาย request/response ได้", "เข้าใจ loading และ error state", "วางการตรวจสิทธิ์ฝั่ง server ได้"],
    concept:
      "เมื่อผู้ใช้เปิด URL เบราว์เซอร์ส่ง request ไปยัง Next.js ระบบหา route ที่ตรง ตรวจ session และโหลดข้อมูลบน server จากนั้นสร้าง response กลับมาแสดง หากมี Client Component เบราว์เซอร์จึงเชื่อม event ให้ปุ่มโต้ตอบได้ ขั้นตอนนี้เกิดเร็ว แต่การเข้าใจ flow ช่วยหาจุดที่ช้าและจุดที่ต้องรักษาความปลอดภัย",
    why:
      "ถ้าไม่รู้ว่าโค้ดทำงานที่ไหน เราอาจตรวจสิทธิ์เฉพาะปุ่มแต่ลืมกัน URL โดยตรง หรือคิดว่าหน้าค้างตอน server กำลังโหลดข้อมูล การมี loading และ error state ทำให้ผู้ใช้รู้ว่าเกิดอะไรขึ้น",
    realWorld: "เมื่อเปิด /live server ตรวจ login และ Premium ก่อน query ไลฟ์ หากไม่ผ่านจะ redirect โดยไม่ส่ง player ให้ client ส่วนหน้าที่ผ่านจึงได้รับข้อมูลสตรีม",
    diagram: "next-request-flow",
    diagramIntro: "เส้นทางเริ่มจาก Browser Request ไป Route และ Session Check จากนั้น Data Fetch และ Response เมื่อข้อมูลกลับถึง browser ผู้ใช้จึงเห็นและโต้ตอบกับหน้า",
    codeIntro: "ตัวอย่างหน้า settings ตรวจ session ก่อนอ่านข้อมูลบัญชี",
    code: `import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <h1>ตั้งค่าของ {user.name}</h1>;
}`,
    walkthrough: ["หน้าเป็น async เพราะต้องรอข้อมูล session", "getCurrentUser ทำงานบน server และคืน user หรือ null", "ถ้าไม่มี user ให้ redirect ก่อน render ข้อมูล", "เมื่อผ่านจึงใช้ข้อมูลของ user ปัจจุบันสร้างหน้า"],
    mistakes: ["ซ่อนเมนูแต่ไม่ตรวจสิทธิ์ในหน้าปลายทาง", "fetch ข้อมูลเดิมซ้ำทั้ง server และ client", "ไม่มี loading หรือข้อความ error จนผู้ใช้คิดว่าเว็บค้าง"],
    summary: "Request flow ช่วยให้วางงานถูกจุด: ตรวจสิทธิ์และโหลดข้อมูลสำคัญบน server ส่ง response ที่จำเป็น และใช้ client เฉพาะการโต้ตอบ พร้อมมี loading/error ที่สื่อสารกับผู้ใช้",
    exerciseTitle: "วาดและเขียน flow หน้าโปรไฟล์",
    exerciseTasks: ["เขียนลำดับ request ถึง response เป็น 5 ขั้น", "เพิ่ม redirect เมื่อยังไม่ login", "ระบุว่าจุดใดควรแสดง loading"],
    starterCode: `export default async function ProfilePage() {
  // 1. อ่าน session
  // 2. ตรวจสิทธิ์
  // 3. แสดงข้อมูล
}`,
    quiz: [
      { question: "ใครส่ง request เมื่อเปิด URL", options: ["Browser", "CSS", "Database row", "Git branch"], answer: 0, explanation: "Browser ขอทรัพยากรจาก server ผ่าน request" },
      { question: "ควรตรวจสิทธิ์ข้อมูลสำคัญที่ใด", options: ["ฝั่ง server", "เฉพาะสีปุ่ม", "ใน localStorage อย่างเดียว", "ในข้อความ Footer"], answer: 0, explanation: "Server ต้องตรวจสิทธิ์ก่อนส่งข้อมูลจริง" },
      { question: "loading state ช่วยอะไร", options: ["บอกผู้ใช้ว่าระบบกำลังทำงาน", "เพิ่ม secret", "เปลี่ยนฐานข้อมูล", "สร้าง Git branch"], answer: 0, explanation: "Loading ลดความสับสนระหว่างรอข้อมูลหรือเปลี่ยนหน้า" }
    ]
  })
];

export const sqlLessons: Lesson[] = [
  buildLesson({
    id: 701,
    slug: "sql-table-row-column",
    title: "บทที่ 1: ตาราง Row และ Column",
    subtitle: "มองฐานข้อมูลเป็นตารางที่มีโครงสร้างและเลือกชนิดข้อมูลให้ถูก",
    minutes: 40,
    accent: "bg-emerald-600",
    objectives: ["อธิบาย table, row และ column ได้", "รู้จัก primary key", "ออกแบบตาราง users ง่าย ๆ ได้"],
    concept:
      "ฐานข้อมูล relational เก็บข้อมูลเป็นตารางคล้าย spreadsheet แต่มีโครงสร้างชัดเจน Table คือกลุ่มข้อมูลเรื่องเดียว เช่น users Column คือคุณสมบัติ เช่น name และ email ส่วน Row คือผู้ใช้หนึ่งคน แต่ละ row ควรมี id ไม่ซ้ำเพื่อระบุตัวตนได้แน่นอน",
    why:
      "ถ้าเก็บข้อมูลทุกอย่างปนกัน เราจะค้นหา แก้ไข และป้องกันข้อมูลซ้ำยาก การออกแบบตารางดีตั้งแต่ต้นช่วยให้ระบบ Login, Payment และ Progress เชื่อมกันอย่างถูกคน",
    realWorld: "ตาราง User เก็บบัญชีหนึ่ง row ต่อคน โดยมี id, name, email และ membership ระบบใช้ email หาเจ้าของบัญชีและใช้ id เชื่อมไปข้อมูลอื่น",
    diagram: "sql-table",
    diagramIntro: "ภาพตาราง users แสดงชื่อ column ด้านบน แต่ละแถวคือ user หนึ่งคน และ id ช่วยแยกแม้ชื่อซ้ำกัน",
    codeIntro: "คำสั่งนี้สร้างตาราง users แบบย่อเพื่อเห็นชนิดข้อมูลและข้อกำหนด",
    code: `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE
);`,
    walkthrough: ["CREATE TABLE users เริ่มสร้างตารางชื่อ users", "id เป็น primary key จึงใช้ระบุแต่ละ row", "NOT NULL บอกว่าห้ามไม่มีค่า", "UNIQUE ป้องกัน email ซ้ำ และ DEFAULT กำหนดค่าเริ่มต้น"],
    mistakes: ["ไม่มี id แล้วใช้ชื่อเป็นตัวระบุทั้งที่ชื่อซ้ำได้", "เก็บตัวเลขหรือ boolean เป็นข้อความทั้งหมด", "ไม่กำหนด unique ให้ข้อมูลที่ต้องไม่ซ้ำ เช่น email"],
    summary: "Table เก็บข้อมูลเรื่องเดียว Column กำหนดคุณสมบัติ และ Row คือหนึ่งรายการ Primary key ทำให้แต่ละแถวมีตัวตนชัดเจน ส่วน constraints ช่วยรักษาคุณภาพข้อมูล",
    exerciseTitle: "ออกแบบตาราง courses",
    exerciseTasks: ["กำหนด id เป็น primary key", "เพิ่ม title, slug และ is_published", "เลือก column ที่ควร unique และอธิบายเหตุผล"],
    starterCode: `CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  -- เพิ่ม column ที่เหลือ
);`,
    quiz: [
      { question: "หนึ่ง row ในตาราง users แทนอะไร", options: ["ผู้ใช้หนึ่งคน", "ชื่อ column", "ฐานข้อมูลทั้งหมด", "คำสั่ง CSS"], answer: 0, explanation: "แต่ละ row คือหนึ่งรายการหรือหนึ่งผู้ใช้" },
      { question: "Primary key มีหน้าที่อะไร", options: ["ระบุ row แบบไม่ซ้ำ", "เปลี่ยนสีตาราง", "ซ่อน email", "สร้างหน้าเว็บ"], answer: 0, explanation: "Primary key เป็นตัวระบุเอกลักษณ์ของ row" },
      { question: "UNIQUE เหมาะกับ column ใด", options: ["email บัญชี", "ชื่อเล่นที่ซ้ำได้", "คำอธิบาย", "คะแนนที่ซ้ำได้"], answer: 0, explanation: "บัญชีไม่ควรใช้อีเมลเดียวกันซ้ำ" }
    ]
  }),
  buildLesson({
    id: 702,
    slug: "sql-table-relations",
    title: "บทที่ 2: Relation เชื่อมข้อมูลหลายตาราง",
    subtitle: "เชื่อม User กับ Payment และ Progress โดยไม่คัดลอกข้อมูลซ้ำ",
    minutes: 45,
    accent: "bg-teal-600",
    objectives: ["อธิบาย relation ได้", "เข้าใจ foreign key", "แยก one-to-many เบื้องต้นได้"],
    concept:
      "Relation คือความสัมพันธ์ระหว่างตาราง เราไม่ต้องคัดลอกชื่อและอีเมล user ลงทุก payment แต่เก็บ user_id ใน payment เพื่อชี้กลับไปยัง users.id ค่านี้เรียกว่า foreign key ความสัมพันธ์ User หนึ่งคนมี Payment ได้หลายรายการเรียกว่า one-to-many",
    why:
      "การคัดลอกข้อมูลทำให้เกิดความขัดแย้ง เช่น เปลี่ยนชื่อใน users แล้วชื่อเก่าใน payments ยังอยู่ Relation ทำให้มีแหล่งจริงเพียงจุดเดียวและเชื่อมข้อมูลเมื่อจำเป็น",
    realWorld: "User หนึ่งคนอัปโหลด PaymentSlip ได้หลายครั้ง และมี CourseProgress หลายบท แต่แต่ละ slip หรือ progress เป็นของ user เดียวผ่าน userId",
    diagram: "sql-relation",
    diagramIntro: "เส้นจาก users.id ไป payment_slips.user_id แสดงว่า payment แต่ละแถวรู้ว่าเป็นของใคร โดย user หนึ่งแถวเชื่อมได้หลาย slip",
    codeIntro: "สร้างตาราง payment_slips ที่อ้างถึง users",
    code: `CREATE TABLE payment_slips (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
    walkthrough: ["payment_slips แยกจาก users เพราะเป็นข้อมูลคนละเรื่อง", "user_id เก็บ id เจ้าของ slip", "FOREIGN KEY บังคับให้ user_id อ้างถึง users.id ที่มีจริง", "user หนึ่งคนจึงมีหลาย row ใน payment_slips ได้"],
    mistakes: ["เก็บ email ซ้ำในทุกตารางแทน user_id", "สร้าง foreign key แต่ใช้ชนิดข้อมูลไม่ตรงกับ primary key", "ลบ parent โดยไม่คิดว่าจะจัดการข้อมูลลูกอย่างไร"],
    summary: "Relation เชื่อมข้อมูลโดยใช้ primary key และ foreign key ช่วยลดข้อมูลซ้ำและรักษาความถูกต้อง ก่อนสร้าง relation ให้ถามว่า หนึ่งรายการฝั่งนี้เชื่อมอีกฝั่งได้กี่รายการ",
    exerciseTitle: "ออกแบบ relation User กับ CourseProgress",
    exerciseTasks: ["กำหนด user_id และ course_id", "อธิบายความสัมพันธ์ของแต่ละฝั่ง", "เพิ่ม unique ที่ป้องกัน progress ซ้ำของ user กับ course เดิม"],
    starterCode: `CREATE TABLE course_progress (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL
  -- เพิ่ม foreign keys
);`,
    quiz: [
      { question: "Foreign key ใช้ทำอะไร", options: ["อ้างถึง row ในอีกตาราง", "กำหนดสี", "บีบอัดรูป", "สร้าง component"], answer: 0, explanation: "Foreign key เชื่อม record ไปยัง primary key ของอีกตาราง" },
      { question: "User หนึ่งคนมีหลาย PaymentSlip เป็น relation แบบใด", options: ["one-to-many", "one-to-one เท่านั้น", "ไม่มี relation", "CSS grid"], answer: 0, explanation: "หนึ่ง user เชื่อม payment ได้หลายแถว" },
      { question: "เหตุผลที่เก็บ user_id แทนอีเมลซ้ำคืออะไร", options: ["ลดข้อมูลซ้ำและเชื่อมชัดเจน", "ทำให้รูปใหญ่ขึ้น", "ซ่อนตาราง", "ใช้แทน password"], answer: 0, explanation: "id เป็นตัวอ้างอิงคงที่และลดข้อมูลซ้ำ" }
    ]
  }),
  buildLesson({
    id: 703,
    slug: "sql-select-query",
    title: "บทที่ 3: ค้นข้อมูลด้วย SELECT",
    subtitle: "เลือก column กรอง row และเรียงผลลัพธ์จากฐานข้อมูล",
    minutes: 45,
    accent: "bg-cyan-700",
    objectives: ["เขียน SELECT พื้นฐานได้", "กรองด้วย WHERE ได้", "เรียงด้วย ORDER BY ได้"],
    concept:
      "Query คือคำสั่งที่ใช้คุยกับฐานข้อมูล SELECT ใช้อ่านข้อมูล FROM บอกตาราง WHERE กรองเฉพาะ row ที่ตรงเงื่อนไข และ ORDER BY เรียงผลลัพธ์ เราควรเลือกเฉพาะ column ที่ใช้แทน SELECT * เมื่อข้อมูลอาจมี field ลับหรือมีขนาดใหญ่",
    why:
      "หน้าเว็บไม่ควรโหลดข้อมูลทั้งหมดทุกครั้ง Query ที่ชัดเจนช่วยให้เร็ว ปลอดภัย และอ่านง่าย โดยเฉพาะหน้า Admin ที่ต้องเลือกเฉพาะสมาชิก Free หรือรายการสลิป pending",
    realWorld: "กระดิ่งแจ้งเตือน query เฉพาะ notification ของ user ปัจจุบัน เรียงใหม่สุดก่อน และเลือก title, message, link โดยไม่ส่งข้อมูลของคนอื่น",
    diagram: "sql-query",
    diagramIntro: "ภาพแสดงตารางต้นทาง ผ่านตัวกรอง membership = free แล้วเหลือผลลัพธ์เฉพาะชื่อกับอีเมลที่เราขอ",
    codeIntro: "ค้นหาสมาชิก Free และเรียงผู้สมัครใหม่ก่อน",
    code: `SELECT name, email, created_at
FROM users
WHERE membership = 'free'
ORDER BY created_at DESC
LIMIT 10;`,
    walkthrough: ["SELECT ระบุสาม column ที่ต้องการ", "FROM users เลือกตารางต้นทาง", "WHERE เก็บเฉพาะสมาชิก free", "ORDER BY DESC เรียงใหม่ไปเก่า และ LIMIT จำกัดสิบรายการ"],
    mistakes: ["ลืม WHERE ในคำสั่งที่ตั้งใจกรองหรือแก้ข้อมูล", "ใช้ SELECT * ทั้งที่ต้องการเพียงสอง column", "ต่อค่าจากผู้ใช้เข้า SQL ตรง ๆ จนเสี่ยง SQL injection แทนการใช้ parameter"],
    summary: "อ่าน SELECT จากบนลงล่างว่า ต้องการอะไร จากตารางไหน ภายใต้เงื่อนไขใด และเรียงอย่างไร เลือกข้อมูลเท่าที่ใช้และส่งค่าผู้ใช้ผ่าน parameter เสมอ",
    exerciseTitle: "ค้นคอร์สที่เผยแพร่แล้ว",
    exerciseTasks: ["เลือก title กับ slug จาก courses", "กรอง is_published เป็น true", "เรียง title A-Z และจำกัด 5 รายการ"],
    starterCode: `SELECT title, slug
FROM courses
-- เพิ่ม WHERE, ORDER BY และ LIMIT`,
    quiz: [
      { question: "WHERE ทำหน้าที่อะไร", options: ["กรอง row", "เปลี่ยนสี", "สร้าง table เสมอ", "เชื่อม CSS"], answer: 0, explanation: "WHERE เลือกเฉพาะ row ที่ตรงเงื่อนไข" },
      { question: "DESC เรียงวันที่แบบใด", options: ["ใหม่ไปเก่า", "เก่าไปใหม่เสมอ", "สุ่ม", "ไม่เรียง"], answer: 0, explanation: "Descending เรียงค่ามากไปน้อย จึงมักเป็นวันใหม่ไปเก่า" },
      { question: "เหตุใดควรหลีกเลี่ยง SELECT * บางกรณี", options: ["อาจโหลด field เกินจำเป็น", "SQL ห้ามใช้", "ทำให้ไม่มี row", "ใช้ได้กับ CSS เท่านั้น"], answer: 0, explanation: "การระบุ column ลดข้อมูลเกินจำเป็นและความเสี่ยงเปิดเผย field ที่ไม่ใช้" }
    ]
  })
];

export const realWebProjectLessons: Lesson[] = [
  buildLesson({
    id: 801,
    slug: "project-roadmap",
    title: "บทที่ 1: วาง Roadmap ก่อนเริ่มทำเว็บ",
    subtitle: "เปลี่ยนไอเดียกว้าง ๆ ให้เป็นงานเล็กที่ทำและตรวจได้ทีละขั้น",
    minutes: 40,
    accent: "bg-amber-500",
    objectives: ["เขียนเป้าหมายโปรเจกต์ได้", "แบ่ง MVP เป็นขั้นได้", "จัดลำดับงานก่อนหลังได้"],
    concept:
      "Roadmap คือแผนเดินทางของโปรเจกต์ ไม่ใช่รายการความฝันทั้งหมด เราเริ่มจากปัญหาที่เว็บจะแก้ กำหนดผู้ใช้ แล้วเลือกฟีเจอร์ขั้นต่ำหรือ MVP ที่ทำให้ผู้ใช้ทำงานหลักได้ครบ เช่น สมัคร เลือกคอร์ส และเรียนบทแรก จากนั้นแบ่งเป็นช่วงออกแบบ สร้าง ทดสอบ และนำขึ้นออนไลน์",
    why:
      "มือใหม่มักเริ่มเขียนโค้ดทันที แล้วพบว่าหน้าเชื่อมกันไม่ลงตัวหรือทำฟีเจอร์ใหญ่เกินเวลา Roadmap ช่วยให้เห็นงานที่ต้องมาก่อน เช่น ต้องมีข้อมูลคอร์สก่อนจะแสดงการ์ด และต้องมี auth ก่อนหน้าที่ป้องกันสิทธิ์",
    realWorld: "เว็บคอร์สรุ่นแรกอาจมี Home, Courses, Login และ Lesson ก่อน ส่วนระบบไลฟ์ notification และ payment gateway เป็นรอบถัดไปเมื่อเส้นทางหลักใช้งานได้",
    diagram: "project-roadmap",
    diagramIntro: "Roadmap เดินจากเป้าหมายไป MVP แล้วผ่าน Design, Build, Test และ Deploy แต่ละช่วงมีผลลัพธ์เล็กที่ตรวจได้ก่อนขยับต่อ",
    codeIntro: "เราเก็บ roadmap เป็น checklist ใน README เพื่อให้ทีมเห็นสถานะเดียวกัน",
    code: `## MVP เว็บคอร์ส

- [x] กำหนดผู้ใช้และเป้าหมาย
- [x] ออกแบบหน้า Home และ Courses
- [ ] สร้าง Login และ Session
- [ ] สร้างหน้า Lesson
- [ ] ทดสอบบนมือถือ
- [ ] Deploy รุ่นแรก`,
    walkthrough: ["หัวข้อบอกขอบเขตว่าเป็น MVP ไม่ใช่ระบบสุดท้าย", "งานแต่ละบรรทัดเล็กพอที่จะเช็กเสร็จได้", "เรียงงานตาม dependency เช่น Login มาก่อนหน้าส่วนตัว", "สถานะช่วยให้รู้ว่างานต่อไปคืออะไรโดยไม่เดา"],
    mistakes: ["ใส่ทุกฟีเจอร์ใน MVP จนไม่มีวันเสร็จ", "เขียนงานกว้าง เช่น ทำเว็บ โดยไม่มีผลลัพธ์ที่ตรวจได้", "ไม่เผื่อขั้นทดสอบ responsive และ error state"],
    summary: "Roadmap ที่ดีตอบว่าเว็บช่วยใคร ทำงานหลักอะไร และเราจะสร้างตามลำดับใด เริ่ม MVP ให้เล็ก ทำแต่ละช่วงให้จบ แล้วค่อยเพิ่มฟีเจอร์จากข้อมูลผู้ใช้จริง",
    exerciseTitle: "วาง Roadmap เว็บชมรม",
    exerciseTasks: ["เขียนผู้ใช้เป้าหมายหนึ่งกลุ่ม", "เลือกฟีเจอร์ MVP ไม่เกิน 4 อย่าง", "แบ่งงานเป็น Design, Build, Test และ Deploy"],
    starterCode: `## เป้าหมาย
...

## MVP
- [ ] ...

## ขั้นตอน
1. Design
2. Build
3. Test
4. Deploy`,
    quiz: [
      { question: "MVP คืออะไร", options: ["รุ่นเล็กสุดที่ทำงานหลักได้ครบ", "เว็บที่มีทุกฟีเจอร์", "รูปโลโก้", "ฐานข้อมูลอย่างเดียว"], answer: 0, explanation: "MVP เน้นคุณค่าหลักที่ใช้งานได้จริงด้วยขอบเขตเล็ก" },
      { question: "Roadmap ช่วยเรื่องใด", options: ["จัดลำดับและเห็นขอบเขต", "แทนการทดสอบ", "ซ่อน bug", "สร้างรหัสผ่าน"], answer: 0, explanation: "Roadmap ทำให้ทีมเห็นลำดับและผลลัพธ์แต่ละช่วง" },
      { question: "งานข้อใดชัดเจนกว่า", options: ["ทำเว็บ", "สร้างหน้า Courses ที่แสดงการ์ด 3 ใบ", "ทำให้ดี", "ปรับทุกอย่าง"], answer: 1, explanation: "งานที่มีขอบเขตและผลลัพธ์ชัดสามารถทำและตรวจได้" }
    ]
  }),
  buildLesson({
    id: 802,
    slug: "project-sitemap-pages",
    title: "บทที่ 2: Sitemap และหน้าที่ของแต่ละหน้า",
    subtitle: "จัดเส้นทาง Home, Courses, Payment และ Dashboard ให้ผู้ใช้ไม่หลง",
    minutes: 40,
    accent: "bg-orange-500",
    objectives: ["สร้าง sitemap ได้", "กำหนดหน้าที่แต่ละหน้าได้", "วาง navigation หลักได้"],
    concept:
      "Sitemap คือแผนผังหน้าทั้งหมดและความสัมพันธ์ระหว่างหน้า ไม่จำเป็นต้องสวย แต่ต้องตอบว่าผู้ใช้เริ่มที่ไหน ไปต่อทางไหน และกลับอย่างไร หน้าแต่ละหน้าควรมีเป้าหมายหลักหนึ่งเรื่อง เช่น Courses ช่วยเลือกคอร์ส ส่วน Dashboard ช่วยกลับมาเรียนต่อ",
    why:
      "ถ้าเพิ่มหน้าไปเรื่อย ๆ โดยไม่มีแผน เมนูจะรก ลิงก์ซ้ำ และผู้ใช้หลง Sitemap ช่วยพบหน้าที่ขาด เช่น หลังจ่ายแล้วไปไหน หรือผู้ใช้ยังไม่ login เจออะไร",
    realWorld: "ผู้ใช้เข้าจาก Home ไป Courses เลือกคอร์ส ถ้าบทล็อกจึงไป Payment เมื่อเป็น Premium แล้วกลับ Dashboard เพื่อเรียนต่อ ส่วน Help เข้าถึงได้จากหลายหน้า",
    diagram: "project-sitemap",
    diagramIntro: "Home เป็นจุดเริ่ม แล้วแตกไป Courses, Login และ Help จาก Courses เชื่อม Course Detail และ Lesson ส่วน Dashboard เป็นศูนย์กลางหลังเข้าสู่ระบบ",
    codeIntro: "ใน Next.js เราแปลง sitemap เป็นโฟลเดอร์ route ที่อ่านตามแผนได้",
    code: `app/
├─ page.tsx                 # Home
├─ courses/
│  ├─ page.tsx             # รายการคอร์ส
│  └─ [slug]/page.tsx      # รายละเอียดคอร์ส
├─ lessons/[slug]/page.tsx # หน้าเรียน
├─ payment/page.tsx
├─ dashboard/page.tsx
└─ help/page.tsx`,
    walkthrough: ["Home ให้ภาพรวมและ CTA ไป Courses", "Courses แยกรายการออกจากหน้ารายละเอียดด้วย dynamic slug", "Lesson ใช้ slug เพื่อรองรับหลายบทในโครงเดียว", "Payment, Dashboard และ Help เป็นเส้นทางชัดที่ลิงก์ถึงได้"],
    mistakes: ["ให้ทุกหน้าอยู่ใน Navbar จนมือถือแน่น", "หน้าเดียวมีหลายเป้าหมายจน CTA แข่งกัน", "สร้างทางไปแต่ไม่มีทางกลับหรือ breadcrumb"],
    summary: "Sitemap เป็นสะพานระหว่างเป้าหมายผู้ใช้กับโครงสร้างโค้ด จำกัดหน้าที่หลักต่อหน้า วางทางไปและทางกลับ แล้วค่อยแปลงเป็น route",
    exerciseTitle: "ออกแบบ Sitemap เว็บพอร์ตโฟลิโอ",
    exerciseTasks: ["กำหนด Home เป็นจุดเริ่ม", "เพิ่ม Projects, Project Detail, About และ Contact", "วาดลูกศรเส้นทางที่ผู้ใช้กดได้"],
    starterCode: `Home
├─ ...
├─ ...
└─ ...`,
    quiz: [
      { question: "Sitemap แสดงอะไร", options: ["หน้าต่าง ๆ และความสัมพันธ์", "สี CSS เท่านั้น", "password", "commit history"], answer: 0, explanation: "Sitemap วางโครงหน้ากับเส้นทางเชื่อมกัน" },
      { question: "หน้า Courses ควรมีเป้าหมายหลักใด", options: ["ช่วยเลือกคอร์ส", "แก้ฐานข้อมูล", "เปลี่ยน password admin", "ซ่อน Navbar"], answer: 0, explanation: "หน้ารายการคอร์สช่วยค้นและเลือกเส้นทางเรียน" },
      { question: "เหตุใดไม่ควรใส่ทุกหน้าใน Navbar", options: ["เมนูจะรกโดยเฉพาะมือถือ", "Next.js ห้าม", "CSS จะหาย", "ฐานข้อมูลจะลบ"], answer: 0, explanation: "Navigation หลักควรเน้นเส้นทางสำคัญ ส่วนหน้าอื่นอยู่ในเมนูย่อยหรือ Footer" }
    ]
  }),
  buildLesson({
    id: 803,
    slug: "project-user-flow",
    title: "บทที่ 3: User Flow จากสมัครจนเริ่มเรียน",
    subtitle: "เชื่อมหน้าและสถานะให้ผู้ใช้ทำเป้าหมายสำเร็จโดยไม่ติดทางตัน",
    minutes: 50,
    accent: "bg-brand-700",
    objectives: ["เขียน user flow ได้", "ระบุ success/error state ได้", "ตรวจสิทธิ์ในจุดสำคัญได้"],
    concept:
      "User Flow คือเส้นทางการทำงานหนึ่งเป้าหมายของผู้ใช้ ต่างจาก sitemap ที่มองทุกหน้า Flow จะตามเหตุการณ์และเงื่อนไข เช่น สมัครสำเร็จหรือไม่ เป็น Free หรือ Premium ชำระเงินสำเร็จหรือยัง ทุกทางควรมีข้อความและขั้นต่อไป ไม่ปล่อยให้ผู้ใช้เจอหน้าว่าง",
    why:
      "เว็บอาจมีหน้าสวยครบ แต่ถ้า Login แล้วไม่รู้ไปไหน หรือจ่ายแล้วไม่มีสถานะ ผู้ใช้จะรู้สึกว่าระบบพัง การวาด flow ก่อนเขียนช่วยพบเงื่อนไขและ error state ที่มักถูกลืม",
    realWorld: "ผู้ใช้สมัครและ login เลือกคอร์ส หากบทฟรีเปิดได้ทันที หากบท Premium ให้ไป payment หลัง webhook ยืนยันจึงอัปเกรด แล้ว Dashboard แสดงบทที่เรียนต่อได้",
    diagram: "project-user-flow",
    diagramIntro: "Flow หลักเดินจาก Register ไป Login, Course, Payment และ Lesson โดยมีจุดตัดสินใจเรื่อง Premium และสถานะชำระเงิน พร้อมทางกลับเมื่อยังไม่สำเร็จ",
    codeIntro: "pseudo-code นี้ช่วยแปลง flow เป็นกติกาฝั่ง server ก่อนลงรายละเอียด framework",
    code: `async function openLesson(user, lesson) {
  if (!user) return redirect("/login");

  const canLearn = lesson.isFree || user.isPremium || user.isAdmin;
  if (!canLearn) return redirect("/payment");

  return showLesson(lesson);
}`,
    walkthrough: ["ตรวจ login ก่อน เพราะยังไม่รู้ว่าใครกำลังเข้า", "คำนวณสิทธิ์จากบทฟรี Premium หรือ Admin", "ถ้าไม่มีสิทธิ์ส่งไปขั้นอัปเกรด", "ส่งเนื้อหาจริงเมื่อผ่านกติกาฝั่ง server เท่านั้น"],
    mistakes: ["ซ่อนปุ่มแต่ไม่กัน URL โดยตรง", "เชื่อ client ว่าจ่ายสำเร็จโดยไม่ตรวจ webhook/provider", "ไม่มีทางลองใหม่เมื่อส่งฟอร์มหรือชำระล้มเหลว"],
    summary: "User Flow มองงานจากสายตาผู้ใช้และรวมเงื่อนไขทุกจุด สำหรับแต่ละขั้นให้ระบุ input, success, error และ next action จากนั้นบังคับสิทธิ์จริงบน server ไม่ใช่แค่ UI",
    exerciseTitle: "เขียน Flow การส่งแบบทดสอบ",
    exerciseTasks: ["เริ่มจากผู้ใช้เปิดบทเรียน", "เพิ่มเงื่อนไขตอบครบหรือยังและคะแนนผ่านหรือไม่", "กำหนดข้อความกับปุ่มสำหรับ success และ error"],
    starterCode: `เปิดบทเรียน
  ↓
ตอบ Quiz
  ↓
[ตอบครบหรือยัง?]
  ├─ ไม่ครบ → ...
  └─ ครบ → ...`,
    quiz: [
      { question: "User Flow เน้นอะไร", options: ["เส้นทางเพื่อทำหนึ่งเป้าหมาย", "รายการสีทั้งหมด", "โครง database อย่างเดียว", "ประวัติ Git"], answer: 0, explanation: "User Flow ตามเหตุการณ์และเงื่อนไขจนผู้ใช้ทำเป้าหมายสำเร็จ" },
      { question: "การกัน Premium ที่ปลอดภัยต้องทำที่ใด", options: ["ฝั่ง server", "แค่ซ่อนปุ่ม", "เปลี่ยนข้อความ", "localStorage เท่านั้น"], answer: 0, explanation: "Server ต้องตรวจสิทธิ์ก่อนส่งเนื้อหาจริง" },
      { question: "ทุก error state ควรมีอะไร", options: ["คำอธิบายและทางไปต่อ", "หน้าว่าง", "secret key", "การ reload ไม่สิ้นสุด"], answer: 0, explanation: "ข้อความที่ชัดและ next action ช่วยผู้ใช้แก้สถานการณ์ได้" }
    ]
  })
];

export const upcomingLessons: Lesson[] = [
  ...htmlLessons,
  ...cssLessons,
  ...gitLessons,
  ...reactLessons,
  ...nextjsLessons,
  ...sqlLessons,
  ...realWebProjectLessons
];
