import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalDetails from './pages/PersonalDetails';
import NavBar from './components/NavBar';
import BatchUpload from './pages/BatchUpload';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="max-w-screen-xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<PersonalDetails />} />
          <Route path="/batchupload/" element={<BatchUpload/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
