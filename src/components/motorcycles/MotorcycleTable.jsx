import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import MotorcycleItem from './MotorcycleItem';
import TableHeader from '../common/TableHeader';

const MotorcyclesTable = ({ motorcycles }) => {
  const baseHeader = ['Select', 'Factura', 'Modelo', 'Numero de Chasis', 'Numero de Motor', 'Color', 'DUA'];
  const expandedHeader = ['Select', 'Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año', 'Fecha Emision', 'Importe'];
  const tableRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <div>
      <button
        type="button"
        onClick={toggleDetails}
        className="text-blue-500 hover:underline text-sm"
      >
        {showDetails ? 'Ocultar' : 'Ver más'}
      </button>
      <table ref={tableRef} className="motorcycles-table">
        <thead className="motorcycles-table-header">
          {showDetails ? (
            <TableHeader headerData={expandedHeader} />
          ) : (
            <TableHeader headerData={baseHeader} />
          )}
        </thead>
        <tbody className="motorcycles-list">
          {motorcycles.map((motorcycle) => (
            <tr id={`${motorcycle.factura}-row`} key={`row ${motorcycle.factura}`} className="motorcycle-item">
              <MotorcycleItem motorcycle={motorcycle} key={`item ${motorcycle.factura}`} showDetails={showDetails} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MotorcyclesTable.propTypes = {
  motorcycles: PropTypes.arrayOf(
    PropTypes.shape({
      factura: PropTypes.string.isRequired,
      modelo: PropTypes.string.isRequired,
      marca: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      numero_de_chasis: PropTypes.string.isRequired,
      numero_de_motor: PropTypes.string.isRequired,
      dua: PropTypes.string.isRequired,
      anio: PropTypes.number.isRequired,
      fecha_emision: PropTypes.string,
      importe: PropTypes.number,
    }),
  ).isRequired,
};

export default MotorcyclesTable;
