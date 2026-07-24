export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  // Sender
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  senderPhone: string;
  senderLogo: string; // base64 or URL

  // Recipient
  clientName: string;
  clientEmail: string;
  clientAddress: string;

  // Meta
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: string;

  // Table & Math
  items: LineItem[];
  subtotal: number;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  taxRate: number;
  total: number;

  // Notes
  notes: string;
  paymentInstructions: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}
