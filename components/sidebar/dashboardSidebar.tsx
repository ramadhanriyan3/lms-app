import Image from "next/image";
import SidebarRoutes from "./sidebarRoutes";

const DashboardSidebar = () => {
  return (
    <div className="h-full w-full border-2 flex-col flex border-r overflow-y-auto bg-white shadow-sm">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={100}
        height={100}
        priority
        className="m-6"
      />
      <SidebarRoutes />
    </div>
  );
};

export default DashboardSidebar;
