import PropTypes from 'prop-types';
import '../styles/a4.css';
import React from 'react';
import SaleDocument from './SaleDocument';

const CartaPoderAPP = ({ sale }, ref) => (
  <SaleDocument
    sale={sale}
    ref={ref}
    title="CARTA PODER"
    bodyText={(
      <p>
        A la
        <strong>
          {' '}
          Srta. Gianella Maricarmen Quiñones López
        </strong>
        , identificado con D.N.I
        <strong>
          {' '}
          70930228
        </strong>
        , domiciliado en Jr. Simón Bolivar N° 287 Tayabamba – Pataz; para que en mi
        representación realice los trámites y recojo ante la
        <strong> ASOCIACIÓN AUTOMOTRIZ DEL PERÚ (AAP)</strong>
        de mi placa de rodaje de la motocicleta lineal:
      </p>
    )}
  />
);

CartaPoderAPP.propTypes = {
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

export default React.forwardRef(CartaPoderAPP);
