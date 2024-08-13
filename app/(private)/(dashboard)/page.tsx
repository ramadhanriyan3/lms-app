import { getDashboardCourses } from "@/actions/getDashboardCourses";
import CoursesList from "@/components/courseList";
import InfoCard from "@/components/infoCard";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";

export default async function Home() {
  const user = auth();

  const { coursesInProgress, completedCourses } = await getDashboardCourses(
    user.userId!
  );
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          variant="success"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
