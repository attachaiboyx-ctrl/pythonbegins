import type { CurrentUser } from "@/lib/session";
import { upcomingLessons } from "@/lib/upcoming-lessons";
import {
  landingPageLessons,
  supplementalPremiumLessons
} from "@/lib/supplemental-lessons";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LessonDiagramType =
  | "html-document"
  | "html-page-elements"
  | "html-form"
  | "css-box-model"
  | "css-flexbox"
  | "css-responsive"
  | "git-workflow"
  | "git-branch"
  | "git-push"
  | "react-tree"
  | "react-props"
  | "react-state"
  | "next-app-router"
  | "next-server-client"
  | "next-request-flow"
  | "sql-table"
  | "sql-relation"
  | "sql-query"
  | "project-roadmap"
  | "project-sitemap"
  | "project-user-flow";

export type Lesson = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  minutes: number;
  free: boolean;
  badge: string;
  accent: string;
  order?: number;
  purchaseCourseSlug?: string;
  objectives: string[];
  sections: {
    heading: string;
    body: string;
    code?: string;
    diagram?: LessonDiagramType;
  }[];
  exercise: {
    title: string;
    tasks: string[];
    starterCode: string;
  };
  quiz: QuizQuestion[];
};

export const pythonLessons: Lesson[] = [
  {
    id: 1,
    slug: "hello-python",
    title: "บทที่ 1: สวัสดี Python",
    subtitle: "รู้จัก Python, คำสั่ง print และการรันโปรแกรมแรก",
    minutes: 20,
    free: true,
    badge: "เริ่มต้น",
    accent: "bg-skybolt",
    objectives: [
      "อธิบายได้ว่า Python คืออะไร",
      "ใช้คำสั่ง print() เพื่อแสดงข้อความ",
      "อ่าน error ง่าย ๆ ได้โดยไม่ตกใจ"
    ],
    sections: [
      {
        heading: "Python คืออะไร",
        body: "Python เป็นภาษาคอมพิวเตอร์ที่อ่านง่าย เหมาะกับการเริ่มเขียนโปรแกรม เพราะใช้คำสั่งใกล้เคียงภาษาอังกฤษและนำไปทำได้หลายอย่าง เช่น เกมเล็ก ๆ เว็บไซต์ วิเคราะห์ข้อมูล และ AI"
      },
      {
        heading: "โปรแกรมแรกของเรา",
        body: "คำสั่ง print() ใช้แสดงข้อความบนหน้าจอ ข้อความต้องอยู่ในเครื่องหมายคำพูด",
        code: `print("สวัสดี Python")
print("วันนี้ฉันจะเริ่มเขียนโปรแกรม")`
      }
    ],
    exercise: {
      title: "แนะนำตัวด้วย Python",
      tasks: [
        "แสดงชื่อตัวเอง 1 บรรทัด",
        "แสดงห้องเรียนหรือโรงเรียน 1 บรรทัด",
        "แสดงสิ่งที่อยากสร้างด้วย Python 1 บรรทัด"
      ],
      starterCode: `print("ชื่อของฉันคือ ...")
print("ฉันกำลังเริ่มเรียน Python")
print("ฉันอยากสร้าง ...")`
    },
    quiz: [
      {
        question: "คำสั่งใดใช้แสดงข้อความใน Python",
        options: ["show()", "print()", "say()", "write()"],
        answer: 1,
        explanation: "print() คือคำสั่งพื้นฐานสำหรับแสดงผลบนหน้าจอ"
      },
      {
        question: "ข้อความใน print() ควรอยู่ในเครื่องหมายใด",
        options: ["เครื่องหมายคำพูด", "วงเล็บปีกกา", "เครื่องหมายบวก", "เครื่องหมายเปอร์เซ็นต์"],
        answer: 0,
        explanation: "ข้อความหรือ string ต้องอยู่ในเครื่องหมายคำพูด เช่น \"hello\""
      },
      {
        question: "Python เหมาะกับผู้เริ่มต้นเพราะอะไร",
        options: ["อ่านยากมาก", "ต้องใช้เครื่องแพง", "คำสั่งอ่านง่าย", "ใช้ได้เฉพาะเกม"],
        answer: 2,
        explanation: "Python มีรูปแบบคำสั่งที่กระชับและอ่านง่าย"
      }
    ]
  },
  {
    id: 2,
    slug: "variables-types",
    title: "บทที่ 2: ตัวแปรและชนิดข้อมูล",
    subtitle: "เก็บข้อมูลด้วยตัวแปร และรู้จักข้อความ ตัวเลข และค่าจริง/เท็จ",
    minutes: 25,
    free: true,
    badge: "ฟรี",
    accent: "bg-lemon",
    objectives: [
      "สร้างตัวแปรเพื่อเก็บข้อมูล",
      "แยกชนิดข้อมูล str, int, float และ bool",
      "ตั้งชื่อตัวแปรให้อ่านง่าย"
    ],
    sections: [
      {
        heading: "ตัวแปรคือกล่องเก็บข้อมูล",
        body: "ตัวแปรช่วยให้เราเก็บข้อมูลไว้ใช้ต่อ เช่น ชื่อ อายุ คะแนน หรือสถานะผ่าน/ไม่ผ่าน",
        code: `name = "มะลิ"
age = 13
score = 18.5
passed = True`
      },
      {
        heading: "ชนิดข้อมูลพื้นฐาน",
        body: "str คือข้อความ, int คือจำนวนเต็ม, float คือเลขทศนิยม และ bool คือค่า True หรือ False",
        code: `print(type(name))
print(type(age))
print(type(score))
print(type(passed))`
      }
    ],
    exercise: {
      title: "บัตรนักเรียนดิจิทัล",
      tasks: [
        "สร้างตัวแปร name, learning_group, favorite_topic",
        "สร้างตัวแปร age เป็นตัวเลข",
        "แสดงผลเป็นประโยคแนะนำตัว"
      ],
      starterCode: `name = "..."
learning_group = "ผู้เริ่มต้น"
age = 13
favorite_topic = "..."

print("ฉันชื่อ", name)
print("กลุ่มผู้เรียน", learning_group)
print("สนใจเรื่อง", favorite_topic)`
    },
    quiz: [
      {
        question: "age = 13 มีชนิดข้อมูลใด",
        options: ["str", "int", "float", "bool"],
        answer: 1,
        explanation: "13 เป็นจำนวนเต็ม จึงเป็น int"
      },
      {
        question: "ข้อใดเป็นชื่อตัวแปรที่เหมาะสม",
        options: ["my score", "2score", "student_name", "class-room"],
        answer: 2,
        explanation: "student_name อ่านง่ายและใช้ underscore ได้ถูกต้อง"
      },
      {
        question: "ค่า True และ False อยู่ในชนิดข้อมูลใด",
        options: ["bool", "float", "str", "list"],
        answer: 0,
        explanation: "bool ใช้แทนค่าจริงหรือเท็จ"
      }
    ]
  },
  {
    id: 3,
    slug: "input-output",
    title: "บทที่ 3: รับข้อมูลและแสดงผล",
    subtitle: "ใช้ input() รับคำตอบจากผู้ใช้ และแปลงข้อมูลให้ถูกชนิด",
    minutes: 25,
    free: false,
    badge: "paid",
    accent: "bg-melon",
    objectives: [
      "รับข้อความจากผู้ใช้ด้วย input()",
      "แปลงข้อความเป็นตัวเลขด้วย int() หรือ float()",
      "สร้างโปรแกรมโต้ตอบสั้น ๆ"
    ],
    sections: [
      {
        heading: "input() รับทุกอย่างเป็นข้อความ",
        body: "เมื่อรับข้อมูลจากคีย์บอร์ด Python จะมองเป็นข้อความก่อน ถ้าจะนำไปคำนวณต้องแปลงเป็นตัวเลข",
        code: `name = input("ชื่อของคุณคืออะไร: ")
print("ยินดีต้อนรับ", name)`
      },
      {
        heading: "แปลงข้อมูลก่อนคำนวณ",
        body: "ถ้าอยากบวกเลข ต้องใช้ int() หรือ float() ครอบค่าที่รับเข้ามา",
        code: `age = int(input("อายุของคุณ: "))
next_year = age + 1
print("ปีหน้าคุณจะอายุ", next_year)`
      }
    ],
    exercise: {
      title: "เครื่องคิดเลขคะแนน",
      tasks: [
        "รับคะแนนเก็บและคะแนนสอบ",
        "แปลงคะแนนเป็น float",
        "แสดงคะแนนรวม"
      ],
      starterCode: `work_score = float(input("คะแนนเก็บ: "))
exam_score = float(input("คะแนนสอบ: "))
total = work_score + exam_score
print("คะแนนรวม =", total)`
    },
    quiz: [
      {
        question: "input() คืนค่ากลับมาเป็นชนิดข้อมูลใด",
        options: ["int", "str", "bool", "float"],
        answer: 1,
        explanation: "input() รับข้อมูลเป็นข้อความหรือ str เสมอ"
      },
      {
        question: "ถ้าต้องการนำค่าจาก input() ไปบวกเลข ควรทำอย่างไร",
        options: ["ใช้ print()", "ใช้ int() หรือ float()", "ใช้ type()", "ใช้ True"],
        answer: 1,
        explanation: "ต้องแปลงข้อความเป็นตัวเลขก่อนคำนวณ"
      },
      {
        question: "float เหมาะกับข้อมูลแบบใด",
        options: ["ข้อความ", "เลขทศนิยม", "ค่าจริงเท็จ", "รายการ"],
        answer: 1,
        explanation: "float ใช้เก็บเลขที่มีทศนิยม เช่น 12.5"
      }
    ]
  },
  {
    id: 4,
    slug: "if-else",
    title: "บทที่ 4: เงื่อนไข if/else",
    subtitle: "ให้โปรแกรมตัดสินใจจากเงื่อนไข เช่น ผ่าน/ไม่ผ่าน",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-minty",
    objectives: [
      "เขียน if, elif และ else",
      "ใช้เครื่องหมายเปรียบเทียบ",
      "ออกแบบเงื่อนไขที่อ่านง่าย"
    ],
    sections: [
      {
        heading: "โปรแกรมที่เลือกทางได้",
        body: "if ใช้ตรวจเงื่อนไข ถ้าเงื่อนไขเป็นจริง โปรแกรมจะทำคำสั่งด้านใน อย่าลืมเว้นวรรคย่อหน้าให้ถูกต้อง",
        code: `score = 75

if score >= 50:
    print("ผ่าน")
else:
    print("ลองใหม่อีกครั้ง")`
      },
      {
        heading: "หลายเงื่อนไขด้วย elif",
        body: "เมื่อมีหลายช่วงคะแนน ใช้ elif ช่วยให้โปรแกรมเลือกคำตอบที่เหมาะสม",
        code: `score = 88

if score >= 80:
    print("ดีเยี่ยม")
elif score >= 50:
    print("ผ่าน")
else:
    print("ต้องฝึกเพิ่ม")`
      }
    ],
    exercise: {
      title: "ระบบเช็คคะแนนสอบ",
      tasks: [
        "รับคะแนนจากผู้ใช้",
        "ถ้าคะแนนตั้งแต่ 80 ให้แสดง ดีมาก",
        "ถ้าคะแนนตั้งแต่ 50 ให้แสดง ผ่าน",
        "น้อยกว่านั้นให้แสดง ฝึกต่ออีกนิด"
      ],
      starterCode: `score = int(input("คะแนน: "))

if score >= 80:
    print("ดีมาก")
elif score >= 50:
    print("ผ่าน")
else:
    print("ฝึกต่ออีกนิด")`
    },
    quiz: [
      {
        question: "เครื่องหมาย >= หมายถึงอะไร",
        options: ["น้อยกว่า", "มากกว่าหรือเท่ากับ", "ไม่เท่ากับ", "เท่ากับข้อความ"],
        answer: 1,
        explanation: ">= ใช้ตรวจว่าค่าด้านซ้ายมากกว่าหรือเท่ากับค่าด้านขวา"
      },
      {
        question: "else จะทำงานเมื่อใด",
        options: ["ทุกครั้ง", "เมื่อเงื่อนไขก่อนหน้าไม่เป็นจริง", "เมื่อมี input เท่านั้น", "เมื่อ score เป็นข้อความ"],
        answer: 1,
        explanation: "else เป็นทางเลือกสุดท้ายเมื่อเงื่อนไขก่อนหน้าไม่ผ่าน"
      },
      {
        question: "ข้อใดสำคัญมากในบล็อก if ของ Python",
        options: ["สีตัวอักษร", "การย่อหน้า", "ชื่อไฟล์", "จำนวนคอมเมนต์"],
        answer: 1,
        explanation: "Python ใช้การย่อหน้าเพื่อบอกว่าคำสั่งใดอยู่ในบล็อกเดียวกัน"
      }
    ]
  },
  {
    id: 5,
    slug: "loops",
    title: "บทที่ 5: วนซ้ำด้วย for และ while",
    subtitle: "สั่งให้โปรแกรมทำงานซ้ำโดยไม่ต้องพิมพ์คำสั่งเดิมหลายรอบ",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "ใช้ for กับ range()",
      "ใช้ while เมื่อยังไม่รู้จำนวนรอบแน่นอน",
      "ระวัง loop ที่ไม่หยุด"
    ],
    sections: [
      {
        heading: "for loop",
        body: "for เหมาะกับงานที่รู้จำนวนรอบ เช่น นับเลข 1 ถึง 5",
        code: `for number in range(1, 6):
    print(number)`
      },
      {
        heading: "while loop",
        body: "while จะทำงานซ้ำตราบใดที่เงื่อนไขยังเป็นจริง จึงต้องมีจุดที่ทำให้เงื่อนไขเปลี่ยน",
        code: `count = 1

while count <= 5:
    print("รอบที่", count)
    count = count + 1`
      }
    ],
    exercise: {
      title: "ตารางสูตรคูณ",
      tasks: [
        "รับแม่สูตรคูณจากผู้ใช้",
        "ใช้ for แสดงผลคูณตั้งแต่ 1 ถึง 12",
        "จัดข้อความให้อ่านง่าย"
      ],
      starterCode: `number = int(input("ต้องการแม่สูตรคูณ: "))

for i in range(1, 13):
    print(number, "x", i, "=", number * i)`
    },
    quiz: [
      {
        question: "range(1, 6) จะให้เลขใดบ้าง",
        options: ["1 ถึง 5", "1 ถึง 6", "0 ถึง 6", "เฉพาะเลข 6"],
        answer: 0,
        explanation: "range จะหยุดก่อนค่าสุดท้าย จึงได้ 1, 2, 3, 4, 5"
      },
      {
        question: "while loop ควรมีอะไรเพื่อไม่ให้วนไม่หยุด",
        options: ["รูปภาพ", "การเปลี่ยนค่าที่ใช้ในเงื่อนไข", "ชื่อตัวแปรยาว ๆ", "print หลายบรรทัด"],
        answer: 1,
        explanation: "ต้องเปลี่ยนค่าในเงื่อนไขเพื่อให้ loop มีโอกาสจบ"
      },
      {
        question: "for เหมาะกับงานแบบใด",
        options: ["รู้จำนวนรอบ", "ห้ามใช้ตัวเลข", "รับรูปภาพ", "ทำงานครั้งเดียวเสมอ"],
        answer: 0,
        explanation: "for เหมาะกับการวนซ้ำตามจำนวนหรือชุดข้อมูลที่กำหนด"
      }
    ]
  },
  {
    id: 6,
    slug: "lists",
    title: "บทที่ 6: List เก็บข้อมูลหลายชิ้น",
    subtitle: "สร้างรายการคะแนน ชื่อเพื่อน หรือสิ่งของ แล้วจัดการข้อมูลในนั้น",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "สร้าง list และเข้าถึงสมาชิกด้วย index",
      "เพิ่มข้อมูลด้วย append()",
      "วนอ่านข้อมูลใน list"
    ],
    sections: [
      {
        heading: "list คือกล่องหลายช่อง",
        body: "list ใช้เก็บข้อมูลหลายชิ้นในตัวแปรเดียว โดย index เริ่มนับจาก 0",
        code: `friends = ["มะลิ", "ต้น", "ฟ้า"]
print(friends[0])
print(friends[1])`
      },
      {
        heading: "เพิ่มและวนอ่านข้อมูล",
        body: "append() ใช้เพิ่มข้อมูลท้าย list และ for ช่วยอ่านทีละรายการ",
        code: `scores = [10, 8, 9]
scores.append(7)

for score in scores:
    print(score)`
      }
    ],
    exercise: {
      title: "รายการสิ่งที่ต้องเตรียมไปโรงเรียน",
      tasks: [
        "สร้าง list ชื่อ supplies",
        "เพิ่มของอีก 2 อย่างด้วย append()",
        "วนแสดงของทั้งหมดทีละบรรทัด"
      ],
      starterCode: `supplies = ["สมุด", "ดินสอ", "ยางลบ"]
supplies.append("ไม้บรรทัด")
supplies.append("ขวดน้ำ")

for item in supplies:
    print("-", item)`
    },
    quiz: [
      {
        question: "index แรกของ list คือเลขใด",
        options: ["0", "1", "2", "-1 เท่านั้น"],
        answer: 0,
        explanation: "Python เริ่มนับ index ของ list จาก 0"
      },
      {
        question: "คำสั่งใดใช้เพิ่มข้อมูลท้าย list",
        options: ["push()", "append()", "addLast()", "print()"],
        answer: 1,
        explanation: "append() ใช้เพิ่มสมาชิกใหม่ต่อท้าย list"
      },
      {
        question: "list เหมาะกับการเก็บข้อมูลแบบใด",
        options: ["ข้อมูลหลายชิ้น", "เงื่อนไขอย่างเดียว", "คำสั่งหยุดโปรแกรม", "รหัสผ่านเท่านั้น"],
        answer: 0,
        explanation: "list ช่วยเก็บข้อมูลหลายรายการในตัวแปรเดียว"
      }
    ]
  },
  {
    id: 7,
    slug: "functions",
    title: "บทที่ 7: Function สร้างคำสั่งของเราเอง",
    subtitle: "จัดระเบียบโปรแกรมด้วยฟังก์ชัน ลดการเขียนซ้ำ",
    minutes: 35,
    free: false,
    badge: "paid",
    accent: "bg-melon",
    objectives: [
      "สร้าง function ด้วย def",
      "ส่งข้อมูลเข้า function ด้วย parameter",
      "คืนค่าด้วย return"
    ],
    sections: [
      {
        heading: "สร้าง function",
        body: "function คือชุดคำสั่งที่ตั้งชื่อได้ เมื่อเรียกชื่อ function โปรแกรมจะทำงานตามคำสั่งที่เราเตรียมไว้",
        code: `def say_hello():
    print("สวัสดีทุกคน")

say_hello()`
      },
      {
        heading: "parameter และ return",
        body: "parameter คือข้อมูลที่ส่งเข้า function ส่วน return คือผลลัพธ์ที่ส่งกลับออกมา",
        code: `def add(a, b):
    return a + b

total = add(5, 3)
print(total)`
      }
    ],
    exercise: {
      title: "ฟังก์ชันคำนวณพื้นที่สี่เหลี่ยม",
      tasks: [
        "สร้าง function ชื่อ rectangle_area",
        "รับความกว้างและความยาว",
        "return ผลคูณของสองค่า"
      ],
      starterCode: `def rectangle_area(width, height):
    return width * height

area = rectangle_area(4, 6)
print("พื้นที่ =", area)`
    },
    quiz: [
      {
        question: "คำใดใช้สร้าง function ใน Python",
        options: ["func", "def", "make", "new"],
        answer: 1,
        explanation: "Python ใช้ def เพื่อประกาศ function"
      },
      {
        question: "return ใช้ทำอะไร",
        options: ["แสดงรูป", "ส่งผลลัพธ์กลับจาก function", "หยุดคอมพิวเตอร์", "เปลี่ยนสีหน้าจอ"],
        answer: 1,
        explanation: "return ส่งค่ากลับให้จุดที่เรียก function"
      },
      {
        question: "parameter คืออะไร",
        options: ["ข้อมูลที่ส่งเข้า function", "ชื่อไฟล์", "ชนิดของ loop", "ข้อความ error"],
        answer: 0,
        explanation: "parameter เป็นตัวรับข้อมูลที่ function จะนำไปใช้"
      }
    ]
  },
  {
    id: 8,
    slug: "dictionaries",
    title: "บทที่ 8: Dictionary ข้อมูลแบบมีป้ายชื่อ",
    subtitle: "เก็บข้อมูลเป็นคู่ key/value เช่น โปรไฟล์นักเรียน",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-minty",
    objectives: [
      "สร้าง dictionary",
      "อ่านและแก้ไขค่าด้วย key",
      "นำ dictionary ไปใช้กับข้อมูลจริง"
    ],
    sections: [
      {
        heading: "key และ value",
        body: "dictionary เก็บข้อมูลเป็นคู่ key และ value ทำให้อ่านข้อมูลตามชื่อช่องได้ง่าย",
        code: `student = {
    "name": "มะลิ",
    "level": "beginner",
    "score": 85
}

print(student["name"])`
      },
      {
        heading: "แก้ไขและเพิ่มข้อมูล",
        body: "เราสามารถแก้ไขค่าด้วย key เดิม หรือเพิ่ม key ใหม่ได้ทันที",
        code: `student["score"] = 90
student["club"] = "Coding Club"

print(student)`
      }
    ],
    exercise: {
      title: "โปรไฟล์นักเรียน",
      tasks: [
        "สร้าง dictionary ชื่อ profile",
        "มี key name, level, hobby",
        "เพิ่ม key goal แล้วแสดงผลทั้งหมด"
      ],
      starterCode: `profile = {
    "name": "ชื่อของฉัน",
    "level": "beginner",
    "hobby": "..."
}

profile["goal"] = "เขียนเกมด้วย Python"
print(profile)`
    },
    quiz: [
      {
        question: "dictionary เก็บข้อมูลเป็นคู่แบบใด",
        options: ["key/value", "left/right", "top/bottom", "start/end"],
        answer: 0,
        explanation: "dictionary ใช้ key เพื่อเรียก value ที่เกี่ยวข้อง"
      },
      {
        question: "ถ้าต้องการอ่านชื่อจาก student ต้องใช้ข้อใด",
        options: ["student(name)", "student.name()", "student[\"name\"]", "student->name"],
        answer: 2,
        explanation: "ใช้ key ในวงเล็บเหลี่ยม เช่น student[\"name\"]"
      },
      {
        question: "key ใน dictionary ควรเป็นอย่างไร",
        options: ["สื่อความหมาย", "สุ่มยาว ๆ", "เว้นวรรคเยอะ ๆ", "เป็นรูปภาพเท่านั้น"],
        answer: 0,
        explanation: "key ที่สื่อความหมายช่วยให้โค้ดอ่านง่าย"
      }
    ]
  },
  {
    id: 9,
    slug: "guess-number-project",
    title: "บทที่ 9: Mini Project เกมทายเลข",
    subtitle: "รวม input, if และ loop เพื่อสร้างเกมโต้ตอบ",
    minutes: 40,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "ออกแบบเกมง่าย ๆ",
      "ใช้ random เพื่อสุ่มตัวเลข",
      "ให้คำใบ้ด้วยเงื่อนไข"
    ],
    sections: [
      {
        heading: "สุ่มเลขด้วย random",
        body: "โมดูล random ช่วยให้โปรแกรมสุ่มเลขได้ เหมาะกับการสร้างเกม",
        code: `import random

secret = random.randint(1, 10)
print(secret)`
      },
      {
        heading: "โครงเกมทายเลข",
        body: "ใช้ while เพื่อให้ผู้เล่นทายซ้ำจนกว่าจะถูก และใช้ if เพื่อบอกใบ้",
        code: `import random

secret = random.randint(1, 10)
guess = 0

while guess != secret:
    guess = int(input("ทายเลข 1-10: "))

    if guess < secret:
        print("น้อยไป")
    elif guess > secret:
        print("มากไป")
    else:
        print("ถูกต้อง!")`
      }
    ],
    exercise: {
      title: "ปรับเกมให้สนุกขึ้น",
      tasks: [
        "เพิ่มตัวแปร attempts เพื่อนับจำนวนครั้งที่ทาย",
        "เมื่อทายถูกให้แสดงจำนวนครั้ง",
        "ลองเปลี่ยนช่วงเลขเป็น 1 ถึง 20"
      ],
      starterCode: `import random

secret = random.randint(1, 20)
guess = 0
attempts = 0

while guess != secret:
    guess = int(input("ทายเลข 1-20: "))
    attempts = attempts + 1

    if guess < secret:
        print("น้อยไป")
    elif guess > secret:
        print("มากไป")
    else:
        print("ถูกต้อง ใช้ทั้งหมด", attempts, "ครั้ง")`
    },
    quiz: [
      {
        question: "random.randint(1, 10) ทำอะไร",
        options: ["สุ่มเลข 1 ถึง 10", "แสดงเลข 10 เสมอ", "รับข้อความ", "สร้าง list"],
        answer: 0,
        explanation: "randint(a, b) สุ่มจำนวนเต็มตั้งแต่ a ถึง b"
      },
      {
        question: "เกมทายเลขใช้ loop เพราะอะไร",
        options: ["ให้ทายซ้ำได้", "ทำให้สีสวย", "ห้ามใช้ if", "ลบคะแนนอัตโนมัติ"],
        answer: 0,
        explanation: "loop ทำให้ผู้เล่นทายซ้ำจนกว่าจะถูก"
      },
      {
        question: "attempts ใช้เก็บอะไรในตัวอย่างนี้",
        options: ["จำนวนครั้งที่ทาย", "ชื่อผู้เล่น", "คำตอบลับ", "ชนิดข้อมูล"],
        answer: 0,
        explanation: "attempts นับจำนวนรอบที่ผู้เล่นทาย"
      }
    ]
  },
  {
    id: 10,
    slug: "quiz-app-project",
    title: "บทที่ 10: Mini Project แอปแบบทดสอบ",
    subtitle: "สร้างโปรแกรมถามคำถาม ตรวจคำตอบ และสรุปคะแนน",
    minutes: 45,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "เก็บคำถามใน list/dictionary",
      "วนถามคำถามทีละข้อ",
      "คำนวณคะแนนรวม"
    ],
    sections: [
      {
        heading: "ออกแบบข้อมูลคำถาม",
        body: "เราสามารถใช้ list ของ dictionary เพื่อเก็บคำถามและคำตอบที่ถูกต้องหลายข้อ",
        code: `questions = [
    {"text": "Python ใช้คำสั่งใดแสดงผล", "answer": "print"},
    {"text": "list เริ่ม index ที่เลขใด", "answer": "0"}
]`
      },
      {
        heading: "วนถามและตรวจคำตอบ",
        body: "ใช้ for เพื่อถามทีละข้อ แล้วเพิ่มคะแนนเมื่อคำตอบถูก",
        code: `score = 0

for question in questions:
    answer = input(question["text"] + ": ")

    if answer == question["answer"]:
        score = score + 1

print("คะแนนของคุณ =", score)`
      }
    ],
    exercise: {
      title: "แบบทดสอบ 5 ข้อของฉัน",
      tasks: [
        "สร้างคำถามอย่างน้อย 5 ข้อ",
        "วนถามคำถามและตรวจคำตอบ",
        "แสดงคะแนนรวมและข้อความให้กำลังใจ"
      ],
      starterCode: `questions = [
    {"text": "2 + 2 เท่ากับ", "answer": "4"},
    {"text": "Python ใช้ print หรือ show", "answer": "print"}
]

score = 0

for question in questions:
    answer = input(question["text"] + ": ")
    if answer == question["answer"]:
        score = score + 1

print("คุณได้", score, "คะแนน")`
    },
    quiz: [
      {
        question: "list ของ dictionary เหมาะกับอะไร",
        options: ["เก็บคำถามหลายข้อ", "เปิดเพลง", "เปลี่ยนรหัสผ่าน", "ปิดโปรแกรมทันที"],
        answer: 0,
        explanation: "โครงสร้างนี้ช่วยเก็บข้อมูลหลายชุดที่มี key เหมือนกัน"
      },
      {
        question: "ถ้าตอบถูกควรทำอะไรกับ score",
        options: ["ลดลง 1", "เพิ่มขึ้น 1", "เปลี่ยนเป็นข้อความ", "ลบตัวแปร"],
        answer: 1,
        explanation: "เมื่อตอบถูกให้เพิ่มคะแนน เช่น score = score + 1"
      },
      {
        question: "โปรเจกต์บทนี้รวมความรู้เรื่องใด",
        options: ["list, dictionary, loop, if", "รูปภาพเท่านั้น", "ฐานข้อมูลเท่านั้น", "HTML เท่านั้น"],
        answer: 0,
        explanation: "โปรเจกต์นี้ใช้โครงสร้างข้อมูล การวนซ้ำ และเงื่อนไขร่วมกัน"
      }
    ]
  },
  {
    id: 11,
    slug: "int-float",
    title: "บทที่ 11: int() และ float()",
    subtitle: "แปลงข้อความให้เป็นตัวเลขจำนวนเต็มหรือทศนิยม เพื่อใช้คำนวณได้ถูกต้อง",
    minutes: 28,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "ใช้ int() เพื่อแปลงข้อมูลเป็นจำนวนเต็ม",
      "ใช้ float() เพื่อแปลงข้อมูลเป็นเลขทศนิยม",
      "เลือกชนิดตัวเลขให้เหมาะกับงานคำนวณ"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "ข้อมูลที่รับจาก input() จะเป็นข้อความเสมอ แม้ผู้ใช้จะพิมพ์ตัวเลขเข้ามาก็ตาม หากต้องการนำไปบวก ลบ คูณ หรือหาร เราต้องแปลงข้อความนั้นให้เป็นตัวเลขก่อน"
      },
      {
        heading: "เนื้อหา",
        body: "int() ใช้กับตัวเลขจำนวนเต็ม เช่น อายุ จำนวนสินค้า หรือจำนวนครั้ง ส่วน float() ใช้กับตัวเลขที่มีทศนิยม เช่น น้ำหนัก ราคา หรือคะแนนเฉลี่ย"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้รับอายุและส่วนสูงจากผู้ใช้ แล้วแปลงข้อมูลให้เป็นตัวเลขก่อนนำไปแสดงผล",
        code: `age = int(input("อายุของคุณ: "))
height = float(input("ส่วนสูงเป็นเมตร: "))

print("ปีหน้าคุณจะอายุ", age + 1)
print("ส่วนสูงของคุณคือ", height, "เมตร")`
      },
      {
        heading: "สรุปท้ายบท",
        body: "ถ้าข้อมูลเป็นจำนวนเต็มให้ใช้ int() ถ้ามีทศนิยมให้ใช้ float() และต้องระวังว่าข้อความที่แปลงต้องเป็นรูปแบบตัวเลขจริง ไม่เช่นนั้น Python จะแจ้ง error"
      }
    ],
    exercise: {
      title: "คำนวณราคารวม",
      tasks: [
        "รับจำนวนสินค้าด้วย int()",
        "รับราคาต่อชิ้นด้วย float()",
        "คำนวณและแสดงราคารวม"
      ],
      starterCode: `quantity = int(input("จำนวนสินค้า: "))
price = float(input("ราคาต่อชิ้น: "))
total = quantity * price

print("ราคารวม =", total, "บาท")`
    },
    quiz: [
      {
        question: "int() เหมาะกับข้อมูลแบบใด",
        options: ["ข้อความทั่วไป", "จำนวนเต็ม", "เลขทศนิยมเท่านั้น", "list"],
        answer: 1,
        explanation: "int() ใช้แปลงข้อมูลเป็นจำนวนเต็ม เช่น 10 หรือ 25"
      },
      {
        question: "ถ้ารับค่าน้ำหนัก 45.5 ควรใช้คำสั่งใด",
        options: ["int()", "float()", "str()", "len()"],
        answer: 1,
        explanation: "45.5 มีทศนิยม จึงควรใช้ float()"
      },
      {
        question: "ทำไม input() ที่เป็นตัวเลขจึงต้องแปลงก่อนคำนวณ",
        options: ["เพราะ input() คืนค่าเป็น str", "เพราะ Python ห้ามบวกเลข", "เพราะ print() ใช้ไม่ได้", "เพราะตัวเลขต้องอยู่ใน list"],
        answer: 0,
        explanation: "input() คืนค่าเป็นข้อความเสมอ ต้องแปลงเป็น int หรือ float ก่อนคำนวณ"
      }
    ]
  },
  {
    id: 12,
    slug: "str-conversion",
    title: "บทที่ 12: str()",
    subtitle: "แปลงข้อมูลให้เป็นข้อความ เพื่อรวมกับประโยคหรือแสดงผลให้อ่านง่าย",
    minutes: 25,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "ใช้ str() เพื่อแปลงตัวเลขเป็นข้อความ",
      "รวมข้อความกับข้อมูลชนิดอื่นได้ถูกต้อง",
      "เข้าใจความแตกต่างระหว่างตัวเลขและข้อความ"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "บางครั้งเราต้องการนำตัวเลขไปต่อกับข้อความ เช่น สร้างประโยคว่า คุณได้คะแนน 85 คะแนน แต่ Python จะไม่ให้เอา str มาบวกกับ int โดยตรง"
      },
      {
        heading: "เนื้อหา",
        body: "str() ใช้เปลี่ยนข้อมูลชนิดอื่นให้กลายเป็นข้อความ เมื่อเป็นข้อความแล้วเราสามารถนำไปต่อกับข้อความอื่นด้วยเครื่องหมาย + ได้"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้แปลงคะแนนที่เป็นตัวเลขให้เป็นข้อความก่อนนำไปต่อเป็นประโยค",
        code: `score = 85
message = "คุณได้คะแนน " + str(score) + " คะแนน"

print(message)`
      },
      {
        heading: "สรุปท้ายบท",
        body: "ใช้ str() เมื่ออยากนำข้อมูลไปแสดงเป็นข้อความหรือรวมกับประโยค ช่วยลด error เรื่องการนำข้อมูลต่างชนิดมาบวกกัน"
      }
    ],
    exercise: {
      title: "สร้างข้อความแนะนำตัว",
      tasks: [
        "สร้างตัวแปร name เป็นข้อความ",
        "สร้างตัวแปร age เป็นตัวเลข",
        "ใช้ str() เพื่อรวม age กับข้อความ"
      ],
      starterCode: `name = "มะลิ"
age = 14

profile = "ฉันชื่อ " + name + " อายุ " + str(age) + " ปี"
print(profile)`
    },
    quiz: [
      {
        question: "str() ใช้ทำอะไร",
        options: ["แปลงเป็นข้อความ", "แปลงเป็นจำนวนเต็ม", "นับจำนวนข้อมูล", "สุ่มตัวเลข"],
        answer: 0,
        explanation: "str() ใช้เปลี่ยนข้อมูลให้เป็นข้อความ"
      },
      {
        question: "ข้อใดทำให้ \"คะแนน: \" + score ไม่ error เมื่อ score เป็น int",
        options: ["\"คะแนน: \" + str(score)", "\"คะแนน: \" + int(score)", "len(score)", "float(\"คะแนน\")"],
        answer: 0,
        explanation: "ต้องแปลง score เป็นข้อความด้วย str() ก่อนนำไปต่อกับข้อความ"
      },
      {
        question: "หลังใช้ str(123) ผลลัพธ์มีชนิดข้อมูลใด",
        options: ["int", "float", "str", "bool"],
        answer: 2,
        explanation: "str(123) ได้ข้อความ \"123\""
      }
    ]
  },
  {
    id: 13,
    slug: "len-function",
    title: "บทที่ 13: len()",
    subtitle: "นับจำนวนตัวอักษรหรือจำนวนสมาชิกในข้อมูล เช่น ข้อความและ list",
    minutes: 25,
    free: false,
    badge: "paid",
    accent: "bg-melon",
    objectives: [
      "ใช้ len() กับข้อความ",
      "ใช้ len() กับ list",
      "นำจำนวนที่ได้ไปใช้ตรวจเงื่อนไข"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "len() เป็นคำสั่งที่ใช้บ่อยมาก เพราะช่วยนับขนาดของข้อมูล เช่น รหัสผ่านยาวกี่ตัวอักษร หรือ list มีข้อมูลกี่รายการ"
      },
      {
        heading: "เนื้อหา",
        body: "เมื่อใช้ len() กับข้อความ Python จะนับจำนวนตัวอักษร เมื่อใช้กับ list Python จะนับจำนวนสมาชิกใน list"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้ตรวจว่ารหัสผ่านยาวพอหรือไม่ และนับจำนวนวิชาใน list",
        code: `password = "python123"
subjects = ["Python", "Math", "English"]

print("รหัสผ่านยาว", len(password), "ตัวอักษร")
print("มีวิชา", len(subjects), "รายการ")

if len(password) >= 8:
    print("รหัสผ่านยาวพอ")
else:
    print("รหัสผ่านสั้นเกินไป")`
      },
      {
        heading: "สรุปท้ายบท",
        body: "len() ช่วยนับจำนวนข้อมูลและนำผลลัพธ์ไปใช้ต่อได้ เช่น ตรวจความยาวรหัสผ่านหรือจำนวนรายการใน list"
      }
    ],
    exercise: {
      title: "เช็คชื่อผู้ใช้",
      tasks: [
        "รับชื่อผู้ใช้จาก input()",
        "ใช้ len() นับจำนวนตัวอักษร",
        "ถ้าชื่อสั้นกว่า 3 ตัวอักษรให้แจ้งเตือน"
      ],
      starterCode: `username = input("ตั้งชื่อผู้ใช้: ")

if len(username) < 3:
    print("ชื่อผู้ใช้สั้นเกินไป")
else:
    print("ใช้ชื่อนี้ได้")`
    },
    quiz: [
      {
        question: "len(\"Python\") ได้ค่าเท่าไร",
        options: ["5", "6", "7", "0"],
        answer: 1,
        explanation: "\"Python\" มี 6 ตัวอักษร"
      },
      {
        question: "len([10, 20, 30]) ได้ค่าเท่าไร",
        options: ["1", "2", "3", "30"],
        answer: 2,
        explanation: "list นี้มีสมาชิก 3 ตัว"
      },
      {
        question: "len() มีประโยชน์ในงานใด",
        options: ["ตรวจความยาวรหัสผ่าน", "ปิดเครื่อง", "เปลี่ยนสีจอ", "ลบ Python"],
        answer: 0,
        explanation: "len() ใช้ตรวจจำนวนตัวอักษรหรือจำนวนสมาชิกได้"
      }
    ]
  },
  {
    id: 14,
    slug: "basic-list",
    title: "บทที่ 14: List เบื้องต้น",
    subtitle: "ทำความรู้จัก list แบบเป็นขั้นตอน และอ่านข้อมูลด้วย index",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-minty",
    objectives: [
      "สร้าง list ด้วยวงเล็บเหลี่ยม",
      "อ่านข้อมูลใน list ด้วย index",
      "เข้าใจว่า index เริ่มจาก 0"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "list เป็นโครงสร้างข้อมูลที่ใช้เก็บหลายค่าไว้ในตัวแปรเดียว เหมาะกับข้อมูลที่เป็นชุด เช่น รายชื่อ คะแนน หรือรายการของที่ต้องซื้อ"
      },
      {
        heading: "เนื้อหา",
        body: "เราสร้าง list ด้วยวงเล็บเหลี่ยม [] และคั่นข้อมูลแต่ละตัวด้วย comma การอ่านสมาชิกใช้ index โดยตำแหน่งแรกคือ 0"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้สร้าง list รายชื่อภาษาโปรแกรม และอ่านรายการแรกกับรายการที่สอง",
        code: `languages = ["Python", "JavaScript", "HTML"]

print(languages[0])
print(languages[1])
print("มีทั้งหมด", len(languages), "รายการ")`
      },
      {
        heading: "สรุปท้ายบท",
        body: "list ช่วยเก็บข้อมูลหลายรายการในตัวแปรเดียว และ index เริ่มนับจาก 0 เสมอ"
      }
    ],
    exercise: {
      title: "รายการงานที่ต้องทำ",
      tasks: [
        "สร้าง list ชื่อ tasks",
        "ใส่รายการอย่างน้อย 3 อย่าง",
        "แสดงรายการแรกและจำนวนรายการทั้งหมด"
      ],
      starterCode: `tasks = ["อ่านบทเรียน", "ทำแบบฝึกหัด", "พักสายตา"]

print("งานแรก:", tasks[0])
print("จำนวนงาน:", len(tasks))`
    },
    quiz: [
      {
        question: "list ใช้สัญลักษณ์ใด",
        options: ["[]", "{}", "()", "<>"],
        answer: 0,
        explanation: "list ใช้วงเล็บเหลี่ยม []"
      },
      {
        question: "index แรกของ list คือเลขใด",
        options: ["0", "1", "2", "10"],
        answer: 0,
        explanation: "Python เริ่ม index ของ list ที่ 0"
      },
      {
        question: "ข้อใดอ่านสมาชิกตัวแรกของ items ได้ถูกต้อง",
        options: ["items[0]", "items[1]", "items.first()", "items{0}"],
        answer: 0,
        explanation: "สมาชิกตัวแรกอยู่ที่ index 0 จึงใช้ items[0]"
      }
    ]
  },
  {
    id: 15,
    slug: "list-append",
    title: "บทที่ 15: การเพิ่มข้อมูลด้วย append()",
    subtitle: "เพิ่มสมาชิกใหม่ต่อท้าย list เพื่อให้ข้อมูลเติบโตตามการใช้งาน",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "ใช้ append() เพิ่มข้อมูลท้าย list",
      "เพิ่มข้อมูลจาก input()",
      "ตรวจจำนวนสมาชิกหลังเพิ่มข้อมูล"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "ในโปรแกรมจริง ข้อมูลมักไม่ได้มีครบตั้งแต่แรก เช่น ผู้ใช้เพิ่มรายการซื้อของหรือเพิ่มคะแนนใหม่ เราจึงต้องรู้วิธีเพิ่มข้อมูลใน list"
      },
      {
        heading: "เนื้อหา",
        body: "append() เป็น method ของ list ใช้เพิ่มข้อมูลใหม่ไปต่อท้าย list โดยเขียนในรูปแบบ ชื่อlist.append(ข้อมูล)"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้เพิ่มชื่อผู้เรียนใหม่เข้าไปใน list แล้วแสดงจำนวนสมาชิกล่าสุด",
        code: `students = ["มะลิ", "ต้น"]
new_student = input("ชื่อผู้เรียนใหม่: ")

students.append(new_student)

print(students)
print("มีผู้เรียนทั้งหมด", len(students), "คน")`
      },
      {
        heading: "สรุปท้ายบท",
        body: "append() เหมาะกับการเพิ่มข้อมูลทีละรายการต่อท้าย list และทำให้ list เปลี่ยนแปลงจากเดิม"
      }
    ],
    exercise: {
      title: "รายการซื้อของ",
      tasks: [
        "สร้าง list shopping",
        "รับของที่ต้องการซื้อจากผู้ใช้",
        "เพิ่มลง list ด้วย append() แล้วแสดงผล"
      ],
      starterCode: `shopping = ["นม", "ขนมปัง"]
item = input("เพิ่มของที่ต้องซื้อ: ")

shopping.append(item)
print("รายการล่าสุด:", shopping)`
    },
    quiz: [
      {
        question: "append() เพิ่มข้อมูลไว้ที่ตำแหน่งใด",
        options: ["ต้น list", "ท้าย list", "กลาง list เสมอ", "ลบข้อมูล"],
        answer: 1,
        explanation: "append() เพิ่มสมาชิกใหม่ต่อท้าย list"
      },
      {
        question: "ข้อใดเขียน append() ได้ถูกต้อง",
        options: ["scores.append(10)", "append.scores(10)", "scores.add = 10", "scores[append]"],
        answer: 0,
        explanation: "รูปแบบที่ถูกต้องคือ ชื่อlist.append(ข้อมูล)"
      },
      {
        question: "หลังใช้ append() list เดิมจะเป็นอย่างไร",
        options: ["มีข้อมูลเพิ่ม", "หายไปทั้งหมด", "กลายเป็น string", "ห้ามใช้อีก"],
        answer: 0,
        explanation: "append() ทำให้ list เดิมมีสมาชิกเพิ่มขึ้น"
      }
    ]
  },
  {
    id: 16,
    slug: "loop-in-list",
    title: "บทที่ 16: การวนลูปใน List",
    subtitle: "อ่านสมาชิกทุกตัวใน list ด้วย for loop เพื่อประมวลผลทีละรายการ",
    minutes: 32,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "ใช้ for วนอ่าน list",
      "แสดงข้อมูลทีละรายการ",
      "รวมค่าตัวเลขใน list"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "ถ้า list มีข้อมูลหลายรายการ เราไม่ควรเขียน print ทีละบรรทัด เพราะจะเหนื่อยและแก้ไขยาก for loop ช่วยให้เราทำงานกับสมาชิกทุกตัวได้ง่าย"
      },
      {
        heading: "เนื้อหา",
        body: "รูปแบบ for item in list หมายถึง ให้หยิบข้อมูลใน list ออกมาทีละตัว แล้วเก็บไว้ในตัวแปร item เพื่อใช้ในรอบนั้น"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้วนแสดงคะแนนทุกตัว และคำนวณคะแนนรวม",
        code: `scores = [10, 8, 9, 7]
total = 0

for score in scores:
    print("คะแนน:", score)
    total = total + score

print("คะแนนรวม:", total)`
      },
      {
        heading: "สรุปท้ายบท",
        body: "การวนลูปใน list ช่วยให้เราจัดการข้อมูลหลายรายการได้ในโค้ดสั้น ๆ และนำไปใช้คำนวณหรือแสดงผลได้สะดวก"
      }
    ],
    exercise: {
      title: "แสดงรายชื่อผู้เรียน",
      tasks: [
        "สร้าง list ชื่อ learners",
        "ใช้ for วนแสดงชื่อทีละคน",
        "เพิ่มข้อความนำหน้าแต่ละชื่อ"
      ],
      starterCode: `learners = ["มะลิ", "ต้น", "ฟ้า"]

for learner in learners:
    print("ผู้เรียน:", learner)`
    },
    quiz: [
      {
        question: "for item in items หมายถึงอะไร",
        options: ["วนอ่านสมาชิกใน items ทีละตัว", "ลบ items", "สร้างตัวแปรชื่อ items ใหม่", "หยุดโปรแกรม"],
        answer: 0,
        explanation: "for จะหยิบสมาชิกใน list ออกมาทีละตัว"
      },
      {
        question: "ถ้าต้องการรวมคะแนนใน list ควรใช้ตัวแปรใดช่วย",
        options: ["ตัวแปรสะสมค่า เช่น total", "ตัวแปรรูปภาพ", "ตัวแปรชื่อ print", "ไม่ต้องใช้ตัวแปร"],
        answer: 0,
        explanation: "ใช้ total เก็บผลรวมและเพิ่มค่าในแต่ละรอบ"
      },
      {
        question: "ข้อดีของการวนลูปใน list คืออะไร",
        options: ["ไม่ต้องเขียนคำสั่งซ้ำหลายบรรทัด", "ทำให้ list หายไป", "ห้ามใช้ if", "ใช้ได้เฉพาะข้อความ"],
        answer: 0,
        explanation: "loop ช่วยทำงานซ้ำกับสมาชิกทุกตัวโดยไม่ต้องเขียนซ้ำเอง"
      }
    ]
  },
  {
    id: 17,
    slug: "basic-dictionary",
    title: "บทที่ 17: Dictionary เบื้องต้น",
    subtitle: "เก็บข้อมูลแบบมีชื่อกำกับด้วย key และ value เช่น โปรไฟล์ผู้เรียน",
    minutes: 32,
    free: false,
    badge: "paid",
    accent: "bg-melon",
    objectives: [
      "สร้าง dictionary ด้วย key/value",
      "อ่านข้อมูลด้วย key",
      "เพิ่มและแก้ไขข้อมูลใน dictionary"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "dictionary เหมาะกับข้อมูลที่มีชื่อช่องชัดเจน เช่น ชื่อผู้เรียน อายุ คะแนน และสถานะ เพราะเราเรียกข้อมูลด้วยชื่อ key ได้ทันที"
      },
      {
        heading: "เนื้อหา",
        body: "dictionary ใช้วงเล็บปีกกา {} และเก็บข้อมูลเป็นคู่ key: value เช่น \"name\": \"มะลิ\" การอ่านข้อมูลใช้ profile[\"name\"]"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้สร้างโปรไฟล์ผู้เรียน อ่านข้อมูล และเพิ่มเป้าหมายการเรียน",
        code: `profile = {
    "name": "มะลิ",
    "level": "beginner",
    "score": 90
}

print(profile["name"])

profile["goal"] = "สร้างเกมด้วย Python"
print(profile)`
      },
      {
        heading: "สรุปท้ายบท",
        body: "dictionary ช่วยให้ข้อมูลอ่านง่ายเพราะแต่ละค่ามี key กำกับ เหมาะกับข้อมูลแบบโปรไฟล์หรือข้อมูลที่มีหลายช่อง"
      }
    ],
    exercise: {
      title: "สร้างโปรไฟล์คอร์ส",
      tasks: [
        "สร้าง dictionary ชื่อ course",
        "มี key title, level, lessons",
        "เพิ่ม key status แล้วแสดงผล"
      ],
      starterCode: `course = {
    "title": "Python สำหรับมือใหม่",
    "level": "beginner",
    "lessons": 20
}

course["status"] = "available"
print(course)`
    },
    quiz: [
      {
        question: "dictionary เก็บข้อมูลเป็นคู่แบบใด",
        options: ["key/value", "index/value เท่านั้น", "row/column", "file/folder"],
        answer: 0,
        explanation: "dictionary ใช้ key เพื่ออ้างถึง value"
      },
      {
        question: "ข้อใดอ่านค่า name จาก profile ได้ถูกต้อง",
        options: ["profile[\"name\"]", "profile.name", "profile(0)", "name.profile"],
        answer: 0,
        explanation: "dictionary อ่านค่าด้วย key ในวงเล็บเหลี่ยม"
      },
      {
        question: "dictionary ใช้สัญลักษณ์ใดในการสร้าง",
        options: ["{}", "[]", "()", "||"],
        answer: 0,
        explanation: "dictionary สร้างด้วยวงเล็บปีกกา {}"
      }
    ]
  },
  {
    id: 18,
    slug: "basic-function",
    title: "บทที่ 18: Function เบื้องต้น",
    subtitle: "สร้างชุดคำสั่งของเราเอง เพื่อให้โค้ดเป็นระเบียบและนำกลับมาใช้ซ้ำได้",
    minutes: 35,
    free: false,
    badge: "paid",
    accent: "bg-minty",
    objectives: [
      "สร้าง function ด้วย def",
      "เรียกใช้ function",
      "ส่งข้อมูลเข้า function ด้วย parameter"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "เมื่อโปรแกรมเริ่มยาวขึ้น การรวมคำสั่งที่เกี่ยวข้องไว้ใน function จะช่วยให้โค้ดอ่านง่าย แก้ไขง่าย และใช้ซ้ำได้หลายครั้ง"
      },
      {
        heading: "เนื้อหา",
        body: "สร้าง function ด้วยคำว่า def ตามด้วยชื่อ function และวงเล็บ คำสั่งด้านในต้องย่อหน้า หากต้องการรับข้อมูลให้ใส่ parameter ในวงเล็บ"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้สร้าง function สำหรับทักทายผู้เรียน และ function สำหรับคำนวณผลรวม",
        code: `def greet(name):
    print("สวัสดี", name)

def add(a, b):
    return a + b

greet("มะลิ")
result = add(5, 7)
print("ผลรวม =", result)`
      },
      {
        heading: "สรุปท้ายบท",
        body: "function ช่วยจัดกลุ่มคำสั่งและลดการเขียนซ้ำ ใช้ def เพื่อสร้าง function และเรียกชื่อ function เมื่อต้องการใช้งาน"
      }
    ],
    exercise: {
      title: "ฟังก์ชันคำนวณส่วนลด",
      tasks: [
        "สร้าง function ชื่อ discount_price",
        "รับราคาและส่วนลดเป็น parameter",
        "return ราคาหลังหักส่วนลด"
      ],
      starterCode: `def discount_price(price, discount):
    return price - discount

final_price = discount_price(399, 50)
print("ราคาหลังลด =", final_price)`
    },
    quiz: [
      {
        question: "คำใดใช้สร้าง function",
        options: ["def", "for", "list", "input"],
        answer: 0,
        explanation: "Python ใช้ def เพื่อสร้าง function"
      },
      {
        question: "parameter คืออะไร",
        options: ["ข้อมูลที่ส่งเข้า function", "ชื่อไฟล์", "ชนิดของ list", "คำสั่งสุ่มเลข"],
        answer: 0,
        explanation: "parameter เป็นตัวรับข้อมูลที่ function จะใช้"
      },
      {
        question: "return ใช้ทำอะไร",
        options: ["ส่งค่ากลับจาก function", "แสดงข้อความเสมอ", "สร้าง loop", "ลบ function"],
        answer: 0,
        explanation: "return ใช้ส่งผลลัพธ์กลับไปยังจุดที่เรียก function"
      }
    ]
  },
  {
    id: 19,
    slug: "random-numbers",
    title: "บทที่ 19: Random และการสุ่มตัวเลข",
    subtitle: "ใช้โมดูล random เพื่อสร้างตัวเลขแบบสุ่มสำหรับเกมและโปรแกรมโต้ตอบ",
    minutes: 32,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "import โมดูล random",
      "ใช้ randint() เพื่อสุ่มจำนวนเต็ม",
      "นำเลขสุ่มไปใช้ในเงื่อนไข"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "การสุ่มทำให้โปรแกรมสนุกและคาดเดาไม่ได้ เช่น เกมทายเลข ลูกเต๋า หรือสุ่มโจทย์แบบฝึกหัด Python มีโมดูล random ให้ใช้งาน"
      },
      {
        heading: "เนื้อหา",
        body: "ก่อนใช้ random ต้อง import random จากนั้นใช้ random.randint(a, b) เพื่อสุ่มจำนวนเต็มตั้งแต่ a ถึง b รวมปลายทั้งสองด้าน"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้สุ่มเลขลูกเต๋า 1 ถึง 6 และตรวจว่าได้เลข 6 หรือไม่",
        code: `import random

dice = random.randint(1, 6)
print("ทอยลูกเต๋าได้", dice)

if dice == 6:
    print("โชคดีมาก!")
else:
    print("ลองใหม่ได้")`
      },
      {
        heading: "สรุปท้ายบท",
        body: "random.randint() ช่วยสุ่มจำนวนเต็มในช่วงที่กำหนด เหมาะกับการสร้างเกมและโปรแกรมที่ต้องการความหลากหลาย"
      }
    ],
    exercise: {
      title: "สุ่มคะแนนโบนัส",
      tasks: [
        "import random",
        "สุ่มคะแนนโบนัส 1 ถึง 10",
        "แสดงคะแนนและข้อความตามเงื่อนไข"
      ],
      starterCode: `import random

bonus = random.randint(1, 10)
print("โบนัสของคุณคือ", bonus)

if bonus >= 8:
    print("โบนัสสูงมาก")
else:
    print("โบนัสมาตรฐาน")`
    },
    quiz: [
      {
        question: "ก่อนใช้ random.randint() ต้องทำอะไรก่อน",
        options: ["import random", "print random", "def random", "len(random)"],
        answer: 0,
        explanation: "ต้อง import random ก่อนใช้คำสั่งในโมดูล random"
      },
      {
        question: "random.randint(1, 6) สุ่มเลขช่วงใด",
        options: ["1 ถึง 6", "0 ถึง 6", "1 ถึง 5", "เฉพาะ 6"],
        answer: 0,
        explanation: "randint(1, 6) รวมทั้ง 1 และ 6"
      },
      {
        question: "random เหมาะกับงานใด",
        options: ["เกมทายเลข", "ตั้งชื่อไฟล์อย่างเดียว", "ลบข้อมูล", "หยุด loop ทุกครั้ง"],
        answer: 0,
        explanation: "เกมทายเลขต้องใช้เลขสุ่มเพื่อให้ผู้เล่นเดา"
      }
    ]
  },
  {
    id: 20,
    slug: "number-guessing-game-project",
    title: "บทที่ 20: โปรเจกต์เกมทายตัวเลข",
    subtitle: "รวมความรู้เรื่อง input, int(), if, while และ random เพื่อสร้างเกมเต็มรูปแบบ",
    minutes: 45,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "วางโครงโปรเจกต์เกมทายเลข",
      "ใช้ loop ให้ผู้เล่นทายซ้ำ",
      "ให้คำใบ้และนับจำนวนครั้งที่ทาย"
    ],
    sections: [
      {
        heading: "บทนำ",
        body: "โปรเจกต์นี้เป็นการรวมความรู้หลายบทเข้าด้วยกัน ผู้เล่นจะทายเลขที่โปรแกรมสุ่มไว้ โปรแกรมจะบอกว่าน้อยไป มากไป หรือถูกต้อง"
      },
      {
        heading: "เนื้อหา",
        body: "เราจะใช้ random.randint() เพื่อสร้างเลขลับ ใช้ input() และ int() เพื่อรับคำตอบ ใช้ while เพื่อทายซ้ำ และใช้ if/elif/else เพื่อให้คำใบ้"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "นี่คือเกมทายตัวเลขแบบสมบูรณ์ที่นับจำนวนครั้งและจบเมื่อผู้เล่นทายถูก",
        code: `import random

secret = random.randint(1, 20)
guess = 0
attempts = 0

print("เกมทายตัวเลข 1 ถึง 20")

while guess != secret:
    guess = int(input("ทายเลข: "))
    attempts = attempts + 1

    if guess < secret:
        print("น้อยไป")
    elif guess > secret:
        print("มากไป")
    else:
        print("ถูกต้อง!")
        print("คุณทายทั้งหมด", attempts, "ครั้ง")`
      },
      {
        heading: "สรุปท้ายบท",
        body: "เกมทายตัวเลขช่วยฝึกการรวมคำสั่งหลายอย่างเข้าด้วยกัน เมื่อเข้าใจโปรเจกต์นี้แล้ว ผู้เรียนสามารถต่อยอดเป็นเกมที่มีระดับความยาก คะแนน หรือจำนวนครั้งจำกัดได้"
      }
    ],
    exercise: {
      title: "เพิ่มระบบจำกัดจำนวนครั้ง",
      tasks: [
        "กำหนดให้ผู้เล่นทายได้ไม่เกิน 5 ครั้ง",
        "ถ้าทายครบแล้วยังไม่ถูกให้เฉลยเลขลับ",
        "แสดงข้อความให้กำลังใจเมื่อจบเกม"
      ],
      starterCode: `import random

secret = random.randint(1, 20)
attempts = 0
max_attempts = 5
guessed_correctly = False

while attempts < max_attempts:
    guess = int(input("ทายเลข: "))
    attempts = attempts + 1

    if guess == secret:
        print("ถูกต้อง!")
        guessed_correctly = True
        break
    elif guess < secret:
        print("น้อยไป")
    else:
        print("มากไป")

if not guessed_correctly:
    print("หมดรอบแล้ว เลขลับคือ", secret)`
    },
    quiz: [
      {
        question: "โปรเจกต์เกมทายเลขใช้ random เพื่ออะไร",
        options: ["สุ่มเลขลับ", "แสดงข้อความ", "สร้าง list", "เปลี่ยนรหัสผ่าน"],
        answer: 0,
        explanation: "random ใช้สุ่มเลขที่ผู้เล่นต้องทาย"
      },
      {
        question: "while ในเกมนี้ใช้เพื่ออะไร",
        options: ["ให้ผู้เล่นทายซ้ำจนกว่าจะจบเกม", "ลบเลขลับ", "แปลงข้อความเป็นตัวเลข", "สร้าง dictionary"],
        answer: 0,
        explanation: "while ทำให้เกมวนรับคำตอบหลายครั้ง"
      },
      {
        question: "ถ้า guess < secret ควรบอกผู้เล่นว่าอะไร",
        options: ["น้อยไป", "มากไป", "ถูกต้อง", "หยุดเกมทันที"],
        answer: 0,
        explanation: "ถ้าค่าที่ทายน้อยกว่าเลขลับ คำใบ้ควรเป็นน้อยไป"
      },
      {
        question: "attempts ใช้เก็บข้อมูลอะไร",
        options: ["จำนวนครั้งที่ทาย", "ชื่อผู้เล่น", "ชนิดข้อมูล", "ข้อความเฉลย"],
        answer: 0,
        explanation: "attempts ใช้นับจำนวนครั้งที่ผู้เล่นทาย"
      }
    ]
  }
];

type LessonEnhancement = {
  concept: string;
  examples: string;
  commonMistakes: string[];
  summary: string;
  extraTasks: string[];
  extraQuiz: QuizQuestion;
};

const lessonEnhancements: Record<number, LessonEnhancement> = {
  1: {
    concept:
      "ก่อนเริ่มเขียนโปรแกรม ให้มอง Python เหมือนการเขียนคำสั่งสั้น ๆ ให้คอมพิวเตอร์ทำตามทีละบรรทัด เหมือนเราเขียนรายการสิ่งที่ต้องทำตอนเช้า เช่น ตื่นนอน แปรงฟัน กินข้าว แล้วไปโรงเรียน คอมพิวเตอร์จะทำตามลำดับที่เราเขียนไว้ จึงต้องเขียนให้ชัดและเป็นขั้นตอน",
    examples: `print("เริ่มเรียน Python")
print("ฉันจะลองสั่งให้คอมพิวเตอร์แสดงข้อความ")

subject = "Python"
print("วันนี้เรียน", subject)

# ใช้คอมเมนต์เพื่อจดบันทึกให้ตัวเองอ่านง่ายขึ้น
print("คอมเมนต์ไม่ถูกรันเป็นคำสั่ง")`,
    commonMistakes: [
      "ลืมใส่วงเล็บหลัง print เช่น print \"hello\" ซึ่งใช้ไม่ได้ใน Python 3",
      "ลืมใส่เครื่องหมายคำพูดรอบข้อความ ทำให้ Python คิดว่าเป็นชื่อตัวแปร",
      "พิมพ์วงเล็บหรือเครื่องหมายคำพูดเปิดแล้วไม่ปิด",
      "คัดลอกโค้ดแล้วมีช่องว่างหรือสัญลักษณ์แปลก ๆ ติดมา"
    ],
    summary:
      "บทนี้คือประตูแรกของการเขียนโปรแกรม ผู้เรียนควรเข้าใจว่า Python อ่านคำสั่งจากบนลงล่าง ใช้ print() เพื่อแสดงผล และใช้คอมเมนต์เพื่อช่วยอธิบายโค้ดให้คนอ่านเข้าใจง่ายขึ้น",
    extraTasks: [
      "เพิ่มคอมเมนต์อธิบายว่าแต่ละบรรทัดทำอะไร",
      "ลองเปลี่ยนข้อความใน print() ให้เป็นเป้าหมายการเรียนของตัวเอง"
    ],
    extraQuiz: {
      question: "เครื่องหมาย # ใน Python ใช้ทำอะไร",
      options: ["เริ่มคอมเมนต์", "แสดงข้อความ", "รับข้อมูล", "สร้างตัวเลข"],
      answer: 0,
      explanation: "# ใช้เขียนคอมเมนต์เพื่ออธิบายโค้ด โดย Python จะไม่รันข้อความหลัง #"
    }
  },
  2: {
    concept:
      "ตัวแปรคือชื่อที่เราใช้เรียกข้อมูล เหมือนการติดป้ายบนกล่อง เช่น กล่องชื่อ name เก็บชื่อ กล่อง age เก็บอายุ และกล่อง score เก็บคะแนน ถ้าตั้งชื่อดี โค้ดจะอ่านง่ายและจำได้ว่าข้อมูลแต่ละส่วนใช้ทำอะไร",
    examples: `student_name = "มะลิ"
age = 13
python_score = 18.5
is_beginner = True

print(student_name)
print(age + 1)
print("คะแนน Python:", python_score)
print("เป็นผู้เริ่มต้น:", is_beginner)`,
    commonMistakes: [
      "ตั้งชื่อตัวแปรมีช่องว่าง เช่น my score ควรใช้ my_score",
      "ขึ้นต้นชื่อตัวแปรด้วยตัวเลข เช่น 2score ใช้ไม่ได้",
      "ใช้เครื่องหมาย = แล้วเข้าใจผิดว่าเป็นการเปรียบเทียบ ทั้งที่จริงคือการกำหนดค่า",
      "นำข้อความไปบวกกับตัวเลขโดยไม่แปลงชนิดข้อมูลก่อน"
    ],
    summary:
      "ตัวแปรช่วยเก็บข้อมูลไว้ใช้ซ้ำ ชนิดข้อมูลพื้นฐานที่ควรรู้คือ str สำหรับข้อความ int สำหรับจำนวนเต็ม float สำหรับทศนิยม และ bool สำหรับ True/False การตั้งชื่อตัวแปรควรสื่อความหมายและอ่านง่าย",
    extraTasks: [
      "สร้างตัวแปร goal เพื่อเก็บเป้าหมายการเรียน Python",
      "ใช้ type() ตรวจชนิดข้อมูลของตัวแปรอย่างน้อย 3 ตัว"
    ],
    extraQuiz: {
      question: "ข้อใดคือการกำหนดค่าตัวแปรที่ถูกต้อง",
      options: ["score = 10", "10 = score", "score 10", "score == 10 ="],
      answer: 0,
      explanation: "การกำหนดค่าตัวแปรใช้รูปแบบ ชื่อตัวแปร = ค่า เช่น score = 10"
    }
  },
  3: {
    concept:
      "โปรแกรมที่รับข้อมูลจากผู้ใช้จะโต้ตอบได้มากขึ้น เช่น เครื่องคิดเลข แบบฟอร์มสมัครเรียน หรือเกมที่ถามชื่อผู้เล่น แต่ต้องจำไว้ว่า input() คืนค่าเป็นข้อความเสมอ ต่อให้ผู้ใช้พิมพ์เลขก็ตาม",
    examples: `name = input("ชื่อของคุณ: ")
print("สวัสดี", name)

age_text = input("อายุของคุณ: ")
age = int(age_text)
print("อีก 5 ปี คุณจะอายุ", age + 5)

price = float(input("ราคาสินค้า: "))
print("ถ้าซื้อ 2 ชิ้น ต้องจ่าย", price * 2)`,
    commonMistakes: [
      "ลืมแปลงค่าจาก input() ก่อนนำไปคำนวณ",
      "ใช้ int() กับเลขทศนิยม เช่น int(\"12.5\") จะเกิด error",
      "ตั้ง prompt ไม่ชัดเจน ทำให้ผู้ใช้ไม่รู้ว่าต้องพิมพ์อะไร",
      "รับข้อมูลแล้วไม่ได้เก็บไว้ในตัวแปร"
    ],
    summary:
      "input() ช่วยรับข้อมูลจากผู้ใช้ แต่ค่าที่ได้เป็น str เสมอ ถ้าต้องการคำนวณต้องแปลงด้วย int() หรือ float() ก่อน การเขียนข้อความถามควรชัดเจนและเป็นมิตรกับผู้ใช้",
    extraTasks: [
      "รับชื่อคอร์สและจำนวนชั่วโมงเรียน แล้วแสดงเป็นประโยค",
      "รับราคาคอร์สและส่วนลด แล้วคำนวณราคาหลังลด"
    ],
    extraQuiz: {
      question: "ถ้าผู้ใช้พิมพ์ 20 ผ่าน input() ค่าที่ได้เริ่มต้นเป็นชนิดใด",
      options: ["str", "int", "float", "bool"],
      answer: 0,
      explanation: "input() คืนค่าเป็น str เสมอ แม้ข้อความนั้นจะดูเหมือนตัวเลข"
    }
  },
  4: {
    concept:
      "if/else คือการให้โปรแกรมตัดสินใจ เหมือนชีวิตประจำวัน เช่น ถ้าฝนตกให้พกร่ม ถ้าคะแนนถึงเกณฑ์ให้ผ่าน ถ้าเงินพอให้ซื้อของได้ โปรแกรมจะเลือกทำคำสั่งตามเงื่อนไขที่เป็นจริง",
    examples: `score = int(input("คะแนน: "))

if score >= 80:
    print("ยอดเยี่ยม")
elif score >= 50:
    print("ผ่าน")
else:
    print("ยังไม่ผ่าน ลองฝึกเพิ่ม")

has_ticket = True
if has_ticket:
    print("เข้าชมงานได้")`,
    commonMistakes: [
      "ลืมใส่เครื่องหมาย : หลัง if, elif หรือ else",
      "ย่อหน้าไม่ตรงกัน ทำให้ Python ไม่รู้ว่าคำสั่งอยู่ในบล็อกไหน",
      "ใช้ = แทน == เมื่ออยากเปรียบเทียบค่า",
      "เรียงเงื่อนไขผิด เช่น ตรวจ score >= 50 ก่อน score >= 80"
    ],
    summary:
      "เงื่อนไขช่วยให้โปรแกรมเลือกทางเดินได้ ใช้ if เพื่อตรวจเงื่อนไขแรก ใช้ elif สำหรับเงื่อนไขถัดไป และใช้ else เป็นทางเลือกสุดท้ายเมื่อไม่มีเงื่อนไขใดเป็นจริง",
    extraTasks: [
      "สร้างโปรแกรมเช็กอายุ ถ้าอายุ 12 ปีขึ้นไปให้เรียนคอร์สนี้ได้",
      "เพิ่มเงื่อนไขระดับคะแนน A, B, C และควรฝึกเพิ่ม"
    ],
    extraQuiz: {
      question: "เครื่องหมายใดใช้ตรวจว่าค่าสองค่ามีค่าเท่ากัน",
      options: ["==", "=", ">=", "!="],
      answer: 0,
      explanation: "== ใช้เปรียบเทียบว่าเท่ากัน ส่วน = ใช้กำหนดค่าให้ตัวแปร"
    }
  },
  5: {
    concept:
      "loop คือการทำงานซ้ำโดยไม่ต้องเขียนคำสั่งเดิมหลายรอบ เหมือนการนับ 1 ถึง 10 การทำแบบฝึกหัด 5 ข้อ หรือการแสดงรายชื่อผู้เรียนทุกคน ถ้าเรารู้จำนวนรอบชัดเจนมักใช้ for ถ้ายังไม่รู้จำนวนรอบอาจใช้ while",
    examples: `for number in range(1, 6):
    print("นับเลข", number)

password = ""
while password != "python":
    password = input("พิมพ์รหัสผ่าน: ")

print("เข้าสู่ระบบสำเร็จ")`,
    commonMistakes: [
      "ลืมเปลี่ยนค่าที่ใช้ในเงื่อนไข while ทำให้ loop ไม่จบ",
      "เข้าใจ range(1, 6) ผิดว่าได้ถึง 6 ทั้งที่จริงหยุดก่อน 6",
      "ย่อหน้าคำสั่งใน loop ไม่ถูกต้อง",
      "ใช้ loop ทั้งที่งานนั้นทำครั้งเดียวก็พอ"
    ],
    summary:
      "for เหมาะกับการวนซ้ำตามจำนวนหรือข้อมูลที่กำหนด ส่วน while เหมาะกับการวนซ้ำจนกว่าเงื่อนไขจะเปลี่ยนเป็นเท็จ การเขียน loop ที่ดีต้องรู้ว่ามันจะหยุดเมื่อไร",
    extraTasks: [
      "ใช้ for แสดงเลขคู่ตั้งแต่ 2 ถึง 20",
      "ใช้ while ให้ผู้ใช้พิมพ์คำว่า quit เพื่อออกจากโปรแกรม"
    ],
    extraQuiz: {
      question: "loop แบบใดเหมาะเมื่อรู้จำนวนรอบแน่นอน",
      options: ["for", "while เท่านั้น", "input", "str"],
      answer: 0,
      explanation: "for เหมาะกับงานที่รู้จำนวนรอบหรือมีชุดข้อมูลให้วนอ่าน"
    }
  },
  6: {
    concept:
      "list คือกล่องหลายช่องที่เก็บข้อมูลเรียงกัน เช่น รายการสิ่งของ คะแนนแต่ละวิชา หรือชื่อเพื่อนในกลุ่ม ข้อมูลใน list มีลำดับ จึงอ่านด้วย index ได้ โดยตำแหน่งแรกเริ่มที่ 0",
    examples: `scores = [10, 8, 9]
print(scores[0])
print(scores[-1])

subjects = ["Python", "Math", "Art"]
print("วิชาแรก:", subjects[0])
print("จำนวนวิชา:", len(subjects))`,
    commonMistakes: [
      "อ่าน index เกินจำนวนสมาชิก เช่น list มี 3 ตัวแต่อ่าน index 3",
      "ลืมว่า index เริ่มที่ 0 ไม่ใช่ 1",
      "ลืมใส่ comma คั่นสมาชิกใน list",
      "ใช้วงเล็บผิด เช่น ใช้ {} แทน []"
    ],
    summary:
      "list เหมาะกับข้อมูลหลายรายการที่มีลำดับ ใช้ [] เพื่อสร้าง list ใช้ index เพื่ออ่านสมาชิก และใช้ len() เพื่อนับจำนวนสมาชิกทั้งหมด",
    extraTasks: [
      "สร้าง list รายชื่อ 5 คน แล้วแสดงชื่อคนแรกและคนสุดท้าย",
      "สร้าง list คะแนน แล้วหาจำนวนคะแนนทั้งหมดด้วย len()"
    ],
    extraQuiz: {
      question: "ถ้า colors = [\"red\", \"blue\"] ค่า colors[1] คืออะไร",
      options: ["blue", "red", "error เสมอ", "colors"],
      answer: 0,
      explanation: "index 0 คือ red และ index 1 คือ blue"
    }
  },
  7: {
    concept:
      "function คือการตั้งชื่อให้ชุดคำสั่ง เหมือนสูตรทำอาหารที่เราเรียกใช้ซ้ำได้ เช่น สูตรทักทาย สูตรคำนวณส่วนลด หรือสูตรรวมคะแนน เมื่อโปรแกรมยาวขึ้น function จะช่วยให้โค้ดเป็นระเบียบ",
    examples: `def greet(name):
    print("สวัสดี", name)

def calculate_total(price, quantity):
    return price * quantity

greet("มะลิ")
total = calculate_total(50, 3)
print("ราคารวม:", total)`,
    commonMistakes: [
      "ลืมใส่วงเล็บตอนเรียก function เช่น greet แทน greet()",
      "ลืมย่อหน้าคำสั่งที่อยู่ใน function",
      "ใช้ return กับ print สลับกันโดยไม่เข้าใจความต่าง",
      "ส่งจำนวน argument ไม่ตรงกับ parameter"
    ],
    summary:
      "function ช่วยลดการเขียนซ้ำและทำให้โปรแกรมแบ่งเป็นส่วนเล็ก ๆ ที่เข้าใจง่าย ใช้ def เพื่อสร้าง ใช้ parameter เพื่อรับข้อมูล และใช้ return เพื่อส่งผลลัพธ์กลับ",
    extraTasks: [
      "สร้าง function ชื่อ introduce ที่รับ name และ goal",
      "สร้าง function คำนวณคะแนนเฉลี่ยจากคะแนน 3 ค่า"
    ],
    extraQuiz: {
      question: "ข้อใดคือประโยชน์ของ function",
      options: ["ลดการเขียนโค้ดซ้ำ", "ทำให้ห้ามใช้ตัวแปร", "ใช้ได้เฉพาะเกม", "ทำให้ Python ช้าลงเสมอ"],
      answer: 0,
      explanation: "function ทำให้รวมคำสั่งไว้ใช้ซ้ำและจัดระเบียบโปรแกรมได้ดีขึ้น"
    }
  },
  8: {
    concept:
      "dictionary ใช้เก็บข้อมูลที่มีป้ายชื่อกำกับ เช่น โปรไฟล์ผู้เรียนที่มี name, age, score เหมือนแบบฟอร์มที่แต่ละช่องมีชื่อของตัวเอง จึงอ่านข้อมูลได้ชัดเจนกว่าการจำตำแหน่งด้วย index",
    examples: `profile = {
    "name": "มะลิ",
    "age": 14,
    "level": "beginner"
}

print(profile["name"])
profile["score"] = 95
profile["level"] = "intermediate"
print(profile)`,
    commonMistakes: [
      "สะกด key ไม่ตรงกัน เช่น name กับ Name ถือว่าคนละ key",
      "ใช้ index แบบ list กับ dictionary โดยไม่เข้าใจโครงสร้าง",
      "ลืมเครื่องหมาย : ระหว่าง key และ value",
      "เรียก key ที่ไม่มีอยู่ ทำให้เกิด KeyError"
    ],
    summary:
      "dictionary เก็บข้อมูลเป็นคู่ key/value เหมาะกับข้อมูลแบบโปรไฟล์หรือข้อมูลที่มีหลายช่อง ใช้ key เพื่ออ่าน แก้ไข หรือเพิ่มข้อมูลใหม่",
    extraTasks: [
      "สร้าง dictionary เก็บข้อมูลคอร์ส เช่น title, price, lessons",
      "เพิ่ม key completed_lessons แล้วแสดงสถานะผู้เรียน"
    ],
    extraQuiz: {
      question: "ถ้าเรียก key ที่ไม่มีใน dictionary อาจเกิด error ใด",
      options: ["KeyError", "SyntaxError เสมอ", "NameError เสมอ", "ไม่มีทาง error"],
      answer: 0,
      explanation: "เมื่อใช้ dict[key] กับ key ที่ไม่มีอยู่ Python จะเกิด KeyError"
    }
  },
  9: {
    concept:
      "Mini project ช่วยให้เราเห็นว่าคำสั่งหลายเรื่องทำงานร่วมกันอย่างไร เกมทายเลขใช้ random เพื่อสุ่มเลข ใช้ input เพื่อรับคำตอบ ใช้ int เพื่อแปลงเป็นตัวเลข ใช้ if เพื่อให้คำใบ้ และใช้ loop เพื่อให้ทายซ้ำ",
    examples: `import random

secret = random.randint(1, 5)
guess = int(input("ทายเลข 1-5: "))

if guess == secret:
    print("ถูกต้อง")
else:
    print("ยังไม่ถูก เลขคือ", secret)

# เพิ่มความสนุกด้วยจำนวนครั้ง
attempts = 1
print("คุณทายไป", attempts, "ครั้ง")`,
    commonMistakes: [
      "ลืม import random ก่อนใช้ random.randint()",
      "ไม่แปลง input เป็น int ก่อนเปรียบเทียบกับเลขลับ",
      "ตั้งเงื่อนไข while แล้วไม่มีทางออก",
      "เฉลยเลขลับก่อนให้ผู้เล่นทาย ทำให้เกมไม่สนุก"
    ],
    summary:
      "โปรเจกต์เกมทายเลขเป็นตัวอย่างที่ดีของการรวมความรู้พื้นฐานหลายส่วน ผู้เรียนควรอ่านโค้ดทีละบรรทัดและอธิบายได้ว่าแต่ละบรรทัดมีหน้าที่อะไร",
    extraTasks: [
      "เพิ่มข้อความต้อนรับก่อนเริ่มเกม",
      "เพิ่มเงื่อนไขให้บอกว่าใกล้แล้วเมื่อทายห่างจากเลขลับไม่เกิน 2"
    ],
    extraQuiz: {
      question: "ทำไมต้องใช้ int(input(...)) ในเกมทายเลข",
      options: ["เพื่อให้คำตอบเป็นตัวเลขสำหรับเปรียบเทียบ", "เพื่อแสดงข้อความ", "เพื่อสร้าง list", "เพื่อสุ่มเลข"],
      answer: 0,
      explanation: "เลขลับเป็น int จึงควรแปลงคำตอบจาก input ให้เป็น int ก่อนเปรียบเทียบ"
    }
  },
  10: {
    concept:
      "แอปแบบทดสอบเป็นโปรเจกต์ที่คล้ายระบบเรียนออนไลน์จริง เพราะต้องเก็บคำถาม รับคำตอบ ตรวจว่าถูกหรือผิด และสรุปคะแนน โครงสร้างข้อมูลอย่าง list และ dictionary ช่วยให้จัดเก็บคำถามหลายข้อได้เป็นระเบียบ",
    examples: `questions = [
    {"text": "Python แสดงผลด้วยคำสั่งใด", "answer": "print"},
    {"text": "list เริ่ม index ที่เลขใด", "answer": "0"}
]

score = 0
for item in questions:
    answer = input(item["text"] + ": ")
    if answer == item["answer"]:
        score = score + 1

print("คะแนนรวม:", score, "/", len(questions))`,
    commonMistakes: [
      "สะกด key ใน dictionary ไม่ตรงกัน เช่น text กับ question",
      "ลืมเพิ่มคะแนนเมื่อคำตอบถูก",
      "เปรียบเทียบคำตอบโดยไม่จัดรูปแบบ เช่น ผู้ใช้พิมพ์ตัวใหญ่ตัวเล็กต่างกัน",
      "ลืมใช้ len() เพื่อบอกจำนวนคำถามทั้งหมด"
    ],
    summary:
      "โปรเจกต์แบบทดสอบช่วยฝึกการใช้ list, dictionary, loop และ if ร่วมกัน เป็นพื้นฐานของแอปจริงที่ต้องเก็บข้อมูลหลายชุดและประมวลผลทีละรายการ",
    extraTasks: [
      "เพิ่มคำถามให้ครบ 5 ข้อ",
      "ใช้ .lower() เพื่อให้ตรวจคำตอบภาษาอังกฤษแบบไม่สนตัวพิมพ์ใหญ่เล็ก"
    ],
    extraQuiz: {
      question: "ทำไม list ของ dictionary จึงเหมาะกับแบบทดสอบ",
      options: ["เก็บคำถามหลายข้อที่มีโครงสร้างเหมือนกันได้", "ใช้ได้เฉพาะตัวเลข", "ทำให้ไม่ต้องใช้ loop", "ทำให้ input หายไป"],
      answer: 0,
      explanation: "แต่ละ dictionary เก็บคำถามหนึ่งข้อ และ list ช่วยรวมคำถามหลายข้อไว้ด้วยกัน"
    }
  },
  11: {
    concept:
      "int() และ float() คือเครื่องมือแปลงข้อมูลให้เป็นตัวเลข เหมือนการเปลี่ยนข้อความบนใบเสร็จให้เป็นตัวเลขที่เครื่องคิดเลขคำนวณได้ ถ้าเป็นจำนวนเต็มใช้ int() ถ้ามีทศนิยมใช้ float()",
    examples: `items = int(input("จำนวนสินค้า: "))
price = float(input("ราคาต่อชิ้น: "))
total = items * price

print("รวมทั้งหมด", total, "บาท")

score_text = "18"
score = int(score_text)
print(score + 2)`,
    commonMistakes: [
      "ใช้ int() กับข้อความที่มีทศนิยม เช่น int(\"12.5\")",
      "ใช้ int() กับข้อความที่ไม่ใช่ตัวเลข เช่น int(\"สิบ\")",
      "ลืมแปลงข้อมูลก่อนคูณหรือบวก",
      "เข้าใจผิดว่า float() ใช้ไม่ได้กับจำนวนเต็ม ทั้งที่ float(\"10\") ได้ 10.0"
    ],
    summary:
      "เลือก int() เมื่อข้อมูลเป็นจำนวนเต็ม เลือก float() เมื่อข้อมูลมีทศนิยม และควรตรวจว่าข้อความที่จะแปลงมีรูปแบบเป็นตัวเลขจริง"
    ,
    extraTasks: [
      "รับคะแนน 3 วิชาด้วย float() แล้วคำนวณคะแนนเฉลี่ย",
      "รับจำนวนชั่วโมงเรียนด้วย int() แล้วคำนวณเวลารวมเป็นนาที"
    ],
    extraQuiz: {
      question: "float(\"10\") ได้ผลลัพธ์ใด",
      options: ["10.0", "10", "\"10\"", "error เสมอ"],
      answer: 0,
      explanation: "float() แปลงข้อความตัวเลขให้เป็นเลขทศนิยม จึงได้ 10.0"
    }
  },
  12: {
    concept:
      "str() ใช้เปลี่ยนข้อมูลให้เป็นข้อความ เหมือนการแปะตัวเลขลงในประโยค เช่น ใบประกาศคะแนนหรือข้อความแจ้งยอดชำระ ถ้าไม่แปลงก่อนนำไปต่อกับข้อความ Python จะสับสนเรื่องชนิดข้อมูล",
    examples: `name = "ต้น"
age = 15
lessons_done = 4

message = name + " อายุ " + str(age) + " ปี"
progress = "เรียนแล้ว " + str(lessons_done) + " บท"

print(message)
print(progress)`,
    commonMistakes: [
      "นำข้อความบวกกับตัวเลขโดยตรง เช่น \"คะแนน\" + 10",
      "คิดว่า str() เปลี่ยนค่าต้นฉบับเสมอ ทั้งที่ต้องเก็บผลลัพธ์ไว้ถ้าจะใช้ซ้ำ",
      "ใช้ str() ก่อนคำนวณ ทำให้ตัวเลขกลายเป็นข้อความและบวกเลขไม่ได้",
      "ลืมเว้นวรรคในข้อความที่นำมาต่อกัน"
    ],
    summary:
      "str() เหมาะเมื่ออยากแสดงข้อมูลเป็นข้อความหรือรวมข้อมูลกับประโยค แต่ถ้าต้องคำนวณตัวเลข ควรคำนวณให้เสร็จก่อนแล้วค่อยแปลงเป็นข้อความ"
    ,
    extraTasks: [
      "สร้างข้อความใบเสร็จที่รวมชื่อคอร์สและราคา",
      "สร้างข้อความรายงานความคืบหน้าโดยใช้ str() กับจำนวนบทที่เรียนแล้ว"
    ],
    extraQuiz: {
      question: "ควรใช้ str() ตอนไหน",
      options: ["เมื่อต้องการรวมตัวเลขกับข้อความ", "เมื่อต้องการสุ่มเลข", "เมื่อต้องการสร้าง list", "เมื่อต้องการวน loop"],
      answer: 0,
      explanation: "str() ใช้แปลงข้อมูลให้เป็นข้อความเพื่อแสดงผลหรือรวมกับข้อความอื่น"
    }
  },
  13: {
    concept:
      "len() ใช้นับขนาดของข้อมูล เช่น จำนวนตัวอักษรในชื่อผู้ใช้ จำนวนข้อในแบบทดสอบ หรือจำนวนสินค้าในตะกร้า เหมาะกับการตรวจเงื่อนไขว่าสั้นไป ยาวไป หรือมีข้อมูลพอหรือยัง",
    examples: `username = input("ชื่อผู้ใช้: ")
if len(username) < 3:
    print("ชื่อสั้นเกินไป")

tasks = ["อ่านบทเรียน", "ทำแบบฝึกหัด", "ทำ quiz"]
print("มีงานทั้งหมด", len(tasks), "อย่าง")

password = "python123"
print("ความยาวรหัสผ่าน:", len(password))`,
    commonMistakes: [
      "ใช้ len() กับตัวเลขโดยตรง เช่น len(123) ซึ่งใช้ไม่ได้",
      "เข้าใจผิดว่า len() ของ list คือ index สุดท้าย ทั้งที่จริงคือจำนวนสมาชิก",
      "ลืมว่า string ที่มีช่องว่าง ช่องว่างก็ถูกนับเป็นตัวอักษรด้วย",
      "ใช้ len() แทนการรวมค่าตัวเลขใน list"
    ],
    summary:
      "len() ช่วยนับจำนวนตัวอักษรใน string และจำนวนสมาชิกใน list ผลลัพธ์เป็น int จึงนำไปใช้เปรียบเทียบในเงื่อนไขได้"
    ,
    extraTasks: [
      "ตรวจว่ารหัสผ่านยาวอย่างน้อย 8 ตัวอักษรหรือไม่",
      "นับจำนวนคำถามใน list แบบทดสอบและแสดงผล"
    ],
    extraQuiz: {
      question: "len() คืนค่าเป็นชนิดข้อมูลใด",
      options: ["int", "str", "list", "bool เสมอ"],
      answer: 0,
      explanation: "ผลลัพธ์ของ len() เป็นจำนวนเต็มหรือ int"
    }
  },
  14: {
    concept:
      "list เบื้องต้นควรเริ่มจากการมองข้อมูลเป็นรายการ เช่น รายการเพลง รายการงาน หรือคะแนนหลายครั้ง ข้อมูลใน list เรียงลำดับและอ่านด้วย index ได้ จึงเหมาะกับข้อมูลที่มีหลายชิ้นและเกี่ยวข้องกัน",
    examples: `playlist = ["เพลง A", "เพลง B", "เพลง C"]
print("เพลงแรก:", playlist[0])
print("เพลงสุดท้าย:", playlist[-1])

numbers = [5, 10, 15]
print(numbers[0] + numbers[1])

empty_list = []
print("เริ่มต้นมี", len(empty_list), "รายการ")`,
    commonMistakes: [
      "ลืม comma ระหว่างสมาชิกใน list",
      "อ่าน index เกินช่วงของ list",
      "สับสนระหว่าง index กับจำนวนสมาชิก",
      "ใส่ข้อมูลหลายชนิดปนกันโดยไม่จำเป็น ทำให้อ่านโค้ดยาก"
    ],
    summary:
      "list คือโครงสร้างข้อมูลสำหรับเก็บหลายรายการ ใช้ [] ในการสร้าง ใช้ index อ่านข้อมูล และใช้ len() เพื่อดูจำนวนสมาชิก"
    ,
    extraTasks: [
      "สร้าง list รายการอาหาร 4 อย่าง แล้วแสดงรายการที่สอง",
      "สร้าง list ว่างสำหรับเก็บคะแนนและแสดงจำนวนเริ่มต้น"
    ],
    extraQuiz: {
      question: "ถ้า items มีสมาชิก 4 ตัว index สุดท้ายคือเลขใด",
      options: ["3", "4", "1", "0"],
      answer: 0,
      explanation: "index เริ่มที่ 0 ดังนั้นสมาชิก 4 ตัวมี index 0, 1, 2, 3"
    }
  },
  15: {
    concept:
      "append() ใช้เมื่อต้องการให้ list เติบโต เช่น เพิ่มของในตะกร้า เพิ่มชื่อผู้สมัคร หรือเพิ่มคะแนนใหม่หลังทำแบบฝึกหัด เป็นการเพิ่มทีละรายการต่อท้าย list เดิม",
    examples: `cart = []
cart.append("หนังสือ")
cart.append("ปากกา")
print(cart)

scores = [8, 9]
new_score = int(input("คะแนนใหม่: "))
scores.append(new_score)
print("คะแนนทั้งหมด:", scores)`,
    commonMistakes: [
      "คิดว่า append() คืนค่าเป็น list ใหม่ แล้วเขียน scores = scores.append(10)",
      "ใช้ append() เมื่อต้องการเพิ่มหลายรายการพร้อมกันโดยไม่เข้าใจผลลัพธ์",
      "สะกด append ผิด",
      "ลืมว่า append() เพิ่มข้อมูลท้าย list เสมอ"
    ],
    summary:
      "append() เพิ่มข้อมูลหนึ่งรายการต่อท้าย list เดิม ใช้บ่อยกับข้อมูลที่มาจากผู้ใช้หรือข้อมูลที่เพิ่มขึ้นระหว่างโปรแกรมทำงาน"
    ,
    extraTasks: [
      "ให้ผู้ใช้เพิ่มชื่อเพื่อน 3 คนลง list ด้วย append()",
      "เพิ่มคะแนนใหม่ลง list แล้วแสดงจำนวนคะแนนทั้งหมด"
    ],
    extraQuiz: {
      question: "ทำไมไม่ควรเขียน scores = scores.append(10)",
      options: ["เพราะ append() ไม่ได้คืน list ใหม่", "เพราะ append() ใช้ไม่ได้กับ list", "เพราะ 10 ไม่ใช่ตัวเลข", "เพราะต้องใช้ len() ก่อนเสมอ"],
      answer: 0,
      explanation: "append() เปลี่ยน list เดิมและคืนค่า None จึงไม่ควรนำไปกำหนดกลับให้ตัวแปรเดิม"
    }
  },
  16: {
    concept:
      "การวนลูปใน list คือการหยิบสมาชิกออกมาทีละตัว เหมือนครูเรียกชื่อนักเรียนทีละคน หรือระบบแสดงรายการสินค้าทีละชิ้น เราใช้ for เพื่อทำงานซ้ำกับสมาชิกทุกตัวได้ง่าย",
    examples: `names = ["มะลิ", "ต้น", "ฟ้า"]
for name in names:
    print("สวัสดี", name)

prices = [20, 35, 40]
total = 0
for price in prices:
    total = total + price
print("ราคารวม:", total)`,
    commonMistakes: [
      "ใช้ชื่อตัวแปรใน loop สับสนกับชื่อ list",
      "ลืมย่อหน้าคำสั่งที่ต้องการให้วนซ้ำ",
      "แก้ไข list ระหว่างวนลูปโดยไม่เข้าใจผลกระทบ",
      "ลืมตั้งค่าเริ่มต้นของตัวแปรสะสม เช่น total = 0"
    ],
    summary:
      "for loop ทำงานร่วมกับ list ได้ดีมาก เพราะช่วยประมวลผลสมาชิกทุกตัวทีละรายการ ใช้ได้ทั้งการแสดงผล การนับ และการรวมค่า"
    ,
    extraTasks: [
      "วน list ชื่อวิชาแล้วแสดงข้อความว่า กำลังเรียน...",
      "วน list คะแนนแล้วหาคะแนนรวมและคะแนนเฉลี่ย"
    ],
    extraQuiz: {
      question: "ตัวแปร total = 0 ก่อน loop มีหน้าที่อะไร",
      options: ["เป็นค่าเริ่มต้นสำหรับสะสมผลรวม", "เป็นชื่อ list", "หยุด loop", "แปลงเป็นข้อความ"],
      answer: 0,
      explanation: "ก่อนรวมค่าหลายตัว เราต้องมีตัวแปรเริ่มต้นเพื่อสะสมผลรวม"
    }
  },
  17: {
    concept:
      "dictionary เบื้องต้นช่วยให้ข้อมูลมีความหมายชัด เช่น แทนที่จะจำว่า list ตำแหน่ง 0 คือชื่อ ตำแหน่ง 1 คืออายุ เราใช้ key อย่าง name และ age ได้เลย จึงเหมาะกับข้อมูลแบบฟอร์มและโปรไฟล์",
    examples: `student = {
    "name": "มะลิ",
    "age": 14,
    "completed": 3
}

print(student["name"])
student["completed"] = student["completed"] + 1
student["membership"] = "premium"
print(student)`,
    commonMistakes: [
      "ลืมใส่เครื่องหมายคำพูดรอบ key ที่เป็นข้อความ",
      "ใช้ key สะกดไม่ตรงกับตอนสร้าง",
      "ลืม comma คั่นแต่ละคู่ key/value",
      "ใช้ dictionary ทั้งที่ข้อมูลควรเป็น list เช่น รายการชื่อหลายคนธรรมดา"
    ],
    summary:
      "dictionary เหมาะกับข้อมูลหนึ่งชุดที่มีหลายช่อง เช่น โปรไฟล์ผู้เรียน อ่านและแก้ไขด้วย key ทำให้โค้ดสื่อความหมายมากขึ้น"
    ,
    extraTasks: [
      "สร้าง dictionary ของผู้เรียนที่มี name, age, goal",
      "เพิ่ม key score แล้วแสดงข้อความสรุปจากข้อมูลใน dictionary"
    ],
    extraQuiz: {
      question: "ข้อใดเหมาะกับ dictionary มากที่สุด",
      options: ["โปรไฟล์ผู้เรียนหนึ่งคน", "ตัวเลข 1 ถึง 10", "ข้อความคำเดียว", "loop 5 รอบ"],
      answer: 0,
      explanation: "โปรไฟล์หนึ่งคนมีหลายช่องข้อมูล จึงเหมาะกับ dictionary"
    }
  },
  18: {
    concept:
      "function เบื้องต้นช่วยแยกงานออกเป็นส่วนเล็ก ๆ เหมือนปุ่มในแอปที่กดแล้วทำงานหนึ่งอย่าง เช่น ปุ่มคำนวณคะแนน ปุ่มทักทาย หรือปุ่มสร้างรายงาน หากตั้งชื่อ function ดี จะอ่านโค้ดเข้าใจเร็วขึ้น",
    examples: `def show_welcome():
    print("ยินดีต้อนรับเข้าสู่คอร์ส Python")

def calculate_average(a, b, c):
    return (a + b + c) / 3

show_welcome()
average = calculate_average(8, 9, 10)
print("คะแนนเฉลี่ย:", average)`,
    commonMistakes: [
      "ลืมเรียก function หลังจากสร้าง ทำให้ไม่มีอะไรแสดงผล",
      "ตั้งชื่อ function ไม่สื่อความหมาย",
      "สับสนระหว่าง parameter กับ argument",
      "ลืม return ใน function ที่ต้องส่งผลลัพธ์กลับ"
    ],
    summary:
      "function คือวิธีจัดระเบียบโค้ดให้เป็นส่วนย่อย ใช้ def เพื่อสร้าง ตั้งชื่อให้สื่อความหมาย และเลือกใช้ print หรือ return ให้ตรงกับเป้าหมาย"
    ,
    extraTasks: [
      "สร้าง function แสดงข้อความให้กำลังใจผู้เรียน",
      "สร้าง function รับราคากับจำนวน แล้ว return ราคารวม"
    ],
    extraQuiz: {
      question: "ถ้า function ต้องคำนวณแล้วส่งผลลัพธ์ไปใช้ต่อ ควรใช้คำสั่งใด",
      options: ["return", "print เท่านั้น", "input", "append"],
      answer: 0,
      explanation: "return ส่งค่ากลับเพื่อให้ส่วนอื่นของโปรแกรมนำไปใช้ต่อได้"
    }
  },
  19: {
    concept:
      "random ช่วยให้โปรแกรมมีความไม่แน่นอน เช่น การทอยลูกเต๋า การสุ่มโจทย์ หรือการสุ่มเลขลับในเกม ก่อนใช้ต้อง import random แล้วจึงเรียกคำสั่งในโมดูลนี้",
    examples: `import random

coin = random.randint(1, 2)
if coin == 1:
    print("หัว")
else:
    print("ก้อย")

bonus = random.randint(5, 15)
print("คะแนนโบนัส:", bonus)`,
    commonMistakes: [
      "ลืม import random",
      "เข้าใจผิดว่า randint(1, 10) ไม่รวม 10 ทั้งที่จริงรวม",
      "ใช้ random กับงานที่ควรได้ผลแน่นอน เช่น คำนวณราคาจริง",
      "ตั้งช่วงสุ่มกลับด้าน เช่น randint(10, 1)"
    ],
    summary:
      "random.randint(a, b) สุ่มจำนวนเต็มตั้งแต่ a ถึง b รวมทั้งสองฝั่ง เหมาะกับเกมและกิจกรรมที่ต้องการความหลากหลาย"
    ,
    extraTasks: [
      "สร้างโปรแกรมสุ่มหัวก้อย",
      "สุ่มเลข 1 ถึง 100 แล้วบอกว่าเป็นเลขคู่หรือเลขคี่"
    ],
    extraQuiz: {
      question: "random.randint(5, 5) จะได้ค่าใด",
      options: ["5", "0", "สุ่ม 1 ถึง 5", "error เสมอ"],
      answer: 0,
      explanation: "ถ้าค่าเริ่มและค่าสิ้นสุดเท่ากัน ผลลัพธ์จะเป็นค่านั้นเสมอ"
    }
  },
  20: {
    concept:
      "โปรเจกต์เกมทายตัวเลขคือการฝึกคิดแบบนักพัฒนา เริ่มจากวางกติกา แยกตัวแปรสำคัญ เช่น secret, guess, attempts แล้วค่อยเขียน loop และเงื่อนไขให้เกมทำงานครบ",
    examples: `import random

secret = random.randint(1, 20)
attempts = 0
max_attempts = 5

while attempts < max_attempts:
    guess = int(input("ทายเลข 1-20: "))
    attempts = attempts + 1

    if guess == secret:
        print("ถูกต้อง ใช้", attempts, "ครั้ง")
        break
    elif guess < secret:
        print("น้อยไป")
    else:
        print("มากไป")

print("จบเกม")`,
    commonMistakes: [
      "ไม่กำหนดเงื่อนไขหยุดเกม ทำให้วนไม่จบ",
      "ใช้ break ไม่ถูกตำแหน่ง ทำให้เกมจบเร็วเกินไป",
      "ลืมนับ attempts ทุกครั้งที่ผู้เล่นทาย",
      "ไม่แยกตัวแปร max_attempts ทำให้ปรับจำนวนรอบยาก"
    ],
    summary:
      "โปรเจกต์นี้รวม input, int(), if/elif/else, while และ random เข้าด้วยกัน ผู้เรียนควรฝึกอธิบาย flow ของเกมเป็นขั้นตอนก่อนเขียนโค้ด เพื่อให้ debug ได้ง่ายขึ้น"
    ,
    extraTasks: [
      "เพิ่มระดับความยาก easy, normal, hard โดยเปลี่ยนช่วงเลขสุ่ม",
      "เพิ่มระบบคะแนน เริ่ม 100 คะแนนและลดลงทุกครั้งที่ทายผิด"
    ],
    extraQuiz: {
      question: "ก่อนเขียนโปรเจกต์ ควรทำอะไรก่อน",
      options: ["วางกติกาและลำดับการทำงาน", "สุ่มโค้ดไปเรื่อย ๆ", "ลบตัวแปรทั้งหมด", "ใช้ function ทุกบรรทัด"],
      answer: 0,
      explanation: "การวาง flow ก่อนเขียนโค้ดช่วยให้รู้ว่าต้องมีตัวแปร เงื่อนไข และ loop อะไรบ้าง"
    }
  }
};

const lessonDailyScenarios: Record<number, string> = {
  1: "ลองนึกถึงการสั่งงานเพื่อนในกลุ่มทำโปสเตอร์ ถ้าบอกว่า เปิด Canva ใส่ชื่อหัวข้อ ใส่รูป แล้วกดบันทึก ทุกคนจะทำตามลำดับได้ง่าย โปรแกรมก็คล้ายกันมาก เราต้องบอกคอมพิวเตอร์ทีละคำสั่งอย่างชัดเจน บทนี้จึงเน้นให้ผู้เรียนกล้าเขียนคำสั่งแรก แสดงผลให้เห็นทันที และค่อย ๆ สังเกตว่าคำสั่งที่เขียนส่งผลต่อหน้าจออย่างไร",
  2: "ตัวแปรเหมือนช่องในแบบฟอร์มสมัครเรียน เช่น ชื่อ อายุ เบอร์โทร และเป้าหมายการเรียน แต่ละช่องมีชื่อกำกับเพื่อให้รู้ว่าข้อมูลนั้นคืออะไร ถ้าเราใช้ชื่อช่องชัดเจน คนอื่นก็อ่านเข้าใจง่าย โปรแกรมก็เหมือนกัน การตั้งชื่อตัวแปรที่ดีช่วยให้ผู้เรียนย้อนกลับมาอ่านโค้ดของตัวเองได้โดยไม่สับสน",
  3: "เวลาเว็บถามชื่อผู้ใช้หรือแอปถามจำนวนสินค้าที่ต้องการซื้อ นั่นคือโปรแกรมกำลังรับข้อมูลจากผู้ใช้ บทนี้ให้มอง input() เป็นประตูรับคำตอบจากคีย์บอร์ด แล้วค่อยตัดสินใจว่าคำตอบนั้นควรใช้เป็นข้อความหรือตัวเลขก่อนนำไปคำนวณ",
  4: "การตัดสินใจมีอยู่รอบตัว เช่น ถ้าฝนตกให้พกร่ม ถ้ามีการบ้านให้ทำก่อนเล่นเกม หรือถ้าคะแนนถึงเกณฑ์ให้ผ่าน โปรแกรมก็ใช้ if/elif/else เพื่อเลือกทางเดินแบบเดียวกัน ผู้เรียนควรเริ่มจากเขียนเงื่อนไขเป็นประโยคภาษาไทยก่อน แล้วค่อยแปลงเป็นโค้ด",
  5: "งานที่ต้องทำซ้ำ เช่น เช็กชื่อเพื่อนทั้งห้อง นับจำนวนวันอ่านหนังสือ หรือถามรหัสผ่านจนกว่าจะถูก ไม่ควรเขียนคำสั่งซ้ำหลายบรรทัด loop ช่วยให้โปรแกรมทำงานซ้ำอย่างเป็นระบบ บทนี้จึงเน้นให้เข้าใจว่า loop เริ่มเมื่อไร ทำอะไรซ้ำ และหยุดเมื่อไร",
  6: "ถ้าต้องเก็บคะแนนสอบ 5 ครั้งหรือรายการของที่ต้องซื้อหลายอย่าง การสร้างตัวแปรแยกทีละตัวจะทำให้โค้ดรก list ช่วยรวบรวมข้อมูลประเภทเดียวกันไว้ในที่เดียว เหมือนสมุดจดรายการที่แต่ละบรรทัดมีลำดับของตัวเอง",
  7: "ลองนึกถึงปุ่มในแอป เช่น ปุ่มคำนวณราคา ปุ่มส่งข้อความ หรือปุ่มสุ่มโจทย์ แต่ละปุ่มซ่อนชุดคำสั่งไว้ข้างใน function ก็ทำหน้าที่คล้ายปุ่มเหล่านั้น เราสร้างชุดคำสั่งครั้งเดียว ตั้งชื่อให้ดี แล้วเรียกใช้ซ้ำเมื่อต้องการ",
  8: "ข้อมูลโปรไฟล์หนึ่งคนมักมีหลายช่อง เช่น ชื่อ อายุ ระดับสมาชิก และจำนวนบทเรียนที่เรียนแล้ว dictionary เหมือนแบบฟอร์มที่มีป้ายชื่อกำกับทุกช่อง จึงเหมาะกับข้อมูลที่ต้องการอ่านด้วยชื่อ ไม่ใช่อ่านด้วยตำแหน่ง",
  9: "เกมทายเลขทำให้เห็นว่าความรู้พื้นฐานหลายเรื่องทำงานร่วมกันได้จริง โปรแกรมต้องสุ่มเลข รับคำตอบ แปลงเป็นตัวเลข เปรียบเทียบ และวนถามซ้ำจนกว่าจะถูก การทำโปรเจกต์เล็กแบบนี้ช่วยให้ผู้เรียนเห็นภาพรวมของการสร้างโปรแกรมมากกว่าการจำคำสั่งทีละคำ",
  10: "แอป quiz เป็นตัวอย่างของโปรแกรมที่ใกล้ตัวนักเรียนมาก ทั้งแบบทดสอบออนไลน์ เกมตอบคำถาม และแอปฝึกศัพท์ โปรแกรมต้องเก็บคำถาม ตรวจคำตอบ และนับคะแนน บทนี้จึงเป็นสะพานจากคำสั่งพื้นฐานไปสู่การคิดเป็นระบบเล็ก ๆ ที่ใช้งานได้จริง",
  11: "เวลารับอายุจากแบบฟอร์มหรือรับราคาสินค้าจากผู้ใช้ ข้อมูลที่พิมพ์เข้ามาเริ่มต้นเป็นข้อความเสมอ แม้มันจะหน้าตาเหมือนตัวเลขก็ตาม ถ้าต้องเอาไปบวก ลบ คูณ หาร เราต้องเปลี่ยนเป็น int หรือ float ก่อน เหมือนเปลี่ยนป้ายราคาให้เครื่องคิดเงินอ่านเป็นตัวเลขได้จริง",
  12: "บางครั้งเรามีข้อมูลเป็นตัวเลข แต่ต้องนำไปประกอบเป็นประโยค เช่น ใบประกาศคะแนน ข้อความสรุปยอดเงิน หรือข้อความแสดงเลเวลในเกม str() ช่วยเปลี่ยนข้อมูลให้เป็นข้อความก่อนนำไปแสดงผลหรือรวมกับประโยคอื่น",
  13: "len() ใช้ตอบคำถามว่า มีทั้งหมดกี่อย่าง เช่น รหัสผ่านยาวกี่ตัวอักษร มีงานในรายการกี่ชิ้น หรือมีคำถามใน quiz กี่ข้อ การนับจำนวนเป็นพื้นฐานสำคัญของการตรวจเงื่อนไข เช่น สั้นไป ยาวพอ หรือยังไม่มีข้อมูล",
  14: "list เบื้องต้นเหมาะกับข้อมูลที่เป็นแถว เช่น รายชื่อเพื่อน รายการเพลง รายการอาหาร หรือคะแนนหลายครั้ง จุดสำคัญคือข้อมูลมีลำดับและอ่านตามตำแหน่งได้ ผู้เรียนควรฝึกแยกให้ออกว่าเมื่อไรข้อมูลควรเป็นรายการ และเมื่อไรควรเป็นข้อมูลเดี่ยว",
  15: "ในชีวิตจริงรายการมักเติบโตเรื่อย ๆ เช่น ตะกร้าสินค้า รายชื่อผู้สมัคร หรือรายการงานที่เพิ่มเข้ามาระหว่างวัน append() คือการเติมของใหม่ต่อท้ายรายการเดิม ทำให้โปรแกรมรองรับข้อมูลที่เพิ่มทีละรายการได้",
  16: "เมื่อมี list แล้ว เรามักต้องทำงานกับสมาชิกทุกตัว เช่น พิมพ์รายชื่อทุกคน รวมคะแนนทุกข้อ หรือส่งข้อความให้ผู้เรียนทุกคน for loop ช่วยหยิบสมาชิกใน list ทีละตัวโดยไม่ต้องรู้ล่วงหน้าว่ารายการยาวแค่ไหน",
  17: "dictionary ช่วยจัดข้อมูลที่มีหลายคุณสมบัติ เช่น ข้อมูลนักเรียนหนึ่งคนมีชื่อ อายุ ชั้นเรียน คะแนน และสถานะสมาชิก ถ้าใช้ key ที่สื่อความหมาย โปรแกรมจะอ่านเหมือนประโยคมากขึ้น และลดการจำตำแหน่งที่ผิดพลาด",
  18: "เมื่อโค้ดยาวขึ้น ผู้เรียนควรเริ่มแบ่งงานเป็นชิ้นเล็ก ๆ เช่น งานทักทาย งานคำนวณคะแนน งานแสดงผล และงานตรวจคำตอบ function ช่วยให้แต่ละงานมีชื่อชัดเจน เหมือนแบ่งหน้าที่ในงานกลุ่ม ทำให้ตรวจและแก้ไขง่ายขึ้น",
  19: "การสุ่มทำให้โปรแกรมมีความสนุกและไม่ซ้ำเดิม เช่น ทอยลูกเต๋า สุ่มเลขรางวัล หรือสุ่มโจทย์ฝึกหัด แต่ผู้เรียนต้องเข้าใจว่าการสุ่มควรใช้กับงานที่ยอมรับความไม่แน่นอนได้ ไม่ใช่งานที่ต้องคำนวณคำตอบจริงแบบแน่นอน",
  20: "โปรเจกต์เกมทายตัวเลขเป็นภาพรวมของการสร้างโปรแกรมขนาดเล็ก ผู้เรียนต้องวางกติกาก่อน เช่น เลขอยู่ช่วงใด ทายได้กี่ครั้ง บอกใบ้อย่างไร และจบเกมเมื่อไร จากนั้นจึงค่อยแปลงกติกาเป็นตัวแปร เงื่อนไข และ loop"
};

pythonLessons.forEach((lesson) => {
  const enhancement = lessonEnhancements[lesson.id];
  const dailyScenario = lessonDailyScenarios[lesson.id];

  if (!enhancement) {
    return;
  }

  lesson.sections = [
    ...lesson.sections,
    {
      heading: "แนวคิดก่อนเขียนโค้ด",
      body: enhancement.concept
    },
    {
      heading: "ตัวอย่างจากชีวิตประจำวัน",
      body:
        dailyScenario ||
        "เชื่อมบทเรียนนี้กับสถานการณ์จริงก่อนเขียนโค้ดเสมอ เพราะการเห็นภาพจากชีวิตประจำวันช่วยให้ผู้เรียนเข้าใจว่าคำสั่ง Python ไม่ใช่เรื่องไกลตัว แต่เป็นวิธีบอกขั้นตอนให้คอมพิวเตอร์ช่วยทำงานที่เราคุ้นเคย"
    },
    {
      heading: "ฝึกคิดแบบนักเขียนโปรแกรม",
      body: `ก่อนลงมือเขียนโค้ด ให้ฝึกคิดเป็น 4 ขั้นตอนเสมอ ขั้นที่ 1 เขียนเป้าหมายของโปรแกรมเป็นภาษาไทยสั้น ๆ ขั้นที่ 2 ระบุข้อมูลที่ต้องใช้ เช่น ข้อความ ตัวเลข หรือรายการข้อมูล ขั้นที่ 3 เขียนคำสั่ง Python ทีละส่วนและรันทดสอบบ่อย ๆ ขั้นที่ 4 อ่านผลลัพธ์และแก้ไข error อย่างใจเย็น สำหรับบทนี้ให้เริ่มจาก "${enhancement.extraTasks[0]}" แล้วต่อยอดเป็น "${enhancement.extraTasks[1]}" เพื่อฝึกจากง่ายไปยาก`
    },
    {
      heading: "ตัวอย่างโค้ดเพิ่มเติม",
      body: "ลองอ่านโค้ดทีละบรรทัดก่อนรันจริง แล้วคาดเดาว่าผลลัพธ์ควรเป็นอย่างไร การฝึกคาดเดาผลลัพธ์ช่วยให้เข้าใจการทำงานของ Python ได้เร็วขึ้น",
      code: enhancement.examples
    },
    {
      heading: "ข้อผิดพลาดที่พบบ่อย",
      body: enhancement.commonMistakes
        .map((mistake, index) => `${index + 1}. ${mistake}`)
        .join(" ")
    },
    {
      heading: "สรุปท้ายบท",
      body: enhancement.summary
    }
  ];

  lesson.exercise = {
    ...lesson.exercise,
    tasks: [...lesson.exercise.tasks, ...enhancement.extraTasks]
  };

  if (lesson.quiz.length < 5) {
    lesson.quiz = [...lesson.quiz, enhancement.extraQuiz];
  }
});

export const javascriptLessons: Lesson[] = [
  {
    id: 101,
    slug: "javascript-introduction",
    title: "บทที่ 1: JavaScript คืออะไร และใช้ทำอะไรได้บ้าง",
    subtitle: "รู้จัก JavaScript ภาษาหลักของเว็บ และเห็นภาพว่านำไปสร้างอะไรได้บ้าง",
    minutes: 20,
    free: true,
    badge: "เริ่มต้น",
    accent: "bg-lemon",
    objectives: [
      "อธิบายได้ว่า JavaScript ใช้ทำอะไร",
      "แยกบทบาท HTML, CSS และ JavaScript แบบง่าย ๆ",
      "เข้าใจว่าทำไม JavaScript สำคัญกับการทำเว็บ"
    ],
    sections: [
      {
        heading: "JavaScript คืออะไร",
        body: "JavaScript เป็นภาษาที่ทำให้เว็บไซต์โต้ตอบกับผู้ใช้ได้ เช่น กดปุ่มแล้วเปลี่ยนข้อความ ตรวจฟอร์มก่อนส่ง แสดงคะแนนเกม หรือคำนวณราคาแบบทันที ถ้าเปรียบเว็บไซต์เป็นร้านค้า HTML คือโครงร้าน CSS คือการตกแต่งร้าน และ JavaScript คือพนักงานที่ตอบสนองเมื่อลูกค้ากดหรือกรอกข้อมูล"
      },
      {
        heading: "ตัวอย่างโค้ดแรก",
        body: "โค้ดนี้ใช้ console.log() เพื่อแสดงข้อความใน Console ซึ่งเหมาะกับการฝึกและตรวจผลลัพธ์ตอนเริ่มเรียน",
        code: `console.log("สวัสดี JavaScript");
console.log("ฉันกำลังเรียนการเขียนโปรแกรมบนเว็บ");`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "บรรทัดที่ 1 ส่งข้อความแรกไปแสดงใน Console บรรทัดที่ 2 ส่งข้อความถัดไป JavaScript จะอ่านคำสั่งจากบนลงล่างเหมือนการอ่านรายการสิ่งที่ต้องทำทีละข้อ"
      },
      {
        heading: "สรุปท้ายบท",
        body: "JavaScript เป็นภาษาพื้นฐานสำหรับเว็บสมัยใหม่ เริ่มจากการแสดงข้อความใน Console ก่อน แล้วค่อยต่อยอดไปสู่การรับค่า เงื่อนไข loop และการทำโปรเจกต์"
      }
    ],
    exercise: {
      title: "แนะนำตัวด้วย JavaScript",
      tasks: [
        "ใช้ console.log() แสดงชื่อของตัวเอง",
        "แสดงเหตุผลที่อยากเรียน JavaScript",
        "แสดงสิ่งที่อยากสร้างบนเว็บ 1 อย่าง"
      ],
      starterCode: `console.log("ฉันชื่อ ...");
console.log("ฉันอยากเรียน JavaScript เพราะ ...");
console.log("ฉันอยากสร้าง ...");`
    },
    quiz: [
      {
        question: "JavaScript มักใช้ทำอะไรบนเว็บไซต์",
        options: ["ทำให้เว็บโต้ตอบกับผู้ใช้", "เก็บรูปภาพเท่านั้น", "แทนไฟล์รูปทั้งหมด", "ปิดอินเทอร์เน็ต"],
        answer: 0,
        explanation: "JavaScript ช่วยให้เว็บตอบสนอง เช่น กดปุ่ม ตรวจฟอร์ม หรือคำนวณข้อมูล"
      },
      {
        question: "คำสั่งใดใช้แสดงข้อความใน Console",
        options: ["print()", "console.log()", "show.text()", "display()"],
        answer: 1,
        explanation: "console.log() คือคำสั่งพื้นฐานสำหรับแสดงผลใน Console ของ JavaScript"
      },
      {
        question: "JavaScript อ่านคำสั่งโดยทั่วไปอย่างไร",
        options: ["จากบนลงล่าง", "สุ่มบรรทัด", "อ่านเฉพาะบรรทัดสุดท้าย", "อ่านจากขวาไปซ้ายเสมอ"],
        answer: 0,
        explanation: "โดยทั่วไป JavaScript ทำงานตามลำดับคำสั่งจากบนลงล่าง"
      }
    ]
  },
  {
    id: 102,
    slug: "javascript-console-log",
    title: "บทที่ 2: การแสดงผลด้วย console.log",
    subtitle: "ฝึกแสดงข้อความ ตัวเลข และผลลัพธ์ง่าย ๆ ใน Console",
    minutes: 22,
    free: true,
    badge: "ฟรี",
    accent: "bg-skybolt",
    objectives: [
      "ใช้ console.log() แสดงข้อมูลหลายแบบ",
      "รวมข้อความกับข้อมูลด้วยเครื่องหมาย +",
      "ใช้ Console เพื่อตรวจผลลัพธ์และ debug เบื้องต้น"
    ],
    sections: [
      {
        heading: "Console คือพื้นที่ทดลอง",
        body: "Console เป็นเหมือนสมุดจดผลลัพธ์ของโปรแกรม นักพัฒนามักใช้ดูว่าค่าที่คำนวณได้ถูกต้องไหม หรือโค้ดเดินมาถึงจุดที่ต้องการหรือเปล่า ผู้เริ่มต้นควรใช้ Console บ่อย ๆ เพราะเห็นผลทันทีและช่วยให้ไม่กลัว error"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้แสดงข้อความ ตัวเลข และประโยคที่รวมข้อมูลหลายชิ้น",
        code: `console.log("Python Begins");
console.log(199);
console.log("ราคาเปิดตัว " + 199 + " บาท");`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "บรรทัดแรกแสดงข้อความชื่อเว็บ บรรทัดที่สองแสดงตัวเลข 199 บรรทัดที่สามนำข้อความและตัวเลขมาต่อกันด้วยเครื่องหมาย + แล้วแสดงเป็นประโยคเดียว"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ลืมจุดระหว่าง console กับ log, ลืมวงเล็บหลัง log, ลืมเครื่องหมายคำพูดรอบข้อความ หรือสับสนระหว่างข้อความ \"199\" กับตัวเลข 199"
      }
    ],
    exercise: {
      title: "ประกาศโปรโมชันคอร์ส",
      tasks: [
        "แสดงชื่อคอร์ส JavaScript มือใหม่",
        "แสดงราคา 199 บาท",
        "รวมข้อความเป็นประโยคว่า สมัครวันนี้ราคาเปิดตัว 199 บาท"
      ],
      starterCode: `console.log("คอร์ส ...");
console.log(...);
console.log("สมัครวันนี้ราคาเปิดตัว " + ... + " บาท");`
    },
    quiz: [
      {
        question: "Console ช่วยเรื่องใดมากที่สุดสำหรับผู้เริ่มต้น",
        options: ["ดูผลลัพธ์และตรวจโค้ด", "ชาร์จแบตเครื่อง", "ตกแต่ง CSS", "สร้างฐานข้อมูลอัตโนมัติ"],
        answer: 0,
        explanation: "Console ช่วยแสดงผลลัพธ์และตรวจค่าระหว่างเขียนโปรแกรม"
      },
      {
        question: "console.log(\"Hello\") จะแสดงผลที่ไหน",
        options: ["Console", "ถังขยะ", "แถบที่อยู่เว็บ", "ไฟล์รูปภาพ"],
        answer: 0,
        explanation: "console.log() แสดงข้อมูลใน Console ของเบราว์เซอร์หรือเครื่องมือรัน JavaScript"
      },
      {
        question: "เครื่องหมาย + ใน \"ราคา \" + 199 ใช้ทำอะไร",
        options: ["ต่อข้อความกับข้อมูล", "ลบข้อมูล", "หยุดโปรแกรม", "สร้างเงื่อนไข"],
        answer: 0,
        explanation: "เมื่อใช้กับข้อความ เครื่องหมาย + ใช้ต่อข้อความกับข้อมูลอื่น"
      }
    ]
  },
  {
    id: 103,
    slug: "javascript-variables",
    title: "บทที่ 3: ตัวแปร let, const และ var",
    subtitle: "เรียนรู้การเก็บข้อมูลด้วยตัวแปร และเลือกใช้ let/const ให้เหมาะสม",
    minutes: 28,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "สร้างตัวแปรด้วย let และ const",
      "อธิบายความต่างระหว่างค่าที่เปลี่ยนได้และเปลี่ยนไม่ได้",
      "หลีกเลี่ยงการใช้ var ในโค้ดใหม่เมื่อไม่จำเป็น"
    ],
    sections: [
      {
        heading: "ตัวแปรคือชื่อเรียกข้อมูล",
        body: "ตัวแปรช่วยเก็บข้อมูลไว้ใช้ซ้ำ เช่น ชื่อผู้เรียน คะแนน หรือราคาคอร์ส ถ้าข้อมูลเปลี่ยนได้ให้ใช้ let ถ้าข้อมูลไม่ควรเปลี่ยนให้ใช้ const ส่วน var เป็นวิธีเก่าที่ควรรู้จัก แต่อาจทำให้สับสนในโปรเจกต์ใหม่"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ใช้ const กับค่าที่ไม่เปลี่ยน เช่น ชื่อคอร์ส และใช้ let กับค่าที่เปลี่ยนได้ เช่น คะแนน",
        code: `const courseName = "JavaScript มือใหม่";
let score = 0;

score = 80;

console.log(courseName);
console.log("คะแนนล่าสุด:", score);`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "บรรทัดแรกสร้าง courseName แบบ const จึงไม่ควรเปลี่ยนชื่อคอร์ส บรรทัดที่สองสร้าง score แบบ let เพราะคะแนนอาจเปลี่ยนได้ บรรทัดต่อมาปรับ score เป็น 80 แล้วแสดงผลทั้งสองค่า"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "พยายามเปลี่ยนค่าของ const, ตั้งชื่อตัวแปรไม่สื่อความหมาย, ลืมประกาศตัวแปรก่อนใช้ หรือใช้ var โดยไม่เข้าใจขอบเขตการทำงาน"
      }
    ],
    exercise: {
      title: "ข้อมูลผู้เรียน",
      tasks: [
        "สร้าง const เก็บชื่อคอร์ส",
        "สร้าง let เก็บจำนวนบทที่เรียนแล้ว",
        "เพิ่มจำนวนบทที่เรียนแล้วและแสดงผล"
      ],
      starterCode: `const courseName = "JavaScript มือใหม่";
let completedLessons = 0;

completedLessons = completedLessons + 1;

console.log(courseName);
console.log(completedLessons);`
    },
    quiz: [
      {
        question: "ถ้าค่าไม่ควรถูกเปลี่ยน ควรใช้คำใด",
        options: ["const", "let", "var เท่านั้น", "change"],
        answer: 0,
        explanation: "const เหมาะกับค่าที่ไม่ควรถูกกำหนดใหม่"
      },
      {
        question: "ถ้าคะแนนอาจเปลี่ยนระหว่างโปรแกรม ควรใช้คำใด",
        options: ["let", "const เสมอ", "delete", "fixed"],
        answer: 0,
        explanation: "let เหมาะกับค่าที่ต้องเปลี่ยนได้"
      },
      {
        question: "ข้อใดเป็นชื่อตัวแปรที่อ่านง่าย",
        options: ["studentScore", "x", "aaa", "data1data2"],
        answer: 0,
        explanation: "studentScore บอกความหมายชัดว่าคือคะแนนของนักเรียน"
      }
    ]
  },
  {
    id: 104,
    slug: "javascript-data-types",
    title: "บทที่ 4: ชนิดข้อมูลพื้นฐาน string, number, boolean",
    subtitle: "เข้าใจข้อความ ตัวเลข และค่าจริง/เท็จใน JavaScript",
    minutes: 25,
    free: false,
    badge: "paid",
    accent: "bg-lavender",
    objectives: [
      "แยก string, number และ boolean ได้",
      "ใช้ typeof ตรวจชนิดข้อมูล",
      "เลือกชนิดข้อมูลให้เหมาะกับงาน"
    ],
    sections: [
      {
        heading: "ข้อมูลแต่ละชนิดใช้คนละงาน",
        body: "string คือข้อความ เช่น ชื่อผู้เรียน number คือตัวเลขที่ใช้คำนวณได้ เช่น คะแนนหรือราคา boolean คือค่า true/false ใช้แทนสถานะ เช่น ผ่านหรือยังไม่ผ่าน การเลือกชนิดข้อมูลถูกต้องช่วยลด bug ได้มาก"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ลองเก็บข้อมูลผู้เรียนแล้วใช้ typeof ตรวจชนิดข้อมูล",
        code: `const studentName = "มะลิ";
const age = 13;
const isPremium = false;

console.log(typeof studentName);
console.log(typeof age);
console.log(typeof isPremium);`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "studentName เป็น string เพราะอยู่ในเครื่องหมายคำพูด age เป็น number เพราะเป็นตัวเลข และ isPremium เป็น boolean เพราะมีค่า false จากนั้น typeof จะบอกชนิดข้อมูลของแต่ละตัวแปร"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ใส่ตัวเลขไว้ในเครื่องหมายคำพูดจนกลายเป็น string, เขียน true/false ด้วยตัวใหญ่ผิดรูปแบบ, หรือพยายามเอาข้อความที่ไม่ใช่ตัวเลขไปคำนวณ"
      }
    ],
    exercise: {
      title: "ตรวจชนิดข้อมูล",
      tasks: [
        "สร้างตัวแปรชื่อผู้เรียนเป็น string",
        "สร้างตัวแปรราคาคอร์สเป็น number",
        "สร้างตัวแปรสถานะสมัครแล้วเป็น boolean",
        "ใช้ typeof แสดงชนิดข้อมูลทั้งหมด"
      ],
      starterCode: `const name = "...";
const price = 199;
const enrolled = true;

console.log(typeof name);
console.log(typeof price);
console.log(typeof enrolled);`
    },
    quiz: [
      {
        question: "\"JavaScript\" เป็นข้อมูลชนิดใด",
        options: ["string", "number", "boolean", "array"],
        answer: 0,
        explanation: "ข้อความที่อยู่ในเครื่องหมายคำพูดคือ string"
      },
      {
        question: "true และ false เป็นข้อมูลชนิดใด",
        options: ["boolean", "string", "number", "function"],
        answer: 0,
        explanation: "boolean ใช้แทนค่าจริงหรือเท็จ"
      },
      {
        question: "คำสั่ง typeof ใช้ทำอะไร",
        options: ["ตรวจชนิดข้อมูล", "ลบตัวแปร", "สร้าง loop", "เปิดหน้าเว็บใหม่"],
        answer: 0,
        explanation: "typeof บอกชนิดข้อมูลของค่าหรือตัวแปร"
      }
    ]
  },
  {
    id: 105,
    slug: "javascript-input-calculation",
    title: "บทที่ 5: การรับค่าและการคิดคำนวณเบื้องต้น",
    subtitle: "รับข้อมูลด้วย prompt และแปลงเป็นตัวเลขก่อนคำนวณ",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "รับค่าจากผู้ใช้ด้วย prompt",
      "แปลงข้อความเป็นตัวเลขด้วย Number()",
      "คำนวณผลลัพธ์เบื้องต้น"
    ],
    sections: [
      {
        heading: "ข้อมูลจากผู้ใช้มักเริ่มเป็นข้อความ",
        body: "เวลาใช้ prompt() ผู้ใช้พิมพ์คำตอบเข้ามา ค่าที่ได้จะเป็นข้อความเสมอ แม้หน้าตาเหมือนตัวเลข ถ้าต้องการนำไปบวก ลบ คูณ หาร ควรแปลงด้วย Number() ก่อน เหมือนเปลี่ยนข้อความบนป้ายราคาให้เครื่องคิดเงินอ่านเป็นตัวเลขจริง"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้รับคะแนนสองครั้ง แปลงเป็นตัวเลข แล้วคำนวณคะแนนรวม",
        code: `const firstScore = Number(prompt("กรอกคะแนนครั้งที่ 1"));
const secondScore = Number(prompt("กรอกคะแนนครั้งที่ 2"));

const total = firstScore + secondScore;

console.log("คะแนนรวม:", total);`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "prompt() เปิดกล่องให้ผู้ใช้กรอกคะแนน Number() แปลงคำตอบเป็นตัวเลข จากนั้นนำคะแนนสองตัวมาบวกกันแล้วเก็บใน total สุดท้าย console.log() แสดงคะแนนรวม"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ลืม Number() ทำให้การบวกกลายเป็นการต่อข้อความ, ผู้ใช้กรอกข้อความที่ไม่ใช่ตัวเลข, หรือใช้ชื่อตัวแปรไม่ชัดจนสับสนว่าค่าใดคือคะแนนครั้งไหน"
      }
    ],
    exercise: {
      title: "คำนวณราคารวม",
      tasks: [
        "รับราคาสินค้าจากผู้ใช้",
        "รับจำนวนสินค้า",
        "คำนวณราคารวมและแสดงผล"
      ],
      starterCode: `const price = Number(prompt("ราคาสินค้า"));
const quantity = Number(prompt("จำนวน"));
const total = price * quantity;

console.log("ราคารวม:", total);`
    },
    quiz: [
      {
        question: "prompt() คืนค่ากลับมาเป็นข้อมูลชนิดใดโดยทั่วไป",
        options: ["string", "number เสมอ", "boolean เสมอ", "array"],
        answer: 0,
        explanation: "ค่าจาก prompt() เป็นข้อความ จึงควรแปลงก่อนคำนวณ"
      },
      {
        question: "Number(\"10\") ได้ค่าอะไร",
        options: ["ตัวเลข 10", "ข้อความ 10", "true", "error เสมอ"],
        answer: 0,
        explanation: "Number() แปลงข้อความที่เป็นตัวเลขให้เป็น number"
      },
      {
        question: "ถ้าลืมแปลง \"10\" + \"5\" มักได้ผลแบบใด",
        options: ["\"105\"", "15 เสมอ", "0", "false"],
        answer: 0,
        explanation: "เมื่อเป็น string เครื่องหมาย + จะต่อข้อความเข้าด้วยกัน"
      }
    ]
  },
  {
    id: 106,
    slug: "javascript-if-else",
    title: "บทที่ 6: เงื่อนไข if, else if, else",
    subtitle: "ให้โปรแกรมตัดสินใจจากเงื่อนไข เช่น ผ่าน/ไม่ผ่าน หรือระดับคะแนน",
    minutes: 30,
    free: false,
    badge: "paid",
    accent: "bg-lavender",
    objectives: [
      "เขียน if เพื่อตรวจเงื่อนไข",
      "ใช้ else if ตรวจหลายกรณี",
      "ใช้ else เป็นทางเลือกสุดท้าย"
    ],
    sections: [
      {
        heading: "โปรแกรมตัดสินใจได้เหมือนกฎในชีวิตจริง",
        body: "ถ้าคะแนนมากกว่าหรือเท่ากับ 80 ให้ดีเยี่ยม ถ้าคะแนนมากกว่าหรือเท่ากับ 50 ให้ผ่าน ไม่เช่นนั้นให้ฝึกเพิ่ม นี่คือการคิดแบบ if/else if/else ซึ่งช่วยให้โปรแกรมเลือกทางเดินตามข้อมูลที่ได้รับ"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "โค้ดนี้ตรวจคะแนนแล้วแสดงผลตามช่วงคะแนน",
        code: `const score = 72;

if (score >= 80) {
  console.log("ดีเยี่ยม");
} else if (score >= 50) {
  console.log("ผ่าน");
} else {
  console.log("ฝึกเพิ่มอีกนิด");
}`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "โปรแกรมตรวจ if ก่อน ถ้า score >= 80 เป็นจริงจะแสดงดีเยี่ยม ถ้าไม่จริงจะไปตรวจ else if ถ้า score >= 50 เป็นจริงจะแสดงผ่าน ถ้าทุกเงื่อนไขไม่จริงจะทำงานใน else"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ลืมวงเล็บปีกกา, เขียนเครื่องหมายเปรียบเทียบผิด เช่น ใช้ = แทน >=, เรียงเงื่อนไขผิดจากกว้างไปแคบ หรือใส่ else หลายครั้งโดยไม่จำเป็น"
      }
    ],
    exercise: {
      title: "ระบบตัดเกรดง่าย ๆ",
      tasks: [
        "สร้างตัวแปร score",
        "ถ้า score >= 80 แสดง A",
        "ถ้า score >= 50 แสดง Pass",
        "นอกนั้นแสดง Try again"
      ],
      starterCode: `const score = 65;

if (score >= 80) {
  console.log("A");
} else if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}`
    },
    quiz: [
      {
        question: "else ทำงานเมื่อไร",
        options: ["เมื่อเงื่อนไขก่อนหน้าทั้งหมดไม่จริง", "ทำงานก่อน if", "ทำงานเมื่อคะแนนเต็ม", "ทำงานเมื่อไม่มีตัวแปร"],
        answer: 0,
        explanation: "else เป็นทางเลือกสุดท้ายเมื่อ if/else if ก่อนหน้าไม่จริง"
      },
      {
        question: "เครื่องหมาย >= หมายถึงอะไร",
        options: ["มากกว่าหรือเท่ากับ", "น้อยกว่าเสมอ", "เท่ากับข้อความ", "ไม่เท่ากับ"],
        answer: 0,
        explanation: ">= ใช้ตรวจว่าค่าซ้ายมากกว่าหรือเท่ากับค่าขวา"
      },
      {
        question: "ถ้าต้องตรวจหลายช่วงคะแนนควรใช้โครงสร้างใด",
        options: ["if / else if / else", "console.log อย่างเดียว", "const อย่างเดียว", "comment เท่านั้น"],
        answer: 0,
        explanation: "else if ช่วยตรวจหลายเงื่อนไขต่อเนื่องกัน"
      }
    ]
  },
  {
    id: 107,
    slug: "javascript-loops",
    title: "บทที่ 7: การใช้ loop เบื้องต้น",
    subtitle: "ใช้ for loop เพื่อทำงานซ้ำ เช่น แสดงเลขหรือวนตรวจรายการ",
    minutes: 32,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "เข้าใจว่าทำไมต้องใช้ loop",
      "เขียน for loop แบบพื้นฐาน",
      "อธิบายตัวนับและเงื่อนไขหยุด loop ได้"
    ],
    sections: [
      {
        heading: "loop ช่วยลดการเขียนซ้ำ",
        body: "ถ้าต้องแสดงเลข 1 ถึง 5 เราไม่ควรเขียน console.log() 5 บรรทัดเสมอไป loop ช่วยให้เขียนคำสั่งครั้งเดียวแล้วให้โปรแกรมทำซ้ำตามจำนวนรอบ เหมือนการเช็กชื่อเพื่อนทั้งห้องทีละคน"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "for loop นี้เริ่มจาก i = 1 ทำงานตราบใดที่ i <= 5 และเพิ่ม i ทีละ 1 หลังจบรอบ",
        code: `for (let i = 1; i <= 5; i++) {
  console.log("รอบที่", i);
}`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "เริ่มจากสร้าง i เป็น 1 ตรวจว่า i <= 5 หรือไม่ ถ้าจริงให้แสดงผลในวงเล็บปีกกา จากนั้น i++ เพิ่มค่าอีก 1 แล้วกลับไปตรวจเงื่อนไขใหม่จนกว่าเงื่อนไขจะไม่จริง"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ลืมเพิ่มค่า i ทำให้ loop ไม่จบ, ตั้งเงื่อนไขผิดจนรันน้อยหรือมากเกินไป, ใช้ตัวแปรนับซ้ำกับส่วนอื่นโดยไม่ตั้งใจ"
      }
    ],
    exercise: {
      title: "ตารางแม่สูตรคูณ 2",
      tasks: [
        "ใช้ for loop วนเลข 1 ถึง 12",
        "คำนวณ 2 คูณเลขแต่ละรอบ",
        "แสดงผลเป็นประโยคอ่านง่าย"
      ],
      starterCode: `for (let i = 1; i <= 12; i++) {
  console.log("2 x " + i + " = " + (2 * i));
}`
    },
    quiz: [
      {
        question: "loop เหมาะกับงานแบบใด",
        options: ["งานที่ต้องทำซ้ำ", "งานที่ต้องทำครั้งเดียวเสมอ", "งานลบไฟล์เท่านั้น", "งานเปลี่ยนสี CSS เท่านั้น"],
        answer: 0,
        explanation: "loop ใช้กับงานที่ต้องทำซ้ำหลายรอบ"
      },
      {
        question: "ใน for (let i = 1; i <= 5; i++) ส่วน i++ ทำอะไร",
        options: ["เพิ่มค่า i ทีละ 1", "ลบค่า i", "หยุดโปรแกรมทันที", "เปลี่ยน i เป็นข้อความ"],
        answer: 0,
        explanation: "i++ คือการเพิ่มค่า i ขึ้น 1 หลังจบรอบ"
      },
      {
        question: "ถ้าเงื่อนไข loop ไม่เคยเป็น false จะเกิดอะไร",
        options: ["loop อาจวนไม่จบ", "โปรแกรมแปลเป็น HTML", "ตัวแปรหายไป", "คะแนนเพิ่มเอง"],
        answer: 0,
        explanation: "loop ต้องมีทางหยุด ไม่เช่นนั้นอาจวนไม่จบ"
      }
    ]
  },
  {
    id: 108,
    slug: "javascript-arrays",
    title: "บทที่ 8: Array และการเก็บข้อมูลหลายค่า",
    subtitle: "เก็บรายการข้อมูลหลายชิ้น เช่น คะแนน รายชื่อ หรือเมนูสินค้า",
    minutes: 34,
    free: false,
    badge: "paid",
    accent: "bg-lavender",
    objectives: [
      "สร้าง array ด้วยวงเล็บเหลี่ยม",
      "อ่านข้อมูลด้วย index",
      "วน loop เพื่อทำงานกับสมาชิกใน array"
    ],
    sections: [
      {
        heading: "Array คือรายการข้อมูล",
        body: "Array เหมาะกับข้อมูลหลายชิ้นที่อยู่ในกลุ่มเดียวกัน เช่น รายชื่อเพื่อน คะแนนสอบ หรือบทเรียนที่ต้องเรียน แต่ละข้อมูลมีตำแหน่งเรียกว่า index โดย JavaScript เริ่มนับ index จาก 0"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "ตัวอย่างนี้สร้าง array คะแนน อ่านคะแนนตัวแรก และวนแสดงคะแนนทั้งหมด",
        code: `const scores = [80, 75, 90];

console.log("คะแนนแรก:", scores[0]);

for (let i = 0; i < scores.length; i++) {
  console.log("คะแนน:", scores[i]);
}`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "scores เก็บตัวเลข 3 ค่า scores[0] อ่านตัวแรกซึ่งคือ 80 จากนั้น for loop ใช้ scores.length เพื่อรู้จำนวนสมาชิก และแสดงคะแนนแต่ละตำแหน่ง"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ลืมว่า index เริ่มจาก 0, ใช้ตำแหน่งเกินจำนวนข้อมูล, ลืมใช้ .length ใน loop หรือใส่ข้อมูลหลายชนิดปนกันจนอ่านยาก"
      }
    ],
    exercise: {
      title: "รายชื่อบทเรียน",
      tasks: [
        "สร้าง array เก็บชื่อบทเรียน 3 บท",
        "แสดงบทแรก",
        "ใช้ loop แสดงบทเรียนทั้งหมด"
      ],
      starterCode: `const lessons = ["console.log", "variables", "if else"];

console.log(lessons[0]);

for (let i = 0; i < lessons.length; i++) {
  console.log(lessons[i]);
}`
    },
    quiz: [
      {
        question: "Array ใช้เครื่องหมายใดในการสร้าง",
        options: ["[]", "{}", "<>", "() เท่านั้น"],
        answer: 0,
        explanation: "Array ใน JavaScript สร้างด้วยวงเล็บเหลี่ยม []"
      },
      {
        question: "สมาชิกตัวแรกของ array อยู่ที่ index ใด",
        options: ["0", "1", "-1", "10"],
        answer: 0,
        explanation: "JavaScript เริ่มนับ index จาก 0"
      },
      {
        question: "scores.length ใช้ดูอะไร",
        options: ["จำนวนสมาชิกใน array", "คะแนนสูงสุดเสมอ", "ชนิดข้อมูล", "ชื่อ array"],
        answer: 0,
        explanation: ".length บอกจำนวนสมาชิกใน array"
      }
    ]
  },
  {
    id: 109,
    slug: "javascript-functions",
    title: "บทที่ 9: Function เบื้องต้น",
    subtitle: "สร้างชุดคำสั่งที่เรียกใช้ซ้ำได้ ลดโค้ดซ้ำและทำให้โปรแกรมอ่านง่าย",
    minutes: 35,
    free: false,
    badge: "paid",
    accent: "bg-skybolt",
    objectives: [
      "สร้าง function ด้วยคำสั่ง function",
      "รับ parameter เพื่อส่งข้อมูลเข้า function",
      "ใช้ return เพื่อส่งค่ากลับ"
    ],
    sections: [
      {
        heading: "Function คือชุดคำสั่งที่ตั้งชื่อได้",
        body: "ถ้าโค้ดบางส่วนต้องใช้ซ้ำ เช่น คำนวณคะแนนรวม ทักทายผู้เรียน หรือคิดส่วนลด เราสามารถสร้าง function เพื่อเก็บคำสั่งนั้นไว้ แล้วเรียกใช้ด้วยชื่อที่ตั้งไว้ ทำให้โค้ดเป็นระเบียบและแก้ง่าย"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "function นี้รับคะแนนสองค่า แล้ว return คะแนนรวมกลับไปให้ส่วนอื่นใช้ต่อ",
        code: `function calculateTotal(score1, score2) {
  const total = score1 + score2;
  return total;
}

const result = calculateTotal(40, 55);
console.log("คะแนนรวม:", result);`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "บรรทัดแรกสร้าง function ชื่อ calculateTotal และรับ score1, score2 เมื่อเรียก calculateTotal(40, 55) ค่า 40 กับ 55 จะเข้าไปใน function จากนั้นบวกกันและ return ผลลัพธ์ออกมาเก็บใน result"
      },
      {
        heading: "ข้อผิดพลาดที่พบบ่อย",
        body: "ลืมเรียกใช้ function หลังสร้าง, ลืม return ทำให้ไม่ได้ค่ากลับ, ตั้งชื่อ parameter ไม่สื่อความหมาย หรือสับสนระหว่าง console.log กับ return"
      }
    ],
    exercise: {
      title: "คำนวณส่วนลด",
      tasks: [
        "สร้าง function ชื่อ calculateDiscountPrice",
        "รับราคาและส่วนลด",
        "return ราคาหลังหักส่วนลด",
        "เรียกใช้ function และแสดงผล"
      ],
      starterCode: `function calculateDiscountPrice(price, discount) {
  return price - discount;
}

const finalPrice = calculateDiscountPrice(199, 20);
console.log("ราคาหลังลด:", finalPrice);`
    },
    quiz: [
      {
        question: "function ช่วยเรื่องใด",
        options: ["จัดโค้ดเป็นชุดและเรียกใช้ซ้ำ", "ลบตัวแปรทั้งหมด", "ทำให้เว็บไม่มี CSS", "ปิด Console"],
        answer: 0,
        explanation: "function ช่วยรวมคำสั่งเป็นชุดและเรียกใช้ซ้ำได้"
      },
      {
        question: "parameter คืออะไร",
        options: ["ข้อมูลที่ส่งเข้า function", "ปุ่มบนคีย์บอร์ด", "ไฟล์รูปภาพ", "ชนิดของ CSS"],
        answer: 0,
        explanation: "parameter เป็นตัวรับข้อมูลที่ function จะนำไปใช้"
      },
      {
        question: "return ใช้ทำอะไร",
        options: ["ส่งค่ากลับจาก function", "แสดงผลเสมอ", "สร้าง array", "หยุดเว็บทั้งหน้า"],
        answer: 0,
        explanation: "return ส่งผลลัพธ์ออกจาก function เพื่อใช้ต่อได้"
      }
    ]
  },
  {
    id: 110,
    slug: "javascript-score-project",
    title: "บทที่ 10: Mini Project: โปรแกรมคำนวณคะแนนอย่างง่าย",
    subtitle: "รวมตัวแปร การรับค่า เงื่อนไข array loop และ function เพื่อสร้างโปรแกรมเล็ก ๆ",
    minutes: 45,
    free: false,
    badge: "paid",
    accent: "bg-lemon",
    objectives: [
      "วางแผนโปรแกรมคำนวณคะแนน",
      "ใช้ array และ loop รวมคะแนน",
      "ใช้ function และ if/else สรุปผล"
    ],
    sections: [
      {
        heading: "โปรเจกต์นี้ฝึกคิดเป็นระบบ",
        body: "เราจะสร้างโปรแกรมเก็บคะแนนหลายครั้ง คำนวณคะแนนรวมและค่าเฉลี่ย แล้วบอกว่าผู้เรียนผ่านหรือควรฝึกเพิ่ม โปรเจกต์นี้คล้ายระบบคะแนนในห้องเรียนหรือแบบทดสอบออนไลน์แบบง่าย"
      },
      {
        heading: "ตัวอย่างโค้ด",
        body: "โค้ดนี้ใช้ array เก็บคะแนน function คำนวณค่าเฉลี่ย และ if/else สรุปผล",
        code: `function calculateAverage(scores) {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  return total / scores.length;
}

const scores = [70, 85, 90];
const average = calculateAverage(scores);

console.log("คะแนนเฉลี่ย:", average);

if (average >= 60) {
  console.log("ผ่าน");
} else {
  console.log("ควรฝึกเพิ่ม");
}`
      },
      {
        heading: "โค้ดทำงานทีละขั้นอย่างไร",
        body: "เริ่มจากสร้าง function calculateAverage เพื่อรับ array คะแนน ข้างในสร้าง total เป็น 0 แล้วใช้ loop บวกคะแนนทีละตัว หลังจบ loop return ค่าเฉลี่ย จากนั้นนำค่าเฉลี่ยไปตรวจด้วย if/else ว่าผ่านหรือควรฝึกเพิ่ม"
      },
      {
        heading: "สรุปท้ายบท",
        body: "โปรเจกต์นี้รวมพื้นฐานสำคัญของ JavaScript หลายเรื่องเข้าด้วยกัน ผู้เรียนควรฝึกอธิบาย flow ของโปรแกรมด้วยภาษาตัวเองก่อน แล้วค่อยเขียนโค้ดตามขั้นตอน"
      }
    ],
    exercise: {
      title: "เพิ่มระบบเกรด",
      tasks: [
        "เพิ่มเงื่อนไข average >= 80 ให้แสดง ดีเยี่ยม",
        "ถ้า average >= 60 ให้แสดง ผ่าน",
        "นอกนั้นให้แสดง ควรฝึกเพิ่ม",
        "ลองเปลี่ยนคะแนนใน array แล้วสังเกตผลลัพธ์"
      ],
      starterCode: `const scores = [60, 75, 90];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  total = total + scores[i];
}

const average = total / scores.length;

if (average >= 80) {
  console.log("ดีเยี่ยม");
} else if (average >= 60) {
  console.log("ผ่าน");
} else {
  console.log("ควรฝึกเพิ่ม");
}`
    },
    quiz: [
      {
        question: "โปรเจกต์นี้ใช้ array เพื่ออะไร",
        options: ["เก็บคะแนนหลายค่า", "เก็บสีเว็บเท่านั้น", "ลบ function", "แทน if/else ทั้งหมด"],
        answer: 0,
        explanation: "array เหมาะกับการเก็บคะแนนหลายค่าไว้ในรายการเดียว"
      },
      {
        question: "total = total + scores[i] ใช้ทำอะไร",
        options: ["รวมคะแนนทีละตัว", "ลบคะแนน", "สร้างข้อความ", "หยุด loop"],
        answer: 0,
        explanation: "คำสั่งนี้นำคะแนนตำแหน่งปัจจุบันมาบวกสะสมใน total"
      },
      {
        question: "average >= 60 ใช้ตรวจอะไร",
        options: ["คะแนนเฉลี่ยถึงเกณฑ์ผ่านหรือไม่", "array มีชื่อไหม", "function ถูกลบหรือไม่", "Console เปิดอยู่ไหม"],
        answer: 0,
        explanation: "เงื่อนไขนี้ใช้ตัดสินว่าคะแนนเฉลี่ยผ่านเกณฑ์ 60 หรือไม่"
      }
    ]
  }
];

type JavaScriptLessonEnhancement = {
  learn: string;
  why: string;
  concept: string;
  exampleCode: string;
  walkthrough: string[];
  mistakes: string[];
  summary: string;
  extraTasks: string[];
  extraQuiz: QuizQuestion;
};

const javascriptLessonEnhancements: Record<number, JavaScriptLessonEnhancement> = {
  101: {
    learn:
      "บทนี้พาผู้เรียนรู้จัก JavaScript ในฐานะภาษาที่ทำให้เว็บโต้ตอบกับผู้ใช้ได้ เช่น กดปุ่มแล้วข้อความเปลี่ยน ตรวจข้อมูลในฟอร์ม แสดง popup คำนวณราคา หรือสร้างเกมเล็ก ๆ บนหน้าเว็บ",
    why:
      "ถ้า HTML คือโครงสร้างของหน้าเว็บ และ CSS คือหน้าตา JavaScript คือส่วนที่ทำให้เว็บตอบสนองต่อการกระทำของผู้ใช้ การเข้าใจบทบาทนี้ช่วยให้ผู้เรียนเห็นภาพว่าโค้ดที่กำลังเรียนจะนำไปใช้จริงตรงไหน",
    concept:
      "ให้มองเว็บไซต์เหมือนร้านค้าออนไลน์ HTML คือชั้นวางสินค้า CSS คือสีและการจัดร้าน ส่วน JavaScript คือพนักงานที่ตอบเมื่อเรากดปุ่ม คำนวณราคารวม หรือแจ้งเตือนเมื่อกรอกข้อมูลไม่ครบ JavaScript ใช้ได้ทั้งฝั่ง frontend ในเบราว์เซอร์ และฝั่ง backend ผ่านสภาพแวดล้อมอย่าง Node.js แต่ในคอร์สนี้จะเริ่มจากพื้นฐานที่เห็นผลได้ง่ายก่อน",
    exampleCode: `console.log("สวัสดี JavaScript");
console.log("JavaScript ช่วยให้เว็บโต้ตอบกับผู้ใช้ได้");

const buttonText = "เริ่มเรียน";
console.log("ข้อความบนปุ่ม:", buttonText);`,
    walkthrough: [
      "บรรทัดที่ 1 แสดงข้อความทักทายใน Console",
      "บรรทัดที่ 2 อธิบายหน้าที่หลักของ JavaScript เป็นข้อความ",
      "บรรทัดที่ 4 สร้างตัวแปร buttonText เพื่อเก็บข้อความที่อาจอยู่บนปุ่มจริงในเว็บ",
      "บรรทัดที่ 5 แสดงข้อความพร้อมค่าจากตัวแปร ทำให้เห็นว่าข้อมูลในโปรแกรมนำมาแสดงผลได้"
    ],
    mistakes: [
      "เข้าใจว่า JavaScript คือ Java ทั้งที่เป็นคนละภาษา",
      "คิดว่า JavaScript ใช้ได้เฉพาะทำ popup ทั้งที่ใช้ทำ logic ได้หลากหลาย",
      "ลืมว่าโค้ดพื้นฐานควรทดสอบทีละน้อยก่อนต่อยอดเป็นเว็บจริง"
    ],
    summary:
      "JavaScript คือภาษาสำคัญของเว็บที่ช่วยให้หน้าเว็บมีพฤติกรรมและตอบสนองต่อผู้ใช้ได้ บทแรกควรจำภาพรวม HTML เป็นโครงสร้าง CSS เป็นหน้าตา และ JavaScript เป็นการทำงาน",
    extraTasks: [
      "เขียน console.log() แสดงตัวอย่างเว็บที่มีการโต้ตอบ 3 แบบ",
      "อธิบายด้วยคำพูดของตัวเองว่า JavaScript ต่างจาก HTML และ CSS อย่างไร"
    ],
    extraQuiz: {
      question: "ข้อใดอธิบาย JavaScript ได้ใกล้เคียงที่สุดสำหรับผู้เริ่มต้น",
      options: ["ภาษาที่ทำให้เว็บมีการทำงานและโต้ตอบ", "ภาษาไว้ตกแต่งสีเท่านั้น", "ไฟล์รูปภาพชนิดหนึ่ง", "ฐานข้อมูลของเว็บ"],
      answer: 0,
      explanation: "JavaScript ใช้เขียนพฤติกรรมของเว็บ เช่น ตอบสนองต่อปุ่ม ฟอร์ม และการคำนวณ"
    }
  },
  102: {
    learn:
      "บทนี้ฝึกใช้ console.log() เพื่อแสดงข้อความ ตัวเลข และผลลัพธ์จาก expression ซึ่งเป็นวิธีพื้นฐานที่สุดในการตรวจว่าโค้ดทำงานอย่างที่คิดหรือไม่",
    why:
      "ผู้เริ่มต้นมักไม่รู้ว่าโค้ดผิดตรงไหน Console เป็นพื้นที่สังเกตผลลัพธ์ระหว่างเขียนโปรแกรม เหมือนกระดาษทดเลขที่ช่วยให้เราเห็นค่าทีละขั้นก่อนนำไปสร้างหน้าเว็บจริง",
    concept:
      "console.log() ไม่ได้มีไว้แค่แสดงข้อความ แต่ใช้ debug ได้ เช่น ตรวจค่าตัวแปร ตรวจผลคำนวณ หรือดูว่าโปรแกรมเดินมาถึงบรรทัดที่ต้องการหรือยัง เวลาโค้ดยาวขึ้น การใส่ console.log() เป็นจุดตรวจเล็ก ๆ จะช่วยหาปัญหาเร็วขึ้น",
    exampleCode: `console.log("เริ่มตรวจโปรแกรม");
console.log(100 + 50);

const coursePrice = 199;
console.log("ราคาคอร์ส:", coursePrice);
console.log("จ่าย 2 คนรวม:", coursePrice * 2);`,
    walkthrough: [
      "บรรทัดที่ 1 แสดงข้อความเพื่อบอกว่าโปรแกรมเริ่มทำงานแล้ว",
      "บรรทัดที่ 2 ให้ JavaScript คำนวณ 100 + 50 ก่อน แล้วค่อยแสดงผล",
      "บรรทัดที่ 4 สร้างตัวแปร coursePrice เก็บราคา",
      "บรรทัดที่ 5 แสดงข้อความพร้อมราคาจากตัวแปร",
      "บรรทัดที่ 6 คำนวณราคาสำหรับ 2 คน แล้วแสดงผลทันที"
    ],
    mistakes: [
      "พิมพ์ concole.log หรือ console.Log ผิดตัวพิมพ์เล็กใหญ่",
      "ลืมเครื่องหมายคำพูดรอบข้อความ",
      "ลืมปิดวงเล็บหรือเครื่องหมายคำพูด",
      "ใช้ console.log() แล้วคิดว่าผลจะไปแสดงบนหน้าเว็บ ทั้งที่จริงแสดงใน Console"
    ],
    summary:
      "console.log() เป็นเครื่องมือฝึกคิดและ debug ที่ดีมากสำหรับมือใหม่ ใช้ดูข้อความ ตัวเลข expression และค่าตัวแปรได้ก่อนนำความรู้ไปใช้กับหน้าเว็บจริง",
    extraTasks: [
      "แสดงผลลัพธ์ของ 50 + 25, 50 - 25, 50 * 2 และ 50 / 2",
      "สร้างตัวแปรชื่อ learnerName แล้วแสดงข้อความว่า สวัสดี ตามด้วยชื่อ"
    ],
    extraQuiz: {
      question: "console.log(10 * 3) จะแสดงผลอะไร",
      options: ["30", "10 * 3 เป็นข้อความ", "error เสมอ", "ไม่มีอะไรเกิดขึ้น"],
      answer: 0,
      explanation: "JavaScript คำนวณ expression 10 * 3 ก่อน แล้ว console.log() แสดงผลลัพธ์คือ 30"
    }
  },
  103: {
    learn:
      "บทนี้เรียนการเก็บข้อมูลด้วยตัวแปร let, const และ var โดยเน้นวิธีใช้ let กับ const ให้เหมาะกับงานจริง และรู้จัก var ในฐานะรูปแบบเก่าที่อาจเจอในโค้ดตัวอย่าง",
    why:
      "โปรแกรมแทบทุกแบบต้องจำข้อมูล เช่น ชื่อผู้ใช้ คะแนน ราคาสินค้า หรือสถานะสมาชิก ถ้าไม่ใช้ตัวแปร เราจะต้องเขียนข้อมูลซ้ำและแก้ไขยากมาก",
    concept:
      "ตัวแปรเหมือนกล่องที่มีป้ายชื่อ ถ้าของในกล่องอาจเปลี่ยน เช่น คะแนนล่าสุด ให้ใช้ let ถ้าของในกล่องไม่ควรถูกเปลี่ยน เช่น ชื่อคอร์สหรือราคาตั้งต้น ให้ใช้ const ส่วน var เป็นรูปแบบเก่าที่มีพฤติกรรมเรื่อง scope และ hoisting ที่ทำให้มือใหม่สับสน จึงควรรู้จักแต่ยังไม่ต้องใช้เป็นหลัก",
    exampleCode: `const courseName = "JavaScript มือใหม่";
let completedLessons = 0;

completedLessons = completedLessons + 1;

console.log(courseName);
console.log("เรียนแล้ว", completedLessons, "บท");`,
    walkthrough: [
      "บรรทัดที่ 1 ใช้ const เพราะชื่อคอร์สไม่ควรถูกเปลี่ยนระหว่างโปรแกรม",
      "บรรทัดที่ 2 ใช้ let เพราะจำนวนบทที่เรียนแล้วเพิ่มขึ้นได้",
      "บรรทัดที่ 4 เพิ่ม completedLessons จาก 0 เป็น 1",
      "บรรทัดที่ 6-7 แสดงชื่อคอร์สและความคืบหน้าปัจจุบัน"
    ],
    mistakes: [
      "พยายามกำหนดค่าใหม่ให้ const",
      "ตั้งชื่อตัวแปรกว้างเกินไป เช่น data หรือ x จนอ่านไม่รู้เรื่อง",
      "ประกาศตัวแปรซ้ำในบริเวณเดียวกัน",
      "ใช้ var เพราะเห็นในตัวอย่างเก่า โดยยังไม่เข้าใจ scope"
    ],
    summary:
      "จำง่าย ๆ ว่า const ใช้ก่อนเมื่อค่าไม่ควรเปลี่ยน let ใช้เมื่อค่าต้องเปลี่ยน และ var เป็นรูปแบบเก่าที่ควรอ่านออกแต่ไม่ใช่ตัวเลือกแรกสำหรับมือใหม่",
    extraTasks: [
      "สร้าง const ชื่อ schoolName และ let ชื่อ score",
      "เปลี่ยนค่า score สองครั้ง แล้วใช้ console.log() ตรวจผล",
      "ลองอธิบายว่าทำไม schoolName ไม่ควรเป็น let ในโปรแกรมนี้"
    ],
    extraQuiz: {
      question: "เหตุผลหลักที่มือใหม่ควรเริ่มจาก let และ const คืออะไร",
      options: ["อ่านความตั้งใจของโค้ดง่ายกว่า", "ทำให้เว็บมีสีสวยขึ้น", "ใช้แทน HTML ได้", "ทำให้ไม่ต้องใช้ Console"],
      answer: 0,
      explanation: "let และ const ช่วยบอกเจตนาว่าค่าจะเปลี่ยนหรือไม่ ทำให้โค้ดอ่านง่ายและลดความสับสน"
    }
  },
  104: {
    learn:
      "บทนี้เรียนชนิดข้อมูลพื้นฐาน string, number และ boolean รวมถึงการใช้ typeof ตรวจชนิดข้อมูล เพื่อให้แยกได้ว่าค่าที่เห็นควรนำไปคำนวณหรือใช้เป็นข้อความ",
    why:
      "Bug จำนวนมากเกิดจากใช้ชนิดข้อมูลผิด เช่น เอา \"10\" ที่เป็นข้อความไปบวกกับ \"5\" แล้วได้ \"105\" ไม่ใช่ 15 การรู้ชนิดข้อมูลช่วยให้คิดและแก้ error ได้เร็วขึ้น",
    concept:
      "string คือข้อความและต้องอยู่ในเครื่องหมายคำพูด number คือตัวเลขที่ใช้คำนวณได้ boolean คือ true/false สำหรับสถานะหรือเงื่อนไข ส่วน typeof เป็นคำสั่งช่วยถาม JavaScript ว่าค่านี้เป็นชนิดอะไร",
    exampleCode: `const learnerName = "น้ำ";
const score = 85;
const isPassed = true;
const textNumber = "10";

console.log(typeof learnerName);
console.log(typeof score);
console.log(typeof isPassed);
console.log(textNumber + 5);
console.log(Number(textNumber) + 5);`,
    walkthrough: [
      "บรรทัดที่ 1 เก็บชื่อเป็น string",
      "บรรทัดที่ 2 เก็บคะแนนเป็น number",
      "บรรทัดที่ 3 เก็บสถานะผ่านเป็น boolean",
      "บรรทัดที่ 4 เก็บเลข 10 แบบ string เพราะอยู่ในเครื่องหมายคำพูด",
      "บรรทัดท้าย ๆ แสดงให้เห็นว่า \"10\" + 5 ได้ผลต่างจาก Number(\"10\") + 5"
    ],
    mistakes: [
      "คิดว่า \"10\" กับ 10 เหมือนกัน",
      "เขียน True หรือ False แบบภาษาอื่น ทั้งที่ JavaScript ใช้ true และ false",
      "ใช้ typeof แล้วลืมว่า typeof คืนค่าเป็นข้อความ",
      "เอาข้อมูลที่รับจากผู้ใช้ไปคำนวณทันทีโดยไม่ตรวจชนิด"
    ],
    summary:
      "string, number และ boolean เป็นฐานสำคัญของ JavaScript ถ้ารู้ว่าค่าของเราเป็นชนิดอะไร จะตัดสินใจได้ถูกว่าจะนำไปแสดงผล คำนวณ หรือใช้ตรวจเงื่อนไข",
    extraTasks: [
      "สร้างตัวแปร price เป็น number และ priceText เป็น string แล้วเปรียบเทียบผลเมื่อบวก 1",
      "ใช้ typeof ตรวจตัวแปรอย่างน้อย 4 ตัว",
      "สร้าง boolean ชื่อ isPremium แล้วแสดงค่าใน Console"
    ],
    extraQuiz: {
      question: "\"10\" + 5 มักได้ผลแบบใด",
      options: ["\"105\"", "15", "true", "error เสมอ"],
      answer: 0,
      explanation: "เมื่อด้านหนึ่งเป็น string เครื่องหมาย + มักต่อข้อความ จึงได้ \"105\""
    }
  },
  105: {
    learn:
      "บทนี้เรียนการคำนวณด้วย +, -, *, / และการแปลงข้อมูลจาก prompt หรือ input ที่มักเป็น string ให้เป็น number ด้วย Number(), parseInt() หรือ parseFloat() แบบเข้าใจง่าย",
    why:
      "เว็บจำนวนมากต้องคำนวณ เช่น ราคารวม คะแนนเฉลี่ย ค่าจัดส่ง หรือส่วนลด ถ้าไม่เข้าใจการแปลงข้อมูล ผู้เรียนจะเจอปัญหาเลขกลายเป็นข้อความบ่อยมาก",
    concept:
      "ข้อมูลจากผู้ใช้มักเข้ามาเป็นข้อความก่อนเสมอ Number() เหมาะเมื่ออยากแปลงทั้งค่าเป็นตัวเลข parseInt() เหมาะกับจำนวนเต็ม และ parseFloat() เหมาะกับเลขทศนิยม เช่น ราคา 19.5 หรือคะแนนเฉลี่ย 82.75",
    exampleCode: `const priceText = prompt("กรอกราคา");
const quantityText = prompt("กรอกจำนวน");

const price = Number(priceText);
const quantity = parseInt(quantityText);
const total = price * quantity;

console.log("ราคาต่อชิ้น:", price);
console.log("จำนวน:", quantity);
console.log("ราคารวม:", total);`,
    walkthrough: [
      "บรรทัดที่ 1-2 รับราคากับจำนวนจากผู้ใช้ ซึ่งค่าที่ได้เริ่มเป็น string",
      "บรรทัดที่ 4 ใช้ Number() แปลงราคาเป็นตัวเลข",
      "บรรทัดที่ 5 ใช้ parseInt() แปลงจำนวนเป็นจำนวนเต็ม",
      "บรรทัดที่ 6 คูณราคาและจำนวนเพื่อหาราคารวม",
      "บรรทัดท้าย ๆ แสดงข้อมูลที่คำนวณได้ใน Console"
    ],
    mistakes: [
      "ลืมแปลงค่าจาก prompt ก่อนคำนวณ",
      "ใช้ parseInt() กับข้อมูลทศนิยมแล้วส่วนทศนิยมถูกตัด",
      "ผู้ใช้กรอกข้อความที่ไม่ใช่ตัวเลขแล้วได้ NaN",
      "สับสนระหว่าง + สำหรับบวกเลขกับ + สำหรับต่อข้อความ"
    ],
    summary:
      "ก่อนคำนวณควรถามตัวเองว่า ข้อมูลนี้เป็น number แล้วหรือยัง ถ้ายัง ให้แปลงด้วยเครื่องมือที่เหมาะสม แล้วค่อยใช้ +, -, *, / เพื่อคำนวณ",
    extraTasks: [
      "เขียนโปรแกรมคำนวณคะแนนรวมจากคะแนนสอบ 2 ครั้ง",
      "ลองเปลี่ยน Number() เป็น parseFloat() กับราคาทศนิยมแล้วสังเกตผล",
      "เพิ่มข้อความเตือนตัวเองใน comment ว่าค่าจาก prompt เป็น string"
    ],
    extraQuiz: {
      question: "ถ้าต้องการเก็บเลขทศนิยมจากข้อความ ควรใช้คำสั่งใด",
      options: ["parseFloat()", "parseInt() เท่านั้น", "console.log()", "typeof"],
      answer: 0,
      explanation: "parseFloat() แปลงข้อความเป็นเลขทศนิยมได้"
    }
  },
  106: {
    learn:
      "บทนี้เรียนการตัดสินใจของโปรแกรมด้วย if, else if และ else พร้อมตัวดำเนินการเปรียบเทียบ >, <, >=, <=, === และ !== รวมถึง nested if แบบเบื้องต้น",
    why:
      "โปรแกรมจริงต้องเลือกทางเดิน เช่น ถ้าคะแนนถึงเกณฑ์ให้ผ่าน ถ้ากรอกอีเมลไม่ครบให้เตือน หรือถ้าเป็น Premium ให้เปิดบทเรียน การเขียนเงื่อนไขคือหัวใจของ logic เหล่านี้",
    concept:
      "if คือถ้าเงื่อนไขเป็นจริงให้ทำสิ่งนี้ else if คือถ้าเงื่อนไขแรกไม่จริง ลองตรวจเงื่อนไขถัดไป else คือทางเลือกสุดท้าย ส่วน === ใช้เปรียบเทียบแบบเข้มงวดทั้งค่าและชนิดข้อมูล จึงเหมาะกับการเขียน JavaScript สมัยใหม่",
    exampleCode: `const score = 78;
const submittedHomework = true;

if (score >= 80) {
  console.log("ดีเยี่ยม");
} else if (score >= 50) {
  if (submittedHomework === true) {
    console.log("ผ่าน");
  } else {
    console.log("คะแนนผ่าน แต่ยังต้องส่งการบ้าน");
  }
} else {
  console.log("ควรฝึกเพิ่ม");
}`,
    walkthrough: [
      "บรรทัดที่ 1-2 กำหนดคะแนนและสถานะส่งการบ้าน",
      "โปรแกรมตรวจ score >= 80 ก่อน ถ้าจริงจะแสดงดีเยี่ยม",
      "ถ้าไม่ถึง 80 จะมาตรวจ score >= 50",
      "เมื่อคะแนนผ่านเกณฑ์ จะเข้า nested if เพื่อตรวจว่าส่งการบ้านแล้วหรือยัง",
      "ถ้าไม่เข้าเงื่อนไขใดเลย จะทำงานใน else สุดท้าย"
    ],
    mistakes: [
      "ใช้ = แทน === ในการเปรียบเทียบ",
      "เรียงเงื่อนไขจากกว้างไปแคบ ทำให้บางกรณีไม่มีวันถูกตรวจ",
      "ลืมวงเล็บปีกกาใน block ของ if",
      "ซ้อน nested if ลึกเกินไปจนอ่านยาก"
    ],
    summary:
      "เงื่อนไขช่วยให้โปรแกรมตัดสินใจได้ เริ่มจากเขียนกฎเป็นภาษาไทยก่อน เช่น ถ้าคะแนนมากกว่าหรือเท่ากับ 50 ให้ผ่าน แล้วค่อยแปลงเป็น if/else ในโค้ด",
    extraTasks: [
      "เพิ่มเงื่อนไข score >= 90 ให้แสดง ยอดเยี่ยมมาก",
      "เปลี่ยน submittedHomework เป็น false แล้วอ่านผลลัพธ์",
      "เขียนเงื่อนไขตรวจว่า userRole === \"admin\" หรือไม่"
    ],
    extraQuiz: {
      question: "ทำไม === จึงเหมาะกับการเปรียบเทียบใน JavaScript",
      options: ["ตรวจทั้งค่าและชนิดข้อมูล", "ใช้ตกแต่งข้อความ", "สร้าง array", "ทำให้ loop หยุดเสมอ"],
      answer: 0,
      explanation: "=== เปรียบเทียบแบบเข้มงวด จึงลดปัญหาจากการแปลงชนิดข้อมูลอัตโนมัติ"
    }
  },
  107: {
    learn:
      "บทนี้เรียน loop หรือการทำซ้ำด้วย for และ while แบบพื้นฐาน พร้อมข้อควรระวังเรื่อง infinite loop และตัวอย่างรวมคะแนน",
    why:
      "งานซ้ำเกิดขึ้นตลอด เช่น แสดงรายชื่อผู้เรียนทุกคน รวมคะแนนหลายข้อ หรือสร้างตารางสูตรคูณ ถ้าไม่มี loop เราต้องเขียนคำสั่งซ้ำจำนวนมากและแก้ไขยาก",
    concept:
      "for loop เหมาะเมื่อรู้จำนวนรอบค่อนข้างชัด เช่น วน 1 ถึง 10 ส่วน while loop เหมาะเมื่อวนจนกว่าเงื่อนไขจะเปลี่ยน เช่น ถามรหัสผ่านจนกว่าจะถูก ทุก loop ต้องมีทางหยุด ไม่อย่างนั้นจะเกิด infinite loop",
    exampleCode: `let total = 0;

for (let i = 1; i <= 5; i++) {
  total = total + i;
  console.log("บวกเลข", i, "ผลรวมตอนนี้", total);
}

let countdown = 3;
while (countdown > 0) {
  console.log("นับถอยหลัง", countdown);
  countdown = countdown - 1;
}`,
    walkthrough: [
      "บรรทัดที่ 1 สร้าง total เพื่อเก็บผลรวม",
      "for loop เริ่มที่ i = 1 และวนจนถึง i <= 5",
      "ในแต่ละรอบนำ i ไปบวกเพิ่มใน total",
      "while loop เริ่มจาก countdown = 3 และทำงานตราบใดที่ countdown > 0",
      "บรรทัด countdown = countdown - 1 คือทางหยุดที่ทำให้ while ไม่วนตลอดไป"
    ],
    mistakes: [
      "ลืมเพิ่มหรือลดค่าที่ใช้หยุด while loop",
      "ใช้เงื่อนไข i <= 5 หรือ i < 5 ผิดจากจำนวนรอบที่ต้องการ",
      "เปลี่ยนค่าตัวแปรนับในหลายจุดจนตามยาก",
      "ใช้ loop ทั้งที่งานทำครั้งเดียวก็พอ"
    ],
    summary:
      "loop คือเครื่องมือทำซ้ำอย่างมีระบบ for เหมาะกับจำนวนรอบที่ชัด ส่วน while เหมาะกับการวนตามเงื่อนไข จุดสำคัญคือทุก loop ต้องมีทางหยุด",
    extraTasks: [
      "ใช้ for loop แสดงเลขคู่ 2 ถึง 20",
      "เขียน while loop นับถอยหลังจาก 5 ถึง 1",
      "เพิ่มตัวแปร total เพื่อรวมคะแนนในแต่ละรอบ"
    ],
    extraQuiz: {
      question: "สาเหตุหลักของ infinite loop คืออะไร",
      options: ["เงื่อนไขไม่มีทางกลายเป็น false", "ใช้ console.log()", "ประกาศ const", "มีตัวแปรชื่อ total"],
      answer: 0,
      explanation: "ถ้าเงื่อนไขของ loop ไม่เคยเป็น false โปรแกรมจะวนซ้ำไม่จบ"
    }
  },
  108: {
    learn:
      "บทนี้เรียน Array หรือรายการข้อมูลหลายค่า เช่น คะแนน รายชื่อ หรือรายการสินค้า พร้อมการใช้ index, push, pop, length และ loop เพื่ออ่านข้อมูล",
    why:
      "ถ้าต้องเก็บคะแนน 10 ครั้ง การสร้างตัวแปร score1 ถึง score10 จะทำให้โค้ดรกมาก Array ช่วยรวมข้อมูลประเภทเดียวกันไว้ในที่เดียวและจัดการด้วย loop ได้ง่าย",
    concept:
      "Array ใน JavaScript ใช้วงเล็บเหลี่ยม [] สมาชิกตัวแรกอยู่ที่ index 0 ใช้ .length ดูจำนวนสมาชิก push() เพิ่มข้อมูลท้ายรายการ และ pop() นำข้อมูลท้ายรายการออก",
    exampleCode: `const lessons = ["console.log", "variables", "if else"];

console.log("บทแรก:", lessons[0]);
console.log("จำนวนบท:", lessons.length);

lessons.push("loops");
console.log("หลังเพิ่ม:", lessons);

const lastLesson = lessons.pop();
console.log("นำออก:", lastLesson);

for (let i = 0; i < lessons.length; i++) {
  console.log("บทเรียน:", lessons[i]);
}`,
    walkthrough: [
      "บรรทัดแรกสร้าง array lessons ที่มี 3 ค่า",
      "lessons[0] อ่านสมาชิกตัวแรก เพราะ index เริ่มจาก 0",
      "lessons.length บอกจำนวนสมาชิกใน array",
      "push() เพิ่ม loops ต่อท้าย array",
      "pop() นำสมาชิกตัวท้ายออกและเก็บไว้ใน lastLesson",
      "for loop ใช้ i อ่านสมาชิกทีละตำแหน่ง"
    ],
    mistakes: [
      "ลืมว่า index เริ่มที่ 0",
      "อ่าน index ที่ไม่มีอยู่แล้วได้ undefined",
      "ใช้ pop() แล้วลืมว่าข้อมูลถูกนำออกจาก array จริง",
      "วน loop ด้วย i <= array.length ทำให้เกินตำแหน่งสุดท้าย"
    ],
    summary:
      "Array เหมาะกับข้อมูลเป็นรายการ เมื่อใช้ index, length และ loop ได้คล่อง ผู้เรียนจะจัดการข้อมูลหลายค่าได้เป็นระบบมากขึ้น",
    extraTasks: [
      "สร้าง array เก็บคะแนน 5 ค่า แล้วใช้ loop แสดงทุกคะแนน",
      "เพิ่มคะแนนใหม่ด้วย push()",
      "ใช้ pop() นำคะแนนล่าสุดออก แล้วแสดง array หลังเปลี่ยนแปลง"
    ],
    extraQuiz: {
      question: "ถ้า array มี 3 สมาชิก index สุดท้ายคืออะไร",
      options: ["2", "3", "1", "length"],
      answer: 0,
      explanation: "เพราะ index เริ่มที่ 0 array ที่มี 3 สมาชิกจึงมี index 0, 1, 2"
    }
  },
  109: {
    learn:
      "บทนี้เรียน function ในฐานะชุดคำสั่งที่ตั้งชื่อและเรียกใช้ซ้ำได้ รวมถึง parameter, return และความต่างระหว่าง console.log กับ return",
    why:
      "เมื่อโค้ดยาวขึ้น การเขียนทุกอย่างต่อกันจะอ่านยาก Function ช่วยแบ่งงานเป็นชิ้นเล็ก เช่น คำนวณราคา ตรวจคะแนน หรือสร้างข้อความทักทาย ทำให้ทดสอบและแก้ไขง่ายขึ้น",
    concept:
      "parameter คือช่องรับข้อมูลเข้า function ส่วน return คือการส่งผลลัพธ์กลับออกไปใช้ต่อ console.log() แค่แสดงผลให้เราดู แต่ไม่ได้ส่งค่าไปให้ส่วนอื่นของโปรแกรมใช้ต่อ",
    exampleCode: `function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

function showResult(value) {
  console.log("ผลลัพธ์คือ:", value);
}

const finalPrice = calculateTotal(199, 2);
showResult(finalPrice);`,
    walkthrough: [
      "calculateTotal รับ price และ quantity เป็น parameter",
      "ใน function นำ price คูณ quantity แล้วเก็บใน total",
      "return total ส่งผลลัพธ์กลับออกจาก function",
      "showResult รับ value แล้วใช้ console.log() แสดงผล",
      "finalPrice ได้ค่าจาก calculateTotal ก่อนนำไปส่งให้ showResult"
    ],
    mistakes: [
      "สร้าง function แล้วลืมเรียกใช้",
      "ใช้ console.log() แทน return ทั้งที่ต้องการนำค่าไปคำนวณต่อ",
      "ตั้งชื่อ function ไม่บอกว่าทำอะไร",
      "ส่งจำนวน argument ไม่ตรงกับ parameter ที่ออกแบบไว้"
    ],
    summary:
      "Function ทำให้โค้ดเป็นส่วนย่อยที่เรียกใช้ซ้ำได้ จำให้ได้ว่า console.log() ใช้ดูผล ส่วน return ใช้ส่งค่ากลับเพื่อให้โปรแกรมใช้ต่อ",
    extraTasks: [
      "สร้าง function calculateAverage(score1, score2) แล้ว return ค่าเฉลี่ย",
      "สร้าง function getPassMessage(score) ที่ return ข้อความผ่านหรือไม่ผ่าน",
      "ลองใช้ console.log() แสดงค่าที่ function return ออกมา"
    ],
    extraQuiz: {
      question: "ถ้าต้องการนำผลลัพธ์จาก function ไปคำนวณต่อ ควรใช้คำสั่งใด",
      options: ["return", "console.log เท่านั้น", "prompt", "typeof"],
      answer: 0,
      explanation: "return ส่งค่ากลับออกจาก function เพื่อให้ส่วนอื่นนำไปใช้ต่อได้"
    }
  },
  110: {
    learn:
      "บทนี้รวมความรู้จากบทก่อนหน้าเพื่อทำ Mini Project โปรแกรมคำนวณคะแนนอย่างง่าย โดยใช้ตัวแปร array loop function และ if/else ทำงานร่วมกัน",
    why:
      "โปรเจกต์ช่วยให้เห็นว่าคำสั่งพื้นฐานไม่ได้แยกกันอยู่ แต่ประกอบกันเป็นโปรแกรมที่ใช้งานได้จริง เช่น ระบบสรุปคะแนน แบบทดสอบออนไลน์ หรือแอปฝึกทำโจทย์",
    concept:
      "เริ่มจากวางโจทย์ให้ชัด: รับชุดคะแนน คำนวณคะแนนรวม หาเฉลี่ย แล้วสรุปผลผ่าน/ไม่ผ่าน จากนั้นแบ่งงานเป็น function เล็ก ๆ เช่น calculateAverage() และ getGradeMessage() เพื่อให้โค้ดอ่านง่าย",
    exampleCode: `function calculateAverage(scores) {
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }

  return total / scores.length;
}

function getGradeMessage(average) {
  if (average >= 80) {
    return "ดีเยี่ยม";
  } else if (average >= 60) {
    return "ผ่าน";
  } else {
    return "ควรฝึกเพิ่ม";
  }
}

const scores = [72, 85, 90, 68];
const average = calculateAverage(scores);
const message = getGradeMessage(average);

console.log("คะแนนเฉลี่ย:", average);
console.log("ผลสรุป:", message);`,
    walkthrough: [
      "calculateAverage รับ array คะแนนเข้ามา",
      "สร้าง total เป็น 0 เพื่อสะสมคะแนน",
      "for loop วนอ่านคะแนนทีละตัวแล้วบวกเข้า total",
      "return total / scores.length เพื่อส่งค่าเฉลี่ยกลับ",
      "getGradeMessage รับค่าเฉลี่ยแล้วใช้ if/else if/else เลือกข้อความ",
      "ส่วนท้ายสร้าง scores เรียก function และแสดงผลลัพธ์ใน Console"
    ],
    mistakes: [
      "ลืมตรวจว่า scores.length ไม่ใช่ 0 ก่อนหารในงานจริง",
      "บวกคะแนนผิดเพราะใช้ index เกิน array",
      "เขียนทุกอย่างในที่เดียวจนอ่านยาก แทนที่จะแยก function",
      "ใช้ console.log() ใน function คำนวณทั้งที่ควร return ค่า"
    ],
    summary:
      "โปรเจกต์นี้คือภาพรวมของพื้นฐาน JavaScript: เก็บข้อมูลด้วย array, วนรวมค่าด้วย loop, แยกงานด้วย function และตัดสินผลด้วย if/else ผู้เรียนควรลองปรับคะแนนและกติกาเองเพื่อฝึกคิดแบบนักพัฒนา",
    extraTasks: [
      "เพิ่มเกรด A/B/C เช่น >= 80 เป็น A, >= 70 เป็น B, >= 60 เป็น C",
      "เพิ่มข้อความแนะนำ เช่น ถ้าคะแนนต่ำกว่า 60 ให้บอกว่าควรทบทวนบท loop",
      "สร้าง array ชุดใหม่ 2 ชุดแล้วทดสอบ function เดิมซ้ำ"
    ],
    extraQuiz: {
      question: "ข้อใดเป็น flow ที่เหมาะกับโปรแกรมคำนวณคะแนน",
      options: ["เก็บคะแนน > รวมคะแนน > หาเฉลี่ย > สรุปผล", "สรุปผลก่อนรับคะแนน", "ลบ array ก่อน loop", "แสดงผลโดยไม่คำนวณ"],
      answer: 0,
      explanation: "ควรวาง flow จากข้อมูลเข้า ไปคำนวณ แล้วค่อยสรุปผลลัพธ์"
    }
  }
};

javascriptLessons.forEach((lesson) => {
  const enhancement = javascriptLessonEnhancements[lesson.id];

  if (!enhancement) {
    return;
  }

  lesson.sections = [
    {
      heading: "บทนี้เรียนอะไร",
      body: enhancement.learn
    },
    {
      heading: "ทำไมเรื่องนี้สำคัญ",
      body: enhancement.why
    },
    {
      heading: "อธิบายแนวคิดแบบง่าย",
      body: enhancement.concept
    },
    {
      heading: "ตัวอย่างโค้ด JavaScript",
      body: "ตัวอย่างนี้ออกแบบให้ copy ไปลองรันใน Console หรือเครื่องมือฝึก JavaScript ได้ทันที ก่อนรันให้ลองอ่านและเดาผลลัพธ์ด้วยตัวเองหนึ่งรอบ",
      code: enhancement.exampleCode
    },
    {
      heading: "อธิบายโค้ดทีละบรรทัด",
      body: enhancement.walkthrough
        .map((item, index) => `${index + 1}. ${item}`)
        .join(" ")
    },
    {
      heading: "ข้อผิดพลาดที่มือใหม่มักเจอ",
      body: enhancement.mistakes
        .map((item, index) => `${index + 1}. ${item}`)
        .join(" ")
    },
    {
      heading: "สรุปท้ายบท",
      body: enhancement.summary
    }
  ];

  lesson.exercise = {
    ...lesson.exercise,
    tasks: [...lesson.exercise.tasks, ...enhancement.extraTasks]
  };

  lesson.quiz = [...lesson.quiz, enhancement.extraQuiz];
});

export const lessons: Lesson[] = [...pythonLessons, ...javascriptLessons];
const retiredDraftLessonSlugs = new Set([
  "nextjs-page-request-flow",
  "project-sitemap-pages",
  "project-user-flow"
]);
export const allLessons: Lesson[] = [
  ...lessons,
  ...upcomingLessons.filter(
    (lesson) => !retiredDraftLessonSlugs.has(lesson.slug)
  ),
  ...supplementalPremiumLessons,
  ...landingPageLessons
];

export function getLessonBySlug(slug: string) {
  return allLessons.find((lesson) => lesson.slug === slug);
}

export function getLessonById(id: number) {
  return allLessons.find((lesson) => lesson.id === id);
}

export function canAccessLesson(
  user: Pick<CurrentUser, "role" | "membership" | "courseAccesses"> | null,
  lesson: Lesson
) {
  if (lesson.purchaseCourseSlug) {
    return Boolean(
      user?.role === "admin" ||
        user?.courseAccesses.some(
          (access) => access.courseSlug === lesson.purchaseCourseSlug
        )
    );
  }

  if (lesson.free) {
    return true;
  }

  return user?.role === "admin" || user?.membership === "paid";
}

export function getLessonStatusLabel(
  user: Pick<CurrentUser, "role" | "membership" | "courseAccesses"> | null,
  lesson: Lesson
) {
  if (canAccessLesson(user, lesson)) {
    return lesson.free ? "ฟรี" : "ปลดล็อกแล้ว";
  }

  return lesson.purchaseCourseSlug
    ? "Landing"
    : "สำหรับสมาชิกพรีเมียม";
}
