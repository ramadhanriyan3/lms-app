"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "../ui/button";
import { File, ImageIcon, Loader2, Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "../fileUploud";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<null | string>(null);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  console.log(initialData.attachments);

  return (
    <div className="mt-5 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Attachments
        <Button variant={"ghost"} onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add attachment
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing ? (
        initialData.attachments.length === 0 ? (
          <p className="text-sm mt-2 text-slate-500 italic">
            No attachments yet
          </p>
        ) : (
          <div className="space-y-2">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
              >
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="text-xs line-clamp-1">{attachment.name}</p>
                {deletingId === attachment.id ? (
                  <div className="ml-auto">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onDelete(attachment.id)}
                    className="ml-auto hover:opacity-75 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
                console.log(url);
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything students need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
