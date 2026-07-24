'use client';

import { InvoiceData } from '@/lib/types';
import { formatCurrency, getCurrencySymbol } from '@/lib/formatCurrency';
import { calculateDiscount, calculateTax } from '@/lib/calculations';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  isPro?: boolean;
}

export default function InvoicePreview({ invoice, isPro = false }: InvoicePreviewProps) {
  const symbol = getCurrencySymbol(invoice.currency);
  const subtotal = invoice.subtotal || 0;
  const discount = calculateDiscount(subtotal, invoice.discountType, invoice.discountValue);
  const subtotalAfterDiscount = Math.max(0, subtotal - discount);
  const tax = calculateTax(subtotalAfterDiscount, invoice.taxRate);
  const total = Math.max(0, subtotalAfterDiscount + tax);

  return (
    <div className="w-full flex justify-center">
      <div
        id="invoice-preview-capture"
        className="w-full max-w-[800px] bg-white text-slate-900 shadow-xl rounded-2xl border border-slate-200 p-8 sm:p-10 font-sans space-y-8 relative overflow-hidden transition-all"
        style={{ minHeight: '840px' }}
      >
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-100 pb-6">
          {/* Sender & Logo */}
          <div className="space-y-2 max-w-xs">
            {invoice.senderLogo ? (
              <img src={invoice.senderLogo} alt="Logo" className="h-14 max-w-[180px] object-contain mb-3" />
            ) : (
              <div className="text-xl font-bold tracking-tight text-slate-900">
                {invoice.senderName || 'Your Business Name'}
              </div>
            )}
            <div className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">
              {invoice.senderAddress}
            </div>
            {invoice.senderEmail && (
              <div className="text-xs text-slate-500">{invoice.senderEmail}</div>
            )}
            {invoice.senderPhone && (
              <div className="text-xs text-slate-500">{invoice.senderPhone}</div>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="text-left sm:text-right space-y-2 min-w-[180px]">
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">INVOICE</h1>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between sm:justify-end gap-4">
                <span className="text-slate-400 font-medium">Invoice #:</span>
                <span className="font-semibold text-slate-900">{invoice.invoiceNumber || 'INV-0001'}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-4">
                <span className="text-slate-400 font-medium">Date:</span>
                <span className="font-medium text-slate-800">{invoice.invoiceDate || '-'}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-4">
                <span className="text-slate-400 font-medium">Due Date:</span>
                <span className="font-semibold text-slate-900">{invoice.dueDate || '-'}</span>
              </div>
              {invoice.paymentTerms && (
                <div className="flex justify-between sm:justify-end gap-4">
                  <span className="text-slate-400 font-medium">Terms:</span>
                  <span className="font-medium text-slate-700">{invoice.paymentTerms}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BILL TO */}
        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Billed To
          </div>
          <div className="text-sm font-bold text-slate-900">
            {invoice.clientName || 'Client Name / Company'}
          </div>
          {invoice.clientAddress && (
            <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
              {invoice.clientAddress}
            </div>
          )}
          {invoice.clientEmail && (
            <div className="text-xs text-slate-500 mt-1">{invoice.clientEmail}</div>
          )}
        </div>

        {/* LINE ITEMS TABLE */}
        <div className="overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-right">Qty</th>
                <th className="py-2.5 px-3 text-right">Rate</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.items.map((item, idx) => (
                <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="py-3 px-3 text-slate-800 font-medium leading-normal">
                    {item.description || 'Service item description'}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">{item.quantity}</td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    {formatCurrency(item.rate || 0, invoice.currency)}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-slate-900">
                    {formatCurrency(item.amount || 0, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS & SUMMARY */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-3 max-w-sm flex-1">
            {invoice.paymentInstructions && (
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Payment Instructions
                </div>
                <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {invoice.paymentInstructions}
                </div>
              </div>
            )}

            {invoice.notes && (
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Notes
                </div>
                <div className="text-xs text-slate-600 whitespace-pre-line italic">
                  {invoice.notes}
                </div>
              </div>
            )}
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(subtotal, invoice.currency)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-600">
                <span>Discount ({invoice.discountType === 'percentage' ? `${invoice.discountValue}%` : 'Flat'}):</span>
                <span className="font-semibold">
                  -{formatCurrency(discount, invoice.currency)}
                </span>
              </div>
            )}

            {invoice.taxRate > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>Tax ({invoice.taxRate}%):</span>
                <span className="font-semibold text-slate-900">
                  +{formatCurrency(tax, invoice.currency)}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-bold text-slate-900">
              <span>Total Due:</span>
              <span className="text-indigo-600 text-base">
                {formatCurrency(total, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* WATERMARK FOOTER */}
        {!isPro && (
          <div className="pt-6 text-center border-t border-slate-100 text-[10px] text-slate-400 tracking-wide">
            Generated with InvoiceFree.app — Upgrade to Pro to remove watermark
          </div>
        )}
      </div>
    </div>
  );
}
