import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../common/Modal';

const DocumentPreviewButton = ({ sale, DocumentComponent }) => {
  const [showPreview, setShowPreview] = useState(false);
  const handleShowPreview = () => {
    setShowPreview(true);
  };
  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      <button type="button" onClick={handleShowPreview}>
        Prevista
      </button>
      {showPreview && (
        <Modal sale={sale} RenderComponent={DocumentComponent} closeModal={handleClosePreview} />
      )}
    </>
  );
};

DocumentPreviewButton.propTypes = {
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
};

export default DocumentPreviewButton;
