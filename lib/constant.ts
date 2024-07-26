import { BarChart, Compass, Layout, List } from "lucide-react";

export const guestRoutes = [
  {
    path: "/",
    label: "Dashboard",
    icon: Layout,
  },
  {
    path: "/search",
    label: "Browse",
    icon: Compass,
  },
];

export const teacherRoutes = [
  {
    path: "/teacher/courses",
    label: "Courses",
    icon: List,
  },
  {
    path: "/teacher/analytics",
    label: "Analytics",
    icon: BarChart,
  },
];
