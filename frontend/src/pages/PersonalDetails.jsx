import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Button from "../components/Button";



function PersonalDetails() {
  const [formData, setFormData] = useState({
    //Personal Details
    name: "",
    dob: "",
    email: "",
    mobile_number: "",
    aadhar_number: "",
    aadhar: null,
    aadhar_verified: false,

    //Educational Details
    highest_education: "",
    university_name: "",
    institute_name: "",
    pass_out_date: "",
    roll_number: "",
    cgpa_percentage: "",
    xMarksheet: null,
    xMarksheet_verified:false,    // GATE details
    gate_registration_number: '',
    gate_test_paper: '',
    gate_exam_date: '',
    gate_score: '',
    gate_air_rank: '',
    gate_scorecard: null,
  });

  const [fileVerified, setFileVerified] = useState({
    aadhar: -1,
    xMarksheet: -1,
    gate_scorecard: -1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [field]: file,
    });
    setFileVerified({
      ...fileVerified,
      [field]: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const res = await fetch("http://127.0.0.1:8000/applicantform/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    data = await res.json();
    console.log(data);
  };

  const handleAadhaarVerify = async (e) => {
    if (!formData.aadhar || !formData.name || !formData.aadhar_number || formData.aadhar_number.length!==12) {
      alert("Please enter the details before uploading.");
      return;
    }
    const aadhar = new FormData();
    aadhar.append("image", formData.aadhar); // Append the file with the key 'image'

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/verify/upload-image/",
        {
          method: "POST",
          body: aadhar,
        }
      );

      if (response.ok) {
        let data = await response.json();
        console.log("Upload successful. File path:", data.file_path);
        const data_to_verify = {
          name: formData.name,
          dob: formData.dob,
          aadhar_number: formData.aadhar_number,
          aadhar: data.file_path,
        };
        const res = await fetch("http://127.0.0.1:8000/verify/aadhar/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_to_verify),
        });
        data = await res.json();
        if (data.verified === true) {
          setFormData({
            ...formData,
            aadhar: true,
          });
          setFileVerified({ ...fileVerified, aadhar: 1 });
        } else {
          setFileVerified({ ...fileVerified, aadhar: 0 });
        }
        console.log(data);
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleGateVerify = async (e) => {
    if (!formData.gate_scorecard) {
      alert("Please select a file before uploading.");
      return;
    }
    
    const gate = new FormData();
    gate.append("image", formData.gate_scorecard); // Append the file with the key 'image'

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/verify/upload-image/",
        {
          method: "POST",
          body:gate,
        }
      );

      if (response.ok) {
        let data = await response.json();
        const data_to_verify = {
          name: formData.name,
          reg_number: formData.gate_registration_number,
          score : formData.gate_score,
          rank : formData.gate_air_rank,
          gate: data.file_path
        };
        console.log("Upload successful. File path:", data.file_path);
        const res = await fetch("http://127.0.0.1:8000/verify/gate/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_to_verify),
        });
        data = await res.json();
        console.log(data);
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handlexMarkVerify = async (e) => {
    if (!formData.xMarksheet) {
      alert("Please select a file before uploading.");
      return;
    }

    const xmark = new FormData();
    xmark.append("image", formData.xMarksheet); // Append the file with the key 'image'
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/verify/upload-image/",
        {
          method: "POST",
          body: xmark,
        }
      );

      if (response.ok) {
        let data = await response.json();
        const data_to_verify = {
          name: formData.name,
          marks: formData.cgpa_percentage,
          dob: formData.dob,
          sheet: data.file_path,
        };
        console.log("Upload successful. File path:", data.file_path);
        const res = await fetch("http://127.0.0.1:8000/verify/xmark/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_to_verify),
        });
        data = await res.json();
        console.log(data);
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-center text-4xl font-semibold mb-8">
        Job Application Form
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-600">Full Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Date of Birth</span>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Mobile Number</span>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Aadhar Number</span>
              <input
                type="text"
                name="aadhar_number"
                value={formData.aadhar_number}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Aadhar number"
              />
            </label>

            <div className="border mt-4 border-gray-300 rounded-lg p-4 flex items-center space-x-2">
              <FileUpload
                name="aadhar"
                file={formData.aadhar}
                onFileChange={handleFileChange}
              />
              <div>
                {fileVerified.aadhar === -1 ? (
                  <button
                    type="button"
                    onClick={handleAadhaarVerify}
                    disabled={!fileVerified.aadhar}
                    className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                  >
                    Verify Aadhar
                  </button>
                ) : fileVerified.aadhar === 0 ? (
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleAadhaarVerify}
                      className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                    >
                      Verify Again
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="px-2 py-2 bg-green-600 text-white rounded-md focus:outline-none  disabled:bg-gray-400">
                      Verified
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Educational Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-600">Highest Education</span>
              <input
                type="text"
                name="highest_education"
                value={formData.highest_education}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your highest education"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">University Name</span>
              <input
                type="text"
                name="university_name"
                value={formData.university_name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter University Name"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Institute Name</span>
              <input
                type="text"
                name="institute_name"
                value={formData.institute_name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Institute Name"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Passout Year</span>
              <input
                type="text"
                name="pass_out_date"
                value={formData.pass_out_date}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Roll Number</span>
              <input
                type="text"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Roll Number"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">CGPA/Percentage</span>
              <input
                type="text"
                name="cgpa_percentage"
                value={formData.cgpa_percentage}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter CGPA or Percentage"
              />
            </label>

            <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-2">
              <FileUpload
                name="xMarksheet"
                file={formData.xMarksheet}
                onFileChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handlexMarkVerify}
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                Verify Marksheet
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            GATE Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-600">Registration Number</span>
              <input
                type="text"
                name="gate_registration_number"
                value={formData.gate_registration_number}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Registration Number"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Gate Test Paper</span>
              <input
                type="text"
                name="gate_test_paper"
                value={formData.gate_test_paper}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Gate Test Paper"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Exam Date</span>
              <input
                type="date"
                name="gate_exam_date"
                value={formData.gate_exam_date}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Exam Date"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">GATE Score</span>
              <input
                type="text"
                name="gate_score"
                value={formData.gate_score}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter GATE Score"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">GATE AIR Rank</span>
              <input
                type="text"
                name="gate_air_rank"
                value={formData.gate_air_rank}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter GATE AIR Rank"
              />
            </label>

            <div className="border mt-3 border-gray-300 rounded-lg p-4 flex items-center space-x-2">
              <FileUpload
                name="gate_scorecard"
                file={formData.gate_scorecard}
                onFileChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleGateVerify}
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                Verify GATE Scorecard
              </button>
            </div>
          </div>
        </div>

        
        <div className="flex justify-center">
          <Button
            text="Submit"
            type="submit"
            className="w-full max-w-xs py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
