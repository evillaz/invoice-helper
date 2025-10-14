import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTitle } from '../../redux/salesSlice';
import { useSale } from '../../context/SaleContext';

const TitleForm = () => {
  const { sale } = useSale();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title_number: 0,
    password: '',
  });
  const createTitle = (titleData) => {
    const titleStructure = {
      saleId: sale.id,
      title: titleData,
    };
    dispatch(addTitle(titleStructure));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTitle(formData);
    // Reset form after submit
    setFormData({
      title_number: 0,
      password: '',
    });
    console.log(sale);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2">
      <h2>
        Registro de titulo
        {' '}
        {sale.customer.nombre}
        {' '}
        {sale.customer.primerApellido}
      </h2>
      <input
        type="number"
        name="title_number"
        placeholder="Numero de titulo"
        value={formData.title_number === 0 ? 'Numero de titulo' : formData.title_number}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save Title
      </button>
    </form>
  );
};

export default TitleForm;
