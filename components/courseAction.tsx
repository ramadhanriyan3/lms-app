"use client";

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import ConfirmModal from "./confirmModal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CourseActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseAction = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.push(`/teacher/courses/`);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onConfirm}>
        <Button size={"sm"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseAction;
