import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectInvoice, deleteInvoiceFromDB, removeInvoice } from '../redux/invoicesSlice';

const InvoiceItem = ({ invoice, isPOAGenerator }) => {
  const dispatch = useDispatch();
  const selectedInvoices = useSelector((state) => state.invoices.selectedInvoices);

  const handleSelect = (invoiceId) => {
    dispatch(toggleSelectInvoice(invoiceId));
  };

  const handleDelete = (invoice) => (
    invoice.savedToDB === true
      ? dispatch(deleteInvoiceFromDB(invoice.factura))
      : dispatch(removeInvoice(invoice.factura))
  );

  return (
    <>
      {!isPOAGenerator && (
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={selectedInvoices.some((selected) => selected.factura === invoice.factura)}
            onChange={() => handleSelect(invoice.factura)}
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
            onClick={() => handleDelete(invoice)}
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
      factura: PropTypes.string.isRequired,
      modelo: PropTypes.string.isRequired,
      marca: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      numero_de_chasis: PropTypes.string.isRequired,
      numero_de_motor: PropTypes.string.isRequired,
      dua: PropTypes.string.isRequired,
      anio: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isPOAGenerator: PropTypes.bool,
};

InvoiceItem.defaultProps = {
  isPOAGenerator: false,
};

export default InvoiceItem;
