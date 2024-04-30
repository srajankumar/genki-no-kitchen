// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import React from "react";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

// const page = () => {
//   return (
//     <div className="flex justify-center items-center flex-col gap-3 min-h-[100dvh]">
//       <div>
//         <div className="text-5xl font-semibold">Recimake</div>
//       </div>
//       <SignedOut>
//         <Link href="/sign-in">
//           <Button className="w-full">Get Started</Button>
//         </Link>
//       </SignedOut>
//       <SignedIn>
//         <Link href="/dashboard">
//           <Button className="w-full">Go to dashboard</Button>
//         </Link>
//       </SignedIn>
//     </div>
//   );
// };

// export default page;

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Terminal, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <div className="w-screen overflow-hidden md:h-96 h-96 z-10 top-0 left-0 relative">
        <img
          src="/cover_img.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      <div className="absolute z-20 flex top-0 left-0 min-h-screen justify-center items-center flex-col w-full ">
        <h1 className="text-center font-semibold md:text-6xl text-5xl md:pt-10">
          元気の
        </h1>
        <p className="pt-1 text-white/50">Genki no kitchen</p>
        <SignedOut>
          <Link href="/sign-in" className="mt-10">
            <Button className="w-full">Get Started</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col gap-5 justify-center items-center mt-10">
            <Link href="/inventory">
              <Button className="md:w-96 w-80">Inventory</Button>
            </Link>
            <Link href="/scan/unpackaged">
              <Button className="md:w-96 w-80">Add Items</Button>
            </Link>
          </div>
          <div className="px-4 w-full flex pt-14 justify-center items-center">
            <Alert className="max-w-2xl">
              <Sun className="h-4 w-4 text-yellow-400" />
              <AlertTitle>Good Morning!</AlertTitle>
              <AlertDescription>
                You can add components and dependencies to your app using the
                cli.
              </AlertDescription>
            </Alert>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default page;
