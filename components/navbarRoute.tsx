"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import SearchInput from "./searchInput";

const NavbarRoute = () => {
  const pathname = usePathname();
  const isCourse = pathname?.includes("/courses");
  const isTeacher = pathname?.startsWith("/teacher");

  const isSearchPage = pathname == "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-2 ml-auto">
        {isTeacher || isCourse ? (
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
    </>
  );
};

export default NavbarRoute;
