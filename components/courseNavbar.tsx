import { Chapter, Course, UserProgress } from "@prisma/client";
import NavbarRoute from "./navbarRoute";
import CourseMobileSidebar from "./sidebar/courseMobileSidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 w-full border-b md:border-l  h-full  flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoute />
    </div>
  );
};

export default CourseNavbar;
