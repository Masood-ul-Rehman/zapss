import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className=" cursor-pointer">
      <div className="flex  items-baseline  gap-4">
        <h2 className="text-3xl font-bold font-degular line-clamp-1">
          <span className="text-orange font-degular font-bold ">_</span>zapss
        </h2>
      </div>{" "}
    </Link>
  );
};

export default Logo;
