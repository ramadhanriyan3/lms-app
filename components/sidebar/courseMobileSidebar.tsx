import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

import CourseSidebar from "./courseSidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden hover:opacity-75" />
      </SheetTrigger>
      <SheetContent side="left" className="p-4 pr-0 bg-white w-72">
        <SheetTitle />
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
