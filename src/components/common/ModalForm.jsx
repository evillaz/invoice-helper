import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const ModalForm = ({ RenderComponent, buttonLabel }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);

  // 🔹 Lock scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup in case the component unmounts while open
    return () => {
      document.body.style.overflow = '';
    };
  }, [showForm]);

  return (
    <td>
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {buttonLabel}
      </button>

      {showForm && (
        <Modal RenderComponent={RenderComponent} closeModal={handleClose} />
      )}
    </td>
  );
};

ModalForm.propTypes = {
  RenderComponent: PropTypes.elementType.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default ModalForm;
