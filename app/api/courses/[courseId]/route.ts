import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;
  try {
    const courseById = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
        purchase: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json(courseById);
  } catch (error) {
    console.log(["COURSEiD"], error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { userId } = auth();
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const updatedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.log(["COURSEiD"], error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
