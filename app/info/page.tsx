"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@/utils/supabase/client";
import { ClerkProvider, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Info = () => {
  const { userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  // State variables to store input field values
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const createUser = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase
      .from("user")
      .insert({ user_id: userId, name, age, allergies });
    setIsLoading(false);
    setName("");
    setAge("");
    setAllergies("");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-[100dvh] justify-center items-center">
      <div>
        <h2 className="flex flex-col gap-2 mb-4">
          {/* <div>
            Hello, {userId}, your current active session is {sessionId}
          </div> */}
          <h1 className="text-3xl font-semibold">
            Hello, {user.firstName} {user.lastName}
          </h1>
          <p className="text-white/50">Add your information</p>
        </h2>
        <div className="flex justify-center items-center flex-col gap-3 w-80">
          <Input
            disabled={isLoading}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            disabled={isLoading}
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            disabled={isLoading}
            type="text"
            placeholder="Allergies, if any"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
          <Button disabled={isLoading} className="w-full" onClick={createUser}>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}{" "}
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
