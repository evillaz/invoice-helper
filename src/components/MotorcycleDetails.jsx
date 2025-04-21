import PropTypes from 'prop-types';

const MotorycleDetails = ({ motorcycle, showDetails }) => (
  <>
    {showDetails ? (
      Object.entries(motorcycle).map(([key, value]) => (
        <td key={key}>{value}</td>
      ))
    ) : (
      <>
        <td>{motorcycle.factura}</td>
        <td>{motorcycle.modelo}</td>
        <td>{motorcycle.numero_de_chasis}</td>
      </>
    )}
  </>
);

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
      anio: PropTypes.number.isRequired,
    }),
  ).isRequired,
  showDetails: PropTypes.bool,
};

MotorycleDetails.defaultProps = {
  showDetails: false,
};

export default MotorycleDetails;
