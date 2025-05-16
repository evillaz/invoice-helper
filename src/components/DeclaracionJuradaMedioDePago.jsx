import PropTypes from 'prop-types';
import writtenNumber from 'written-number';
import '../styles/a4.css';
import React from 'react';
import SaleDocument from './SaleDocument';

const DeclaracionJuradaMedioDePago = ({ sale }, ref) => {
  const {
    customer, total_amount, sale_date, electronic_receipt,
  } = sale;

  return (
    <SaleDocument
      sale={sale}
      ref={ref}
      title="DECLARACIÓN JURADA DE MEDIO DE PAGO"
      showPayments
      bodyText={(
        <>
          Yo, Macario Quiñones Silva, identificado con DNI 19402795,
          representante y propietario legal de “MOTOS QUIÑONES” con RUC 10194079523,
          con domicilio fiscal en Jr. Simón Bolívar N°289 Tayabamba – Pataz – La Libertad,
          mediante el presente documento declaro bajo juramento haber recibido de parte
          del señor/a;
          <strong>
            {' '}
            {customer.nombre}
            {' '}
            {customer.primerApellido}
            {' '}
            {customer.segundoApellido}
            {' '}
          </strong>
          con
          <strong>
            {' '}
            DNI:
            {' '}
            {customer.dni}
          </strong>
          , la suma de
          <strong>
            {' '}
            {(writtenNumber(total_amount, { lang: 'es' })).toUpperCase()}
            {' '}
            SOLES
            {' '}
          </strong>
          con
          <strong>
            {' '}
            00/100
            {' '}
          </strong>
          (S/
          {Number(total_amount).toFixed(2)}
          ), la misma que justifica la venta de una MOTOCICLETA:
        </>
      )}
      closingText={(
        <>
          En la fecha
          <strong>
            {' '}
            {sale_date.day}
            /
            {sale_date.month}
            /
            {sale_date.year}
          </strong>
          , con boleta
          <strong>
            {' '}
            {electronic_receipt.receipt_number}
          </strong>
          . El dinero fue cancelado en su totalidad y se anexa al formato de inmatriculación.
        </>
      )}
    />
  );
};

DeclaracionJuradaMedioDePago.propTypes = {
  sale: PropTypes.shape({
    total_amount: PropTypes.number.isRequired,
    boleta: PropTypes.string,
    fecha_venta: PropTypes.shape({
      day: PropTypes.string,
      month: PropTypes.string,
      year: PropTypes.number,
    }).isRequired,
    motorcycle: PropTypes.shape({
      modelo: PropTypes.string,
      marca: PropTypes.string,
      color: PropTypes.string,
      numero_de_chasis: PropTypes.string,
      numero_de_motor: PropTypes.string,
    }).isRequired,
    customer: PropTypes.shape({
      nombre: PropTypes.string,
      primerApellido: PropTypes.string,
      segundoApellido: PropTypes.string,
      dni: PropTypes.string,
    }).isRequired,
    electronic_receipt: PropTypes.shape({
      receipt_number: PropTypes.string,
      issue_date: PropTypes.string,
    }),
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

// 👇 Exportamos usando forwardRef para que funcione con html2pdf
export default React.forwardRef(DeclaracionJuradaMedioDePago);
