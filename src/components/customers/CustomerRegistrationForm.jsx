import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UbigeoForm from './UbigeoForm';
import CustomerDataForm from './CustomerDataForm';
import { saveCustomerToDB } from '../../redux/customersSlice';

const CustomerRegistrationForm = () => {
  const dispatch = useDispatch();
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [selectedDistrito, setSelectedDistrito] = useState('');
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [dni, setDni] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading

    const formData = {
      nombre,
      primerApellido,
      segundoApellido,
      dni,
      direccion,
      departamento: selectedDepartamento,
      provincia: selectedProvincia,
      distrito: selectedDistrito,
    };
    dispatch(saveCustomerToDB(formData));
    setNombre('');
    setPrimerApellido('');
    setSegundoApellido('');
    setDni('');
    setDireccion('');
    setSelectedDepartamento('');
    setSelectedProvincia('');
    setSelectedDistrito('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomerDataForm
        nombre={nombre}
        onChangeNombre={setNombre}
        primerApellido={primerApellido}
        onChangePrimerApellido={setPrimerApellido}
        segundoApellido={segundoApellido}
        onChangeSegundoApellido={setSegundoApellido}
        dni={dni}
        onChangeDni={setDni}
        direccion={direccion}
        onChangeDireccion={setDireccion}
      />
      <UbigeoForm
        selectedDepartamento={selectedDepartamento}
        onChangeDepartamento={setSelectedDepartamento}
        selectedProvincia={selectedProvincia}
        onChangeProvincia={setSelectedProvincia}
        selectedDistrito={selectedDistrito}
        onChangeDistrito={setSelectedDistrito}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CustomerRegistrationForm;
