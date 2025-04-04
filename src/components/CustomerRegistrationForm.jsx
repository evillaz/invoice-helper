import React, { useState, useEffect } from 'react';

const CustomerRegistrationForm = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [selectedDistrito, setSelectedDistrito] = useState('');
  const [ubigeoData, setUbigeoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ubigeo_peru.json'); // Assuming the file is in the public folder
        const data = await response.json();
        setUbigeoData(data);
        setDepartamentos(data.map((d) => d.departamento)); // Set departments
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const departamento = departamentos.find((d) => d === selectedDepartamento);
    const provincias = departamento
      ? ubigeoData.find((d) => d.departamento === selectedDepartamento)?.provincias || []
      : [];
    setProvincias(provincias);
    setDistritos([]); // Reset districts when department or province changes
  }, [selectedDepartamento, departamentos, ubigeoData]);

  useEffect(() => {
    const provincia = provincias.find((p) => p.provincia === selectedProvincia);
    setDistritos(provincia ? provincia.distritos : []);
  }, [selectedProvincia, provincias]);

  return (
    <form>
      <div>
        <label htmlFor="departamento">
          Departamento:
          <select
            id="departamento"
            value={selectedDepartamento}
            onChange={(e) => setSelectedDepartamento(e.target.value)}
          >
            <option value="">Select Departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento} value={departamento}>
                {departamento}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="provincia">
          Provincia:
          <select
            id="provincia"
            value={selectedProvincia}
            onChange={(e) => setSelectedProvincia(e.target.value)}
            disabled={provincias.length === 0}
          >
            <option value="">Select Provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia.provincia} value={provincia.provincia}>
                {provincia.provincia}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="distrito">
          Distrito:
          <select
            id="distrito"
            value={selectedDistrito}
            onChange={(e) => setSelectedDistrito(e.target.value)}
            disabled={distritos.length === 0}
          >
            <option value="">Select Distrito</option>
            {distritos.map((distrito) => (
              <option key={distrito} value={distrito}>
                {distrito}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
};

export default CustomerRegistrationForm;
