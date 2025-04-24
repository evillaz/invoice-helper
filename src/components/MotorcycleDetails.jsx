import PropTypes from 'prop-types';
import { useSearchQuery } from '../context/SearchContext';
import highlightText from '../utils/text/highlightText';

const MotorycleDetails = ({ motorcycle, showDetails }) => {
  const { searchQuery } = useSearchQuery();

  return (
    <>
      {showDetails ? (
        Object.entries(motorcycle)
          .filter((entry) => typeof entry[1] === 'string' || typeof entry[1] === 'number')
          .map(([key, value]) => (
            <td key={key}>{highlightText(value.toString(), searchQuery)}</td>
          ))
      ) : (
        <>
          <td>{highlightText(motorcycle.factura, searchQuery)}</td>
          <td>{highlightText(motorcycle.modelo, searchQuery)}</td>
          <td>{highlightText(motorcycle.numero_de_chasis, searchQuery)}</td>
          <td>{highlightText(motorcycle.numero_de_motor, searchQuery)}</td>
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
  showDetails: PropTypes.bool,
};

MotorycleDetails.defaultProps = {
  showDetails: false,
};

export default MotorycleDetails;
