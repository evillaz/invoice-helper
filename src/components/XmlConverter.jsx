import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addInvoices } from '../redux/invoiceSlice';
import InvoicesTable from './InvoicesTable';
import SearchBar from './SearchBar';

const XMLUploader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices.invoices);
  const selectedInvoices = useSelector((state) => state.invoices.selectedInvoices);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (event) => {
    const { files } = event.target;
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
            9074: 'Modelo',
            9249: 'Marca',
            9071: 'Color',
            9073: 'Numero de Chasis',
            9072: 'Numero de Motor',
            9394: 'DUA',
            9070: 'Año',
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
              attribute: 'Modelo',
            });
          }

          const sortedFiltered = filtered.sort(
            (a, b) => desiredOrder.indexOf(a['cdc:ID']) - desiredOrder.indexOf(b['cdc:ID']),
          );

          const result = validInvoiceID ? [validInvoiceID, ...sortedFiltered] : filtered;

          dispatch(addInvoices([result]));
          setError('');
        } catch (err) {
          setError('Error parsing XML file.');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    });
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceIdObj = invoice.find((item) => item['cbc:ID']);
    const invoiceId = invoiceIdObj ? invoiceIdObj['cbc:ID'] : null;

    const isSelected = selectedInvoices.some(
      (selectedInvoice) => selectedInvoice[0]['cbc:ID'] === invoiceId,
    );

    return isSelected || invoice.some((item) => String(item['cdc:Value']).toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-2">Upload XML File</h2>
      <input type="file" multiple accept=".xml" onChange={handleFileUpload} className="mb-3" />

      {error && <p className="text-red-500">{error}</p>}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate('/poaGenerator')}
        disabled={selectedInvoices.length === 0}
      >
        Generate POA
      </button>

      {invoices.length > 0 && (
        <InvoicesTable invoices={filteredInvoices} />
      )}
    </div>
  );
};

export default XMLUploader;
