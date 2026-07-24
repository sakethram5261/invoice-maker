import { InvoiceData } from './types';

const STORAGE_KEY_INVOICE = 'invoicefree_current_draft';
const STORAGE_KEY_COUNT = 'invoicefree_monthly_count';
const STORAGE_KEY_MONTH = 'invoicefree_count_month';
const STORAGE_KEY_PRO = 'invoicefree_pro_key';

export const DEFAULT_INVOICE: InvoiceData = {
  senderName: 'Acme Design Co.',
  senderEmail: 'hello@acmedesign.com',
  senderAddress: '123 Creative Studio Way\nSan Francisco, CA 94103',
  senderPhone: '+1 (555) 019-2834',
  senderLogo: '',

  clientName: 'Global Tech Corp',
  clientEmail: 'billing@globaltech.com',
  clientAddress: '500 Innovation Blvd, Suite 400\nAustin, TX 78701',

  invoiceNumber: 'INV-0001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  paymentTerms: 'Net 30',
  currency: 'USD',

  items: [
    {
      id: '1',
      description: 'Brand Identity & Web UI Redesign',
      quantity: 1,
      rate: 3500,
      amount: 3500,
    },
    {
      id: '2',
      description: 'Interactive Motion Components (Design & Code)',
      quantity: 10,
      rate: 150,
      amount: 1500,
    },
  ],

  subtotal: 5000,
  discountType: 'percentage',
  discountValue: 0,
  taxRate: 8.5,
  total: 5425,

  notes: 'Thank you for your business! Please remit payment within terms.',
  paymentInstructions: 'Bank: Silicon Valley Bank\nAccount: XXXX-XXXX-4829\nRouting: 121000358',
};

export function getStoredInvoice(): InvoiceData {
  if (typeof window === 'undefined') return DEFAULT_INVOICE;
  try {
    const data = localStorage.getItem(STORAGE_KEY_INVOICE);
    return data ? JSON.parse(data) : DEFAULT_INVOICE;
  } catch {
    return DEFAULT_INVOICE;
  }
}

export function saveStoredInvoice(invoice: InvoiceData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_INVOICE, JSON.stringify(invoice));
  } catch {}
}

export function getProKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_PRO);
}

export function setProKey(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_PRO, key);
}

export function isProUser(): boolean {
  const key = getProKey();
  return Boolean(key && key.trim().length > 0);
}

export function getMonthlyUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  const storedMonth = localStorage.getItem(STORAGE_KEY_MONTH);
  if (storedMonth !== currentMonth) {
    localStorage.setItem(STORAGE_KEY_MONTH, currentMonth);
    localStorage.setItem(STORAGE_KEY_COUNT, '0');
    return 0;
  }
  const countStr = localStorage.getItem(STORAGE_KEY_COUNT);
  return countStr ? parseInt(countStr, 10) || 0 : 0;
}

export function incrementMonthlyUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  const count = getMonthlyUsageCount() + 1;
  localStorage.setItem(STORAGE_KEY_COUNT, count.toString());
  return count;
}
