import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import InvoiceItem from './InvoiceItem';

const InvoicesTable = ({ invoices }) => {
  const head = ['Select', 'Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
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
      <table ref={tableRef} className="invoices-table">
        <thead className="invoices-table-header">
          <tr>
            {head.map((title) => (
              <th className={title} key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="invoices-list">
          {invoices.map((invoice) => (
            <InvoiceItem invoice={invoice} key={invoice[0]['cbc:ID']} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

InvoicesTable.propTypes = {
  invoices: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        'cbc:ID': PropTypes.string.isRequired,
        'cdc:Value': PropTypes.string,
      }),
    ),
  ).isRequired,
};

export default InvoicesTable;
