"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
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
import Navbar from "@/components/Navbar";

export default function ItemPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const supabase = createClient(); // Initialize Supabase client
      const { data, error } = await supabase.from("item").select("*");
      if (error) {
        throw error;
      }
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  return (
    <div className="mx-auto p-5 pt-20 pb-40">
      <div className="fixed z-50 bottom-0 left-0">
        <Navbar />
      </div>
      <h1 className="text-3xl z-20 font-semibold mb-10 text-center">
        Inventory
      </h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map((item: any, key) => (
          <AlertDialog key={key}>
            <AlertDialogTrigger>
              <Card className="hover:scale-[102%] border hover:border-green-500 w-80 transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-xl text-start">
                    {item.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">
                  {item.name}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="text-left text-lg">
                    {item.name && (
                      <p className="pt-3 pb-1">
                        <strong>Name:</strong> {item.name}
                      </p>
                    )}

                    {item.quantity && (
                      <p className="pt-3 pb-1">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    )}

                    {item.condition && (
                      <p className="pb-1">
                        <strong>Item State: </strong>
                        {item.condition}
                      </p>
                    )}

                    {item.shelf_life && (
                      <p className="pb-1">
                        <strong>Shelf Life period: </strong>
                        {item.shelf_life}
                      </p>
                    )}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    </div>
  );
}
