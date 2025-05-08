import PropTypes from 'prop-types';
import MotorycleDetails from './MotorcycleDetails';
import getIgvValue from '../utils/calculations/getIgvValue';

const SaleDetails = ({ sale }) => (
  <>
    {sale && (
      <>
        <MotorycleDetails motorcycle={sale.motorcycle} />
        {sale.customer && (
          <>
            <td>
              {sale.customer.dni}
            </td>
            <td>
              {sale.customer.nombre}
              {' '}
              {sale.customer.primerApellido}
              {' '}
              {sale.customer.segundoApellido}
            </td>
            <td>
              {sale.customer.direccion}
            </td>
          </>
        )}
        <td>
          {sale.total_amount}
        </td>
        <td>
          {getIgvValue(sale.total_amount)}
        </td>
        {sale.sale_date && (
        <td>
          {sale.sale_date.day}
          -
          {sale.sale_date.month}
          -
          {sale.sale_date.year}
        </td>
        )}
      </>
    )}
  </>
);

SaleDetails.propTypes = {
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
    sale_date: PropTypes.shape({
      day: PropTypes.string,
      month: PropTypes.string,
      year: PropTypes.number,
    }),
  }).isRequired,
};

export default SaleDetails;
