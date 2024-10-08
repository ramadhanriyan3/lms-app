import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  variant?: "default" | "success";
  value: number;
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ variant, value, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress value={value} variant={variant} className="h-2" />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
