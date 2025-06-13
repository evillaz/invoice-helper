import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const ModalForm = ({ RenderComponent, buttonLabel }) => {
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);

  return (
    <td>
      <button type="button" onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
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
