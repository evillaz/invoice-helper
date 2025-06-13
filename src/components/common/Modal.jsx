import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Modal = ({ sale, RenderComponent, closeModal }) => {
  const modalRoot = document.getElementById('modal');
  return createPortal(
    <div
      className="document__preview__modal"
      style={{
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
      <div
        className="document__preview__frame"
        style={{
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
          className="document_preview_close_button"
          type="button"
          onClick={closeModal}
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
        <RenderComponent sale={sale} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  RenderComponent: PropTypes.elementType.isRequired,
  closeModal: PropTypes.func.isRequired,
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
  }),
};

export default Modal;
