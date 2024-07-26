import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import DashboardSidebar from "./dashboardSidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
