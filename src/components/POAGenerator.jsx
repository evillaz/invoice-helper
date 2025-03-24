import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const POAGenerator = () => {
  const navigate = useNavigate();

  const invoices = useSelector((state) => state.invoices.invoices);
  const selectedInvoices = useSelector((state) => state.invoices.selectedInvoices);

  return (
    <div>
      <h1>gen</h1>
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={() => navigate('/', { state: { selectedInvoices, invoices } })}
      >
        Back to Upload
      </button>
    </div>
  );
};

export default POAGenerator;
