"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [jsonData, setJsonData] = useState(null); // Use null to avoid empty object
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "http://localhost:5001/read_barcode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const jsonData = response.data;
      setJsonData(jsonData);
      setDescription(JSON.stringify(jsonData));

      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("user")
        .insert({ barcode_number: jsonData });
      if (error) {
        console.error("Supabase insertion error:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  // Clear data when there's no image selected (optional)
  useEffect(() => {
    if (!image) {
      setJsonData(null);
      setDescription("");
    }
  }, [image]);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Upload Image</h1>
      <div className="flex flex-col md:flex-row items-center mb-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full md:w-1/2 xl:w-1/3 px-4 py-2 text-lg"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      {description && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Description:</h2>
          <pre className="text-sm">{description}</pre>
        </div>
      )}
      {jsonData && ( // Only display JSON data if it exists
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">JSON Data:</h2>
          <pre className="text-sm">{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
