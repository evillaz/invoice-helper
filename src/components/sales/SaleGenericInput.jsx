import PropTypes from 'prop-types';

const SaleGenericInput = ({
  labelTxt, type, handleFunction, saleId,
}) => (
  <label
    htmlFor={`receipt${type}${saleId}`}
    style={{ display: 'flex' }}
  >
    {labelTxt
          && labelTxt}
    <input
      id={`receipt${type}${saleId}`}
      type={type}
      onBlur={(e) => handleFunction(e.target.value)}
      style={{ marginLeft: '4px' }}
    />
  </label>
);

SaleGenericInput.propTypes = {
  labelTxt: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleFunction: PropTypes.func.isRequired,
  saleId: PropTypes.number.isRequired,
};

SaleGenericInput.defaultProps = {
  labelTxt: '',
};

export default SaleGenericInput;
