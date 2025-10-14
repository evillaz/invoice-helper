import { useState } from 'react';
import Modal from '../common/Modal';
import PaymentForm from './PaymentForm';

const SaleAddPaymentForm = () => {
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);

  return (
    <td>
      <button type="button" onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Agregar Pago
      </button>
      {showForm && (
        <Modal RenderComponent={PaymentForm} closeModal={handleClose} />
      )}
    </td>
  );
};

export default SaleAddPaymentForm;
