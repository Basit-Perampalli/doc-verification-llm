import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';

function PersonalDetails() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    aadhar_number: '',
    gender: 'male',
    mobile_number: '',
    marks: '',
    aadhar: null,
    pancard: null,
    gate_scorecard: null,
  });

  const [fileVerified, setFileVerified] = useState({
    aadhar: false,
    pancard: false,
    gate_scorecard: false,
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
      [field]: !!file, // Mark as verified if a file is selected
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log('Form Data Submitted:', formData);
  };

  const handleAadhaarVerify = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if(formData.name){
      alert("Fill all details")
    }
    const res = fetch("localhost:8000/verify/aadhar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:formData.name,dob:formData.dob,aadhar_number:formData.aadhar_number,aadhar:formData.aadhar}),
    });
  };

  const handlePanVerify = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
  };

  const handleGateVerify = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
  };


  return (
    <div className="p-8 border-2 border-gray-300 rounded-lg shadow-md bg-gray-800 text-white">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-lg font-medium">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-medium">Date of Birth</span>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email"
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-medium">Aadhar Number</span>
          <input
            type="text"
            name="aadhar_number"
            value={formData.aadhar_number}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Aadhar number"
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-medium">Gender</span>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-lg font-medium">Mobile Number</span>
          <input
            type="tel"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter mobile number"
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-medium">Marks</span>
          <input
            type="text"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter marks"
          />
        </label>

        {/* File Uploads with Verify Button */}
        <div className="mb-6">
          <FileUpload name="aadhar" file={formData.aadhar} onFileChange={handleFileChange} />
          <button
            type="button"
            onClick={handleAadhaarVerify}
            disabled={!fileVerified.aadhar}
            className="mt-2 ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-500 transition duration-200"
          >
            Verify
          </button>
        </div>

        <div className="mb-6">
          <FileUpload name="pancard" file={formData.pancard} onFileChange={handleFileChange} />
          <button
            type="button"
            onClick={handlePanVerify}
            disabled={!fileVerified.pancard}
            className="mt-2 ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-500 transition duration-200"
          >
            Verify
          </button>
        </div>

        <div className="mb-6">
          <FileUpload name="gate_scorecard" file={formData.gate_scorecard} onFileChange={handleFileChange} />
          <button
            type="button"
            onClick={handleGateVerify}
            disabled={!fileVerified.gate_scorecard}
            className="mt-2 ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-500 transition duration-200"
          >
            Verify
          </button>
        </div>

        <Button text="Submit" type="submit" className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200" />
      </form>
    </div>
  );
}

export default PersonalDetails;
