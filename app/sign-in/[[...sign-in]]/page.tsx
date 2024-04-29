// import { SignIn } from "@clerk/nextjs";
// import Image from "next/image";

// export default function Login() {
//   return (
//     <div className="w-full lg:grid lg:grid-cols-2 min-h-[100dvh] px-5 max-w-7xl mx-auto">
//       <div className="flex items-center min-h-[100dvh] justify-center py-12">
//         <div className="mx-auto grid w-[500px] gap-6">
//           <SignIn path="/sign-in" />
//         </div>
//       </div>
//       <div className="hidden lg:flex mx-auto">
//         <img
//           src="/bg29.png"
//           alt="Image"
//           width="500"
//           height="500"
//           className="h-full rotate-90"
//         />
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
          <Image
            quality={100}
            priority
            src="/bg29.png"
            className="bg-black object-center w-full h-full z-20"
            width={500}
            height={500}
            alt="login-image"
          ></Image>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <SignIn path="/sign-in" />
          </div>
        </div>
      </div>
    </>
  );
}
