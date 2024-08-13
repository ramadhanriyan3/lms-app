import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../ui/sheet";
import DashboardSidebar from "./dashboardSidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <SheetTitle />
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
