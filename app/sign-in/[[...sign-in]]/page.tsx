import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Login() {
  return (
    <div className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
        <Image
          quality={100}
          priority
          src="/main.jpg"
          className="bg-black object-center w-full h-[100dvh] z-20"
          width={500}
          height={500}
          alt="login-image"
        ></Image>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 md:w-[350px]">
          <SignIn path="/sign-in" />
        </div>
      </div>
    </div>
  );
}
