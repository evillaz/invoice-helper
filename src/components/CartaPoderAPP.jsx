import PropTypes from 'prop-types';
import '../styles/a4.css';
import React from 'react';

const CartaPoderAPP = ({ sale }, ref) => (
  <>
    {sale && (
    <article
      ref={ref}
      className="document a4-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <header
        className="document__header"
      >
        <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>
          CARTA PODER
        </h2>
        <p>
          Yo:
          {` ${sale.customer.primerApellido} ${sale.customer.segundoApellido}
          ${sale.customer.nombre} con DNI: ${sale.customer.dni}`}
        </p>
      </header>
      <section
        className="document__body"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3>AUTORIZO</h3>
        <p>
          A la Srta. Gianella Maricarmen Quiñones López, identificado con D.N.I 70930228,
          domiciliado en Jr. Simón Bolivar N° 287 Tayabamba – Pataz; para que en mi
          representación realice los trámites y recojo ante la
          <strong>ASOCIACIÓN AUTOMOTRIZ DEL PERÚ (AAP)</strong>
          de mi placa de rodaje de la motocicleta lineal:
        </p>

        <section
          className="document__details"
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '12pt',
          }}
        >
          <p
            className="detail"
          >
            <span>
              <strong>MODELO</strong>
            </span>
            <span>
              {sale.motorcycle.modelo}
            </span>
          </p>
          <p
            className="detail"
          >
            <span>
              <strong>MARCA</strong>
            </span>
            <span>
              {sale.motorcycle.marca}
            </span>
          </p>
          <p
            className="detail"
          >
            <span>
              <strong>COLOR</strong>
            </span>
            <span>
              {sale.motorcycle.color}
            </span>
          </p>
          <p
            className="detail"
          >
            <span>
              <strong>NUMERO DE CHASIS</strong>
            </span>
            <span>
              {sale.motorcycle.numero_de_chasis}
            </span>
          </p>
          <p
            className="detail"
          >
            <span>
              <strong>NUMERO DE MOTOR</strong>
            </span>
            <span>
              {sale.motorcycle.numero_de_motor}
            </span>
          </p>
        </section>
        <p>
          Para mayor conformidad paso a firmar ante Notario Público esta Carta Poder que
          le da las facultades necesarias a mi representante antes ya mencionado.
        </p>
      </section>
      <footer
        className="document__footer carta__poder"
        style={{
          display: 'flex',
          textAlign: 'center',
        }}
      >
        <div
          className="document__signer"
          style={{ display: 'flex' }}
        >
          ___________________________
          <br />
          {`${sale.customer.nombre} ${sale.customer.primerApellido} ${sale.customer.segundoApellido}`}
          <br />
          DNI
          {' '}
          {sale.customer.dni}
          <br />
        </div>
      </footer>
    </article>
    )}
  </>
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
// 👇 Exportamos usando forwardRef para que funcione con html2pdf
export default React.forwardRef(CartaPoderAPP);
