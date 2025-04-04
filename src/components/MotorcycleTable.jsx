import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import MotorcycleItem from './MotorcycleItem';
import TableHeader from './TableHeader';

const MotorcyclesTable = ({ motorcycles }) => {
  const header = ['Select', 'Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const tableRef = useRef(null);

  const copyTableToClipboard = () => {
    if (!tableRef.current) return;

    let tableText = '';
    const rows = tableRef.current.querySelectorAll('tr');

    rows.forEach((row) => {
      const rowText = [];
      row.querySelectorAll('td:not(:has(input)):not(:has(button))').forEach((cell) => {
        rowText.push(cell.innerText.trim());
      });
      if (rowText.length > 0 && rowText.some((text) => text !== '')) {
        tableText += `${rowText.join('\t')}\n`;
      }
    });

    navigator.clipboard.writeText(tableText)
      .then(() => alert('Table copied to clipboard!'))
      .catch((err) => console.error('Failed to copy table:', err));
  };

  return (
    <div>
      <button
        type="button"
        onClick={copyTableToClipboard}
        className="mb-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
      >
        Copy Table
      </button>
      <table ref={tableRef} className="motorcycles-table">
        <thead className="motorcycles-table-header">
          <TableHeader headerData={header} />
        </thead>
        <tbody className="motorcycles-list">
          {motorcycles.map((motorcycle) => (
            <tr id={`${motorcycle.factura}-row`} key={motorcycle.factura} className="motorcycle-item">
              <MotorcycleItem motorcycle={motorcycle} key={`item ${motorcycle.factura}`} />
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
    }),
  ).isRequired,
};

export default MotorcyclesTable;
