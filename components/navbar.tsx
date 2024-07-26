"use client";

import Link from "next/link";
import MobileSidebar from "./sidebar/mobileSidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Ghost, LogOut } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const isPlayer = pathname?.startsWith("/chapter");
  const isTeacher = pathname?.startsWith("/teacher");

  return (
    <nav className="flex h-full items-center justify-between px-3 border-b-2 bg-white drop-shadow-md ">
      <MobileSidebar />
      <div className="flex gap-2 ml-auto">
        {isTeacher || isPlayer ? (
          <Link href={"/"}>
            <Button variant={"ghost"} size={"sm"} className="leading-loose">
              <LogOut className="w-4 h-4 mr-2 " />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button variant={"ghost"} size={"sm"}>
              Teacher mode
            </Button>
          </Link>
        )}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-[30px] h-[30px]",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
