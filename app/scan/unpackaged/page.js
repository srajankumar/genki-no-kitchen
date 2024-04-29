"use client";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/describe_vegetable",
        { image: imageUrl }
      );

      setDescription(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Enter Image URL</h1>
      <input type="text" value={imageUrl} onChange={handleUrlChange} />
      <button onClick={handleSubmit}>Submit</button>
      {description && (
        <div>
          <h2>Description:</h2>
          <pre>{description}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
