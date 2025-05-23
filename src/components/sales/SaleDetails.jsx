import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import MotorycleDetails from '../motorcycles/MotorcycleDetails';
import getIgvValue from '../../utils/calculations/getIgvValue';
import { deletePayment } from '../../redux/salesSlice';

const SaleDetails = ({ sale }) => {
  const dispatch = useDispatch();
  const handleDelete = (saleId, paymentId) => {
    const paymentStructure = {
      saleId,
      paymentId,
    };
    return dispatch(deletePayment(paymentStructure));
  };

  return (
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
            <td>
              {sale.customer.departamento}
            </td>
            <td>
              {sale.customer.provincia}
            </td>
            <td>
              {sale.customer.distrito}
            </td>
          </>
        )}
        <td>
          {sale.total_amount}
        </td>
        <td>
          {getIgvValue(sale.total_amount)}
        </td>
        {sale.payments?.length > 0 ? (
          sale.payments.map((payment) => (
            <>
              <td key={`transaccion${payment.transaction_number}`}>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span>
                    {payment.amount}
                  </span>
                  <span>
                    {payment.transaction_number}
                  </span>
                  <span>
                    {payment.issue_date}
                  </span>
                </p>
              </td>
              <td className="border px-2 py-1 text-center">
                <button
                  type="button"
                  onClick={() => handleDelete(sale.id, payment.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  X
                </button>
              </td>
            </>
          ))
        ) : (
          <>
            <td>
              REGISTRAR PAGOS
            </td>
          </>
        )}
      </>
      )}
    </>
  );
};

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
    payments: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        issue_date: PropTypes.string,
        transaction_number: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default SaleDetails;
