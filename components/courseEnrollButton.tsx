"use client";

import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full md:w-auto"
      onClick={onClick}
      size={"sm"}
      disabled={isLoading}
    >
      Enroll for {formatCurrency(price)}
    </Button>
  );
};

export default CourseEnrollButton;
