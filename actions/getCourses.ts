import { Category, Course } from "@prisma/client";

import { getProgress } from "./getProgress";
import { db } from "@/lib/db";

type CourseWithProgressCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress: CourseWithProgressCategory[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchase.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPersentage = await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPersentage,
        };
      })
    );

    return courseWithProgress;
  } catch (error) {
    console.log("GetCourseProgres", error);
    return [];
  }
};
