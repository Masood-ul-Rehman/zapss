import React from "react";
import Image from "next/image";
import GoogleIcon from "@/public/google.svg";
import { Button } from "./ui/button";

const GoogleLogin = () => {
  return (
    <Button
      className="text-md flex gap-4   bg-white font-semibold border border-gray-300 rounded-full w-[270px] h-[48px]  px-6"
      variant={"ghost"}
    >
      <Image src={GoogleIcon} alt="google" width={20} height={21} />
      Start free with Google
    </Button>
  );
};

export default GoogleLogin;
