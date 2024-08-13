import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
      chapterId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();
    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return new NextResponse("Update user progress success", { status: 200 });
  } catch (error) {
    console.log("[Complete Progres API]", error);
    return new NextResponse("Internal Erro", { status: 500 });
  }
}
