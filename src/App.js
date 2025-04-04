import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import XmlConverter from './components/XmlConverter';
import './styles/style.css';
import { fetchMotorcycles, clearMessage } from './redux/motorcyclesSlice';

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.motorcycles);

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      alert(message); // Example: Show an alert
      dispatch(clearMessage()); // Clear after showing
    }
  }, [message, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<XmlConverter />} />
      </Routes>
    </>
  );
}

export default App;
