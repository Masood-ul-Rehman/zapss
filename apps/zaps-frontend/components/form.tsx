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
const signupForm = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
const loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const AuthForm = ({ type }: { type: string }) => {
  const schema = type == "signup" ? signupForm : loginForm;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  return (
    <div>
      <form>
        <FormProvider {...form}>
          <div className="w-[400px] mt-10">
            {type == "signup" && (
              <div className="space-y-2 text-left mt-4">
                <Label>User name</Label>
                <Input type="name" placeholder="johndoe" className="mt-8 " />
              </div>
            )}
            <div className="space-y-2 text-left mt-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-8 "
              />
            </div>
            <div className="space-y-2 text-left mt-4">
              <Label>Password</Label>
              <PasswordInput
                name="password"
                required
                autoComplete="current-password"
                placeholder="********"
              />
            </div>
            <div className="text-right">
              <Button variant={"link"} size={"sm"} className="p-0" asChild>
                <Link href={"/auth/reset-password"}>Forgot password?</Link>
              </Button>
            </div>
            <Button
              className="mt-4 w-full bg-orange rounded-full text-white font-degular font-semibold text-xl hover:bg-orange/90 hover:text-black"
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
