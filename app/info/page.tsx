"use client";
// import { useAuth } from "@clerk/nextjs";
// import { createClient } from "@/utils/supabase/client";

// import { ClerkProvider, SignedIn, UserButton, useUser } from "@clerk/nextjs";

// const Info = () => {
//   const { userId, sessionId, getToken } = useAuth();
//   const { isLoaded, isSignedIn, user } = useUser();
//   if (!isLoaded || !isSignedIn) {
//     return null;
//   }

//   const createUser = async () => {
//     const supabase = createClient();
//     await supabase.from("user").insert({ user_id: userId });
//   };
//   return (
//     <div>
//       <div>
//         <h2 className="text-lg">
//           <div>
//             Hello, {userId} your current active session is {sessionId}
//           </div>
//           <div>
//             {user.firstName} {user.lastName}{" "}
//           </div>
//         </h2>
//         <SignedIn>
//           <UserButton afterSignOutUrl="/" />
//         </SignedIn>
//       </div>
//     </div>
//   );
// };

// export default Info;

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@/utils/supabase/client";
import { ClerkProvider, SignedIn, UserButton, useUser } from "@clerk/nextjs";

const Info = () => {
  const { userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const createUser = async () => {
    const supabase = createClient();
    await supabase.from("user").insert({ user_id: userId });
  };

  return (
    <div>
      <div>
        <h2 className="text-lg">
          <div>
            Hello, {userId} your current active session is {sessionId}
          </div>
          <div>
            {user.firstName} {user.lastName}{" "}
          </div>
        </h2>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <button onClick={createUser}>Create User</button>
        </SignedIn>
      </div>
    </div>
  );
};

export default Info;
