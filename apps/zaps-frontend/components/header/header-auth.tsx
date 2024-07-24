import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../logo";

const HeaderAuth = ({ type }: { type: "login" | "signup" }) => {
  return (
    <div className="border-b border-gray border-opacity-20">
      <div className="flex justify-between max-w-5xl mx-auto px-10 py-2 sm:px-6 lg:px-8  ">
        <Logo />
        <div>
          {type == "signup" ? (
            <Link href={"/auth/login"}>
              <Button
                className="text-sm text-white font-medium bg-orange rounded-full h-[32px] px-6 hover:bg-background hover:border-grey hover:border-2"
                variant={"ghost"}
              >
                Login
              </Button>
            </Link>
          ) : (
            <Link href={"/auth/signup"}>
              <Button className="text-sm text-white font-medium bg-orange rounded-full h-[32px] px-6 hover:bg-background hover:border-grey hover:border-2">
                Sign up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderAuth;
