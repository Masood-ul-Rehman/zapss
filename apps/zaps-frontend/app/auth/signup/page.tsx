import AuthForm from "@/components/form";
import React from "react";

const page = () => {
  return (
    <>
      <h2 className="text-5xl font-degular font-semibold mt-16">
        Join millions worldwide who
        <br /> automate their work using Zapss.
      </h2>
      <p className="text-md mt-2 ">
        Zapss is a no-code platform for building workflows
      </p>
      <div className="w-full flex justify-center">
        <AuthForm type={"signup"} />
      </div>
    </>
  );
};

export default page;
