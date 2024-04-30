"use client";

import { File, Home, PlusCircle, ScanBarcode, Utensils } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  const pathname = path;
  return (
    <div className="fixed z-50 bg-gradient-to-t from-background to-transparent bottom-0 w-full flex justify-between items-center py-5 px-5">
      <div className="flex justify-between text-white/50 items-center w-full mx-auto max-w-xl">
        <Link
          href="/"
          className={`${
            pathname == "/" ? "text-white" : ""
          } flex gap-1 justify-center items-center flex-col`}
        >
          <Home className="w-6 h-6" />
          <p className="text-sm">Home</p>
        </Link>
        <Link
          href="/inventory"
          className={`${
            pathname == "/inventory" ? "text-white" : ""
          } flex gap-1 justify-center items-center flex-col`}
        >
          <File className="w-6 h-6" />
          <p className="text-sm">Inventory</p>
        </Link>
        <Link
          href="/recipes"
          className={`${
            pathname == "/recipes" ? "text-white" : ""
          } flex gap-1 justify-center items-center flex-col`}
        >
          <Utensils className="w-6 h-6" />
          <p className="text-sm">Recipes</p>
        </Link>
        <Link
          href="/scan/unpackaged"
          className={`${
            pathname == "/scan/unpackaged" ? "text-white" : ""
          } flex gap-1 justify-center items-center flex-col`}
        >
          <PlusCircle className="w-6 h-6" />
          <p className="text-sm">Add Items</p>
        </Link>
        <Link
          href="/scan/packaged"
          className={`${
            pathname == "/scan/packaged" ? "text-white" : ""
          } flex gap-1 justify-center items-center flex-col`}
        >
          <ScanBarcode className="w-6 h-6" />
          <p className="text-sm">Barcode</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
