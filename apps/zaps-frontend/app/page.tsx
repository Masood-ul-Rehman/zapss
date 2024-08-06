import GoogleLogin from "@/components/google-login";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />

      <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="font-degular font-semibold xl:text-7xl md:text-6xl text-4xl md:mt-32 mt-16  text-black">
          Automate as fast as you can <br className="hidden md:inline" /> type
        </h2>
        <p className="mt-6 md:text-2xl font-medium text-black font-degular">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </p>
        <div className="mt-10 flex justify-center flex-wrap  gap-8">
          <Link href="/auth/signup">
            <Button
              className="text-md  text-white font-bold bg-orange rounded-full w-[270px] h-[48px] px-6 hover:bg-orange hover:text-white"
              variant={"ghost"}
            >
              Start free with email
            </Button>
          </Link>
          <GoogleLogin />
        </div>
        <div className="flex items-center justify-center flex-wrap mt-16 gap-4 ">
          <div className="flex items-center gap-2 ">
            <CheckIcon size={16} />
            <h4 className="font-normal text-sm">
              <span className="font-bold">Free forever </span>for core features
            </h4>
          </div>
          <div className="flex items-center gap-2 ">
            <CheckIcon size={16} />
            <h4 className="font-normal text-sm">
              <span className="font-bold">More apps </span>than any other
              platform
            </h4>
          </div>
          <div className="flex items-center gap-2 ">
            <CheckIcon size={16} />
            <h4 className="font-normal text-sm">
              Cutting-edge
              <span className="font-bold">AI features </span>
              platform
            </h4>
          </div>
        </div>
        <video src="/hero.mp4" autoPlay loop muted className="mt-16" />
      </div>
    </div>
  );
}
