// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust the path based on your project structure
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const supabase = createClient(); // Initialize Supabase client
      const { data: records, error } = await supabase
        .from("recipe")
        .select("*"); // Replace 'your_table_name' with your actual table name
      if (error) {
        throw error;
      }
      setData(records || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="mx-auto p-5 pt-20 pb-40">
      <h1 className="text-3xl z-20 font-semibold mb-10 text-center">
        Generated Recipes
      </h1>
      <ul className="grid z020 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {data.map((item, index) => {
          const name = item.name.replace(/"/g, "");
          return (
            <AlertDialog key={index}>
              <AlertDialogTrigger>
                <Card className="hover:scale-[102%] border hover:border-green-500 transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-start">{name}</CardTitle>
                  </CardHeader>
                  {/* <CardContent>
                    <p>Card Content</p>
                  </CardContent> */}
                  <CardFooter>
                    <p>{item.calories} Calories</p>
                  </CardFooter>
                </Card>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <ScrollArea className="h-[600px] w-full">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                      {name}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="text-left text-lg">
                        <p className="py-3">
                          <strong>ID:</strong> {item.id}
                        </p>
                        <p className="pb-1">
                          <strong>Ingredients:</strong>
                        </p>
                        <ul>
                          {JSON.parse(item.ingredients).map(
                            (ingredient: string, i: number) => (
                              <li className="list-disc ml-4" key={i}>
                                {ingredient}
                              </li>
                            )
                          )}
                        </ul>
                        <p className="pt-5 pb-1">
                          <strong>Instructions:</strong>
                        </p>
                        <ol>
                          {JSON.parse(item.instructions).map(
                            (instruction: string, i: number) => (
                              <li className="list-disc ml-4" key={i}>
                                {instruction}
                              </li>
                            )
                          )}
                        </ol>
                        <p className="pt-5 pb-1">
                          <strong>Calories:</strong> {item.calories}
                        </p>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </ScrollArea>
              </AlertDialogContent>
            </AlertDialog>
          );
        })}
      </ul>
    </div>
  );
}
