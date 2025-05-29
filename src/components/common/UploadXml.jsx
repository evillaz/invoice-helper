import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { XMLParser } from 'fast-xml-parser';
import MotorcyclesTable from '../motorcycles/MotorcycleTable';
import SaveMotorcyclesButton from '../motorcycles/SaveMotorcyclesButton';

const UploadXml = () => {
  const [error, setError] = useState('');
  const [xmlMotorcycles, setXmlMotorcycles] = useState([]);
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const handleFileUpload = (event) => {
    const { files } = event.target;
    const inputElement = event.target;

    Array.from(files).forEach((file) => {
      if (!file) return;

      if (file.type !== 'text/xml' && !file.name.endsWith('.xml')) {
        setError('Please upload a valid XML file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new XMLParser();
          const jsonObj = parser.parse(e.target.result);
          const additionalProps = jsonObj?.Invoice?.['ext:UBLExtensions']?.['ext:UBLExtension']?.[0]
            ?.['ext:ExtensionContent']?.['biz:AdditionalInformation']
            ?.['biz:AdditionalProperty'] || [];

          const uniqueAdditionalProps = additionalProps.reduce((acc, item) => {
            if (!acc.some((existing) => existing['cdc:ID'] === item['cdc:ID'])) {
              acc.push(item);
            }
            return acc;
          }, []);

          const issueDate = jsonObj?.Invoice?.['cbc:IssueDate'];
          const payableAmount = jsonObj?.Invoice?.['cac:LegalMonetaryTotal']?.['cbc:PayableAmount'];
          const invoiceID = jsonObj?.Invoice?.['cbc:ID'];

          const invoicePattern = /^(FC|FE)\d+-\d+$/;

          const validInvoiceID = invoiceID && invoicePattern.test(invoiceID) ? { 'cbc:ID': invoiceID } : null;

          const desiredOrder = [9074, 9249, 9071, 9073, 9072, 9394, 9070];
          const attributeMapping = {
            9074: 'modelo',
            9249: 'marca',
            9071: 'color',
            9073: 'numero_de_chasis',
            9072: 'numero_de_motor',
            9394: 'dua',
            9070: 'anio',
          };

          const getModelFromDescription = () => {
            const description = jsonObj?.Invoice?.['cac:InvoiceLine']?.['cac:Item']?.['cbc:Description'];
            return description;
          };
          const backupModel = getModelFromDescription();

          const filtered = uniqueAdditionalProps
            .filter((item) => Object.keys(attributeMapping).includes(String(item['cdc:ID'])))
            .map((item) => ({
              ...item,
              attribute: attributeMapping[item['cdc:ID']],
            }));

          const hasModelo = filtered.some((item) => item['cdc:ID'] === 9074 && item['cdc:Value']);

          if (!hasModelo && backupModel) {
            filtered.push({
              'cdc:ID': 9074,
              'cdc:Value': backupModel,
              attribute: 'modelo',
            });
          }

          const sortedFiltered = filtered.sort(
            (a, b) => desiredOrder.indexOf(a['cdc:ID']) - desiredOrder.indexOf(b['cdc:ID']),
          );

          const finalObject = sortedFiltered.reduce((acc, item) => {
            acc[item.attribute] = item['cdc:Value'];
            return acc;
          }, {});
          finalObject.fecha_emision = issueDate;
          finalObject.importe = payableAmount;

          const result = validInvoiceID
            ? { factura: invoiceID, ...finalObject }
            : finalObject;

          setXmlMotorcycles((prev) => [...prev, result]);
          setError('');
        } catch (err) {
          setError('Error parsing XML file.');
        }
      };
      reader.readAsText(file);
      inputElement.value = '';
    });
  };
  const newMotorcycles = xmlMotorcycles.filter(
    (newMotorcycle) => !motorcycles.some(
      (existingMotorcycle) => existingMotorcycle.factura === newMotorcycle.factura,
    ),
  );

  return (
    <div className="upload-xml">
      <h2 className="text-xl font-bold mb-2">Upload XML File</h2>
      <input type="file" multiple accept=".xml" onChange={handleFileUpload} className="mb-3" />
      {error && <p className="text-red-500">{error}</p>}
      {newMotorcycles.length > 0
        ? (
          <MotorcyclesTable motorcycles={newMotorcycles} />
        ) : (
          <p>No hay motos nuevas o son duplicadas</p>
        )}
      <SaveMotorcyclesButton newMotorcycles={newMotorcycles} />
    </div>
  );
};

export default UploadXml;
