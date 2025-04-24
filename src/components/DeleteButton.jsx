import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const DeleteButton = ({ deleteFunc, itemId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => (
    dispatch(deleteFunc(itemId.toString()))
  );

  return (
    <td className="border px-2 py-1 text-center">
      <button
        type="button"
        onClick={() => handleDelete()}
        className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg"
      >
        X
      </button>
    </td>
  );
};

DeleteButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};

export default DeleteButton;
