import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadInvoicePDF(
  elementId: string,
  invoiceNumber: string,
  isPro: boolean = false
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Preview element not found');
  }

  // Use html2canvas to render the preview DOM element to canvas
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');

  // A4 dimensions in mm: 210 x 297
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
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      'Generated with InvoiceFree.app — Upgrade to Pro to remove watermark',
      pdfWidth / 2,
      pdfHeight - 6,
      { align: 'center' }
    );
  }

  const filename = `${(invoiceNumber || 'invoice').toLowerCase().replace(/[^a-z0-9_-]/g, '-')}.pdf`;
  pdf.save(filename);
}
