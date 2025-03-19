import React from 'react';
import { Routes, Route } from 'react-router-dom';
import XmlConverter from './components/XmlConverter';
import POAGenerator from './components/POAGenerator';
import './styles/style.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<XmlConverter />}/>
        <Route path="/poaGenerator" element={<POAGenerator />} />
      </Routes>
    </>
  );
}

export default App;