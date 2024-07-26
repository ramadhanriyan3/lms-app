import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const category = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
