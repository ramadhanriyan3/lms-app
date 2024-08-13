import { formatCurrency } from "@/lib/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DataCardProps {
  value: number;
  label: string;
  isFormated?: boolean;
}

const DataCard = ({ value, label, isFormated }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">
          {isFormated ? formatCurrency(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
