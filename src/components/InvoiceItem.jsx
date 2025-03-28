import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectXMLInvoice, removeXMLInvoice } from '../redux/xmlInvoicesSlice';

const InvoiceItem = ({ invoice, isPOAGenerator }) => {
  const dispatch = useDispatch();
  const selectedInvoices = useSelector((state) => state.xmlInvoices.selectedInvoices);

  return (
    <>
      {!isPOAGenerator && (
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={selectedInvoices.some((selected) => selected.factura === invoice.factura)}
            onChange={() => dispatch(toggleSelectXMLInvoice(invoice.factura))}
            aria-label={`Seleccionar factura ${invoice.factura}`}
          />
        </td>
      )}
      {Object.entries(invoice).map(([key, value]) => (
        <td key={key}>
          {value}
        </td>
      ))}
      {!isPOAGenerator && (
        <td className="border px-2 py-1 text-center">
          <button
            type="button"
            onClick={() => dispatch(removeXMLInvoice(invoice.factura))}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            X
          </button>
        </td>
      )}
    </>
  );
};

InvoiceItem.propTypes = {
  invoice: PropTypes.arrayOf(
    PropTypes.shape({
      'cbc:ID': PropTypes.string.isRequired,
      'cdc:Value': PropTypes.string,
    }),
  ).isRequired,
  isPOAGenerator: PropTypes.bool,
};

InvoiceItem.defaultProps = {
  isPOAGenerator: false,
};

export default InvoiceItem;
