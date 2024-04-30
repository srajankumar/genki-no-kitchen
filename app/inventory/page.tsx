"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust the path based on your project structure

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
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Condition: {item.condition}</p>
            <p>Shelf Life: {item.shelf_life}</p>
            <p>Ingredients: {item.ingredients}</p>
            <p>Item Validity: {item.item_validity}</p>
            <p>Barcode Number: {item.barcode_number}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
            <p>User ID: {item.user_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
