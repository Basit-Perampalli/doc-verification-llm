import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalDetails from './pages/PersonalDetails';

function App() {
  return (
    <Router>
      <div className="App text-center max-w-screen-xl mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-8">Job Application Form</h1>
        <Routes>
          <Route path="/" element={<PersonalDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
