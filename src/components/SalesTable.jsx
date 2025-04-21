import { useSelector } from 'react-redux';

const SalesTable = () => {
  const sales = useSelector((state) => state.sales.sales);
  console.log(sales);
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  return (
    <>
      {sales && (
        sales.map((sale) => (
          <tr key={sale.factura}>
            <td>{sale.factura}</td>
            <td>
              {sale.dni}
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
