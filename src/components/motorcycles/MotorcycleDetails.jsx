import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchQuery } from '../../context/SearchContext';
import highlightText from '../../utils/text/highlightText';
import { updateAttribute } from '../../redux/motorcyclesSlice';

const MotorycleDetails = ({ motorcycle/* , showDetails */ }) => {
  const { searchQuery } = useSearchQuery();
  const [color, setColor] = useState('');
  const dispatch = useDispatch();
  const handleColorChange = (colorInput) => {
    setColor(colorInput.toUpperCase());
  };
  const handleSaveColor = (motorcycleId, colorValue) => {
    const sentAttribute = {
      attribute: 'color',
      motorcycleId,
      colorValue,
    };
    dispatch(updateAttribute(sentAttribute));
  };
  return (
    <>
      {motorcycle
      && (
      <>
        <td>{highlightText(motorcycle.factura, searchQuery)}</td>
        <td>{highlightText(motorcycle.modelo, searchQuery)}</td>
        <td>{highlightText(motorcycle.numero_de_chasis, searchQuery)}</td>
        <td>{highlightText(motorcycle.numero_de_motor, searchQuery)}</td>
        {(motorcycle.color !== '') ? (
          <td>{motorcycle.color}</td>
        ) : (
          <td
            style={{ display: 'flex' }}
          >
            <label
              htmlFor={`motorcycleColor${motorcycle.factura}`}
              style={{ display: 'none' }}
            >
              COLOR
              <input
                id={`motorcycleColor${motorcycle.factura}`}
                type="text"
                onChange={(e) => handleColorChange(e.target.value)}
                onBlur={() => handleSaveColor(motorcycle.id, color)}
                style={{ marginLeft: '4px' }}
              />
            </label>
          </td>
        )}
        <td>{highlightText(motorcycle.dua, searchQuery)}</td>
        <td>{motorcycle.issueDate}</td>
      </>
      )}
    </>
  );
};

MotorycleDetails.propTypes = {
  motorcycle: PropTypes.arrayOf(
    PropTypes.shape({
      factura: PropTypes.string.isRequired,
      modelo: PropTypes.string.isRequired,
      marca: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      numero_de_chasis: PropTypes.string.isRequired,
      numero_de_motor: PropTypes.string.isRequired,
      dua: PropTypes.string.isRequired,
      anio: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /* showDetails: PropTypes.bool, */
};

/* MotorycleDetails.defaultProps = {
  showDetails: false,
}; */

export default MotorycleDetails;
