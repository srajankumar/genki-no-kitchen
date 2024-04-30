import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { Terminal, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <div className="w-screen overflow-hidden md:h-40 h-96 z-10 top-0 left-0 relative">
        <img
          src="/cover_img.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      <div className="absolute z-20 flex top-0 left-0 min-h-screen justify-center items-center flex-col w-full ">
        <h1 className="text-center font-semibold md:text-6xl text-5xl md:pt-10">
          Recimake
        </h1>
        <div className="flex flex-col gap-5 justify-center items-center mt-10">
          <Link href="/inventory">
            <Button className="w-96">Inventory</Button>
          </Link>
          <Link href="/scan/unpackaged">
            <Button className="w-96">Add Items</Button>
          </Link>
        </div>
        <div className="px-4 w-full flex pt-14 justify-center items-center">
          <Alert className="max-w-2xl">
            <Sun className="h-4 w-4 text-yellow-400" />
            <AlertTitle>Good Morning!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default page;
