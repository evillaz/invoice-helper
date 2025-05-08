import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import TableHeader from './TableHeader';
import { saveSaleToDB } from '../redux/salesSlice';
import ShowDetailsButton from './ShowDetailsButton';
import MotorycleDetails from './MotorcycleDetails';
import SaleDetails from './SaleDetails';

const NewSalesTable = () => {
  const motorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [showMotoDetails, setShowMotoDetails] = useState(false);
  const dispatch = useDispatch();
  const baseMotoHeader = ['Factura', 'Modelo', 'Numero de Chasis', 'Numero de Motor'];
  const expandedMotoHeader = ['Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const customerHeader = ['DNI', 'NOMBRE', 'DIRECCION'];
  const baseHeader = [...baseMotoHeader, ...customerHeader, 'Monto', 'IGV'];
  const expandedHeader = [...expandedMotoHeader, customerHeader];

  const customers = useSelector((state) => state.customers.customers);
  const [salesData, setSalesData] = useState({});
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

  return (
    <>
      <ShowDetailsButton showDetails={showMotoDetails} setShowDetails={setShowMotoDetails} />
      <table id="new-sales">
        <thead className="motorcycles-table-header">
          {showMotoDetails ? (
            <TableHeader headerData={expandedHeader} />
          ) : (
            <TableHeader headerData={baseHeader} />
          )}
        </thead>
        <tbody id="new-sales-body">
          {motorcycles.map((motorcycle) => (
            <tr key={`VENTA-${motorcycle.factura}`}>
              <MotorycleDetails motorcycle={motorcycle} />
              {salesData[motorcycle.factura] ? (
                <>
                  <SaleDetails sale={salesData[motorcycle.factura]} />
                </>
              ) : (
                <>
                  <td>
                    <select onChange={
                  (e) => handleCustomerChange(motorcycle.factura, e.target.value)
                }
                    >
                      <option value="">Seleccionar cliente</option>
                      {customers.map((customer) => (
                        <option key={customer.dni} value={customer.dni}>
                          {customer.nombre}
                          {' '}
                          {customer.primerApellido}
                          {' '}
                          {customer.segundoApellido}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Monto"
                      onBlur={(e) => handleAmountChange(motorcycle.factura, e.target.value)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleCreateSale(motorcycle.factura)}>
                      Crear Venta
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NewSalesTable;
