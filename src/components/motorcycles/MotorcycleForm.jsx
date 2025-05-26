import { useState } from 'react';

const MotorcycleForm = () => {
  const [anio, setAnio] = useState(0);
  const [color, setColor] = useState('');
  const [dua, setDua] = useState('');
  const [factura, setFactura] = useState('');
  const [fechaEmision, setFechaEmision] = useState(new Date());
  const [importe, setImporte] = useState(0.00);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [numChasis, setNumChasis] = useState('');
  const [numMotor, setNumMotor] = useState('');
  const [newMotorcycles, setNewMotorcycles] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      anio,
      color,
      dua,
      factura,
      fecha_emision: fechaEmision,
      importe,
      marca,
      modelo,
      numero_de_chasis: numChasis,
      numero_de_motor: numMotor,
    };
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="factura">
          Factura:
          <input
            type="text"
            id="factura"
            value={factura}
            onChange={(e) => setFactura(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="anio">
          Año:
          <input
            type="number"
            id="anio"
            value={anio}
            onChange={(e) => setAnio(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <div>
        <label htmlFor="color">
          Color:
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="dua">
          DUA:
          <input
            type="text"
            id="dua"
            value={dua}
            onChange={(e) => setDua(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="fechaEmision">
          Fecha de Emisión:
          <input
            type="date"
            id="fechaEmision"
            value={fechaEmision.toISOString().split('T')[0]}
            onChange={(e) => setFechaEmision(new Date(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label htmlFor="importe">
          Importe:
          <input
            type="number"
            id="importe"
            step="0.01"
            value={importe}
            onChange={(e) => setImporte(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label htmlFor="marca">
          Marca:
          <input
            type="text"
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="modelo">
          Modelo:
          <input
            type="text"
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="numChasis">
          N° de Chasis:
          <input
            type="text"
            id="numChasis"
            value={numChasis}
            onChange={(e) => setNumChasis(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="numMotor">
          N° de Motor:
          <input
            type="text"
            id="numMotor"
            value={numMotor}
            onChange={(e) => setNumMotor(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MotorcycleForm;
