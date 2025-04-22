import { useSelector } from 'react-redux';
import MotorycleDetails from './MotorcycleDetails';

const SalesTable = () => {
  const sales = useSelector((state) => state.sales.sales);
  console.log(sales);

  return (
    <>
      {sales && (
        sales.map((sale) => (
          <tr key={`sale ${sale.id}`}>
            <MotorycleDetails motorcycle={sale.motorcycle} showDetails />
            <td>
              {sale.customer.dni}
            </td>
            <td>
              {sale.total_amount}
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default SalesTable;
