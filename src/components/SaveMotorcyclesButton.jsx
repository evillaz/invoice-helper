import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMotorcyclesToDB } from '../redux/motorcyclesSlice';

const SaveMotorcyclesButton = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.motorcycles);

  const handleSave = () => {
    dispatch(saveMotorcyclesToDB());
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

export default SaveMotorcyclesButton;
