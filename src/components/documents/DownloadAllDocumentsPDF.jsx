import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DeclaracionJuradaMedioDePago from './DeclaracionJuradaMedioDePago';
import CartaPoderSUNARP from './CartaPoderSUNARP';
import CartaPoderAPP from './CartaPoderAPP';
import { useSale } from '../../context/SaleContext';

const DownloadAllDocumentsPDF = () => {
  const { sale } = useSale();
  const [renderDocs, setRenderDocs] = useState(false);

  // Creamos las refs
  const declaracionRef = useRef(null);
  const sunarpRef = useRef(null);
  const appRef = useRef(null);

  const handleDownloadAllPDF = () => {
    setRenderDocs(true);

    setTimeout(async () => {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const captureAndAdd = async (ref, isFirstPage = false) => {
        const element = ref.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (!isFirstPage) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      };

      // Usamos las refs aquí
      await captureAndAdd(declaracionRef, true);
      await captureAndAdd(sunarpRef);
      await captureAndAdd(appRef);

      pdf.save(`Documentos-${sale.customer.nombre}-${sale.customer.primerApellido}-${sale.customer.segundoApellido}.pdf`);

      setRenderDocs(false);
    }, 500);
  };

  return (
    <td>
      <button type="button" onClick={handleDownloadAllPDF}>
        Descargar TODOS los documentos en 1 PDF
      </button>

      {renderDocs && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
          <DeclaracionJuradaMedioDePago ref={declaracionRef} sale={sale} />
          <CartaPoderSUNARP ref={sunarpRef} sale={sale} />
          <CartaPoderAPP ref={appRef} sale={sale} />
        </div>
      )}
    </td>
  );
};

DownloadAllDocumentsPDF.propTypes = {
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

export default DownloadAllDocumentsPDF;
