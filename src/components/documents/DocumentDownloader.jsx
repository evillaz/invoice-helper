import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import nameSpaced from '../../utils/format/nameSpaced';
import DocumentPreviewButton from './DocumentPreviewButton';

const SaleDocumentDownloader = ({ sale, DocumentComponent, filePrefix }) => {
  const [renderDoc, setRenderDoc] = useState(false);
  const docRef = useRef(null);
  const handleDownloadPDF = () => {
    setRenderDoc(true);

    setTimeout(async () => {
      const element = docRef.current;
      console.log(element);
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filePrefix}-${sale.customer.nombre}-${sale.customer.primerApellido}-${sale.customer.segundoApellido}.pdf`);

      // Clean up after downloading
      setRenderDoc(false);
    }, 500); // Wait 500ms to ensure rendering
  };

  return (
    <td>
      <button type="button" onClick={handleDownloadPDF}>
        Descargar
        {' '}
        {nameSpaced(filePrefix)}
        {' '}
        (PDF)
      </button>
      <DocumentPreviewButton sale={sale} DocumentComponent={DocumentComponent} />
      {renderDoc && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
          <DocumentComponent sale={sale} ref={docRef} />
        </div>
      )}
    </td>
  );
};

SaleDocumentDownloader.propTypes = {
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
  DocumentComponent: PropTypes.elementType.isRequired,
  filePrefix: PropTypes.string.isRequired,
};

export default SaleDocumentDownloader;
