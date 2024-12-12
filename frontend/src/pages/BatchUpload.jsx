import React, { useEffect, useState } from "react";

const BatchUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [type, setType] = useState(""); // Correct state name for file type

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

  useEffect(() => {
    setInterval(() => {
      const res = fetch("http://127.0.0.1:8000/verify/extractbatchdata/", {
        method: "GET",
      }).then((res) => res.json()).then((data) => console.log(data));
    }, 2000);
  }, [documents]);

  // Function to handle the dropdown change event
  const handleDropdownChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-4xl font-semibold mb-8">Batch Upload</h1>
      <div>
        <h3>Upload Files:</h3>
        <div className="flex space-x-4">
          <input
            type="file"
            multiple
            onChange={(e) => {
              setDocuments(Array.from(e.target.files));
              console.log(Array.from(e.target.files));
            }}
            className="border p-2 rounded"
          />
          <div className="flex items-center">
            <h2 className="mr-2">Select an option:</h2>
            <select value={type} onChange={handleDropdownChange} className="border p-2 rounded">
              <option value="">--Please choose an option--</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="gate">GATE Scorecard</option>
              <option value="caste">Caste</option>
              <option value="marksheet">Marksheet</option>
            </select>
          </div>
        <button
          onClick={handleUpload}
          type="button"
          className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 ml-2"
        >
          Upload
        </button>
        </div>
        <h3 className="mt-4">Selected Files:</h3>
        <div className="flex flex-wrap">
          {documents.map((file, index) => (
            <div key={index} className="mx-2">
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchUpload;
