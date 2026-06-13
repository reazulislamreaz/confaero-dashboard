import React, { useState } from "react";
import { API_BASE_URL } from "../redux/api/baseUrl";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    if (!selectedFile) return alert("Select a file first");
    handleFileUpload(selectedFile);
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${API_BASE_URL}/upload/chat-attachment`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}
