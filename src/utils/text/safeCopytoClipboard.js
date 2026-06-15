const safeCopytoClipboard = (description) => {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(description)
      .then(() => alert('Descripcion de moto para boleta copiada!'))
      .catch((err) => console.error('Failed to copy', err));
    return;
  }

  // 🧯 Fallback (compatibilidad total)
  const textarea = document.createElement('textarea');
  textarea.value = description;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
    alert('Descripcion de moto para boleta copiada!');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }

  document.body.removeChild(textarea);
};

export default safeCopytoClipboard;
