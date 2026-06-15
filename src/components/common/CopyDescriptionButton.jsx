import PropTypes from 'prop-types';
import safeCopytoClipboard from '../../utils/text/safeCopytoClipboard';

const CopyDescriptionButton = ({ motorcycle }) => {
  const handleCopyDescription = () => {
    const {
      modelo,
      marca,
      numero_de_chasis,
      numero_de_motor,
      dua,
      anio,
    } = motorcycle;

    const description = `Modelo: ${modelo} / Marca: ${marca} / `
      + `Numero de chasis: ${numero_de_chasis} / `
      + `Numero de motor: ${numero_de_motor} / `
      + `DUA: ${dua} / Año: ${anio}`;

    safeCopytoClipboard(description);
  };

  return (
    <td>
      <button
        type="button"
        onClick={handleCopyDescription}
        className="description-button"
      >
        Descripcion Boleta
      </button>
    </td>
  );
};

CopyDescriptionButton.propTypes = {
  motorcycle: PropTypes.shape({
    factura: PropTypes.string.isRequired,
    modelo: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    numero_de_chasis: PropTypes.string.isRequired,
    numero_de_motor: PropTypes.string.isRequired,
    dua: PropTypes.string.isRequired,
    anio: PropTypes.number.isRequired,
  }).isRequired,
};

export default CopyDescriptionButton;
