"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!image) {
      toast({
        title: "Please select an image file",
        variant: "destructive",
      });
      setIsLoading(false);
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

      // const supabase = createClient();
      // // Assuming you have a table named 'user_data' with a column 'json_data'
      // const { data, error } = await supabase
      //   .from("item")
      //   .insert([{ barcode_data: jsonData["barcode_data"] }]);
      // if (error) {
      //   console.error("Supabase insertion error:", error.message);
      // } else {
      //   console.log("Data inserted successfully:", data);
      // }
      toast({
        title: "Scan Successful",
        variant: "success",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!image) {
      setJsonData(null);
      setDescription("");
    }
  }, [image]);

  return (
    <div className="flex min-h-[100dvh] pb-10 justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col gap-3 w-80">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-semibold">Scan Barcode</h1>
          <p className="text-sm text-white/50 pb-3">
            Scan the barcode shown in the packet
          </p>
        </div>
        {imagePreview ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-full h-64 rounded-lg object-cover"
            />
            <input
              disabled={isLoading}
              id="dropzone-file"
              className="hidden"
              type="file"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white/10 hover:bg-white/15 transition-all duration-200">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-300">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              disabled={isLoading}
              id="dropzone-file"
              className="hidden"
              type="file"
              onChange={handleImageChange}
            />
          </label>
        )}
        <div className="w-full flex mt-2 gap-3">
          <Button
            disabled={isLoading}
            className="w-full"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
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
                Scanning
              </div>
            ) : (
              "Scan Barcode"
            )}
          </Button>
          {jsonData && (
            <Dialog>
              <DialogTrigger>
                <div className="w-full bg-green-500 font-medium py-2.5 px-5 rounded-md hover:bg-green-600 hover:scale-[102%] transition-all duration-200 text-sm text-background">
                  Result
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    {jsonData && (
                      <div className="text-white">
                        <h2 className="text-lg font-bold mb-2">
                          Barcode Data:
                        </h2>
                        <p className="tracking-wider">
                          {jsonData["barcode_data"]}
                        </p>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {/* {description && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Description:</h2>
          <pre className="text-sm">{description}</pre>
        </div>
      )} */}
    </div>
  );
}

export default App;
