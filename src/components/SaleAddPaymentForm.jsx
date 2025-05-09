import PropTypes from 'prop-types';
import { useState } from 'react';

const SaleAddPaymentForm = ({ onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    transaction_number: '',
    amount: 0.00,
    method: 'TRANSFERENCIA BN',
    issue_date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submit
    setFormData({ transaction_number: '', amount: '', issue_date: '' });
    setShowForm(false);
  };

  return (
    <td>
      {!showForm ? (
        <button type="button" onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Payment
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 mt-2">
          <input
            type="text"
            name="transaction_number"
            placeholder="Transaction Number"
            value={formData.transaction_number}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            step="0.01"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="method"
            step="0.01"
            name="method"
            placeholder="Metodo"
            value={formData.method}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Save Payment
          </button>
        </form>
      )}
    </td>
  );
};

SaleAddPaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SaleAddPaymentForm;
