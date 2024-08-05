"use client";

import DescriptionForm from "@/components/form/descriptionForm";
import { IconBadge } from "@/components/iconBadge";
import Loading from "@/components/loading";
import TitleForm from "@/components/form/titleForm";
import { fetcher } from "@/lib/fetcher";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import useSWR from "swr";
import ImageForm from "@/components/form/imageForm";
import CategoryForm from "@/components/form/categoryForm";
import PriceForm from "@/components/form/priceForm";
import AttachmentForm from "@/components/form/attachmentForm";
import ChaptersForm from "@/components/form/chapterForm";
import { Banner } from "@/components/banner";
import CourseAction from "@/components/courseAction";

const CourseId = ({ params }: { params: { courseId: string } }) => {
  const { data, isLoading } = useSWR(
    `/api/courses/${params.courseId}`,
    fetcher
  );

  const { data: categories } = useSWR("/api/category", fetcher);

  if (isLoading || !categories) {
    return <Loading />;
  }

  const requiredFields = [
    data.title,
    data.description,
    data.imageUrl,
    data.price,
    data.categoryId,
    data.chapters.some((chapter: { isPublished: any }) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean);
  const completedText = `${completedFields}/${totalFields}`;
  return (
    <>
      {!data.isPublished && (
        <Banner label="This course is unpublished, It will not be visible to the students " />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2 ">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all field {completedText}
            </span>
          </div>
          <CourseAction
            courseId={params.courseId}
            isPublished={data.isPublished}
            disabled={!isComplete}
          />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your course</h2>
              </div>
              <TitleForm initialData={data} courseId={data.id} />
              <DescriptionForm initialData={data} courseId={data.id} />
              <ImageForm initialData={data} courseId={data.id} />
              <CategoryForm
                initialData={data}
                courseId={data.id}
                options={categories.map(
                  (item: { name: string; id: string }) => ({
                    label: item.name,
                    value: item.id,
                  })
                )}
              />
            </div>
            <div className={"space-y-6"}>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListCheck} />
                  <h2 className="text-xl">Course chapters</h2>
                </div>
                <div>
                  <ChaptersForm initialData={data} courseId={data.id} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CircleDollarSign} />
                  <h2 className="text-xl">Sell your course</h2>
                </div>
                <PriceForm initialData={data} courseId={data.id} />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={File} />
                  <h2 className="text-xl">Resources & Attachments</h2>
                </div>
                <AttachmentForm initialData={data} courseId={data.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseId;
