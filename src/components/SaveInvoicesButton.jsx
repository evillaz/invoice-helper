import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveInvoicesToDB } from '../redux/databaseInvoiceSlice';

const SaveInvoicesButton = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.databaseInvoices);
  console.log(status);

  const handleSave = () => {
    dispatch(saveInvoicesToDB());
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={status === 'loading'}
      style={{
        padding: '10px 15px',
        backgroundColor: status === 'loading' ? '#ccc' : '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
      }}
    >
      {status === 'loading' ? 'Saving...' : 'Save Invoices'}
    </button>
  );
};

export default SaveInvoicesButton;
