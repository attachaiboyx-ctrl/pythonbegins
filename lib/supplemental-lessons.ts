import type { Lesson, LessonDiagramType } from "@/lib/lessons";

type CompactLesson = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  concept: string;
  realWorld: string;
  code: string;
  walkthrough: string[];
  mistake: string;
  practice: string;
  diagram?: LessonDiagramType;
  accent?: string;
  purchaseCourseSlug?: string;
};

function makeLesson(input: CompactLesson): Lesson {
  const goodPractice = `ทดลอง ${input.title} ทีละส่วน แล้วตรวจผลลัพธ์ก่อนเพิ่มส่วนถัดไป`;

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    minutes: 35,
    free: false,
    badge: input.purchaseCourseSlug ? "Landing" : "Premium",
    accent: input.accent || "bg-brand-600",
    purchaseCourseSlug: input.purchaseCourseSlug,
    objectives: [
      `อธิบาย ${input.title} ด้วยภาษาของตัวเองได้`,
      "อ่านตัวอย่างและบอกหน้าที่ของแต่ละส่วนได้",
      "นำแนวคิดไปทำแบบฝึกหัดขนาดเล็กได้"
    ],
    sections: [
      { heading: "เรื่องนี้คืออะไร", body: input.concept },
      {
        heading: "ทำไมต้องเรียน และใช้ในเว็บจริงอย่างไร",
        body: `${input.title} เป็นชิ้นส่วนหนึ่งของการทำเว็บที่ใช้งานได้จริง เมื่อเข้าใจส่วนนี้ เราจะอ่านโค้ดเดิมและต่อยอดงานได้เป็นขั้นตอน\n\nตัวอย่างในเว็บจริง: ${input.realWorld}`,
        diagram: input.diagram
      },
      {
        heading: "ตัวอย่างโค้ดที่ลองได้",
        body: "อ่านโค้ดจากบนลงล่าง ลองเดาผลลัพธ์ก่อน แล้วจึงคัดลอกไปทดลองในโปรเจกต์ฝึกของตัวเอง",
        code: input.code
      },
      {
        heading: "อธิบายโค้ดทีละส่วน",
        body: input.walkthrough.map((step, index) => `${index + 1}. ${step}`).join("\n")
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: `• ${input.mistake}\n• รีบเขียนหลายส่วนพร้อมกันจนไม่รู้ว่าปัญหาเริ่มจากบรรทัดใด\n• ไม่ทดสอบบนข้อมูลหรือขนาดหน้าจอที่ต่างกัน`
      },
      {
        heading: "สรุปท้ายบท",
        body: `${input.concept} หลักสำคัญคือเริ่มจากตัวอย่างเล็ก ตรวจผล แล้วค่อยเพิ่มความซับซ้อน`
      }
    ],
    exercise: {
      title: `ลงมือทำ: ${input.title}`,
      tasks: [input.practice, "เปลี่ยนข้อมูลตัวอย่างให้เป็นข้อมูลของตัวเอง", "ทดลองทำให้ผิดหนึ่งจุด แล้วอ่านอาการก่อนแก้กลับ"],
      starterCode: input.code
    },
    quiz: [
      {
        question: `ข้อใดอธิบาย ${input.title} ได้เหมาะที่สุด`,
        options: [input.concept, "เป็นเพียงการตกแต่งที่ไม่มีผลกับเว็บ", "ใช้ได้เฉพาะโปรเจกต์ขนาดใหญ่"],
        answer: 0,
        explanation: input.concept
      },
      {
        question: `แนวทางใดเหมาะกับผู้เริ่มต้นเมื่อฝึก ${input.title}`,
        options: ["เขียนทั้งหมดในครั้งเดียว", goodPractice, "ข้ามการทดสอบเพื่อประหยัดเวลา"],
        answer: 1,
        explanation: goodPractice
      },
      {
        question: "แบบฝึกหัดใดสอดคล้องกับบทนี้มากที่สุด",
        options: ["เปลี่ยนรหัสผ่านฐานข้อมูล", "ติดตั้ง package โดยไม่อ่านเอกสาร", input.practice],
        answer: 2,
        explanation: input.practice
      }
    ]
  };
}

export const htmlSupplementalLessons: Lesson[] = [
  makeLesson({ id: 204, slug: "html-text-formatting", title: "Heading, Paragraph และ Text Formatting", subtitle: "จัดลำดับข้อความและเน้นส่วนสำคัญให้คนอ่านเข้าใจง่าย", concept: "Heading ใช้สร้างลำดับหัวข้อ Paragraph ใช้แบ่งย่อหน้า และแท็กอย่าง strong หรือ em ใช้บอกความสำคัญของข้อความ ไม่ควรเลือกแท็กเพียงเพราะหน้าตาใหญ่หรือหนา", realWorld: "หน้าบทความใช้ h1 เป็นชื่อเรื่อง h2 แบ่งหัวข้อ และ strong เน้นคำเตือน", code: `<h1>คอร์สทำเว็บสำหรับมือใหม่</h1>\n<p>เริ่มจาก <strong>พื้นฐาน</strong> แล้วฝึกทีละขั้น</p>\n<p><em>ทดลองเขียนด้วยตัวเอง</em> จะช่วยให้จำได้ดีขึ้น</p>`, walkthrough: ["h1 เป็นหัวข้อหลักของหน้า", "p แบ่งเนื้อหาเป็นย่อหน้า", "strong และ em เพิ่มความหมาย ไม่ใช่แค่เปลี่ยนหน้าตา"], mistake: "ข้ามลำดับจาก h1 ไป h4 หรือใช้ heading เพื่อทำตัวหนังสือใหญ่", practice: "สร้างบทความสั้นที่มี h1, h2, p, strong และ em", diagram: "html-page-elements", accent: "bg-orange-500" }),
  makeLesson({ id: 205, slug: "html-list-table", title: "List และ Table", subtitle: "แสดงรายการและข้อมูลที่ต้องเปรียบเทียบอย่างเป็นระเบียบ", concept: "List เหมาะกับข้อมูลเป็นข้อ ๆ ส่วน Table เหมาะกับข้อมูลที่มีหัวคอลัมน์และต้องเปรียบเทียบกัน แท็กควรสะท้อนชนิดข้อมูลจริง", realWorld: "รายการจุดเด่นใช้ ul ส่วนตารางราคาใช้ table, thead และ tbody", code: `<ul>\n  <li>HTML พื้นฐาน</li>\n  <li>CSS พื้นฐาน</li>\n</ul>\n<table>\n  <tr><th>คอร์ส</th><th>บท</th></tr>\n  <tr><td>HTML</td><td>8</td></tr>\n</table>`, walkthrough: ["ul ครอบรายการที่ไม่ต้องเรียงลำดับ", "li คือหนึ่งรายการ", "th เป็นหัวตารางและ td เป็นข้อมูล"], mistake: "ใช้ table เพื่อจัด layout ทั้งหน้าแทนข้อมูลแบบตาราง", practice: "สร้างรายการทักษะและตารางแผนเรียนสองคอลัมน์", accent: "bg-amber-500" }),
  makeLesson({ id: 206, slug: "semantic-html", title: "Semantic HTML", subtitle: "เลือกแท็กที่บอกความหมายของส่วนต่าง ๆ ในหน้าเว็บ", concept: "Semantic HTML คือการใช้แท็กที่บอกหน้าที่ เช่น header, nav, main, article และ footer แทนการใช้ div ทุกจุด ทำให้คนอ่านโค้ดและโปรแกรมช่วยการเข้าถึงเข้าใจโครงสร้างได้ดีขึ้น", realWorld: "หน้า course detail ใช้ main ครอบเนื้อหาหลัก nav ครอบเมนู และ article ครอบบทเรียนหนึ่งรายการ", code: `<header>โลโก้และชื่อเว็บ</header>\n<nav>เมนูหลัก</nav>\n<main>\n  <article>เนื้อหาคอร์ส</article>\n</main>\n<footer>ช่องทางติดต่อ</footer>`, walkthrough: ["header คือส่วนแนะนำด้านบน", "main คือเนื้อหาหลักที่มีเพียงหนึ่งส่วนต่อหน้า", "footer เก็บข้อมูลท้ายหน้า"], mistake: "ใช้ div ทุกส่วนจนมองโครงสร้างไม่ออก", practice: "เปลี่ยนหน้าเดิมที่ใช้ div ให้เป็น header, nav, main และ footer", diagram: "html-document", accent: "bg-rose-500" }),
  makeLesson({ id: 207, slug: "html-page-layout", title: "การจัดโครงหน้าเว็บแบบพื้นฐาน", subtitle: "วางส่วนหัว เนื้อหา และท้ายหน้าให้พร้อมตกแต่งด้วย CSS", concept: "การจัดโครงหน้าเริ่มจากแบ่งข้อมูลเป็น section ที่มีเป้าหมายชัด แล้วเรียงจากสิ่งสำคัญไปหารายละเอียด HTML ทำหน้าที่กำหนดโครง ส่วน CSS จะจัดตำแหน่งภายหลัง", realWorld: "Landing page มักเรียง Navbar, Hero, จุดเด่น, ราคา, ติดต่อ และ Footer", code: `<body>\n  <header>...</header>\n  <main>\n    <section id="hero">...</section>\n    <section id="features">...</section>\n    <section id="contact">...</section>\n  </main>\n  <footer>...</footer>\n</body>`, walkthrough: ["header แยกส่วนหัว", "แต่ละ section มี id สำหรับลิงก์และ CSS", "footer ปิดท้ายหน้า"], mistake: "สร้าง section ย่อยจำนวนมากโดยไม่มีหัวข้อหรือเป้าหมาย", practice: "ร่างโครงหน้าแนะนำตัวด้วยอย่างน้อยสาม section", diagram: "project-sitemap", accent: "bg-orange-600" }),
  makeLesson({ id: 208, slug: "html-profile-project", title: "Mini Project: หน้าโปรไฟล์อย่างง่าย", subtitle: "รวมแท็ก HTML สร้างหน้าแนะนำตัวที่เปิดใช้งานได้จริง", concept: "โปรเจกต์นี้รวมโครงเอกสาร heading, link, list, image, semantic HTML และ form ให้เป็นหน้าเดียว เป้าหมายคือสร้างโครงที่ครบก่อนตกแต่ง", realWorld: "หน้าโปรไฟล์ใช้เป็นจุดเริ่มของ portfolio หรือหน้าแนะนำสมาชิกทีม", code: `<main>\n  <section>\n    <h1>สวัสดี ฉันชื่อเมย์</h1>\n    <p>กำลังฝึกทำเว็บไซต์</p>\n    <ul><li>HTML</li><li>CSS</li></ul>\n    <a href="mailto:may@example.com">ติดต่อฉัน</a>\n  </section>\n</main>`, walkthrough: ["main ครอบเนื้อหาหลัก", "ข้อมูลแนะนำตัวอยู่ใน section เดียว", "mailto สร้างลิงก์เปิดโปรแกรมอีเมล"], mistake: "เริ่มตกแต่งก่อนโครงข้อมูลครบจนต้องรื้อหลายรอบ", practice: "สร้างหน้าโปรไฟล์ของตัวเองที่มีแนะนำตัว ทักษะ และช่องทางติดต่อ", diagram: "html-page-elements", accent: "bg-orange-700" })
];

export const cssSupplementalLessons: Lesson[] = [
  makeLesson({ id: 304, slug: "css-introduction", title: "CSS คืออะไร และการเชื่อม CSS", subtitle: "แยกหน้าตาออกจากโครง HTML และเชื่อมไฟล์ stylesheet", concept: "CSS ใช้กำหนดสี ฟอนต์ ระยะ และ layout ของ HTML วิธีที่ดูแลง่ายคือแยกเป็นไฟล์ styles.css แล้วเชื่อมผ่าน link ใน head", realWorld: "ทุกหน้าของเว็บใช้ stylesheet ร่วมกันเพื่อให้สีและปุ่มเป็นระบบเดียวกัน", code: `<link rel="stylesheet" href="styles.css" />\n\n/* styles.css */\nbody {\n  color: #172554;\n  background: #f8fafc;\n}`, walkthrough: ["link อยู่ใน head", "href ชี้ตำแหน่งไฟล์ CSS", "body selector เลือกเนื้อหาทั้งหน้า"], mistake: "สะกดชื่อไฟล์หรือ path ไม่ตรง ทำให้ CSS ไม่ถูกโหลด", practice: "สร้าง styles.css แล้วเปลี่ยนสีข้อความและพื้นหลังหน้า", accent: "bg-sky-500" }),
  makeLesson({ id: 305, slug: "css-color-font-spacing", title: "Color, Font และ Spacing", subtitle: "สร้างลำดับสายตาด้วยสี ตัวอักษร และช่องว่าง", concept: "สีช่วยสื่อสถานะ ฟอนต์ช่วยสร้างลำดับ และ spacing ช่วยให้เนื้อหาไม่อึดอัด ควรเลือกค่าจำนวนน้อยแล้วใช้ซ้ำอย่างสม่ำเสมอ", realWorld: "ปุ่มหลักใช้สีแบรนด์ หัวข้อใหญ่กว่าคำอธิบาย และการ์ดมี padding เท่ากัน", code: `.card {\n  color: #1e293b;\n  font-family: sans-serif;\n  line-height: 1.7;\n  padding: 24px;\n  margin-bottom: 16px;\n}`, walkthrough: ["color เปลี่ยนสีข้อความ", "line-height เพิ่มพื้นที่ระหว่างบรรทัด", "padding เว้นด้านในและ margin เว้นด้านนอก"], mistake: "ใช้สีและขนาดมากเกินจนหน้าไม่มีลำดับ", practice: "กำหนดชุดสี 3 สีและ spacing 8, 16, 24px ให้หน้าโปรไฟล์", accent: "bg-blue-500" }),
  makeLesson({ id: 306, slug: "css-display-position", title: "Display และ Position เบื้องต้น", subtitle: "เข้าใจการไหลของกล่องและการวาง element แบบมีเหตุผล", concept: "display กำหนดรูปแบบกล่อง เช่น block, inline หรือ none ส่วน position ใช้ปรับตำแหน่งเมื่อ layout ปกติไม่พอ ควรเริ่มจาก flow ปกติก่อนใช้ absolute", realWorld: "badge มุมการ์ดใช้ absolute ภายในการ์ดที่เป็น relative", code: `.card { position: relative; display: block; }\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}`, walkthrough: ["relative สร้างกรอบอ้างอิง", "absolute นำ badge ออกจาก flow", "top และ right กำหนดระยะจากขอบ"], mistake: "ใช้ absolute จัดทั้งหน้า ทำให้จอเล็กซ้อนทับกัน", practice: "วาง badge ที่มุมขวาบนของการ์ดโดยไม่บังข้อความ", accent: "bg-indigo-500" }),
  makeLesson({ id: 307, slug: "css-hover-transition", title: "Hover, Transition และ Effect ง่าย ๆ", subtitle: "เพิ่ม feedback ที่นุ่มและไม่รบกวนผู้ใช้", concept: "hover เปลี่ยน style เมื่อชี้เมาส์ และ transition ทำให้การเปลี่ยนนุ่มขึ้น Effect ควรช่วยบอกว่าสิ่งใดกดได้ ไม่ควรเคลื่อนไหวแรงเกิน", realWorld: "การ์ดยกขึ้นเล็กน้อยและปุ่มเปลี่ยนสีเมื่อ hover", code: `.button {\n  background: #2563eb;\n  transition: transform 180ms ease, background 180ms ease;\n}\n.button:hover {\n  background: #1d4ed8;\n  transform: translateY(-2px);\n}`, walkthrough: ["transition ระบุ property และเวลา", "hover ทำงานเมื่อเมาส์อยู่เหนือปุ่ม", "translateY ขยับเพียงเล็กน้อย"], mistake: "ใช้ transition: all และ effect ใหญ่จนหน้าเวียนหัว", practice: "เพิ่ม hover และ transition ให้ปุ่มกับการ์ดอย่างละหนึ่งแบบ", accent: "bg-violet-500" }),
  makeLesson({ id: 308, slug: "css-profile-project", title: "Mini Project: แต่งหน้าโปรไฟล์ให้สวยขึ้น", subtitle: "รวมสี ฟอนต์ Box Model Flexbox และ Responsive", concept: "โปรเจกต์นี้นำหน้า HTML เดิมมาตกแต่งเป็น profile card ที่อ่านง่ายบนมือถือและ desktop โดยเริ่มจาก spacing ก่อนเพิ่ม effect", realWorld: "รูปแบบเดียวกันใช้กับหน้าแนะนำทีมและ portfolio card", code: `.profile {\n  max-width: 720px;\n  margin: 32px auto;\n  padding: 24px;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n  background: white;\n}\n@media (min-width: 768px) {\n  .profile { display: flex; gap: 24px; }\n}`, walkthrough: ["max-width จำกัดความยาวบรรทัด", "margin auto จัดกลาง", "media query เปลี่ยนเป็นแถวเมื่อจอกว้าง"], mistake: "กำหนดความกว้างตายตัวจนมือถือเลื่อนแนวนอน", practice: "ตกแต่งหน้าโปรไฟล์ให้มีการ์ด ปุ่ม และ responsive สองขนาด", diagram: "css-responsive", accent: "bg-purple-600" })
];

export const gitSupplementalLessons: Lesson[] = [
  makeLesson({ id: 404, slug: "git-introduction", title: "Git คืออะไร ทำไมต้องใช้", subtitle: "เก็บประวัติโค้ดและย้อนดูการเปลี่ยนแปลงได้", concept: "Git เป็นระบบ version control ที่บันทึกการเปลี่ยนแปลงเป็นจุด ๆ ทำให้ย้อนกลับและทำงานหลาย branch ได้ โดยทำงานในเครื่องก่อนเชื่อม GitHub", realWorld: "ทีมใช้ Git ตรวจว่าใครแก้ไฟล์ใดและกลับไปเวอร์ชันก่อน bug", code: `git --version\ngit status`, walkthrough: ["git --version ตรวจการติดตั้ง", "git status อ่านสถานะ repository", "คำสั่งยังไม่ส่งข้อมูลขึ้นอินเทอร์เน็ต"], mistake: "คิดว่า Git และ GitHub คือสิ่งเดียวกัน", practice: "ติดตั้ง Git เปิดโปรเจกต์ทดลอง และตรวจเวอร์ชัน", diagram: "git-workflow", accent: "bg-orange-600" }),
  makeLesson({ id: 405, slug: "github-repository", title: "GitHub Repository", subtitle: "สร้างพื้นที่ออนไลน์สำหรับเก็บและแชร์ประวัติ Git", concept: "Repository บน GitHub คือปลายทางออนไลน์ของโปรเจกต์ มีไฟล์ ประวัติ commit และเครื่องมือร่วมงาน ไม่ควรใส่ secret หรือ .env", realWorld: "Vercel เชื่อม repository เพื่อ deploy เมื่อมี commit ใหม่", code: `git remote add origin https://github.com/username/project.git\ngit remote -v`, walkthrough: ["remote add ตั้งชื่อปลายทางว่า origin", "URL ต้องเป็น repository ของผู้เรียน", "remote -v ตรวจว่าผูกถูกที่"], mistake: "push .env หรือ token ขึ้น repository สาธารณะ", practice: "สร้าง repository เปล่าและเชื่อม origin กับโปรเจกต์ฝึก", diagram: "git-push", accent: "bg-slate-900" }),
  makeLesson({ id: 406, slug: "git-project-workflow", title: "Workflow สำหรับโปรเจกต์จริง", subtitle: "ทำงานเป็นรอบเล็กจาก issue ไป branch และ pull request", concept: "Workflow ที่ดีแบ่งงานเป็นเรื่องเล็ก สร้าง branch ทำ commit ที่สื่อความหมาย ทดสอบ แล้วจึงรวมเข้า main ช่วยลดความเสี่ยงและทำให้ review ง่าย", realWorld: "ฟีเจอร์หน้า Login อยู่ branch แยกจนทดสอบผ่านก่อน merge", code: `git switch -c feature/login-ui\n# แก้ไฟล์และทดสอบ\ngit add app/login/page.tsx\ngit commit -m "ปรับ UI หน้า login"\ngit push -u origin feature/login-ui`, walkthrough: ["สร้าง branch ตามงาน", "add เฉพาะไฟล์ที่ตั้งใจ", "push branch เพื่อเปิด pull request"], mistake: "ทำหลายฟีเจอร์ใน commit เดียวจน review ยาก", practice: "จำลอง workflow หนึ่งฟีเจอร์ตั้งแต่ branch ถึง push", diagram: "git-branch", accent: "bg-slate-800" })
];

export const reactSupplementalLessons: Lesson[] = [
  makeLesson({ id: 504, slug: "react-introduction", title: "React คืออะไร", subtitle: "สร้าง UI จาก component และอัปเดตเฉพาะส่วนที่เปลี่ยน", concept: "React เป็น library สำหรับสร้าง UI ด้วย component ข้อมูลกำหนดหน้าตา และเมื่อ state เปลี่ยน React จะคำนวณส่วนที่ต้องอัปเดต", realWorld: "หน้า dashboard ประกอบจาก Navbar, ProgressCard และ CourseCard", code: `function Welcome() {\n  return <h1>เริ่มเรียน React</h1>;\n}\nexport default Welcome;`, walkthrough: ["ฟังก์ชันชื่อขึ้นต้นตัวใหญ่", "return ส่ง JSX", "export default เปิดให้ไฟล์อื่นนำไปใช้"], mistake: "คิดว่า React แทน HTML, CSS และ JavaScript ทั้งหมด", practice: "สร้าง component Welcome และนำไปแสดงในหน้า", diagram: "react-tree", accent: "bg-cyan-500" }),
  makeLesson({ id: 505, slug: "react-events", title: "Event Handling", subtitle: "ตอบสนองต่อการคลิกและการกรอกข้อมูล", concept: "Event handler คือฟังก์ชันที่ทำงานเมื่อผู้ใช้กระทำ เช่น onClick หรือ onChange ใน React เราส่งฟังก์ชันให้ event ไม่เรียกฟังก์ชันทันทีตอน render", realWorld: "ปุ่มเปิดเมนูและปุ่มเพิ่มสินค้าใช้ click event", code: `function SaveButton() {\n  function handleClick() {\n    alert("บันทึกแล้ว");\n  }\n  return <button onClick={handleClick}>บันทึก</button>;\n}`, walkthrough: ["handleClick เก็บงานที่ต้องทำ", "onClick รับ reference ของฟังก์ชัน", "ฟังก์ชันทำงานเมื่อกดจริง"], mistake: "เขียน onClick={handleClick()} ทำให้ฟังก์ชันทำงานทันที", practice: "สร้างปุ่มที่เปลี่ยนข้อความเมื่อกด", diagram: "react-state", accent: "bg-blue-500" }),
  makeLesson({ id: 506, slug: "react-conditional-rendering", title: "Conditional Rendering", subtitle: "เลือกแสดง UI ตามสถานะหรือสิทธิ์ผู้ใช้", concept: "Conditional rendering ใช้ if, ternary หรือ && เพื่อเลือก JSX ตามข้อมูล เช่น แสดงปุ่ม Login หรือ Dashboard ควรให้เงื่อนไขอ่านตรงความหมาย", realWorld: "ผู้ใช้ Free เห็นปุ่มอัปเกรด ส่วน Premium เห็นปุ่มเริ่มเรียน", code: `function CourseAction({ isPremium }) {\n  return isPremium\n    ? <button>เริ่มเรียน</button>\n    : <a href="/payment">อัปเกรด Premium</a>;\n}`, walkthrough: ["รับ isPremium ผ่าน props", "ternary เลือกหนึ่งในสอง UI", "แต่ละทางมี action ชัดเจน"], mistake: "ซ่อน UI อย่างเดียวแต่ไม่ตรวจสิทธิ์บน server", practice: "สร้าง MemberMessage ที่แสดงข้อความ Free หรือ Premium", diagram: "react-props", accent: "bg-indigo-500" }),
  makeLesson({ id: 507, slug: "react-list-rendering", title: "List Rendering", subtitle: "แปลง array เป็นการ์ดหลายใบด้วย map", concept: "React ใช้ map แปลงข้อมูลแต่ละรายการเป็น JSX และต้องมี key ที่คงที่เพื่อช่วยติดตาม item เมื่อรายการเปลี่ยน", realWorld: "หน้า marketplace map รายการ course เป็น course cards", code: `const courses = [{ id: 1, title: "HTML" }, { id: 2, title: "CSS" }];\n\nfunction CourseList() {\n  return courses.map((course) => (\n    <article key={course.id}>{course.title}</article>\n  ));\n}`, walkthrough: ["array เก็บข้อมูลสองคอร์ส", "map คืน article ต่อรายการ", "key ใช้ id ที่ไม่ซ้ำ"], mistake: "ใช้ index เป็น key ทั้งที่รายการเพิ่ม ลบ หรือสลับตำแหน่ง", practice: "สร้าง array งานสามรายการและ render เป็น list", accent: "bg-sky-600" }),
  makeLesson({ id: 508, slug: "react-todo-project", title: "Mini Project: Todo List", subtitle: "รวม component, props, state, event และ list rendering", concept: "Todo List เป็นโปรเจกต์เล็กที่รวมการรับข้อความ เพิ่ม item แสดงรายการ และเปลี่ยนสถานะเสร็จแล้ว เหมาะสำหรับฝึก data flow ใน React", realWorld: "แนวคิดเดียวกันใช้กับรายการบทเรียน ตะกร้า และงานใน dashboard", code: `"use client";\nimport { useState } from "react";\n\nexport default function TodoList() {\n  const [items, setItems] = useState([]);\n  function addItem() {\n    setItems([...items, { id: Date.now(), title: "งานใหม่" }]);\n  }\n  return <button onClick={addItem}>เพิ่มงาน ({items.length})</button>;\n}`, walkthrough: ["state เก็บ array ของงาน", "spread รักษารายการเดิม", "setItems สร้าง array ใหม่พร้อมงานใหม่"], mistake: "แก้ array เดิมด้วย push แล้วคาดว่า React จะ render เสมอ", practice: "ทำ Todo List ที่เพิ่ม ลบ และทำเครื่องหมายเสร็จแล้ว", diagram: "react-state", accent: "bg-cyan-700" })
];

export const nextjsSupplementalLessons: Lesson[] = [
  makeLesson({ id: 604, slug: "nextjs-introduction", title: "Next.js คืออะไร", subtitle: "ต่อยอด React ด้วย routing, server rendering และเครื่องมือสำหรับเว็บจริง", concept: "Next.js เป็น React framework ที่เตรียม routing, server components, data loading และการ build/deploy ให้เป็นระบบ ช่วยให้ทีมใช้โครงเดียวกัน", realWorld: "เว็บคอร์สใช้ App Router สร้างหน้า course, lesson, payment และ admin", code: `export default function HomePage() {\n  return <main><h1>เว็บ Next.js แรกของฉัน</h1></main>;\n}`, walkthrough: ["ไฟล์ page.tsx export component", "Next.js ใช้ตำแหน่งไฟล์สร้าง URL", "main เป็นเนื้อหาหลัก"], mistake: "เริ่มใช้ feature ขั้นสูงก่อนเข้าใจ component และ routing", practice: "สร้างโปรเจกต์ฝึกและแก้ข้อความหน้าแรก", diagram: "next-request-flow", accent: "bg-slate-950" }),
  makeLesson({ id: 605, slug: "nextjs-page-layout", title: "page.tsx และ layout.tsx", subtitle: "แยกหน้าปลายทางออกจากโครงที่ใช้ร่วมกัน", concept: "page.tsx ทำให้ route เปิดเป็นหน้าได้ ส่วน layout.tsx ครอบหน้าลูกและเก็บ UI ร่วม เช่น Navbar หรือ Footer โดยไม่ต้องเขียนซ้ำ", realWorld: "root layout ครอบทุกหน้า ส่วน admin layout อาจครอบเฉพาะหน้าผู้ดูแล", code: `// app/layout.tsx\nexport default function RootLayout({ children }) {\n  return <html lang="th"><body><nav>เมนู</nav>{children}</body></html>;\n}\n\n// app/page.tsx\nexport default function Page() { return <main>หน้าแรก</main>; }`, walkthrough: ["layout รับ children", "children คือ page ที่ตรง URL", "page ส่งเนื้อหาหลักของ route"], mistake: "ใส่ UI เฉพาะหน้าลง root layout จนโผล่ทุกหน้า", practice: "สร้าง layout มี Navbar และ page ที่มีหัวข้อ", diagram: "next-app-router", accent: "bg-zinc-900" }),
  makeLesson({ id: 606, slug: "nextjs-navigation-link", title: "Navigation และ Link", subtitle: "เชื่อมหน้าภายในเว็บโดยไม่ reload ทั้งเอกสาร", concept: "Link จาก next/link ใช้สำหรับ navigation ภายในแอป Next.js ทำให้ framework เตรียมหน้าและเปลี่ยน route ได้ลื่นกว่า anchor ทั่วไป", realWorld: "ปุ่มดูคอร์สลิงก์ไป /courses/html-basics และ Navbar ลิงก์ไป Dashboard", code: `import Link from "next/link";\n\nexport default function Nav() {\n  return <nav><Link href="/courses">ดูคอร์ส</Link></nav>;\n}`, walkthrough: ["import Link จาก Next.js", "href เป็น path ภายในเว็บ", "ข้อความลิงก์ควรบอกปลายทาง"], mistake: "ใช้ button ที่ไม่มี navigation หรือสร้าง href จากข้อมูลที่ไม่ตรวจสอบ", practice: "สร้างเมนู Home, Courses และ Help ด้วย Link", accent: "bg-slate-800" }),
  makeLesson({ id: 607, slug: "nextjs-dynamic-route", title: "Dynamic Route", subtitle: "ใช้หน้าเดียวรองรับหลาย slug เช่นรายละเอียดคอร์ส", concept: "Dynamic route ใช้โฟลเดอร์วงเล็บเหลี่ยม เช่น [slug] เพื่อรับค่าจาก URL หน้าเดียวจึงแสดงข้อมูลหลายรายการได้ แต่ต้องตรวจว่าค่านั้นมีข้อมูลจริง", realWorld: "/courses/[slug] แสดง Python, HTML หรือ CSS จาก catalog เดียวกัน", code: `// app/courses/[slug]/page.tsx\nexport default async function CoursePage({ params }) {\n  const { slug } = await params;\n  return <h1>คอร์ส {slug}</h1>;\n}`, walkthrough: ["ชื่อโฟลเดอร์สร้าง dynamic segment", "params เก็บค่าจาก URL", "หน้าใช้ slug หา course จริง"], mistake: "เชื่อ slug ทันทีโดยไม่จัดการกรณีหา course ไม่พบ", practice: "สร้าง route /products/[slug] และแสดง slug", diagram: "next-app-router", accent: "bg-brand-700" }),
  makeLesson({ id: 608, slug: "nextjs-api-route", title: "API Route เบื้องต้น", subtitle: "สร้าง Route Handler สำหรับรับและคืนข้อมูลอย่างปลอดภัย", concept: "Route Handler อยู่ใน route.ts และ export ฟังก์ชันตาม HTTP method เช่น GET หรือ POST ฝั่ง server ต้องตรวจ session, validate input และคืนข้อมูลเท่าที่จำเป็น", realWorld: "/api/notifications คืนเฉพาะ notification ของผู้ใช้ปัจจุบัน", code: `// app/api/hello/route.ts\nexport async function GET() {\n  return Response.json({ message: "สวัสดีจาก server" });\n}`, walkthrough: ["ไฟล์ชื่อ route.ts", "GET ทำงานเมื่อมี request แบบ GET", "Response.json ส่ง JSON กลับ"], mistake: "สร้าง API ที่คืนข้อมูลผู้ใช้ทั้งหมดโดยไม่ตรวจสิทธิ์", practice: "สร้าง GET /api/courses ที่คืนชื่อคอร์สตัวอย่างสองรายการ", diagram: "next-request-flow", accent: "bg-blue-700" }),
  makeLesson({ id: 609, slug: "nextjs-deploy-concepts", title: "แนวคิดการ Deploy เว็บ Next.js", subtitle: "เตรียม environment, build และตรวจ production ก่อนเผยแพร่", concept: "Deploy คือการนำ build ที่ผ่านการทดสอบไปรันบน server จริง ต้องแยก environment variables, ตรวจฐานข้อมูล และไม่ส่ง secret ไป client", realWorld: "Vercel build จาก Git repository และใช้ Environment Variables ที่ตั้งใน project", code: `npm run build\n# ตรวจ build ให้ผ่านก่อน push\n# ตั้ง Environment Variables บนผู้ให้บริการ\n# ตรวจ logs หลัง deploy`, walkthrough: ["build ตรวจ TypeScript และ route", "environment production แยกจาก local", "logs ช่วยตรวจ runtime error"], mistake: "แก้ปัญหา build ด้วยการปิด type checking หรือ hardcode secret", practice: "เขียน deployment checklist สำหรับโปรเจกต์ของตัวเอง", diagram: "project-roadmap", accent: "bg-slate-900" })
];

export const sqlSupplementalLessons: Lesson[] = [
  makeLesson({ id: 704, slug: "database-introduction", title: "Database คืออะไร", subtitle: "เก็บข้อมูลให้ค้นหา แก้ไข และเชื่อมโยงได้อย่างเป็นระบบ", concept: "Database เป็นระบบเก็บข้อมูลที่ออกแบบให้หลายส่วนของแอปอ่านและเขียนได้อย่างมีโครงสร้าง ต่างจากตัวแปรที่หายเมื่อโปรแกรมหยุด", realWorld: "เว็บคอร์สเก็บ User, PaymentSlip, Progress และ Notification", code: `users\n- id\n- name\n- email\n- membership`, walkthrough: ["users คือกลุ่มข้อมูลเรื่องเดียว", "แต่ละ field มีหน้าที่", "id ใช้ระบุ record ไม่ซ้ำ"], mistake: "เก็บทุกข้อมูลไว้ในตารางเดียวจนแก้และเชื่อมยาก", practice: "ออกแบบรายการตารางสำหรับเว็บร้านกาแฟ", diagram: "sql-table", accent: "bg-emerald-600" }),
  makeLesson({ id: 705, slug: "sql-where-order", title: "WHERE และ ORDER BY", subtitle: "กรองเฉพาะข้อมูลที่ต้องการและเรียงผลลัพธ์", concept: "WHERE กำหนดเงื่อนไขของ row ส่วน ORDER BY กำหนดลำดับ เช่น ใหม่ไปเก่า ควรใช้ parameter แทนการต่อข้อความจากผู้ใช้", realWorld: "หน้า Admin กรอง slip pending และเรียง createdAt ล่าสุดก่อน", code: `SELECT name, email\nFROM users\nWHERE membership = 'paid'\nORDER BY created_at DESC;`, walkthrough: ["SELECT เลือก column", "WHERE เก็บเฉพาะ paid", "DESC เรียงใหม่ไปเก่า"], mistake: "ลืม WHERE ในคำสั่งที่ตั้งใจทำกับบาง row", practice: "ค้นคอร์สที่เปิดแล้วและเรียงชื่อตามตัวอักษร", diagram: "sql-query", accent: "bg-teal-600" }),
  makeLesson({ id: 706, slug: "sql-write-operations", title: "INSERT / UPDATE / DELETE", subtitle: "เพิ่ม แก้ และลบข้อมูลโดยจำกัดขอบเขตให้ถูกต้อง", concept: "INSERT เพิ่ม row, UPDATE แก้ row และ DELETE ลบ row คำสั่งแก้หรือลบต้องมีเงื่อนไขที่ชัดและควรทำผ่าน validation กับ authorization", realWorld: "สมัครสมาชิกใช้ INSERT เปลี่ยนชื่อใช้ UPDATE และการลบข้อมูลต้องตรวจเจ้าของ", code: `INSERT INTO courses (title) VALUES ('HTML');\nUPDATE courses SET title = 'HTML พื้นฐาน' WHERE id = 1;\nDELETE FROM courses WHERE id = 1;`, walkthrough: ["INSERT สร้าง row ใหม่", "UPDATE ใช้ WHERE เลือก row", "DELETE ลบ row ที่ตรงเงื่อนไข"], mistake: "รัน UPDATE หรือ DELETE โดยไม่มี WHERE", practice: "เขียนคำสั่งเพิ่มคอร์ส แก้ชื่อ และลบด้วย id", diagram: "sql-table", accent: "bg-emerald-700" })
];

export const projectSupplementalLessons: Lesson[] = [
  makeLesson({ id: 804, slug: "project-landing-page", title: "สร้าง Landing Page", subtitle: "วาง Hero จุดเด่น และ CTA ให้ผู้ใช้เข้าใจหน้าในเวลาไม่นาน", concept: "Landing Page คือหน้าเว็บที่มีเป้าหมายหลักหนึ่งเรื่อง โครงควรพาผู้ใช้จากรู้จักข้อเสนอ ไปเห็นประโยชน์ แล้วพบ CTA ที่ชัด", realWorld: "หน้าคอร์สใช้ Hero อธิบายคอร์สและปุ่มดูหลักสูตร", code: `<main>\n  <section class="hero"><h1>เรียนทำเว็บจากศูนย์</h1><a href="#courses">ดูคอร์ส</a></section>\n  <section id="courses">...</section>\n</main>`, walkthrough: ["Hero บอกข้อเสนอหลัก", "CTA ลิงก์ไปส่วนถัดไป", "section courses เก็บเนื้อหาหลัก"], mistake: "ใส่ CTA หลายแบบจนผู้ใช้ไม่รู้ควรกดอะไร", practice: "สร้าง Landing Page ที่มี Hero, Benefits และ CTA", diagram: "project-sitemap", accent: "bg-blue-600" }),
  makeLesson({ id: 805, slug: "project-responsive-layout", title: "ทำ Responsive Layout", subtitle: "จัดหน้าให้ใช้งานได้ตั้งแต่มือถือถึง desktop", concept: "Responsive layout เริ่มจากจอเล็ก ใช้ grid หรือ flex ที่ยืดหยุ่น และเพิ่มคอลัมน์เมื่อมีพื้นที่ ต้องตรวจข้อความ รูป และปุ่มไม่ล้น", realWorld: "การ์ดคอร์สเรียงหนึ่งคอลัมน์บนมือถือและหลายคอลัมน์บน desktop", code: `.grid { display: grid; grid-template-columns: 1fr; gap: 16px; }\n@media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }`, walkthrough: ["มือถือเริ่มหนึ่งคอลัมน์", "gap สร้างระยะ", "media query เพิ่มสามคอลัมน์"], mistake: "ใช้ width ตายตัวใหญ่กว่าหน้าจอ", practice: "ทำ course grid แบบ 1/2/3 คอลัมน์ตามขนาด", diagram: "css-responsive", accent: "bg-indigo-600" }),
  makeLesson({ id: 806, slug: "project-navigation", title: "เพิ่ม Navigation", subtitle: "สร้างทางไปส่วนสำคัญและเมนูมือถือที่ไม่รก", concept: "Navigation ที่ดีมีเฉพาะเส้นทางสำคัญ ชื่ออ่านแล้วรู้ปลายทาง และใช้งานด้วยคีย์บอร์ดได้ บนมือถือควรยุบเมนูเมื่อพื้นที่ไม่พอ", realWorld: "Navbar เชื่อม Courses, Dashboard, Payment และ Help", code: `<nav aria-label="เมนูหลัก">\n  <a href="#home">หน้าแรก</a>\n  <a href="#services">บริการ</a>\n  <a href="#contact">ติดต่อ</a>\n</nav>`, walkthrough: ["nav บอกความหมาย", "aria-label ช่วยแยกเมนู", "ลิงก์ชี้ id ของ section"], mistake: "ใส่ทุกลิงก์บน Navbar จนมือถือแน่น", practice: "สร้าง navigation สามลิงก์และทดสอบบนจอ 375px", diagram: "project-sitemap", accent: "bg-violet-600" }),
  makeLesson({ id: 807, slug: "project-contact-form", title: "ทำ Form / Contact Section", subtitle: "รับข้อมูลติดต่อพร้อม label และสถานะที่เข้าใจง่าย", concept: "ฟอร์มติดต่อควรถามเฉพาะข้อมูลจำเป็น มี label ชัด ตรวจ input ทั้ง client และ server และแจ้งผลสำเร็จหรือผิดพลาด", realWorld: "หน้า Contact รับชื่อ อีเมล และข้อความก่อนส่งให้เจ้าของเว็บ", code: `<form>\n  <label for="email">อีเมล</label>\n  <input id="email" name="email" type="email" required />\n  <button type="submit">ส่งข้อความ</button>\n</form>`, walkthrough: ["label จับคู่ input", "type email ช่วยตรวจเบื้องต้น", "submit ส่งฟอร์ม"], mistake: "รับข้อมูลแต่ไม่มี validation ฝั่ง server", practice: "สร้าง contact form ชื่อ อีเมล ข้อความ และ success state", diagram: "html-form", accent: "bg-cyan-700" }),
  makeLesson({ id: 808, slug: "project-mock-data", title: "เชื่อมข้อมูลจำลอง", subtitle: "แยกข้อมูลออกจาก UI เพื่อเตรียมต่อ API หรือฐานข้อมูล", concept: "Mock data คือข้อมูลตัวอย่างที่มีรูปทรงเหมือนข้อมูลจริง ใช้สร้างและทดสอบ UI ก่อน backend พร้อม ควรแยกเป็น array หรือไฟล์ data", realWorld: "course cards อ่าน title, description และ price จาก array เดียว", code: `const services = [\n  { id: 1, title: "ออกแบบหน้าเว็บ", price: 2000 },\n  { id: 2, title: "ปรับเว็บมือถือ", price: 1500 }\n];\n\nconst cards = services.map((item) => "<article>" + item.title + "</article>");`, walkthrough: ["array เก็บหลายรายการ", "แต่ละ object มีรูปทรงเดียวกัน", "map แปลงข้อมูลเป็น UI"], mistake: "คัดลอก card หลายก้อนแทนแยกข้อมูล", practice: "สร้างข้อมูลบริการสามรายการและ render เป็นการ์ด", diagram: "react-props", accent: "bg-sky-700" }),
  makeLesson({ id: 809, slug: "project-prepare-deploy", title: "เตรียม Deploy", subtitle: "ตรวจ build, environment และเส้นทางก่อนขึ้นออนไลน์", concept: "ก่อน deploy ต้อง build ให้ผ่าน ตรวจ mobile, ลิงก์, error state, environment variables และข้อมูลลับ ไม่ควรแก้ production โดยไม่มีแผนย้อนกลับ", realWorld: "Next.js build ตรวจ TypeScript ก่อน Vercel นำขึ้นระบบ", code: `npm run build\n# ตรวจหน้า Home, Courses, Contact\n# ตรวจ Environment Variables\n# ตรวจ console และ server logs`, walkthrough: ["build ต้องผ่าน", "ทดสอบ workflow หลัก", "ตรวจ log หลัง deploy"], mistake: "push secret หรือ deploy ทั้งที่ build local ไม่ผ่าน", practice: "สร้าง checklist ก่อน deploy อย่างน้อย 8 ข้อ", diagram: "project-roadmap", accent: "bg-slate-900" }),
  makeLesson({ id: 810, slug: "project-summary-next-steps", title: "สรุปโปรเจกต์และแนวทางต่อยอด", subtitle: "ทบทวนสิ่งที่ทำ เก็บ feedback และเลือกฟีเจอร์ถัดไป", concept: "การจบโปรเจกต์ไม่ใช่เพิ่มทุกอย่าง แต่คือทำ flow หลักให้ครบ บันทึกสิ่งที่เรียน รวบรวม feedback และเลือกการปรับรอบถัดไปตามผลกระทบ", realWorld: "หลังเปิดเว็บคอร์ส ทีมดูว่าผู้ใช้ติดที่สมัคร ชำระ หรือเริ่มเรียน แล้วแก้จุดสำคัญก่อน", code: `## Project review\n- เป้าหมายหลักทำงานครบหรือไม่\n- Mobile มีจุดล้นหรือไม่\n- Error state บอกทางไปต่อหรือไม่\n- สิ่งที่จะปรับในรอบหน้า`, walkthrough: ["ทบทวนเป้าหมาย", "ตรวจคุณภาพและ accessibility", "เลือก next step ที่วัดผลได้"], mistake: "เพิ่มฟีเจอร์ใหม่ทันทีโดยไม่แก้ flow ที่ยังพัง", practice: "เขียน retrospective และ roadmap รอบถัดไปของโปรเจกต์", diagram: "project-roadmap", accent: "bg-amber-600" })
];

const landingPurchaseSlug = "landing-page-begins";

export const landingPageLessons: Lesson[] = [
  [901, "landing-page-purpose", "Landing Page คืออะไร และใช้ทำอะไร", "เข้าใจหน้าเป้าหมายเดียวและการวัดผล", "Landing Page คือหน้าเว็บที่พาผู้ใช้ไปยัง action หลักหนึ่งอย่าง เช่น ติดต่อ สั่งซื้อ หรือลงทะเบียน", `<main><h1>บริการทำขนมโฮมเมด</h1><a href="#contact">ติดต่อร้าน</a></main>`, "เขียนเป้าหมายหลักหนึ่งประโยคและ CTA หนึ่งปุ่ม", "project-user-flow"],
  [902, "landing-page-goal", "วางเป้าหมายของหน้าเว็บ", "กำหนดกลุ่มเป้าหมาย ข้อเสนอ และ CTA", "เป้าหมายที่ดีระบุว่าใครเข้าหน้า เขาต้องเข้าใจอะไร และควรทำอะไรต่อ จึงช่วยตัดเนื้อหาที่ไม่จำเป็น", `กลุ่มเป้าหมาย: เจ้าของร้านเล็ก\nข้อเสนอ: หน้าเว็บแนะนำร้าน\nCTA: ขอรายละเอียด`, "เขียน audience, offer และ CTA ของงานตัวอย่าง", "project-roadmap"],
  [903, "landing-page-structure", "วางโครงหน้า Landing Page", "เรียง Hero, Benefits, Proof และ Contact", "โครงหน้าที่ดีตอบคำถามตามลำดับ: นี่คืออะไร เหมาะกับใคร เชื่อถือได้อย่างไร และติดต่อที่ไหน", `<main>\n<section id="hero">...</section>\n<section id="benefits">...</section>\n<section id="reviews">...</section>\n<section id="contact">...</section>\n</main>`, "วาด wireframe สี่ section ก่อนเขียน CSS", "project-sitemap"],
  [904, "landing-page-hero", "ทำ Hero Section", "เขียน headline, supporting copy และ CTA ที่ชัด", "Hero เป็นส่วนแรกที่ผู้ใช้เห็น ควรบอกชื่อบริการ ประโยชน์ และทางไปต่อภายในพื้นที่สั้น ๆ", `<section class="hero">\n<h1>เว็บไซต์หน้าเดียวสำหรับร้านเล็ก</h1>\n<p>อ่านง่ายบนมือถือ พร้อมปุ่มติดต่อ</p>\n<a href="#contact">ขอรายละเอียด</a>\n</section>`, "สร้าง Hero สองเวอร์ชันแล้วเลือกเวอร์ชันที่ชัดกว่า", "html-page-elements"],
  [905, "landing-page-contact-buttons", "ทำปุ่ม LINE / Facebook / โทร", "สร้างช่องทางติดต่อที่กดได้และระบุปลายทางตรง", "ปุ่มติดต่อควรใช้ URL ที่ถูกต้อง มีข้อความชัด และไม่เปิดเผยข้อมูลเกินจำเป็น ต้องทดสอบบนมือถือจริง", `<a href="https://line.me/R/ti/p/@example">LINE</a>\n<a href="https://facebook.com/example">Facebook</a>\n<a href="tel:0812345678">โทรหาเรา</a>`, "สร้างปุ่มติดต่อสามช่องทางด้วยข้อมูลตัวอย่าง", "project-user-flow"],
  [906, "landing-page-offer-sections", "ทำ Section บริการ ราคา จุดเด่น", "จัดข้อมูลที่ผู้ใช้ต้องเปรียบเทียบเป็นการ์ดอ่านง่าย", "Section ข้อเสนอควรบอกสิ่งที่ได้รับ ราคา และขอบเขตอย่างตรงไปตรงมา ไม่ใช้ข้อความกำกวมหรือการันตีผลลัพธ์", `<article class="service-card">\n<h2>แพ็กเกจเริ่มต้น</h2>\n<p>Landing Page 1 หน้า</p>\n<strong>2,000 บาท</strong>\n</article>`, "สร้างการ์ดบริการสามใบที่มีขอบเขตชัด", "css-flexbox"],
  [907, "landing-page-trust", "ทำ Section รีวิวและความน่าเชื่อถือ", "ใช้หลักฐานที่ตรวจสอบได้โดยไม่สร้างรีวิวปลอม", "ความน่าเชื่อถือมาจากผลงานจริง ขั้นตอนทำงาน ช่องทางติดต่อ และรีวิวที่ได้รับอนุญาต ห้ามแต่งข้อมูลลูกค้าหรือผลลัพธ์เกินจริง", `<section aria-labelledby="trust-title">\n<h2 id="trust-title">ขั้นตอนทำงาน</h2>\n<ol><li>คุยเป้าหมาย</li><li>ทำตัวอย่าง</li><li>ส่งมอบ</li></ol>\n</section>`, "สร้าง trust section จากขั้นตอนทำงานจริง", "html-page-elements"],
  [908, "landing-page-responsive", "ทำ Responsive สำหรับมือถือ", "ปรับตัวอักษร การ์ด และ CTA ให้ใช้งานบนจอเล็ก", "Landing Page มักถูกเปิดจากมือถือ จึงต้องเริ่มจากคอลัมน์เดียว ปุ่มกดง่าย และไม่มีการเลื่อนแนวนอน", `.layout { display: grid; gap: 16px; }\n@media (min-width: 768px) { .layout { grid-template-columns: repeat(2, 1fr); } }`, "ทดสอบหน้าเต็มที่ 375px, 768px และ desktop", "css-responsive"],
  [909, "landing-page-vercel", "Deploy ขึ้น Vercel", "เตรียม repository, build และ domain สำหรับเผยแพร่", "Vercel เชื่อม Git repository แล้ว build เว็บทุกครั้งที่ deploy ต้องตรวจ secret, build และ URL จริงก่อนส่งให้ผู้อื่น", `npm run build\n# push ไป repository ที่ไม่มี secret\n# import project ใน Vercel\n# ตรวจ production URL`, "ทำ deployment checklist และตรวจหน้าออนไลน์", "next-request-flow"],
  [910, "landing-page-portfolio", "ทำ Portfolio และแนวทางเสนอรับงาน", "นำเสนอผลงาน กระบวนการ และขอบเขตอย่างมืออาชีพ", "Portfolio ที่ดีอธิบายโจทย์ วิธีคิด สิ่งที่ทำ และลิงก์ผลงานจริง การรับงานควรเริ่มจากขอบเขตเล็ก ข้อตกลงชัด และไม่รับประกันผลลัพธ์ที่ควบคุมไม่ได้", `<article>\n<h2>Landing Page ร้านตัวอย่าง</h2>\n<p>โจทย์: ทำให้ลูกค้าติดต่อร้านบนมือถือได้ง่าย</p>\n<a href="https://example.com">ดูผลงาน</a>\n</article>`, "เขียน case study หนึ่งชิ้นและรายการคำถามก่อนรับงาน", "project-roadmap"]
].map(([id, slug, title, subtitle, concept, code, practice, diagram]) =>
  makeLesson({
    id: id as number,
    slug: slug as string,
    title: title as string,
    subtitle: subtitle as string,
    concept: concept as string,
    realWorld: "ใช้สร้างหน้าโปรโมทร้านค้า ธุรกิจขนาดเล็ก บริการ หรือผลงานส่วนตัวโดยมีเป้าหมายชัดเจน",
    code: code as string,
    walkthrough: ["เริ่มจากโครงที่จำเป็น", "ให้ข้อความและ action สื่อความหมายตรงกัน", "ทดสอบบนมือถือก่อนเผยแพร่"],
    mistake: "ใส่เนื้อหาหลายเป้าหมายจน CTA หลักไม่ชัด",
    practice: practice as string,
    diagram: diagram as LessonDiagramType,
    accent: "bg-cyan-700",
    purchaseCourseSlug: landingPurchaseSlug
  })
);

export const supplementalPremiumLessons: Lesson[] = [
  ...htmlSupplementalLessons,
  ...cssSupplementalLessons,
  ...gitSupplementalLessons,
  ...reactSupplementalLessons,
  ...nextjsSupplementalLessons,
  ...sqlSupplementalLessons,
  ...projectSupplementalLessons
];
