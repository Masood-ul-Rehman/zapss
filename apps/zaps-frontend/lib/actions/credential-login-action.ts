"use server";
import { signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

const credentialLoginAction = async (data: {
  email: string;
  password: string;
}) => {
  await signIn(
    "credentials",
    {
      data: { email: data.email, password: data.password },
    },
    { redirect: "/dashboard" }
  );
};
export default credentialLoginAction;
