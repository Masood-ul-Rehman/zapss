import GoogleLogin from "@/components/google-login";
import HeaderAuth from "@/components/header/header-auth";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-background h-[100vh]">
      <HeaderAuth type="login" />
      <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-5xl font-degular font-semibold">
          Automate across your teams
        </h2>
        <p className="text-md mt-2 ">
          Zapss is a no-code platform for building workflows
        </p>
        <div className="w-[400px] ">
          <div className="space-y-2 text-left mt-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-8"
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
          <Button className="mt-4 w-full" variant="default">
            Sign In with Email
          </Button>
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-medium">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default page;
