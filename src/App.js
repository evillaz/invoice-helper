import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import XmlConverter from './components/XmlConverter';
import POAGenerator from './components/POAGenerator';
import './styles/style.css';
import { fetchInvoices, clearMessage } from './redux/invoicesSlice';

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices());
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
        <Route path="/poaGenerator" element={<POAGenerator />} />
      </Routes>
    </>
  );
}

export default App;
