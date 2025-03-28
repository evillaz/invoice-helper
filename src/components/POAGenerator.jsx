import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableHeader from './TableHeader';
import InvoiceItem from './InvoiceItem';

const POAGenerator = () => {
  const navigate = useNavigate();
  const selectedInvoices = useSelector((state) => state.xmlInvoices.selectedInvoices);

  const prevData = ['Factura', 'Modelo', 'Marca', 'Color', 'Numero de Chasis', 'Numero de Motor', 'DUA', 'Año'];

  const newFields = [
    'nombre', 'descripcionBoleta', 'dni', 'precio', 'precioNum',
    'igv', 'fechaBoleta', 'boletaNum', 'numDeposito', 'fechaDeposito', 'direccion',
  ];

  const [additionalData, setAdditionalData] = useState(
    selectedInvoices.map(() => newFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})),
  );

  const handleInputChange = (index, field, value) => {
    const updatedData = [...additionalData];
    updatedData[index][field] = value;
    setAdditionalData(updatedData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">POA Generator</h2>

      <table className="border-collapse w-full border border-gray-300">
        <thead>
          <TableHeader headerData={[...prevData, ...newFields]} />
        </thead>
        <tbody>
          {selectedInvoices.map((invoice, index) => (
            <tr key={invoice[0]['cbc:ID']}>
              <InvoiceItem invoice={invoice} isPOAGenerator />

              {newFields.map((field) => (
                <td key={field} className="border p-2">
                  <input
                    type="text"
                    value={additionalData[index]?.[field] || ''}
                    onChange={(e) => handleInputChange(index, field, e.target.value)}
                    className="border p-1 w-full"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>
    </div>
  );
};

export default POAGenerator;
