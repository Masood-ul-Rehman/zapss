"use client";

import React from "react";
import GoogleLogin from "@/components/google-login";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { db } from "../../../packages/db";
import { saltAndHashPassword } from "@/lib/utils";
import { FormField } from "./ui/form";
import credentialLoginAction from "@/lib/actions/credential-login-action";
import { eq } from "drizzle-orm";
import { users } from "../../../packages/db/schema";
const signupFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type SignupFormValues = z.infer<typeof signupFormSchema>;
type LoginFormValues = z.infer<typeof loginFormSchema>;
type FormValues = SignupFormValues | LoginFormValues;

const AuthForm = ({ type }: { type: "signup" | "login" }) => {
  const schema = type === "signup" ? signupFormSchema : loginFormSchema;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  const onSubmit = async (data: FormValues) => {
    if (type == "signup") {
      let formData = data as SignupFormValues;
      if (!formData.email || !formData.password) {
        return;
      }
      try {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, formData.email),
        });
        console.log(existingUser);
        if (existingUser) {
          return;
        }
        const hashedPassword = saltAndHashPassword(formData.password);
        console.log(hashedPassword);
        await db.insert(users).values({
          name: formData.name,
          email: formData.email,
          password: hashedPassword,
          image: "",
          emailVerified: false,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (type == "login") {
      credentialLoginAction({ email: data.email, password: data.password });
    }
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <div className="w-[400px] mt-10">
            {type == "signup" && (
              <div className="space-y-2 text-left mt-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2 text-left mt-4">
                      <Label>Full name</Label>
                      <Input
                        type="name"
                        placeholder="johndoe"
                        className="mt-8 "
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>
            )}
            <div className="space-y-2 text-left mt-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2 text-left mt-4">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      className="mt-8 "
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="space-y-2 text-left mt-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2 text-left mt-4">
                    <Label>Password</Label>
                    <PasswordInput
                      required
                      autoComplete="current-password"
                      placeholder="********"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="text-right">
              <Button variant={"link"} size={"sm"} className="p-0" asChild>
                <Link href={"/auth/reset-password"}>Forgot password?</Link>
              </Button>
            </div>
            <Button
              className="mt-4 w-full bg-orange rounded-full text-white font-degular font-semibold text-xl hover:bg-orange/90 hover:text-black"
              type="submit"
              // variant="ghost"
            >
              Continue
            </Button>
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-medium">
                  OR
                </span>
              </div>
            </div>
          </div>
        </FormProvider>
      </form>
      <div className="mt-8 flex justify-center w-full">
        <GoogleLogin text="Continue with Google" width="w-[400px]" />
      </div>
    </div>
  );
};

export default AuthForm;
