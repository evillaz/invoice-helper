import React, { useEffect, useState } from 'react';

interface Provincia {
  provincia: string;
  distritos: string[];
}

interface DepartamentoData {
  departamento: string;
  provincias: Provincia[];
}

interface UbigeoFormProps {
  selectedDepartamento: string;
  onChangeDepartamento: (value: string) => void;
  selectedProvincia: string;
  onChangeProvincia: (value: string) => void;
  selectedDistrito: string;
  onChangeDistrito: (value: string) => void;
}

const UbigeoForm: React.FC<UbigeoFormProps> = ({
  selectedDepartamento,
  onChangeDepartamento,
  selectedProvincia,
  onChangeProvincia,
  selectedDistrito,
  onChangeDistrito,
}) => {
  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [distritos, setDistritos] = useState<string[]>([]);
  const [ubigeoData, setUbigeoData] = useState<DepartamentoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ubigeo_peru.json'); // Archivo JSON en carpeta public
        const data: DepartamentoData[] = await response.json();
        setUbigeoData(data);
        setDepartamentos(data.map((d) => d.departamento));
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
    setDistritos([]); // Resetea distritos cuando cambia departamento o provincia
  }, [selectedDepartamento, departamentos, ubigeoData]);

  useEffect(() => {
    const provincia = provincias.find((p) => p.provincia === selectedProvincia);
    setDistritos(provincia ? provincia.distritos : []);
  }, [selectedProvincia, provincias]);

  return (
    <>
      <div>
        <label htmlFor="departamento">
          Departamento:
          <select
            id="departamento"
            value={selectedDepartamento}
            onChange={(e) => onChangeDepartamento(e.target.value)}
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
            onChange={(e) => onChangeProvincia(e.target.value)}
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
            onChange={(e) => onChangeDistrito(e.target.value)}
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
    </>
  );
};

export default UbigeoForm;
