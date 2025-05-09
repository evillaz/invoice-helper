import PropTypes from 'prop-types';
import writtenNumber from 'written-number';
import '../styles/a4.css';
import React from 'react';

const DeclaracionJuradaMedioDePago = ({ sale }, ref) => {
  const formatNumber = (number) => Number(number).toFixed(2);

  return (
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
            DECLARACIÓN JURADA DE MEDIO DE PAGO
          </h2>
        </header>
        <section
          className="document__body"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p>
            Yo, Macario Quiñones Silva, identificado con DNI 19402795,
            representante y propietario legal de “MOTOS QUIÑONES” con RUC 10194079523,
            con domicilio fiscal en Jr. Simón Bolívar N°289 Tayabamba – Pataz – La Libertad,
            mediante el presente documento declaro bajo juramento haber recibido de parte
            del señor/a;
            <strong>
              {' '}
              {`${sale.customer.nombre} ${sale.customer.primerApellido} ${sale.customer.segundoApellido}`}
              {' '}
            </strong>
            con DNI:
            <strong>{sale.customer.dni}</strong>
            , la suma de
            <strong>
              {' '}
              {`${(writtenNumber(sale.total_amount, { lang: 'es' })).toUpperCase()} SOLES con 00/100`}
              {' '}
            </strong>
            (S/
            {formatNumber(sale.total_amount)}
            ), la misma que justifica la venta de una MOTOCICLETA:
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
            En la fecha
            {' '}
            {`${sale.sale_date.day}/${sale.sale_date.month}/${sale.sale_date.year}`}
            , con boleta
            {' '}
            {sale.electronic_receipt.receipt_number}
            . El dinero ya mencionado fue cancelado en su totalidad
            , mediante depósito a mi cuenta del Banco de la Nación con el siguiente Voucher
            y se anexa al formato de inmatriculación electrónico.
          </p>

          {sale.payments.map((payment) => (
            <p key={payment.transaction_number}>
              -Deposito N°
              {' '}
              {payment.transaction_number}
              {' '}
              S/
              {' '}
              {formatNumber(payment.amount)}
            </p>
          ))}

          <p>
            Para mayor validez de lo expuesto
            , ambas partes firmamos la presente ante notario público.
          </p>
        </section>

        <footer
          className="document__footer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
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
            COMPRADOR
          </div>

          <div
            className="document__signer"
            style={{ display: 'flex' }}
          >
            ___________________________
            <br />
            MACARIO QUIÑONES SILVA
            <br />
            DNI 19402795
            <br />
            VENDEDOR
          </div>
        </footer>
      </article>
      )}
    </>
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
