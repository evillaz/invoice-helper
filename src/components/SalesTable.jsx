import { useSelector } from 'react-redux';
import MotorycleDetails from './MotorcycleDetails';
import DeleteButton from './DeleteButton';
import { deleteSaleFromDB } from '../redux/salesSlice';

const SalesTable = () => {
  const sales = useSelector((state) => state.sales.sales);

  return (
    <>
      {sales && (
        sales.map((sale) => (
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
            <DeleteButton deleteFunc={deleteSaleFromDB} itemId={sale.id} />
          </tr>
        ))
      )}
    </>
  );
};

export default SalesTable;
