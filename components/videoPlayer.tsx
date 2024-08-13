"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  chapterId: string;
  courseId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  nextChapter?: string;
  playbackId: string;
}

const VideoPlayer = ({
  chapterId,
  courseId,
  isLocked,
  completeOnEnd,
  title,
  nextChapter,
  playbackId,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEndend = async () => {
    try {
      if (completeOnEnd) {
        axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapter) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapter) {
          router.push(`/api/courses/${courseId}/chapters/${nextChapter}`);
        }
      }
    } catch (error) {
      console.log("On Ended", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className=" h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center gap-y=2 justify-center bg-slate-800">
          <Lock className="w-8 h-8 text-slate-100/50" />
          <p className="text-sm text-slate-100/50">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          playbackId={playbackId}
          title={title}
          className={cn(!isReady && " hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEndend}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
