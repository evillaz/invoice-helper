import { useSelector } from 'react-redux';
import TableHeader from './TableHeader';
// import { useState } from 'react';
import SaleItem from './SaleItem';

const SalesTable = () => {
  const sales = useSelector((state) => state.sales.sales);
  // const [editBoleta, setEditBoleta] = useState(false);
  // const toggleEditBoleta = () => setEditBoleta((prev) => !prev);

  const baseMotoHeader = ['Estado', 'Factura', 'Modelo', 'Numero de Chasis', 'Numero de Motor'];
  // const expandedMotoHeader =
  // ['Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const customerHeader = ['DNI', 'NOMBRE', 'DIRECCION'];
  const baseHeader = [...baseMotoHeader, ...customerHeader, 'MONTO', 'IGV', 'FECHA EMISION', 'BOLETA'];
  // const expandedHeader = [...expandedMotoHeader, customerHeader];
  console.log(sales);

  return (
    <>
      {sales && (
        <table>
          <thead>
            <TableHeader headerData={baseHeader} />
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={`sale ${sale.id}`} id={`sale ${sale.id}`}>
                <SaleItem sale={sale} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SalesTable;
