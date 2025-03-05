import React from 'react';
import { Routes, Route } from 'react-router-dom';
import XmlConverter from './components/XmlConverter';
import './styles/style.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<XmlConverter />}/>
      </Routes>
    </>
  );
}

export default App;