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
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Data from Supabase</h1>
      <ul className="list-none mb-4 gap-5 flex flex-col">
        {data.map((item, index) => (
          <div key={index} className="border">
            <p>
              <strong>ID:</strong> {item.id}
            </p>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul>
              {JSON.parse(item.ingredients).map(
                (ingredient: string, i: number) => (
                  <li key={i}>{ingredient}</li>
                )
              )}
            </ul>
            <p>
              <strong>Instructions:</strong>
            </p>
            <ol>
              {JSON.parse(item.instructions).map(
                (instruction: string, i: number) => (
                  <li key={i}>{instruction}</li>
                )
              )}
            </ol>
            <p>
              <strong>Calories:</strong> {item.calories}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}
