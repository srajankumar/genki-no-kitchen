import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh] px-5 max-w-7xl mx-auto">
      <div className="flex items-center min-h-[100dvh] justify-center py-12">
        <div className="mx-auto grid w-[500px] gap-6">
          <SignIn path="/sign-in" />
        </div>
      </div>
      <div className="hidden lg:flex mx-auto">
        <Image
          src="/assets/images/auth/sign-in.svg"
          alt="Image"
          width="500"
          height="500"
          className="h-full w-[35rem]"
        />
      </div>
    </div>
  );
}
