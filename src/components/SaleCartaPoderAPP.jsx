import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import CartaPoderAPP from './CartaPoderAPP';

const SaleCartaPoderAPP = ({ sale }) => {
  const cartaRef = useRef();
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadPDF = () => {
    const element = cartaRef.current;
    const opt = {
      margin: 0,
      filename: `CartaPoderAPP-${sale.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid'] }, // 👈 Evita romper la página
    };
    html2pdf().set(opt).from(element).save();
  };
  return (
    <>
      <td>
        <button type="button" onClick={handleDownloadPDF}>
          Descargar Carta Poder APP (PDF)
        </button>
        <button type="button" onClick={() => setShowPreview(true)}>
          Ver Prevista
        </button>
        <div
          style={{
            display: 'none',
          }}
        >
          <CartaPoderAPP ref={cartaRef} sale={sale} />
        </div>
        {showPreview && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          >
            <div style={{
              background: '#fff',
              padding: '2rem',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '8px',
              position: 'relative',
            }}
            >
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'red',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
              {/* Aquí renderizamos la carta dentro del modal */}
              <CartaPoderAPP ref={cartaRef} sale={sale} />
            </div>
          </div>
        )}
      </td>
    </>
  );
};

SaleCartaPoderAPP.propTypes = {
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
    electronic_receipt: PropTypes.shape({
      receipt_number: PropTypes.string,
      issue_date: PropTypes.string,
    }),
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default SaleCartaPoderAPP;
