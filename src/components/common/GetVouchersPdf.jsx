import { useState } from 'react';
import jsPDF from 'jspdf';

const GetVouchersPdf = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageObjs = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
    }));
    setImages((prev) => [...prev, ...imageObjs]);
  };

  const downloadSinglePdf = (imageObj) => {
    const img = new Image();
    img.src = imageObj.url;

    img.onload = () => {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      let imgWidth = img.width;
      let imgHeight = img.height;

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight) * 0.9;

      imgWidth *= ratio;
      imgHeight *= ratio;

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
      pdf.save(`${imageObj.name}.pdf`);
    };
  };

  const handleDownloadAllPdfs = () => {
    if (images.length === 0) return;

    images.forEach((imageObj) => {
      downloadSinglePdf(imageObj);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />

      {images.length > 0 && (
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px',
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
            <img
              src={imgObj.url}
              alt={`Uploaded ${idx + 1}`}
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
            />
            <button
              type="button"
              onClick={() => downloadSinglePdf(imgObj)}
              style={{ marginTop: '10px', width: '100%', padding: '8px' }}
            >
              Download
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
        Download All as PDFs
      </button>
    </div>
  );
};

export default GetVouchersPdf;
