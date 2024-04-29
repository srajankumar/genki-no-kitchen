import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 min-h-[100dvh]">
      <div>
        <div className="text-5xl font-semibold">Recimake</div>
      </div>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="w-full">Get Started</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard">
          <Button className="w-full">Go to dashboard</Button>
        </Link>
      </SignedIn>
    </div>
  );
};

export default page;
