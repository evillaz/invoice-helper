import PropTypes from 'prop-types';

const CopySnippetButton = ({ customer, payments, amount }) => {
  const handleCopySnippet = () => {
    const {
      dni,
      primerApellido,
      segundoApellido,
      nombre,
      direccion,
      departamento,
      provincia,
      distrito,
    } = customer;

    console.log(payments);

    if (!Array.isArray(payments) || payments.length === 0) {
      alert('⚠️ No hay datos de pagos para generar el snippet.');
      return;
    }

    const snippet = `(() => {
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  const selectOptionByText = async (selector, text) => {
    const select = document.querySelector(selector);
    if (!select) return console.warn(\`⚠️ Select not found: \${selector}\`);
    const option = Array.from(select.options).find(
      opt => opt.text.trim().toLowerCase() === text.trim().toLowerCase() ||
             opt.value.trim().toLowerCase() === text.trim().toLowerCase()
    );
    if (option) {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      console.log(\`✅ Matched \${selector} -> \${option.text}\`);
      await wait(500); // wait 3 seconds before continuing
    } else {
      console.warn(\`⚠️ No match for "\${text}" in \${selector}\`);
      await wait(500); // still wait to keep sequence timing consistent
    }
  };

  (async () => {
    try {
      //COMPRADOR
      document.querySelector("#DDL_Co_tipo_docu1").value = "06";
      document.querySelector("#TxB_No_docu1").value = "${dni}";
      document.querySelector("#TxB_Ap_pate1").value = "${primerApellido}";
      document.querySelector("#TxB_Ap_mate1").value = "${segundoApellido}";
      document.querySelector("#TxB_Nomb1").value = "${nombre}";
      document.querySelector("#TxB_Addr1").value = "${direccion}";
      document.querySelector("#DDL_Co_esta_civl").value = "1";

      // --- Sequentially select each location with 3s waits ---
      await selectOptionByText("#DDL_Dep", "${departamento}");
      await selectOptionByText("#DDL_Prv", "${provincia}");
      await selectOptionByText("#DDL_Dst", "${distrito}");
      // SUBMIT
      document.querySelector("#IBt_AcepCtr").dispatchEvent(new Event("click", { bubbles: true }));
      document.querySelector("#IBt_AcepCtr").dispatchEvent(new Event("change", { bubbles: true }));
      await wait(500);
      // VENDEDOR
      document.querySelector("#DDL_Co_tipo_docu1_Comp").value = "06"; // DNI
      document.querySelector("#TxB_No_docu1_Comp").value = "19402795";

      // === Nombres y Apellidos ===
      document.querySelector("#TxB_Ap_pate1_Comp").removeAttribute("disabled");
      document.querySelector("#TxB_Ap_pate1_Comp").value = "QUIÑONES";
      document.querySelector("#TxB_Ap_mate1_Comp").removeAttribute("disabled");
      document.querySelector("#TxB_Ap_mate1_Comp").value = "SILVA";
      document.querySelector("#TxB_Nomb1_Comp").removeAttribute("disabled");
      document.querySelector("#TxB_Nomb1_Comp").value = "MACARIO";

      // === Domicilio ===
      document.querySelector("#TxB_Addr1_Comp").value = "JR. BOLIVAR 289";

      // === Ubicación (Departamento / Provincia / Distrito) ===
      await selectOptionByText("#DDL_Dep_Comp", "LA LIBERTAD");
      await selectOptionByText("#DDL_Prv_Comp", "PATAZ");
      await selectOptionByText("#DDL_Dst_Comp", "TAYABAMBA");

      // === Estado Civil ===
      document.querySelector("#DDL_Co_esta_civl_Comp").value = "1"; // Soltero
      console.log("✅ Form fields successfully filled!");
      document.querySelector("#IBt_AcepCtr_Comp").dispatchEvent(new Event("click", { bubbles: true }));
      document.querySelector("#IBt_AcepCtr_Comp").dispatchEvent(new Event("change", { bubbles: true }));
      await wait(500);

      // PAGOS

      document.querySelector("#TextBox1").value = "1";

      document.querySelector("#TextBox2").value = "${amount}";
      document.querySelector("#cboFormaPago").value = "2";
      document.querySelector("#RdoSex_1").checked = "checked";
      document.querySelector("#RdoSex_1").dispatchEvent(new Event("click", { bubbles: true }));
      document.querySelector("#RdoSex_1").dispatchEvent(new Event("change", { bubbles: true }));
      await wait(500);
      ${payments
    .map(
      (p, i) => `
  console.log("🧾 Filling payment ${i + 1}...");
  await selectOptionByText("#mp20", "Depósito en cuenta");
  await selectOptionByText("#mp21", "SOLES");
  document.querySelector("#mp22").value = "${p.amount}";
  document.querySelector("#mp22").dispatchEvent(new Event("input", { bubbles: true }));
  await wait(500);
  await selectOptionByText("#mp23", "Banco de la Nación");
  document.querySelector("#mp24").value = "${p.transaction_number}";
  document.querySelector("#mp24").dispatchEvent(new Event("input", { bubbles: true }));
  await wait(500);
  document.querySelector("#mp25").value = "${p.issue_date}";
  document.querySelector("#mp25").dispatchEvent(new Event("change", { bubbles: true }));
  console.log("✅ Payment ${i + 1} done.");
  `,
    )
    .join('\n')}
    document.querySelector("#txtEmail2").value = "JHEMIS_63@HOTMAIL.COM";
  console.log("🎉 All payments completed!");
    } catch (err) {
      console.error("⚠️ Error filling form:", err);
    }
  })();
})();`;

    navigator.clipboard.writeText(snippet)
      .then(() => alert('JS autofill snippet copiado!'))
      .catch((err) => console.error('Failed to copy snippet', err));
  };

  return (
    <td>
      <button
        type="button"
        onClick={handleCopySnippet}
        className="description-button"
      >
        Copiar Snippet
      </button>
    </td>
  );
};

CopySnippetButton.propTypes = {
  customer: PropTypes.shape({
    dni: PropTypes.string.isRequired,
    primerApellido: PropTypes.string.isRequired,
    segundoApellido: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
    departamento: PropTypes.string.isRequired,
    provincia: PropTypes.string.isRequired,
    distrito: PropTypes.string.isRequired,
  }).isRequired,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      issue_date: PropTypes.string,
      transaction_number: PropTypes.string,
    }).isRequired,
  ).isRequired,
  amount: PropTypes.number.isRequired,
};

export default CopySnippetButton;
