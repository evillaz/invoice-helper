import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { deleteSaleFromDB } from '../../redux/salesSlice';
import CopyDescriptionButton from '../common/CopyDescriptionButton';
import DeleteButton from '../common/DeleteButton';
import SaleDetails from './SaleDetails';
import SaleElectronicReceiptInput from './SaleElectronicReceiptInput';
import DownloadAllDocumentsPDF from '../documents/DownloadAllDocumentsPDF';
import DeclaracionJuradaMedioDePago from '../documents/DeclaracionJuradaMedioDePago';
import CartaPoderAPP from '../documents/CartaPoderAPP';
import CartaPoderSUNARP from '../documents/CartaPoderSUNARP';
import { SaleContext } from '../../context/SaleContext';
import DocumentDownloader from '../documents/DocumentDownloader';
import ModalForm from '../common/ModalForm';
import PaymentForm from './PaymentForm';
import Boleta from '../documents/Boleta';
import TitleForm from './TitleForm';

const SaleItem = ({ sale }) => {
  const statusClasses = {
    prospect: {
      style: { color: '#ca8a04' },
    },
    expired: {
      style: { color: '#dc2626' },
    },
    processed: {
      style: { color: '#2563eb' },
    },
    titulo_registered: {
      style: { color: '#9333ea' },
    },
    placa_registered: {
      style: { color: '#16a34a' },
    },
  };

  const saleContextValue = useMemo(
    () => ({ sale }),
    [sale],
  );
  return (
    <>
      <td>
        <span
          style={statusClasses[sale.status].style}
        >
          {sale.status}
        </span>
      </td>
      <SaleContext.Provider value={saleContextValue}>
        <SaleDetails />
        <SaleElectronicReceiptInput />
        <DocumentDownloader DocumentComponent={DeclaracionJuradaMedioDePago} filePrefix="DeclaracionJuradaMedioDePago" />
        <DocumentDownloader DocumentComponent={CartaPoderSUNARP} filePrefix="DeclaracionJuradaMedioDePago" />
        <DocumentDownloader DocumentComponent={CartaPoderAPP} filePrefix="DeclaracionJuradaMedioDePago" />
        <DownloadAllDocumentsPDF />
        <DocumentDownloader DocumentComponent={Boleta} filePrefix="Boleta" />
        <ModalForm RenderComponent={PaymentForm} buttonLabel="Add payment" />
        <ModalForm RenderComponent={TitleForm} buttonLabel="Add Title" />
        <CopyDescriptionButton motorcycle={sale.motorcycle} />
        <DeleteButton deleteFunc={deleteSaleFromDB} item={sale} />
      </SaleContext.Provider>
    </>
  );
};

SaleItem.propTypes = {
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

export default SaleItem;
