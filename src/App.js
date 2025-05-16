import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './styles/style.css';
import './styles/documentPreview.css';
import { fetchMotorcycles, clearMessage } from './redux/motorcyclesSlice';
import Layout from './components/Layout';
import Motorcycles from './routes/Motorcycles';
import Customers from './routes/Customers';
import Sales from './routes/Sales';
import { fetchCustomers } from './redux/customersSlice';
import { fetchSales } from './redux/salesSlice';
import NewSalesTable from './components/NewSalesTable';
import SalesTable from './components/SalesTable';
import CartaPoderSUNARP from './components/CartaPoderSUNARP';

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.motorcycles);
  const navBarLinks = {
    motorcycles: { path: '/', text: 'MOTOS' },
    customers: { path: '/clientes', text: 'CLIENTES' },
    sales: { path: '/ventas', text: 'VENTAS' },
  };

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSales());
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
        <Route path="/" element={<Layout links={navBarLinks} />}>
          <Route index element={<Motorcycles />} />
          <Route path="/clientes" element={<Customers />} />
          <Route path="/ventas" element={<Sales />}>
            <Route index element={<SalesTable />} />
            <Route path="/ventas/CartaPoderSUNARP/:id" element={<CartaPoderSUNARP />} />
            <Route path="/ventas/registrar-venta" element={<NewSalesTable />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
