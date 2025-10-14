import { useState } from 'react';
import jsPDF from 'jspdf';
/* eslint-disable import/no-extraneous-dependencies */
import EXIF from 'exif-js';
import { useSale } from '../../context/SaleContext';

const GetVouchersPdf = () => {
  const { sale } = useSale();
  const fileName = (
    sale.customer.primerApellido + sale.customer.segundoApellido + sale.customer.nombre)
    .replace(/\.[^/.]+$/, '')
    .replace(/\s+/g, '');
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageObjs = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: fileName,
    }));
    setImages((prev) => [...prev, ...imageObjs]);
  };

  const loadImageCorrected = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        EXIF.getData(img, function handleExif() {
          const orientation = EXIF.getTag(this, 'Orientation');
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const { width } = img;
          const { height } = img;

          // Adjust canvas for rotation
          if (orientation >= 5 && orientation <= 8) {
            canvas.width = height;
            canvas.height = width;
          } else {
            canvas.width = width;
            canvas.height = height;
          }

          // Apply EXIF rotation
          switch (orientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break; // iPhone portrait fix
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
          }

          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  const downloadSinglePdf = async (imageObj) => {
    const dataUrl = await loadImageCorrected(imageObj.file);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = dataUrl;
    await new Promise((r) => { img.onload = r; });

    const ratio = Math.min(pageWidth / img.width, pageHeight / img.height) * 0.9;
    const imgWidth = img.width * ratio;
    const imgHeight = img.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(dataUrl, 'JPEG', x, y, imgWidth, imgHeight);
    pdf.save(`voucher-${imageObj.name}.pdf`);
  };

  const handleDownloadAllPdfs = async () => {
    if (images.length === 0) return;

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

    // Preload all images and orientations concurrently
    const processedImages = await Promise.all(
      images.map(async (imageObj) => {
        const dataUrl = await loadImageCorrected(imageObj.file);
        const img = new Image();
        img.src = dataUrl;
        await new Promise((r) => { img.onload = r; });
        return { img, dataUrl };
      }),
    );

    processedImages.forEach(({ img, dataUrl }, i) => {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height) * 0.9;
      const imgWidth = img.width * ratio;
      const imgHeight = img.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(dataUrl, 'JPEG', x, y, imgWidth, imgHeight);
    });

    pdf.save(`vouchers-${fileName}.pdf`);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <td style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />

      {images.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          {images.map((imgObj, idx) => (
            <div key={idx} style={{ position: 'relative', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                }}
              >
                X
              </button>
              <button
                type="button"
                onClick={() => downloadSinglePdf(imgObj)}
                style={{ marginTop: '10px', width: '100%', padding: '8px' }}
              >
                DESCARGAR
                {' '}
                {imgObj.name}
                .pdf
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleDownloadAllPdfs}
        disabled={images.length === 0}
        style={{ marginTop: '20px', width: '100%', padding: '10px' }}
      >
        DESCARGAR TODO EN UN SOLO PDF
      </button>
    </td>
  );
};

export default GetVouchersPdf;
