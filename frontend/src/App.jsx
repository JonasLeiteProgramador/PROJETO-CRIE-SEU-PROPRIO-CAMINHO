import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './root.css';
import HomePage from './screen/home/home';
import ProjectForm from './screen/forms/forms';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/criar-projeto" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;
