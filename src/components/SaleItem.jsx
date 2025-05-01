import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteSaleFromDB, updateBoleta } from '../redux/salesSlice';
import CopyDescriptionButton from './CopyDescriptionButton';
import DeleteButton from './DeleteButton';
import SaleDetails from './SaleDetails';

const SaleItem = ({ sale }) => {
  const dispatch = useDispatch();
  const [boleta, setBoleta] = useState('');
  const [editBoleta, setEditBoleta] = useState(false);

  const handleChangeBoleta = (boletaNumber) => {
    setBoleta(`EB01-${boletaNumber}`);
  };

  const handleEditBoleta = () => {
    setEditBoleta(!editBoleta);
  };

  const handleSaveBoleta = (saleId) => {
    dispatch(updateBoleta({ saleId, boleta }));
  };

  return (
    <>
      <SaleDetails sale={sale} />
      {(sale.boleta && !editBoleta) ? (
        <>
          <td>
            {sale.boleta}
          </td>
          <td>
            <button
              type="button"
              onClick={() => handleEditBoleta()}
            >
              Editar BOLETA
            </button>
          </td>
        </>
      ) : (
        <>
          <td
            style={{ display: 'flex' }}
          >
            <label
              htmlFor={`boletaId${sale.id}`}
              style={{ display: 'flex' }}
            >
              EB01-
              <input
                id={`boletaId${sale.id}`}
                type="text"
                onBlur={(e) => handleChangeBoleta(e.target.value)}
                style={{ marginLeft: '4px' }}
              />
            </label>
          </td>
          <td>
            <button
              type="button"
              onClick={() => handleSaveBoleta(sale.id)}
            >
              AGREGAR BOLETA
            </button>
          </td>
        </>
      )}
      <CopyDescriptionButton motorcycle={sale.motorcycle} />
      <DeleteButton deleteFunc={deleteSaleFromDB} item={sale} />
    </>
  );
};

SaleItem.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total_amount: PropTypes.string.isRequired,
    boleta: PropTypes.string,
    titulo: PropTypes.string,
    placa: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    motorcycle: PropTypes.shape({
      factura: PropTypes.string,
      modelo: PropTypes.string,
      marca: PropTypes.string,
      color: PropTypes.string,
      numero_de_chasis: PropTypes.string,
      numero_de_motor: PropTypes.string,
      dua: PropTypes.string,
      anio: PropTypes.number,
      fecha_emision: PropTypes.string,
      importe: PropTypes.number,
    }).isRequired,
    customer: PropTypes.shape({
      nombre: PropTypes.string,
      primerApellido: PropTypes.string,
      segundoApellido: PropTypes.string,
      dni: PropTypes.string,
      direccion: PropTypes.string,
      departamento: PropTypes.string,
      provincia: PropTypes.string,
      distrito: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default SaleItem;
