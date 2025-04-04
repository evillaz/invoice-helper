const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Readable } = require('stream');

// Path to your CSV file
const csvFilePath = path.join(__dirname, 'UBIGEOS_2022_1891_distritos.csv');
const fileContent = fs.readFileSync(csvFilePath, 'utf8');

// This object will hold the nested structure
const results = {};

// Read and parse the CSV
Readable.from(fileContent)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    const departamento = row.NOMBDEP?.trim().toUpperCase();
    const provincia = row.NOMBPROV?.trim().toUpperCase();
    const distrito = row.NOMBDIST?.trim().toUpperCase();

    if (!results[departamento]) {
      results[departamento] = {};
    }

    if (!results[departamento][provincia]) {
      results[departamento][provincia] = [];
    }

    // Avoid duplicate districts
    if (!results[departamento][provincia].includes(distrito)) {
      results[departamento][provincia].push(distrito);
    }
  })
  .on('end', () => {
    // Transform the results into desired JSON format
    const output = Object.entries(results).map(([departamento, provincias]) => ({
      departamento,
      provincias: Object.entries(provincias).map(([provincia, distritos]) => ({
        provincia,
        distritos,
      })),
    }));

    // Write to a JSON file
    const outputPath = path.join(__dirname, '../../public/ubigeo_peru.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

    console.log('✅ JSON file has been created at:', outputPath);
  });
