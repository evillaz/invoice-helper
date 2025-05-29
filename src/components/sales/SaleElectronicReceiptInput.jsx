import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateElectronicReceipt } from '../../redux/salesSlice';
import SaleGenericInput from './SaleGenericInput';
import { useSale } from '../../context/SaleContext';

const SaleElectronicReceiptInput = () => {
  const { sale } = useSale();
  console.log(sale);
  const dispatch = useDispatch();
  const [receiptNumber, setReceiptNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [editReceipt, setEditReceipt] = useState(false);

  const handleChangeReceipt = (receipt) => {
    setReceiptNumber(`EB01-${receipt}`);
  };

  const handleChangeIssueDate = (issueDate) => {
    setIssueDate(issueDate);
  };

  const handleEditReceipt = () => {
    setEditReceipt(!editReceipt);
  };

  const handleSaveReceipt = (saleId) => {
    const electronic_receipt = {
      receipt_number: receiptNumber,
      issue_date: issueDate,
    };
    dispatch(updateElectronicReceipt({ saleId, electronic_receipt }));
  };
  return (
    <>
      {(sale.electronic_receipt && !editReceipt) ? (
        <>
          <td>
            <span>
              {sale.electronic_receipt.receipt_number}
            </span>
            <button
              type="button"
              onClick={() => handleEditReceipt()}
            >
              Editar BOLETA
            </button>
          </td>
        </>
      ) : (
        <>
          <SaleGenericInput labelTxt="EB01-" type="text" handleFunction={handleChangeReceipt} saleId={sale.id} />
          <td
            style={{ display: 'flex' }}
          >
            <label
              htmlFor={`receiptIssueDate${sale.id}`}
              style={{ display: 'flex' }}
            >
              FECHA
              <input
                id={`receiptIssueDate${sale.id}`}
                type="date"
                onBlur={(e) => handleChangeIssueDate(e.target.value)}
                style={{ marginLeft: '4px' }}
              />
            </label>
          </td>
          <td>
            <button
              type="button"
              onClick={() => handleSaveReceipt(sale.id)}
            >
              AGREGAR BOLETA
            </button>
          </td>
        </>
      )}
    </>
  );
};

SaleElectronicReceiptInput.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total_amount: PropTypes.string.isRequired,
    boleta: PropTypes.string,
    titulo: PropTypes.string,
    placa: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    motorcycle: PropTypes.shape({
      factura: PropTypes.string,
      modelo: PropTypes.string,
      marca: PropTypes.string,
      color: PropTypes.string,
      numero_de_chasis: PropTypes.string,
      numero_de_motor: PropTypes.string,
      dua: PropTypes.string,
      anio: PropTypes.number,
      fecha_emision: PropTypes.string,
      importe: PropTypes.number,
    }).isRequired,
    customer: PropTypes.shape({
      nombre: PropTypes.string,
      primerApellido: PropTypes.string,
      segundoApellido: PropTypes.string,
      dni: PropTypes.string,
      direccion: PropTypes.string,
      departamento: PropTypes.string,
      provincia: PropTypes.string,
      distrito: PropTypes.string,
    }).isRequired,
    electronic_receipt: PropTypes.shape({
      receipt_number: PropTypes.string,
      issue_date: PropTypes.string,
    }),
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default SaleElectronicReceiptInput;
