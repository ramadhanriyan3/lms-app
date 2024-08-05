import { db } from "@/lib/db";

import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

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

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not found", {
        status: 404,
      });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("DELETE_COURSE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
