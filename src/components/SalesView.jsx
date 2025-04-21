import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSaleToDB } from '../redux/salesSlice';
import CopyDescriptionButton from './CopyDescriptionButton';
import SalesTable from './SalesTable';

const SalesView = () => {
  const dispatch = useDispatch();
  const motorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const customers = useSelector((state) => state.customers.customers);
  const [salesData, setSalesData] = useState({});
  // const [showMotoDetails, setShowMotoDetails] = useState(false);
  const handleCustomerChange = (motorcycle, dni) => {
    const matchedCustomer = customers.find((cust) => cust.dni === dni);
    setSalesData((prev) => ({
      ...prev,
      [motorcycle]: {
        ...prev[motorcycle],
        factura: motorcycle,
        customer: matchedCustomer,
      },
    }));
  };

  const handleAmountChange = (motorcycle, amount) => {
    setSalesData((prev) => ({
      ...prev,
      [motorcycle]: {
        ...prev[motorcycle],
        total_amount: parseFloat(amount).toFixed(3),
      },
    }));
  };
  const handleCreateSale = (moto) => {
    dispatch(saveSaleToDB(salesData[moto]));
  };

  const getIgvValue = (amount) => {
    const factor = 10 ** 3;
    return Math.ceil((amount / 1.18) * factor) / factor;
  };

  return (
    <table>
      <thead />
      <tbody>
        <SalesTable />
        {motorcycles.map((motorcycle) => (
          <tr key={motorcycle.factura}>
            <td>{motorcycle.factura}</td>
            <td>{motorcycle.modelo}</td>
            <td>{motorcycle.numero_de_chasis}</td>
            {salesData[motorcycle.factura]?.customer ? (
              <>
                <td>
                  <span>
                    {salesData[motorcycle.factura]?.customer.dni}
                  </span>
                </td>
                <td>
                  {salesData[motorcycle.factura]?.customer.nombre}
                  {' '}
                  {salesData[motorcycle.factura]?.customer.primerApellido}
                </td>
              </>
            ) : (
              <td>
                <select onChange={(e) => handleCustomerChange(motorcycle.factura, e.target.value)}>
                  <option value="">Seleccionar cliente</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.dni}>
                      {customer.nombre}
                      {' '}
                      {customer.primerApellido}
                    </option>
                  ))}
                </select>
              </td>
            )}

            {salesData[motorcycle.factura]?.total_amount ? (
              <>
                <td>
                  {salesData[motorcycle.factura]?.total_amount}
                </td>
                <td>
                  {getIgvValue(salesData[motorcycle.factura]?.total_amount)}
                </td>
              </>
            ) : (
              <td>
                <input
                  type="number"
                  placeholder="Monto"
                  onBlur={(e) => handleAmountChange(motorcycle.factura, e.target.value)}
                />
              </td>
            )}
            <td>
              <button type="button" onClick={() => handleCreateSale(motorcycle.factura)}>
                Crear Venta
              </button>
            </td>
            <CopyDescriptionButton motorcycle={motorcycle} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesView;
