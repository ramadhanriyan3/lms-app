import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return new NextResponse("Publish Course has succed", {
      status: 200,
    });
  } catch (error) {
    console.log("PUBLIH_COURSE_API", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
