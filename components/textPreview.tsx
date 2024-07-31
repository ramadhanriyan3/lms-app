"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface TextPreviewProps {
  value: string;
}
const TextPreview = ({ value }: TextPreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-slate-100">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export default TextPreview;
