import { LineItem } from './types';

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + (item.quantity * item.rate || 0), 0);
}

export function calculateDiscount(
  subtotal: number,
  type: 'flat' | 'percentage',
  value: number
): number {
  if (type === 'percentage') {
    return (subtotal * (value || 0)) / 100;
  }
  return value || 0;
}

export function calculateTax(subtotalAfterDiscount: number, taxRate: number): number {
  return (subtotalAfterDiscount * (taxRate || 0)) / 100;
}

export function calculateTotal(
  subtotal: number,
  discount: number,
  tax: number
): number {
  return Math.max(0, subtotal - discount + tax);
}

export function calculateDueDate(startDateStr: string, terms: string): string {
  if (!startDateStr) return '';
  const date = new Date(startDateStr);
  if (isNaN(date.getTime())) return startDateStr;

  if (terms === 'Due on Receipt') {
    return startDateStr;
  } else if (terms === 'Net 15') {
    date.setDate(date.getDate() + 15);
  } else if (terms === 'Net 30') {
    date.setDate(date.getDate() + 30);
  } else if (terms === 'Net 60') {
    date.setDate(date.getDate() + 60);
  }

  return date.toISOString().split('T')[0];
}
