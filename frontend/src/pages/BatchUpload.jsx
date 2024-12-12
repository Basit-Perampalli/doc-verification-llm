import React, { useEffect } from "react";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
const BatchUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [type, settype] = useState("aadhar");
  const types = ["none", "aadhar", "gate", "caste", "marksheet"];
  const handleUpload = () => {
    let updated_doc = documents;
    updated_doc = updated_doc.map(
      (e) => new File([e], `${type}@${e.name}`)
    );
    console.log(updated_doc);

    setDocuments(updated_doc);
    updated_doc.forEach((element) => {
      const doc = new FormData();
      doc.append("image", element);
      fetch("http://127.0.0.1:8000/verify/upload-image/", {
        method: "POST",
        body: doc,
      });
  
    });
  };
  useEffect(()=>{
    setInterval(()=>{
      const res = fetch("http://127.0.0.1:8000/verify/extractbatchdata/", {
        method: "GET",
      }).then((res)=>console.log(res.json()))

    },2000)
  }, documents)
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-4xl font-semibold mb-8">Batch Upload</h1>
      <div>
        <h3>Upload Files :</h3>
        <div>
          <input
            type="file"
            multiple
            onChange={(e) => {
              setDocuments(Array.from(e.target.files));
              console.log(Array.from(e.target.files));
            }}
          />
          <button
            onClick={handleUpload}
            type="button"
            className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            Upload
          </button>
        </div>
        <h3>Selected Files:</h3>
        <div className="flex flex-wrap">
          {documents.map((file, index) => (
            <div key={index} className="mx-2">
              {file.name}
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default BatchUpload;
