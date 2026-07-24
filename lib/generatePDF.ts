export async function downloadInvoicePDF(
  elementId: string,
  invoiceNumber: string,
  isPro: boolean = false
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Preview element not found');
  }

  // Dynamic imports for client-only execution
  const html2canvasModule = await import('html2canvas');
  const jsPDFModule = await import('jspdf');

  const html2canvas = html2canvasModule.default || html2canvasModule;
  const jsPDF = jsPDFModule.default || jsPDFModule;

  // Clone element or render with clean scale
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 1200,
  });

  const imgData = canvas.toDataURL('image/png');

  // A4 size: 210mm x 297mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pdfHeight));

  // Add watermark if free user
  if (!isPro) {
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      'Generated with InvoiceFree.app — Upgrade to Pro to remove watermark',
      pdfWidth / 2,
      pdfHeight - 5,
      { align: 'center' }
    );
  }

  const cleanNum = (invoiceNumber || 'invoice').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  pdf.save(`${cleanNum}.pdf`);
}
