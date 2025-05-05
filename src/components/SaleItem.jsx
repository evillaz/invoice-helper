import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteSaleFromDB, updateBoleta } from '../redux/salesSlice';
import CopyDescriptionButton from './CopyDescriptionButton';
import DeleteButton from './DeleteButton';
import SaleDetails from './SaleDetails';

const SaleItem = ({ sale }) => {
  console.log(sale);
  const dispatch = useDispatch();
  const [boleta, setBoleta] = useState('');
  const [editBoleta, setEditBoleta] = useState(false);
  const statusClasses = {
    prospect: {
      style: { color: '#ca8a04' },
    },
    expired: {
      style: { color: '#dc2626' },
    },
    processed: {
      style: { color: '#2563eb' },
    },
    titulo_registered: {
      style: { color: '#9333ea' },
    },
    placa_registered: {
      style: { color: '#16a34a' },
    },
  };

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
      <td>
        <span
          style={statusClasses[sale.status].style}
        >
          {sale.status}
        </span>
      </td>
      <SaleDetails sale={sale} />
      {(sale.boleta && !editBoleta) ? (
        <>
          <td>
            <span>
              {sale.boleta}
            </span>
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
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default SaleItem;
