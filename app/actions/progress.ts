"use server";

import { redirect } from "next/navigation";
import { canAccessLesson, getLessonById } from "@/lib/lessons";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export async function submitQuizAction(formData: FormData) {
  const user = await requireUser();
  const lessonId = Number(formData.get("lessonId"));
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    redirect("/lessons");
  }

  if (!canAccessLesson(user, lesson)) {
    redirect("/payment");
  }

  let correctAnswers = 0;

  lesson.quiz.forEach((question, index) => {
    const answer = Number(formData.get(`question-${index}`));

    if (answer === question.answer) {
      correctAnswers += 1;
    }
  });

  const score = Math.round((correctAnswers / lesson.quiz.length) * 100);

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id
      }
    },
    update: {
      completed: score >= 60,
      quizScore: score
    },
    create: {
      userId: user.id,
      lessonId: lesson.id,
      completed: score >= 60,
      quizScore: score
    }
  });

  redirect(`/lessons/${lesson.slug}?score=${score}`);
}
