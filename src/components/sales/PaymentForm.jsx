import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPayment } from '../../redux/salesSlice';
import { useSale } from '../../context/SaleContext';

const PaymentForm = () => {
  const { sale } = useSale();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    transaction_number: '',
    amount: 0.00,
    method: 'TRANSFERENCIA BN',
    issue_date: '',
  });
  const createPayment = (paymentData) => {
    const paymentStructure = {
      saleId: sale.id,
      payment: paymentData,
    };
    dispatch(addPayment(paymentStructure));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPayment(formData);
    // Reset form after submit
    setFormData({
      transaction_number: '',
      amount: '',
      method: 'TRANSFERENCIA BN',
      issue_date: '',
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2">
      <h2>
        Registro de pago
        {' '}
        {sale.customer.nombre}
        {' '}
        {sale.customer.primerApellido}
      </h2>
      <input
        type="text"
        name="transaction_number"
        placeholder="Numero de transaccion"
        value={formData.transaction_number}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        step="0.01"
        name="amount"
        placeholder="Monto"
        value={formData.amount === 0 ? 'Monto' : formData.amount}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="method"
        placeholder="Metodo"
        value={formData.method}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        lang="en-GB"
        name="issue_date"
        placeholder="FECHA PAGO"
        value={formData.issue_date}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Guardar Pago
      </button>
    </form>
  );
};

export default PaymentForm;
