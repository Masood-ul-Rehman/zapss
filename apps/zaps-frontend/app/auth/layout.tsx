"use client";
import HeaderAuth from "@/components/header/header-auth";
import React from "react";
import { usePathname } from "next/navigation";
const Layout = ({ children }: { children: React.ReactNode }) => {
  3;
  const link = usePathname();
  const page = link.split("/")[2] || "signup";
  return (
    <div className="bg-background h-[100vh] ">
      <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <HeaderAuth type={page} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
