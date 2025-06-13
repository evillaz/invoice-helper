import React from 'react';

const Boleta = () => (
  <div className="receipt-container">
    <header className="receipt-header">
      <div className="company-info">
        <strong>QUIÑONES SILVA MACARIO</strong>
        <br />
        CAL. SIMON BOLIVAR 287 PUEBLO TAYABAMBA
        <br />
        TAYABAMBA - PATAZ - LA LIBERTAD
      </div>
      <div className="receipt-box">
        <div>BOLETA DE VENTA ELECTRONICA</div>
        <div>RUC: 10194027953</div>
        <div>EB01-358</div>
      </div>
    </header>

    <section className="receipt-details">
      <div>
        <strong>Fecha de Vencimiento:</strong>
        {' '}
        19/12/2024
      </div>
      <div>
        <strong>Fecha de Emisión:</strong>
        {' '}
        19/12/2024
      </div>
      <div>
        <strong>Señor(es):</strong>
        {' '}
        JEIMER DIMAS ZEGARRA JARA
      </div>
      <div>
        <strong>DNI:</strong>
        {' '}
        46229643
      </div>
      <div>
        <strong>Tipo de Moneda:</strong>
        {' '}
        SOLES
      </div>
      <div>
        <strong>Observación:</strong>
        {' '}
      </div>
    </section>

    <table className="receipt-table">
      <thead>
        <tr>
          <th>Cantidad</th>
          <th>Unidad Medida</th>
          <th>Descripción</th>
          <th>Valor Unitario</th>
          <th>Descuento</th>
          <th>Importe de Venta</th>
          <th>ICBPER</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1.00</td>
          <td>UNIDAD</td>
          <td className="descripcion-cell">
            MODELO X-TREMO-A 200
            <br />
            MARCA: RONCO
            <br />
            COLOR: NEGRO
            <br />
            NUMERO DE CHASIS: LHJYCLLBCN815974
            <br />
            NUMERO DE MOTOR: 169FML22B06003
            <br />
            DUA: 118-2022-10-164376
            <br />
            AÑO: 2022
          </td>
          <td>3813.56</td>
          <td>0.00</td>
          <td>4500.0008</td>
          <td>0.00</td>
        </tr>
      </tbody>
    </table>

    <section className="totals-section">
      <div className="totals-left">
        <p>SON: CUATRO MIL QUINIENTOS Y 00/100 SOLES</p>
      </div>
      <div className="totals-right">
        <table>
          <tbody>
            <tr>
              <td>Op. Gravada:</td>
              <td>S/ 3,813.56</td>
            </tr>
            <tr>
              <td>Op. Exonerada:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr>
              <td>Op. Inafecta:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr>
              <td>ISC:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr>
              <td>IGV:</td>
              <td>S/ 686.44</td>
            </tr>
            <tr>
              <td>ICBPER:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr>
              <td>Otros Cargos:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr>
              <td>Otros Tributos:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr>
              <td>Monto de Redondeo:</td>
              <td>S/ 0.00</td>
            </tr>
            <tr className="bold">
              <td>Importe Total:</td>
              <td>S/ 4,500.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <footer className="receipt-footer" />
  </div>
);

export default Boleta;
