import PropTypes from 'prop-types';

const ShowDetailsButton = ({ showDetails, setShowDetails }) => {
  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <button
      type="button"
      onClick={toggleDetails}
      className="text-blue-500 hover:underline text-sm"
    >
      {showDetails ? 'Ocultar' : 'Ver más'}
    </button>
  );
};

ShowDetailsButton.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  setShowDetails: PropTypes.func.isRequired,
};
export default ShowDetailsButton;
