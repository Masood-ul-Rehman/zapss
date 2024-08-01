"use server";

import { signIn } from "@/auth";

const GoogleLoginAction = async () => {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
};
export default GoogleLoginAction;
