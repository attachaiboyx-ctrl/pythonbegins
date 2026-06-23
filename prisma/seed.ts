import { PrismaClient } from "@prisma/client";
import { lessons } from "../lib/lessons";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function upsertUser({
  name,
  email,
  password,
  role = "student",
  membership = "free"
}: {
  name: string;
  email: string;
  password: string;
  role?: string;
  membership?: string;
}) {
  return prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash: hashPassword(password),
      role,
      membership
    },
    create: {
      name,
      email,
      passwordHash: hashPassword(password),
      role,
      membership
    }
  });
}

async function main() {
  const admin = await upsertUser({
    name: "ครูแอดมิน",
    email: "admin@pythonm1.local",
    password: "admin1234",
    role: "admin",
    membership: "paid"
  });

  const freeStudent = await upsertUser({
    name: "ผู้เรียนใช้ฟรี",
    email: "student@pythonm1.local",
    password: "student1234"
  });

  const paidStudent = await upsertUser({
    name: "ผู้เรียนพรีเมียม",
    email: "paid@pythonm1.local",
    password: "paid1234",
    membership: "paid"
  });

  await Promise.all(
    lessons.slice(0, 2).map((lesson) =>
      prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: freeStudent.id,
            lessonId: lesson.id
          }
        },
        update: {
          completed: true,
          quizScore: 86
        },
        create: {
          userId: freeStudent.id,
          lessonId: lesson.id,
          completed: true,
          quizScore: 86
        }
      })
    )
  );

  await Promise.all(
    lessons.map((lesson) =>
      prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: paidStudent.id,
            lessonId: lesson.id
          }
        },
        update: {
          completed: lesson.id <= 12,
          quizScore: lesson.id <= 12 ? 92 : null
        },
        create: {
          userId: paidStudent.id,
          lessonId: lesson.id,
          completed: lesson.id <= 12,
          quizScore: lesson.id <= 12 ? 92 : null
        }
      })
    )
  );

  await Promise.all(
    lessons.slice(0, 5).map((lesson) =>
      prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: admin.id,
            lessonId: lesson.id
          }
        },
        update: {
          completed: true,
          quizScore: 100
        },
        create: {
          userId: admin.id,
          lessonId: lesson.id,
          completed: true,
          quizScore: 100
        }
      })
    )
  );

  console.log("Seed complete");
  console.log(`Lessons available: ${lessons.length}`);
  console.log("Admin: admin@pythonm1.local / admin1234");
  console.log("Free student: student@pythonm1.local / student1234");
  console.log("Paid student: paid@pythonm1.local / paid1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
