"use client";
import { motion, useInView } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: +10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div>
      <div
        className="absolute z-10 inset-0 bg-cover h-80 bg-center"
        style={{ backgroundImage: 'url("/cover_img.jpg")' }}
      />
      <div className="absolute z-20 h-80 inset-0 bg-gradient-to-b from-transparent to-background"></div>
      <div className="flex justify-center py-52 items-center flex-col w-full ">
        <motion.div
          className="z-30"
          initial="hidden"
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
            className="text-center font-semibold md:text-7xl text-6xl md:pt-10"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            元気の
          </motion.h1>
          <motion.p
            className="pt-4 text-white/50 md:text-xl text-lg text-center"
            variants={FADE_UP_ANIMATION_VARIANTS}
          >
            Genki no kitchen
          </motion.p>
        </motion.div>
        <div className="max-w-md px-5 flex z-30 gap-3 justify-center items-center mt-10 w-full">
          <SignedOut>
            <Link href="/sign-in" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/home" className="w-full">
              <Button className="w-full">Dashboard</Button>
            </Link>
          </SignedIn>
          <Link
            href="https://github.com/srajankumar/genki-no-kitchen"
            target="_blank"
            className="w-full"
          >
            <Button className="w-full" variant={"ghost"}>
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
