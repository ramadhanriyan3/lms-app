"use client";

import { Banner } from "@/components/banner";
import ChapterAction from "@/components/chapterAction";
import ChapterAccessForm from "@/components/form/chapterAccessForm";
import ChapterDescriptionForm from "@/components/form/chapterDescForm";
import ChapterTitleForm from "@/components/form/chapterTitleForm";
import ChapterVideoForm from "@/components/form/chapterVideoForm";
import { IconBadge } from "@/components/iconBadge";
import Loading from "@/components/loading";
import { fetcher } from "@/lib/fetcher";
import { ArrowLeftCircle, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import useSWR from "swr";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { data: chapter, isLoading: isChapterLoading } = useSWR(
    `/api/courses/${params.courseId}/chapters/${params.chapterId}`,
    fetcher
  );

  if (isChapterLoading) {
    return <Loading />;
  }

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const completedField = requiredFields.filter(Boolean).length;
  const totalFields = requiredFields.length;

  const completionText = `${completedField}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant={"warning"}
          label="This chapter is unpublished. It will not visible in the course"
        />
      )}
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeftCircle className="w-4 h-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterAction
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Costumize your chapter</h2>
              </div>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
