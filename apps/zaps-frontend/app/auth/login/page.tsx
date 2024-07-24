import React from "react";
import AuthForm from "@/components/form";

const page = () => {
  return (
    <>
      <h2 className="text-5xl font-degular font-semibold mt-16">
        Automate across your teams
      </h2>
      <p className="text-md mt-2 ">
        Zapss is a no-code platform for building workflows
      </p>
      <div className="w-full flex justify-center">
        <AuthForm type={"login"} />
      </div>
    </>
  );
};

export default page;
