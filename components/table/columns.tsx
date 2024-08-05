"use client";

import { Category, Course, Purchases } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

type CourseWithCategory = Course & {
  category: Category | null;
  purchase: Purchases[];
};

export const columns: ColumnDef<CourseWithCategory>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: { id: string; name: string } = row.getValue("category");
      return (
        <div className="text-left font-medium">{category?.name || "-"}</div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("createdAt"));
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleString("en-US", options);
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Update
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("updatedAt"));
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleString("en-US", options);
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return (
        <div className="text-left font-medium">{price ? formatted : "-"}</div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished");
      return (
        <Badge className={isPublished ? "bg-sky-700" : "bg-slate-500"}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
];
