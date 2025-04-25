import { useSelector, useDispatch } from 'react-redux';
import MotorycleDetails from './MotorcycleDetails';
import DeleteButton from './DeleteButton';
import { deleteSaleFromDB, updateBoleta, updateBoletaValue } from '../redux/salesSlice';
import CopyDescriptionButton from './CopyDescriptionButton';
import TableHeader from './TableHeader';
// import { useState } from 'react';

const SalesTable = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.sales);
  // const [editBoleta, setEditBoleta] = useState(false);
  // const toggleEditBoleta = () => setEditBoleta((prev) => !prev);
  const handleChangeBoleta = (saleId, boletaNumber) => {
    dispatch(updateBoletaValue({
      saleId,
      boleta: `EB01-${boletaNumber}`,
    }));
  };

  const handleSaveBoleta = (sale) => {
    console.log(sale);
    dispatch(updateBoleta(sale));
  };
  const baseMotoHeader = ['Factura', 'Modelo', 'Numero de Chasis', 'Numero de Motor'];
  // const expandedMotoHeader =
  // ['Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const customerHeader = ['DNI', 'NOMBRE', 'DIRECCION'];
  const baseHeader = [...baseMotoHeader, ...customerHeader, 'MONTO', 'BOLETA'];
  // const expandedHeader = [...expandedMotoHeader, customerHeader];

  return (
    <>
      {sales && (
        <table>
          <thead>
            <TableHeader headerData={baseHeader} />
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={`sale ${sale.id}`}>
                <MotorycleDetails motorcycle={sale.motorcycle} />
                <td>
                  {sale.customer.dni}
                </td>
                <td>
                  {sale.customer.nombre}
                  {' '}
                  {sale.customer.primerApellido}
                  {' '}
                  {sale.customer.segundoApellido}
                </td>
                <td>
                  {sale.customer.direccion}
                </td>
                <td>
                  {sale.total_amount}
                </td>
                {/* {sale.boleta ? (
                <>
                  <td>
                    {sale.boleta}
                  </td>
                </>
                ) : ( */}
                <>
                  <td
                    style={{ display: 'flex' }}
                  >
                    <label
                      htmlFor={`boletaId${sale.id}`}
                      style={{ display: 'flex' }}
                    >
                      EB01-
                      <input
                        id={`boletaId${sale.id}`}
                        type="text"
                        onBlur={(e) => handleChangeBoleta(sale.id, e.target.value)}
                        style={{ marginLeft: '4px' }}
                      />
                    </label>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleSaveBoleta(sale)}
                    >
                      AGREGAR BOLETA
                    </button>
                  </td>
                </>
                {/* )} */}
                <CopyDescriptionButton motorcycle={sale.motorcycle} />
                <DeleteButton deleteFunc={deleteSaleFromDB} item={sale} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SalesTable;
