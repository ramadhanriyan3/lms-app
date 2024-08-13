import { getAnalytics } from "@/actions/getAnalytics";
import AnalyticsCart from "@/components/analyticsCart";
import DataCard from "@/components/dataCard";
import { auth } from "@clerk/nextjs/server";

const AnalyticsPage = async () => {
  const user = auth();

  const { data, totalRevenue, totalSales } = await getAnalytics(user.userId!);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total Revenue" value={totalRevenue} isFormated />
      </div>
      <AnalyticsCart data={data} />
    </div>
  );
};

export default AnalyticsPage;
