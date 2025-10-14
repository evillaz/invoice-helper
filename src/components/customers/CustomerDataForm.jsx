import PropTypes from 'prop-types';
import React from 'react';

const CustomerDataForm = ({
  nombre, onChangeNombre, primerApellido, onChangePrimerApellido, segundoApellido,
  onChangeSegundoApellido, dni, onChangeDni, direccion, onChangeDireccion,
}) => (
  <>
    <div>
      <label htmlFor="dni">
        DNI:
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => onChangeDni(e.target.value)}
        />
      </label>
    </div>
    <div>
      <label htmlFor="primerApellido">
        Primer Apellido:
        <input
          type="text"
          id="primerApellido"
          value={primerApellido}
          onChange={(e) => onChangePrimerApellido(e.target.value.toUpperCase())}
        />
      </label>
    </div>
    <div>
      <label htmlFor="segundoApellido">
        Segundo Apellido:
        <input
          type="text"
          id="segundoApellido"
          value={segundoApellido}
          onChange={(e) => onChangeSegundoApellido(e.target.value.toUpperCase())}
        />
      </label>
    </div>
    <div>
      <label htmlFor="nombre">
        Nombre:
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => onChangeNombre(e.target.value.toUpperCase())}
        />
      </label>
    </div>
    <div>
      <label htmlFor="direccion">
        Dirección:
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => onChangeDireccion(e.target.value.toUpperCase())}
        />
      </label>
    </div>
  </>
);

CustomerDataForm.propTypes = {
  nombre: PropTypes.string.isRequired,
  onChangeNombre: PropTypes.func.isRequired,
  primerApellido: PropTypes.string.isRequired,
  onChangePrimerApellido: PropTypes.func.isRequired,
  segundoApellido: PropTypes.string.isRequired,
  onChangeSegundoApellido: PropTypes.func.isRequired,
  dni: PropTypes.string.isRequired,
  onChangeDni: PropTypes.func.isRequired,
  direccion: PropTypes.string.isRequired,
  onChangeDireccion: PropTypes.func.isRequired,
};

export default CustomerDataForm;
