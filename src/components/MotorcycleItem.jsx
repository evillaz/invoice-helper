import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectMotorcycle, deleteMotorcycleFromDB, removeMotorcycle } from '../redux/motorcyclesSlice';

const MotorcycleItem = ({ motorcycle, isUploadXml }) => {
  const dispatch = useDispatch();
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);

  const handleSelect = (motorcycleId) => {
    dispatch(toggleSelectMotorcycle(motorcycleId));
  };

  const handleDelete = (motorcycleId) => (
    motorcycle.savedToDB === true
      ? dispatch(deleteMotorcycleFromDB(motorcycleId))
      : dispatch(removeMotorcycle(motorcycleId))
  );

  const handleCopyDescription = (motorcycle) => {
    const description = `Modelo: ${motorcycle.modelo} /Marca: ${motorcycle.marca} /Numero de chasis: ${motorcycle.numero_de_chasis} /Numero de motor: ${motorcycle.numero_de_motor} /DUA: ${motorcycle.dua} /Año: ${motorcycle.anio}`;
    console.log(description);
  };

  return (
    <>
      {!isUploadXml && (
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={selectedMotorcycles.some(
              (selected) => selected.factura === motorcycle.factura,
            )}
            onChange={() => handleSelect(motorcycle.factura)}
            aria-label={`Seleccionar factura ${motorcycle.factura}`}
          />
        </td>
      )}
      {Object.entries(motorcycle).map(([key, value]) => (
        <td key={key}>
          {value}
        </td>
      ))}
      {!isUploadXml && (
        <>
          <td className="border px-2 py-1 text-center">
            <button
              type="button"
              onClick={() => handleDelete(motorcycle.factura)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg"
            >
              X
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={() => handleCopyDescription(motorcycle)}
              className="description-button"
            >
              Descripcion Boleta
            </button>
          </td>
        </>
      )}
    </>
  );
};

MotorcycleItem.propTypes = {
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
  isUploadXml: PropTypes.bool,
};

MotorcycleItem.defaultProps = {
  isUploadXml: false,
};

export default MotorcycleItem;
