import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSaleToDB } from '../redux/salesSlice';
import SalesTable from './SalesTable';
import TableHeader from './TableHeader';
import ShowDetailsButton from './ShowDetailsButton';

const SalesView = () => {
  const dispatch = useDispatch();
  const motorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const customers = useSelector((state) => state.customers.customers);
  const [salesData, setSalesData] = useState({});
  const [showMotoDetails, setShowMotoDetails] = useState(false);
  const noSaleMotorcycles = motorcycles.filter((motorcycle) => motorcycle.sale === null
    || motorcycle.sale === undefined);

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

  const baseMotoHeader = ['Factura', 'Modelo', 'Numero de Chasis', 'Numero de Motor'];
  const expandedMotoHeader = ['Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const customerHeader = ['DNI', 'NOMBRE', 'DIRECCION'];
  const baseHeader = [...baseMotoHeader, ...customerHeader];
  const expandedHeader = [...expandedMotoHeader, customerHeader];
  return (
    <div>
      <ShowDetailsButton showDetails={showMotoDetails} setShowDetails={setShowMotoDetails} />
      <table>
        <thead className="motorcycles-table-header">
          {showMotoDetails ? (
            <TableHeader headerData={expandedHeader} />
          ) : (
            <TableHeader headerData={baseHeader} />
          )}
        </thead>
        <tbody>
          {noSaleMotorcycles.map((motorcycle) => (
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
                  <select onChange={
                    (e) => handleCustomerChange(motorcycle.factura, e.target.value)
                  }
                  >
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
            </tr>
          ))}
        </tbody>
      </table>
      <SalesTable />
    </div>
  );
};

export default SalesView;
