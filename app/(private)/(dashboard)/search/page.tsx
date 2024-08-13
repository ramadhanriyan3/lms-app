import { getCourses } from "@/actions/getCourses";
import CategoriesBread from "@/components/categoriesBreadcrumb";
import CoursesList from "@/components/courseList";
import SearchInput from "@/components/searchInput";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

interface SearchParams {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchParams) => {
  const user = auth();
  const userId = user.userId!;
  const categories = await db.category.findMany();
  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-3 pt-3 md:hidden block">
        <SearchInput />
      </div>
      <div className="p-4 space-y-4">
        <CategoriesBread items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
