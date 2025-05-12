import axios from "axios";
import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:6200/admin/upload", // Make sure the endpoint matches
        formData,
        {
          // You do not need to manually set the 'Content-Type' header
          // axios will automatically set it to 'multipart/form-data' when sending FormData
        }
      );

      const key = res.data.key;

      const imageRes = await axios.get(
        `http://localhost:6200/admin/image/${key}`
      );
      setUploadedUrl(imageRes.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div className="primaryNav">
        <p>Dashboard</p>
        <p className="">Logged in as:</p>
      </div>
      <div className="p-5">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadedUrl && <img src={uploadedUrl} alt="Uploaded" width={300} />}
      </div>
    </div>
  );
};

export default Dashboard;
