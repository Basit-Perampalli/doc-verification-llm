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
      [field]: !!file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  const handleAadhaarVerify = (e) => {
    e.preventDefault();
    console.log('Aadhar verification triggered.');
  };

  const handlePanVerify = (e) => {
    e.preventDefault();
    console.log('PAN verification triggered.');
  };

  const handleGateVerify = (e) => {
    e.preventDefault();
    console.log('GATE Scorecard verification triggered.');
  };

  return (
    <div className="p-10 max-w-5xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Details</h2>
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

            <label className="block">
              <span className="text-gray-600">Gender</span>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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

            <label className="block col-span-2">
              <span className="text-gray-600">Marks</span>
              <input
                type="text"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter marks"
              />
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Document Uploads</h2>
          <div className="space-y-6">
          <div className='grid grid-cols-2 gap-6'>
              <FileUpload name="aadhar" file={formData.aadhar} onFileChange={handleFileChange} />
              <button
                type="button"
                onClick={handleAadhaarVerify}
                disabled={!fileVerified.aadhar}
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                Verify Aadhar
              </button>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <FileUpload name="pancard" file={formData.pancard} onFileChange={handleFileChange} />
              <button
                type="button"
                onClick={handlePanVerify}
                disabled={!fileVerified.pancard}
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                Verify Pan Card
              </button>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <FileUpload name="gate_scorecard" file={formData.gate_scorecard} onFileChange={handleFileChange} />
              <button
                type="button"
                onClick={handleGateVerify}
                disabled={!fileVerified.gate_scorecard}
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                Verify GATE Scorecard
              </button>
            </div>
          </div>
        </div>

        <Button
          text="Submit"
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </form>
    </div>
  );
}

export default PersonalDetails;