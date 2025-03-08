import React, { useState } from "react";
import { XMLParser } from "fast-xml-parser";
import InvoicesTable from "./InvoicesTable";

const XMLUploader = () => {
  const [invoices, setInvoices] = useState([]); // Store multiple invoices  const [error, setError] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Validate file type
    if (file.type !== "text/xml" && !file.name.endsWith(".xml")) {
      setError("Please upload a valid XML file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new XMLParser();
        const jsonObj = parser.parse(e.target.result);

        // Extraer propiedades adicionales
        const additionalProps =
          jsonObj?.Invoice?.["ext:UBLExtensions"]?.["ext:UBLExtension"]?.[0]
            ?.["ext:ExtensionContent"]?.["biz:AdditionalInformation"]
            ?.["biz:AdditionalProperty"] || [];

        // Filtrar elementos con los ID específicos
        const filtered = additionalProps.filter((item) =>
          [9074, 9249, 9071, 9073, 9072, 9394, 9070].includes(item["cdc:ID"])
        );
        const desiredOrder = [9074, 9249, 9071, 9073, 9072, 9394, 9070];

        const sortedFiltered = filtered.sort((a, b) => {
          return desiredOrder.indexOf(a["cdc:ID"]) - desiredOrder.indexOf(b["cdc:ID"]);
        });
        setInvoices((prevInvoices) => [...prevInvoices, sortedFiltered]); // Append to array

        setError(""); // Limpiar errores previos
      } catch (err) {
        setError("Error parsing XML file.");
      }
    };
    
    reader.readAsText(file);
  };
  

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-2">Upload XML File</h2>

      <input type="file" accept=".xml" onChange={handleFileUpload} className="mb-3" />

      {error && <p className="text-red-500">{error}</p>}

      {invoices !==[] && (
        <InvoicesTable invoices={invoices} />

        /*<div className="bg-gray-100 p-2 mt-3 rounded text-sm">
          <h3 className="font-semibold">Filtered Data:</h3>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                <strong>ID {item["cdc:ID"]}:</strong> {item["cdc:Value"]}
              </li>
            ))}
          </ul>
        </div> */
      )}
    </div>
  );
};

export default XMLUploader;