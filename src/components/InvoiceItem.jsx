import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectInvoice, removeInvoice } from '../redux/invoiceSlice';

const InvoiceItem = ({ invoice, isPOAGenerator }) => {
  const dispatch = useDispatch();
  const selectedInvoices = useSelector((state) => state.invoices.selectedInvoices);

  return (
    <>
      {!isPOAGenerator && (
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={selectedInvoices.some((selected) => selected[0]['cbc:ID'] === invoice[0]['cbc:ID'])}
            onChange={() => dispatch(toggleSelectInvoice(invoice[0]['cbc:ID']))}
            aria-label={`Seleccionar factura ${invoice[0]['cbc:ID']}`}
          />
        </td>
      )}
      {invoice.map((item) => (
        <td key={item['cbc:ID']}>
          {item['cbc:ID'] || item['cdc:Value']}
        </td>
      ))}
      {!isPOAGenerator && (
        <td className="border px-2 py-1 text-center">
          <button
            type="button"
            onClick={() => dispatch(removeInvoice(invoice[0]['cbc:ID']))}
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
