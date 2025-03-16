import React, { useState, useEffect } from "react";
import axios from "axios";
import ContractCard from "./ContractCard";

function Contract() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3000/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsername(response.data.username);
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/documents/${userId}`)
        .then((response) => {
          setUploadedFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("user", userId);

      try {
        const response = await axios.post("http://localhost:3000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setUploadedFiles([...uploadedFiles, response.data.document]);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="p-2">
      <div className="text-center mt-4 text-4xl font-semibold text-emerald-950 underline">
        Bharat<span className="text-zinc-950">Rent</span>
      </div>
      <div className="text-center text-sm mt-4 text-emerald-950">
        Contract Summarisation
      </div>
      <div className="text-center text-sm">
        Store your important contracts and summarise them in a few clicks.
      </div>

      <br />
      <div className="text-xl text-center text-gray-700">
        Welcome, <span className="font-semibold">{username || "User"}</span>
      </div>
      <br />

      <div className="mx-2 text-4xl">Uploaded Files</div>
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-2 bg-gray-100 mt-2 p-2 rounded-lg">
        {loading ? (
          <div className="text-center text-gray-500 col-span-3">Loading files...</div>
        ) : uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <ContractCard key={index} title={file.title} link={file.fileUrl} date={file.date || new Date().toLocaleDateString()} />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-3">No files uploaded yet.</div>
        )}
      </div>

      <br />
      <div className="text-4xl mx-2">Upload a file</div>
      <div className="text-center bg-gray-100 p-4 rounded-lg">
        {uploading ? (
          <div className="text-center text-gray-500">Uploading file...</div>
        ) : (
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}

export default Contract;
