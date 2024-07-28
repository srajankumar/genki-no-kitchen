"use client";
import Features from "@/components/Main/Features";
import Footer from "@/components/Main/Footer";
import GitHubLink from "@/components/Main/GitHubLink";
import Hero from "@/components/Main/Hero";

const page = () => {
  return (
    <div>
      <GitHubLink />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default page;
