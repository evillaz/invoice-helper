import { useState } from 'react';
import Modal from '../common/Modal';
import TitleForm from './TitleForm';

const SaleAddTitleForm = () => {
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);

  return (
    <td>
      <button type="button" onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Title
      </button>
      {showForm && (
        <Modal RenderComponent={TitleForm} closeModal={handleClose} />
      )}
    </td>
  );
};

export default SaleAddTitleForm;
