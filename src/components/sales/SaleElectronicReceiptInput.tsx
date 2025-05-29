import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateElectronicReceipt } from '../../redux/salesSlice';
import SaleGenericInput from './SaleGenericInput';

interface Motorcycle {
  factura?: string;
  modelo?: string;
  marca?: string;
  color?: string;
  numero_de_chasis?: string;
  numero_de_motor?: string;
  dua?: string;
  anio?: number;
  fecha_emision?: string;
  importe?: number;
}

interface Customer {
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  dni?: string;
  direccion?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}

interface ElectronicReceipt {
  receipt_number?: string;
  issue_date?: string;
}

interface Sale {
  id: number;
  total_amount: string;
  boleta?: string;
  titulo?: string;
  placa?: string;
  created_at: string;
  motorcycle: Motorcycle;
  customer: Customer;
  electronic_receipt?: ElectronicReceipt;
  status: string;
}

interface SaleElectronicReceiptInputProps {
  sale: Sale;
}

const SaleElectronicReceiptInput: React.FC<SaleElectronicReceiptInputProps> = ({ sale }) => {
  const dispatch = useDispatch();
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [editReceipt, setEditReceipt] = useState<boolean>(false);

  const handleChangeReceipt = (receipt: string) => {
    setReceiptNumber(`EB01-${receipt}`);
  };

  const handleChangeIssueDate = (issueDate: string) => {
    setIssueDate(issueDate);
  };

  const handleEditReceipt = () => {
    setEditReceipt(!editReceipt);
  };

  const handleSaveReceipt = (saleId: number) => {
    const electronic_receipt = {
      receipt_number: receiptNumber,
      issue_date: issueDate,
    };
    dispatch(updateElectronicReceipt({ saleId, electronic_receipt }));
  };

  return (
    <>
      {(sale.electronic_receipt && !editReceipt) ? (
        <td>
          <span>
            {sale.electronic_receipt.receipt_number}
          </span>
          <button type="button" onClick={handleEditReceipt}>
            Editar BOLETA
          </button>
        </td>
      ) : (
        <>
          <SaleGenericInput
            labelTxt="EB01-"
            type="text"
            handleFunction={handleChangeReceipt}
            saleId={sale.id}
          />
          <td style={{ display: 'flex' }}>
            <label htmlFor={`receiptIssueDate${sale.id}`} style={{ display: 'flex' }}>
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
            <button type="button" onClick={() => handleSaveReceipt(sale.id)}>
              AGREGAR BOLETA
            </button>
          </td>
        </>
      )}
    </>
  );
};

export default SaleElectronicReceiptInput;
