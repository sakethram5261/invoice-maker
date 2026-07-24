import { CurrencyOption } from './types';

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'USD ($)' },
  { code: 'EUR', symbol: '€', name: 'EUR (€)' },
  { code: 'GBP', symbol: '£', name: 'GBP (£)' },
  { code: 'CAD', symbol: 'CA$', name: 'CAD (CA$)' },
  { code: 'AUD', symbol: 'A$', name: 'AUD (A$)' },
  { code: 'INR', symbol: '₹', name: 'INR (₹)' },
  { code: 'AED', symbol: 'AED', name: 'AED (AED)' },
];

export function getCurrencySymbol(code: string): string {
  const found = CURRENCY_OPTIONS.find((c) => c.code === code);
  return found ? found.symbol : '$';
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}
