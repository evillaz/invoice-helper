import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import TableHeader from '../common/TableHeader';
import { saveSaleToDB } from '../../redux/salesSlice';
import ShowDetailsButton from '../common/ShowDetailsButton';
import MotorycleDetails from '../motorcycles/MotorcycleDetails';

const NewSalesTable = () => {
  const motorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const { status } = useSelector((state) => state.sales);
  const customers = useSelector((state) => state.customers.customers);

  const [salesData, setSalesData] = useState({});
  const [showMotoDetails, setShowMotoDetails] = useState(false);
  const dispatch = useDispatch();

  const baseMotoHeader = ['Factura', 'Modelo', 'Numero de Chasis', 'Numero de Motor'];
  const expandedMotoHeader = ['Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const customerHeader = ['DNI', 'NOMBRE', 'DIRECCION'];
  const baseHeader = [...baseMotoHeader, ...customerHeader, 'Monto', 'IGV'];
  const expandedHeader = [...expandedMotoHeader, customerHeader];

  // === Update local sale status whenever Redux status changes ===
  useEffect(() => {
    if (!status) return;

    setSalesData((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((moto) => {
        updated[moto] = {
          ...updated[moto],
          status,
        };
      });
      return updated;
    });
  }, [status]);

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
    // no manual status update here — handled automatically by the useEffect
    console.log('Sale dispatched:', salesData[moto]);
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
              {/* motorcycle.sale && (
                  <>
                    <td>
                      {motorcycle.sale.customer?.nombre}
                      {' '}
                      {motorcycle.sale.customer?.primerApellido}
                      {' '}
                      {motorcycle.sale.customer?.segundoApellido}
                    </td>
                    <td>
                      <span>
                        {motorcycle.sale.total_amount}
                      </span>
                    </td>
                    <td>
                      <span className="createdSale">VENTA CREADA</span>
                    </td>
                  </>
                )
              */}
              {salesData[motorcycle.factura] ? (
                <>
                  <td>
                    {salesData[motorcycle.factura].customer?.nombre}
                    {' '}
                    {salesData[motorcycle.factura].customer?.primerApellido}
                    {' '}
                    {salesData[motorcycle.factura].customer?.segundoApellido}
                  </td>

                  {salesData[motorcycle.factura].status
                  === 'sale created succesfully' ? (
                    <>
                      <td>
                        <span>
                          {salesData[motorcycle.factura].total_amount}
                        </span>
                      </td>
                      <td>
                        <span className="createdSale">VENTA CREADA</span>
                      </td>
                    </>
                    ) : (
                      <>
                        <td>
                          <input
                            type="number"
                            placeholder="Monto"
                            onBlur={(e) => handleAmountChange(motorcycle.factura, e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleCreateSale(motorcycle.factura)}
                          >
                            Crear Venta
                          </button>
                        </td>
                      </>
                    )}
                </>
              ) : (
                <>
                  <td>
                    <select
                      onChange={(e) => handleCustomerChange(motorcycle.factura, e.target.value)}
                    >
                      <option value="">Seleccionar cliente</option>
                      {customers.map((customer) => (
                        <option key={customer.dni} value={customer.dni}>
                          {customer.primerApellido}
                          {' '}
                          {customer.segundoApellido}
                          {' '}
                          {customer.nombre}
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
                    <button
                      type="button"
                      onClick={() => handleCreateSale(motorcycle.factura)}
                    >
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
