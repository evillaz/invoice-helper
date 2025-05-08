import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { deleteSaleFromDB, updateElectronicReceipt } from '../redux/salesSlice';
import CopyDescriptionButton from './CopyDescriptionButton';
import DeleteButton from './DeleteButton';
import SaleDetails from './SaleDetails';
import CartaPoderSUNARP from './CartaPoderSUNARP';

const SaleItem = ({ sale }) => {
  const dispatch = useDispatch();
  const [receiptNumber, setReceiptNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [editReceipt, setEditReceipt] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const cartaRef = useRef();
  const handleDownloadPDF = () => {
    const element = cartaRef.current;
    const opt = {
      margin: 0,
      filename: `CartaPoderSUNARP-${sale.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid'] }, // 👈 Evita romper la página
    };
    html2pdf().set(opt).from(element).save();
  };
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

  const handleChangeReceipt = (receipt) => {
    setReceiptNumber(`EB01-${receipt}`);
  };

  const handleChangeIssueDate = (issueDate) => {
    setIssueDate(issueDate);
  };

  const handleEditReceipt = () => {
    setEditReceipt(!editReceipt);
  };

  const handleSaveReceipt = (saleId) => {
    const electronic_receipt = {
      receipt_number: receiptNumber,
      issue_date: issueDate,
    };
    dispatch(updateElectronicReceipt({ saleId, electronic_receipt }));
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
      {(sale.electronic_receipt && !editReceipt) ? (
        <>
          <td>
            <span>
              {sale.electronic_receipt.receipt_number}
            </span>
            <button
              type="button"
              onClick={() => handleEditReceipt()}
            >
              Editar BOLETA
            </button>
          </td>
          <td>
            <button type="button" onClick={handleDownloadPDF}>
              Descargar Carta SUNARP (PDF)
            </button>
            <button type="button" onClick={() => setShowPreview(true)}>
              Ver Prevista
            </button>
            <div
              style={{
                display: 'none',
              }}
            >
              <CartaPoderSUNARP ref={cartaRef} sale={sale} />
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
                  <CartaPoderSUNARP ref={cartaRef} sale={sale} />
                </div>
              </div>
            )}
          </td>
        </>
      ) : (
        <>
          <td
            style={{ display: 'flex' }}
          >
            <label
              htmlFor={`receiptId${sale.id}`}
              style={{ display: 'flex' }}
            >
              EB01-
              <input
                id={`receiptId${sale.id}`}
                type="text"
                onBlur={(e) => handleChangeReceipt(e.target.value)}
                style={{ marginLeft: '4px' }}
              />
            </label>
            {/* <SaleGenericInput type="date" handleFunction={handleChangeIssueDate} /> */}
            <label
              htmlFor={`receiptIssueDate${sale.id}`}
              style={{ display: 'flex' }}
            >
              EB01-
              <input
                id={`receiptIssueDate${sale.id}`}
                type="date"
                onBlur={(e) => handleChangeIssueDate(e.target.value)}
                style={{ marginLeft: '4px' }}
              />
            </label>
          </td>
          <td>
            <button
              type="button"
              onClick={() => handleSaveReceipt(sale.id)}
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
    electronic_receipt: PropTypes.shape({
      receipt_number: PropTypes.string,
      issue_date: PropTypes.string,
    }),
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default SaleItem;
