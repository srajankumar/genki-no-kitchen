"use client";

import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import {
  Barcode,
  File,
  Home,
  PlusCircle,
  ScanBarcode,
  ScanLine,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

const Navbar = () => {
  const path = usePathname();

  const pathname = path;
  return (
    <SignedIn>
      <div className="fixed z-50 bottom-0 md:bg-transparent bg-background w-full flex justify-between items-center md:py-5">
        <div className="flex bg-background md:px-10 px-5 md:pb-3 pb-5 pt-4 shadow-lg md:rounded-full justify-between text-white/50 items-center w-full mx-auto max-w-2xl">
          <Link
            href="/home"
            className={`${
              pathname == "/home" ? "text-white" : ""
            } flex gap-1 justify-center items-center flex-col`}
          >
            <Home className="md:w-6 w-5 md:h-6 h-5" />
            <p className="text-sm">Home</p>
          </Link>
          <Link
            href="/inventory"
            className={`${
              pathname == "/inventory" ? "text-white" : ""
            } flex gap-1 justify-center items-center flex-col`}
          >
            <File className="md:w-6 w-5 md:h-6 h-5" />
            <p className="text-sm">Inventory</p>
          </Link>
          <Link
            href="/recipes"
            className={`${
              pathname == "/recipes" ? "text-white" : ""
            } flex gap-1 justify-center items-center flex-col`}
          >
            <Utensils className="md:w-6 w-5 md:h-6 h-5" />
            <p className="text-sm">Recipes</p>
          </Link>
          <Link
            href="/add"
            className={`${
              pathname == "/add" || pathname == "/add-manual"
                ? "text-white"
                : ""
            } flex gap-1 justify-center items-center flex-col`}
          >
            <PlusCircle className="md:w-6 w-5 md:h-6 h-5" />
            <p className="text-sm">Add Items</p>
          </Link>

          <Dialog>
            <DialogTrigger>
              <div
                className={`${
                  pathname == "/validity" || pathname == "/barcode"
                    ? "text-white"
                    : ""
                } flex gap-1 justify-center items-center flex-col`}
              >
                <ScanBarcode className="md:w-6 w-5 md:h-6 h-5" />
                <p className="text-sm">Scan</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/undraw.svg" alt="undraw" />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="w-full flex gap-3">
                <DialogClose asChild>
                  <Link href="/barcode" className="w-full">
                    <Button className="w-full">
                      <Barcode className="md:w-6 w-5 md:h-6 h-5 pr-1" />
                      Barcode
                    </Button>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href="/validity" className="w-full">
                    <Button className="w-full">
                      <ScanLine className="md:w-6 w-5 md:h-6 h-5 pr-1" />
                      Validity
                    </Button>
                  </Link>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className=" flex gap-0.5 justify-center items-center flex-col">
            <UserButton afterSignOutUrl="/" />
            <p className="text-sm">Profile</p>
          </div>
        </div>
      </div>
    </SignedIn>
  );
};

export default Navbar;
