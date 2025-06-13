import PropTypes from 'prop-types';
import '../../styles/a4.css';
import React from 'react';

const SaleDocument = React.forwardRef(({
  sale, title, bodyText, closingText, showPayments,
}, ref) => {
  const formatNumber = (number) => Number(number).toFixed(2);

  return (
    sale && (
      <article ref={ref} className="document a4-page" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <header className="document__header">
          <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>{title}</h2>
          {title.includes('CARTA') && (
            <p>
              Yo:

              <strong>
                {` ${sale.customer.nombre} ${sale.customer.primerApellido} ${sale.customer.segundoApellido}`}
                {' '}
              </strong>
              con DNI:
              {' '}
              <strong>
                {`${sale.customer.dni}`}
              </strong>
            </p>
          )}
        </header>
        <section className="document__body" style={{ display: 'flex', flexDirection: 'column' }}>
          <section>
            {title.includes('CARTA') && (
              <h3 style={{
                justifySelf: 'center',
              }}
              >
                AUTORIZO
              </h3>
            )}
            {bodyText}
          </section>
          <section className="document__details" style={{ display: 'flex', flexDirection: 'column', fontSize: '12pt' }}>
            <p className="detail">
              <strong>MODELO:</strong>
              {' '}
              {sale.motorcycle.modelo}
            </p>
            <p className="detail">
              <strong>MARCA:</strong>
              {' '}
              {sale.motorcycle.marca}
            </p>
            <p className="detail">
              <strong>COLOR:</strong>
              {' '}
              {sale.motorcycle.color ? (
                <>
                  {sale.motorcycle.color}
                </>
              ) : (
                <>
                  AZUL
                </>
              )}
            </p>
            <p className="detail">
              <strong>NUMERO DE CHASIS:</strong>
              {' '}
              {sale.motorcycle.numero_de_chasis}
            </p>
            <p className="detail">
              <strong>NUMERO DE MOTOR:</strong>
              {' '}
              {sale.motorcycle.numero_de_motor}
            </p>
          </section>
          {closingText && <p>{closingText}</p>}

          {showPayments && sale.payments.map((payment) => (
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

          {title.includes('DECLARACIÓN') ? (
            <p>
              Para mayor validez de lo expuesto, ambas partes firmamos la presente ante notario
              público.
            </p>
          ) : (
            <p>
              Para mayor conformidad paso a firmar ante Notario Público esta Carta Poder
              que le da las facultades necesarias a mi representante antes ya mencionado.
            </p>
          )}
        </section>

        <footer
          className="document__footer"
          style={{
            display: 'flex',
            justifyContent: title.includes('CARTA') ? 'flex-end' : 'space-between',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          <div className="document__signer" style={{ display: 'flex' }}>
            ___________________________
            <br />
            {`${sale.customer.nombre} ${sale.customer.primerApellido} ${sale.customer.segundoApellido}`}
            <br />
            DNI:
            {' '}
            {sale.customer.dni}
            <br />
            COMPRADOR
          </div>

          {title.includes('DECLARACIÓN') && (
            <div className="document__signer" style={{ display: 'flex' }}>
              ___________________________
              <br />
              MACARIO QUIÑONES SILVA
              <br />
              DNI: 19402795
              <br />
              VENDEDOR
            </div>
          )}
        </footer>
      </article>
    )
  );
});

SaleDocument.displayName = 'Documento';

SaleDocument.propTypes = {
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
  title: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  closingText: PropTypes.string.isRequired,
  showPayments: PropTypes.bool,
};

SaleDocument.defaultProps = {
  showPayments: false,
};

export default SaleDocument;
