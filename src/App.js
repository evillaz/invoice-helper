import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './styles/style.css';
import { fetchMotorcycles, clearMessage } from './redux/motorcyclesSlice';
import Layout from './components/Layout';
import Motorcycles from './routes/Motorcycles';
import Customers from './routes/Customers';
import { fetchCustomers } from './redux/customersSlice';

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.motorcycles);

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Motorcycles />} />
          <Route path="/clientes" element={<Customers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
