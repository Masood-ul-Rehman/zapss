"use server";
import { signIn } from "@/auth";

const credentialLoginAction = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result.error) {
      console.log(result.error);
    } else {
      console.log("logged in");
    }
  } catch (error) {
    console.log(error);
  }
};
export default credentialLoginAction;
