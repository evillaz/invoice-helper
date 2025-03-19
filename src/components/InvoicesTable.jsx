import React, { useRef } from "react";

const InvoicesTable = ({ invoices, onDelete, selectedInvoices, onSelectInvoice }) => {
  const head = ['Select','Factura','Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  const tableRef = useRef(null);

  const copyTableToClipboard = () => {
    if (!tableRef.current) return;

    let tableText = "";
    const rows = tableRef.current.querySelectorAll("tr");

    rows.forEach((row) => {
      let rowText = [];
      row.querySelectorAll("td:not(:has(input)):not(:has(button))").forEach((cell) => {
        rowText.push(cell.innerText.trim());
      });
      if (rowText.length > 0 && rowText.some((text) => text !== "")) {
        tableText += rowText.join("\t") + "\n";
      }
    });

    navigator.clipboard.writeText(tableText)
      .then(() => alert("Table copied to clipboard!"))
      .catch((err) => console.error("Failed to copy table:", err));
  };
  
  return (
    <div>
      <button 
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
          {invoices.map((invoice, index) => (
            <tr id={index} key={index} className="invoice-item">
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedInvoices.some((selected) => selected[0]["cbc:ID"] === invoice[0]["cbc:ID"])}
                  onChange={() => onSelectInvoice(invoice[0]["cbc:ID"])
                  }
                />
              </td>
              {invoice.map((item, index) => 
                <td key={index}>
                  {item["cbc:ID"] || item["cdc:Value"]}
                </td>
              )}
              <td className="border px-2 py-1 text-center">
                <button
                    onClick={() => onDelete(invoice[0]["cbc:ID"])}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  )
}

export default InvoicesTable;