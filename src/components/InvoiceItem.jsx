const InvoiceItem = ({  data  } ) => {
  if (!data || data.length === 0) return <p>No filtered data available.</p>;

  return (
    <tr className="invoice-item">
      {data.map((item, index) => 
        <td key={index}>
          {item["cdc:Value"]}
        </td>
      )}
    </tr>
    /*<div className="bg-gray-100 p-2 mt-3 rounded text-sm">
      <h3 className="font-semibold">Filtered Data:</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>ID {item["cdc:ID"]}:</strong> {item["cdc:Value"]}
          </li>
        ))}
      </ul>
    </div>*/
  );
};

export default InvoiceItem;