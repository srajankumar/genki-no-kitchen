import React from "react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

const GitHubLogo = () => {
  return (
    <div className="fixed top-5 right-5 z-50">
      <Link
        href="https://github.com/srajankumar/genki-no-kitchen"
        target="_blank"
      >
        <Button size={"icon"} variant={"outline"}>
          <Github />
        </Button>
      </Link>
    </div>
  );
};

export default GitHubLogo;
