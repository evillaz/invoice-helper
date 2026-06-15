import PropTypes from 'prop-types';
import getIgvValue from '../../utils/calculations/getIgvValue';
import safeCopytoClipboard from '../../utils/text/safeCopytoClipboard';

const CopyElectronicInvoiceSnippetButton = ({ motorcycle, amount }) => {
  const handleCopySnippet = () => {
    const {
      modelo,
      marca,
      numero_de_chasis,
      numero_de_motor,
      dua,
      anio,
    } = motorcycle;

    const description = `Modelo: ${modelo} / Marca: ${marca} / `
      + `Numero de chasis: ${numero_de_chasis} / `
      + `Numero de motor: ${numero_de_motor} / `
      + `DUA: ${dua} / Año: ${anio}`;

    const price = getIgvValue(amount);

    const snippet = `(() => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));

      const waitFor = async (selector, timeout = 5000) => {
        const start = Date.now();
        while (!document.querySelector(selector)) {
          if (Date.now() - start > timeout) {
            throw new Error("Timeout waiting for " + selector);
          }
          await wait(100);
        }
        return document.querySelector(selector);
      };

      (async () => {
        try {
          console.log('▶️ Clicking "Adicionar" button...');

          // 1️⃣ Click "Adicionar"
          const addButton = await waitFor('#boleta\\\\.addItemButton');
          addButton.dispatchEvent(new Event('click', { bubbles: true }));
          await wait(800); // give Dijit time to render modal

          console.log('▶️ Selecting "Bien"...');

          // 2️⃣ Select "Bien" radio
          const bienRadio = await waitFor('#item\\\\.subTipoTI01');
          bienRadio.checked = true;
          bienRadio.dispatchEvent(new Event('click', { bubbles: true }));
          bienRadio.dispatchEvent(new Event('change', { bubbles: true }));
          await wait(500);

          console.log('▶️ Filling description...');

          // 3️⃣ Fill description textarea
          const descripcion = await waitFor('#item\\\\.descripcion');
          descripcion.value = "${description}";
          descripcion.dispatchEvent(new Event('input', { bubbles: true }));
          descripcion.dispatchEvent(new Event('change', { bubbles: true }));
          await wait(500);

          console.log('▶️ Filling unit price...');

          // 4️⃣ Fill price
          const precio = await waitFor('#item\\\\.precioUnitario');
          precio.value = "${price}";
          precio.dispatchEvent(new Event('input', { bubbles: true }));
          precio.dispatchEvent(new Event('change', { bubbles: true }));
          precio.dispatchEvent(new Event('blur', { bubbles: true }));
          precio.dispatchEvent(new Event('focusout', { bubbles: true }));
          await wait(500);

          console.log('▶️ Clicking Aceptar...');

          // 5️⃣ Click accept
          const acceptButton = await waitFor('#item\\\\.botonAceptar');
          acceptButton.dispatchEvent(new Event('click', { bubbles: true }));

          console.log('✅ Item added successfully');

          } catch (err) {
          console.error('❌ Error during item automation:', err);
        }
      })();
    })();`;
    safeCopytoClipboard(snippet);
  };

  return (
    <td>
      <button
        type="button"
        onClick={handleCopySnippet}
        className="description-button"
      >
        Copiar Snippet Boleta
      </button>
    </td>
  );
};

CopyElectronicInvoiceSnippetButton.propTypes = {
  motorcycle: PropTypes.shape({
    factura: PropTypes.string.isRequired,
    modelo: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    numero_de_chasis: PropTypes.string.isRequired,
    numero_de_motor: PropTypes.string.isRequired,
    dua: PropTypes.string.isRequired,
    anio: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
};

export default CopyElectronicInvoiceSnippetButton;
