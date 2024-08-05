"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcCommandLine,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcLineChart,
  FcSportsMode,
  FcSalesPerformance,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItemIcon from "./categoryItemIcon";

interface CategoriesBreadProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  "Computer Science": FcCommandLine,
  Accounting: FcSalesPerformance,
  "Web Development": FcMultipleDevices,
  Mathematics: FcLineChart,
  Engineering: FcEngineering,
};

const CategoriesBread = ({ items }: CategoriesBreadProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItemIcon
          key={item.id}
          icon={iconMap[item.name]}
          label={item.name}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default CategoriesBread;
