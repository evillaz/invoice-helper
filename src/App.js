import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import XmlConverter from './components/XmlConverter';
import POAGenerator from './components/POAGenerator';
import './styles/style.css';
import { fetchInvoices } from './redux/databaseInvoiceSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);
  const invoices = useSelector((state) => state.databaseInvoices.invoices);
  console.log(invoices);

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
