import { LucideIcon } from "lucide-react";
import { IconBadge } from "./iconBadge";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  variant?: "default" | "success";
  numberOfItems: number;
}

const InfoCard = ({
  icon: Icon,
  label,
  numberOfItems,
  variant,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems !== 1 ? "Courses" : "Course"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
