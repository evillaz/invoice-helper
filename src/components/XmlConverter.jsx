import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addXMLMotorcycles } from '../redux/motorcyclesSlice';
import MotorcyclesTable from './MotorcycleTable';
import SearchBar from './SearchBar';
import SaveMotorcyclesButton from './SaveMotorcyclesButton';

const XMLUploader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

          const getModelFromDescription = (jsonObj) => {
            const description = jsonObj?.Invoice?.['cac:InvoiceLine']?.['cac:Item']?.['cbc:Description'];
            return description;
          };
          const backupModel = getModelFromDescription(jsonObj);

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
          const result = validInvoiceID
            ? { factura: invoiceID, ...finalObject }
            : finalObject;
          dispatch(addXMLMotorcycles([result]));
          setError('');
        } catch (err) {
          setError('Error parsing XML file.');
        }
      };
      reader.readAsText(file);
      inputElement.value = '';
    });
  };

  const filteredMotorcycles = motorcycles.filter((motorcycle) => {
    const invoiceId = motorcycle?.factura;
    return (
      selectedMotorcycles.some((selected) => selected.factura === invoiceId)
      || Object.values(motorcycle).some((item) => typeof item === 'string' && item.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-2">Upload XML File</h2>
      <input type="file" multiple accept=".xml" onChange={handleFileUpload} className="mb-3" />

      {error && <p className="text-red-500">{error}</p>}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate('/poaGenerator')}
        disabled={selectedMotorcycles.length === 0}
      >
        Generate POA
      </button>
      <SaveMotorcyclesButton />
      {motorcycles.length > 0 && (
        <MotorcyclesTable motorcycles={filteredMotorcycles} />
      )}
    </div>
  );
};

export default XMLUploader;
