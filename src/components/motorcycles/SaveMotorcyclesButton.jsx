import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { saveMotorcyclesToDB } from '../../redux/motorcyclesSlice';

const SaveMotorcyclesButton = ({ newMotorcycles }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.motorcycles);

  const handleSave = () => {
    dispatch(saveMotorcyclesToDB(newMotorcycles));
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

SaveMotorcyclesButton.propTypes = {
  newMotorcycles: PropTypes.arrayOf(
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

export default SaveMotorcyclesButton;
