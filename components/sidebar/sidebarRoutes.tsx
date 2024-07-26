"use client";

import SidebarItem from "./sidebarItem";
import { guestRoutes, teacherRoutes } from "@/lib/constant";
import { usePathname } from "next/navigation";

const SidebarRoutes = () => {
  const pathname = usePathname();
  const routes = pathname.startsWith("/teacher") ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col justify-center ">
      {routes.map((item) => (
        <SidebarItem
          href={item.path}
          key={item.label}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
