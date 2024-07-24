import React from "react";
import Image from "next/image";
import GoogleIcon from "@/public/google.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "@/auth";

const GoogleLogin = ({ text, width }: { text?: string; width?: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          redirectTo: "/dashboard",
        });
      }}
    >
      <Button
        className={cn(
          width ? width : "w-[270px]",
          "text-md flex gap-4   bg-white font-semibold border border-gray-300 rounded-full h-[48px]  px-6"
        )}
        variant={"ghost"}
      >
        <Image src={GoogleIcon} alt="google" width={20} height={21} />
        {text ? text : "Start free with Google"}
      </Button>
    </form>
  );
};

export default GoogleLogin;
