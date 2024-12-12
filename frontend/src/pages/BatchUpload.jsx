import React, { useEffect, useState } from "react";

const BatchUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [type, settype] = useState("");

  const types = ["none", "aadhar", "gate", "caste", "marksheet"];
  const [status, setStatus] = useState(null);

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
    setTimeout(ping(), 2000);
  };
  const ping = ()=>{
      fetch("http://127.0.0.1:8000/verify/batchdata/", {
        method: "GET",
      }).then((res) => {
        return res.json();
      }).then((data) => {
        setStatus(data);
        setTimeout(ping, 2000)
      });
  }
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
          />
          <button
            onClick={handleUpload}
            type="button"
            className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            Upload
          </button>
          <input className="m-3 border border-red" type="text" value={type} onChange={(e) => settype(e.target.value)} />
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
          <div>
            {documents.map((file) => (
              <div key={file.name} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{file.name}
                      </h5>
                  </a>
                  <div href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    extracted data: {status[file.name] ? status[file.name] : "loading..."}
                    time: {status?.timetaken}
                  </div>
              </div>


            ))}  
          </div>

      <div>
        <button onClick={ping}>
          PING
        </button>
      </div>
    </div>
  );
};

export default BatchUpload;
