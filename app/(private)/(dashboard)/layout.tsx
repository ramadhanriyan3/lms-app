import Navbar from "@/components/navbar";
import DashboardSidebar from "@/components/sidebar/dashboardSidebar";

const DashboardLyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="w-full h-16 md:pl-56 fixed inset-y-0 z-50">
        <Navbar />
      </div>
      <div className="h-full hidden md:flex w-56 fixed inset-y-0 z-50">
        <DashboardSidebar />
      </div>
      <main className="md:pl-56 h-full mt-16">{children}</main>
    </div>
  );
};

export default DashboardLyout;
