"use client";
import { motion, useInView } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import FoodFacts from "@/components/FoodFacts";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const page = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div>
      <div className="fixed z-50 bottom-0 left-0">
        <Navbar />
      </div>
      <div
        className="absolute z-10 inset-0 bg-cover h-96 bg-center"
        style={{ backgroundImage: 'url("/cover_img.jpg")' }}
      />
      <div className="absolute z-20 h-96 inset-0 bg-gradient-to-b from-transparent to-background"></div>
      <div className="absolute z-30 flex top-0 left-0 min-h-screen justify-center items-center flex-col w-full ">
        <motion.div
          initial="hidden"
          className="z-30"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h1
            className="text-center font-bold md:text-6xl text-5xl md:pt-10"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            元気の
          </motion.h1>
        </motion.div>
        <p className="pt-1 text-white/50">Genki no kitchen</p>
        <SignedOut>
          <div className="flex flex-col gap-5 justify-center items-center mt-10">
            <Link href="/sign-in" className="mt-10">
              <Button className="md:w-96 w-80">Get Started</Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col gap-5 justify-center items-center mt-10">
            <Link href="/inventory">
              <Button className="md:w-96 w-80">Inventory</Button>
            </Link>
            <Link href="/add">
              <Button className="md:w-96 w-80">Add Items</Button>
            </Link>
          </div>
          <FoodFacts />
        </SignedIn>
      </div>
    </div>
  );
};

export default page;
