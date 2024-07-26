"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const SidebarItem = ({ href, label, icon: Icon }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`flex group  hover:bg-slate-300/20 cursor-pointer ${
        isActive ? "bg-sky-200/20" : ""
      }`}
    >
      <div className={`flex gap-3 items-center py-3  pl-6  justify-start `}>
        <Icon
          className={`aspect-square   ${
            isActive ? "text-sky-700" : "text-slate-500"
          }`}
          size={22}
        />
        <p
          className={` font-semibold ${
            isActive
              ? "group-hover:text-sky-700 text-sky-700"
              : "group-hover:text-slate-600 text-slate-500 "
          }  `}
        >
          {label}
        </p>
      </div>
      <div
        className={`ml-auto ${
          isActive ? "opacity-100" : "opacity-0"
        } border-r-4  border-sky-700 h-full transition-all `}
      />
    </Link>
  );
};

export default SidebarItem;
