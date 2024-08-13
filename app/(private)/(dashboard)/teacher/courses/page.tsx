import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/dataTable";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const CoursesPage = async () => {
  const { userId } = auth();
  const course = await db.course.findMany({
    where: {
      userId: userId!,
    },
    include: {
      category: true,
      purchase: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <>
      <div className="p-4">
        <DataTable columns={columns} data={course} />
      </div>
    </>
  );
};

export default CoursesPage;
