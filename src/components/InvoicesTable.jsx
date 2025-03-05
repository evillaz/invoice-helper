const InvoicesTable = ({ invoices }) => {
  const head = ['Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];
  return (
    <table className="invoices-table">
      <thead className="invoices-table-header">
        <tr>
          {head.map((title) => (
            <th className={title} key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody className="invoices-list">
        {invoices.map((invoice, index) => (
          <tr key={index} className="invoice-item">
            {invoice.map((item, index) => 
              <td key={index}>
                {item["cdc:Value"]}
              </td>
            )}
          </tr>
        ))}
      </tbody>
  </table>
  )
}

export default InvoicesTable;