import Link from "next/link";
import React from "react";
import { ChevronDown, Globe, LanguagesIcon, Navigation } from "lucide-react";
import { NavigationMenuItems } from "./menu-items";
import { Button } from "../ui/button";
const Header = () => {
  return (
    <div className="flex justify-between w-full mx-auto px-10 py-2 sm:px-6 lg:px-8 border-b border-gray border-opacity-20 ">
      <div className="flex  items-baseline  gap-4">
        <h2 className="text-3xl font-bold font-degular line-clamp-1">
          <span className="text-orange font-black font-degular">_</span>zapss
        </h2>
        <div className="xl:block hidden">
          <NavigationMenuItems />
        </div>
      </div>
      <div className="flex items-center ">
        <Link href="/docs" className="text-grey xl:flex hidden">
          <Button className="flex items-center gap-2" variant={"ghost"}>
            <Globe size={14} className="text-grey" />
            <h4 className="text-sm text-grey font-medium">
              Explare Integrations
            </h4>
          </Button>
        </Link>
        <Button
          className="xl:flex hidden text-sm text-grey font-medium "
          variant={"ghost"}
        >
          Contact sales
        </Button>
        <Link href={"/auth/login"}>
          <Button className="text-sm text-grey font-medium " variant={"ghost"}>
            Login
          </Button>
        </Link>
        <Link href={"/auth/signup"}>
          <Button className="text-sm text-white font-medium bg-orange rounded-full h-[32px] px-6">
            Sign up
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Header;
