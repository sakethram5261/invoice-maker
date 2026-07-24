'use client';

import { InvoiceData } from '@/lib/types';
import { CURRENCY_OPTIONS } from '@/lib/formatCurrency';
import LineItemTable from './LineItemTable';
import { Upload, X } from 'lucide-react';
import { calculateDueDate, calculateSubtotal, calculateDiscount, calculateTax, calculateTotal } from '@/lib/calculations';

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (invoice: InvoiceData) => void;
}

export default function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const updateField = (field: keyof InvoiceData, value: any) => {
    const updated = { ...invoice, [field]: value };

    // Recalculate totals
    if (field === 'items' || field === 'discountType' || field === 'discountValue' || field === 'taxRate') {
      const items = field === 'items' ? value : invoice.items;
      const dType = field === 'discountType' ? value : invoice.discountType;
      const dVal = field === 'discountValue' ? value : invoice.discountValue;
      const taxRate = field === 'taxRate' ? value : invoice.taxRate;

      const subtotal = calculateSubtotal(items);
      const discount = calculateDiscount(subtotal, dType, dVal);
      const tax = calculateTax(subtotal - discount, taxRate);
      const total = calculateTotal(subtotal, discount, tax);

      updated.subtotal = subtotal;
      updated.total = total;
    }

    // Auto-update due date when payment terms or invoice date changes
    if (field === 'paymentTerms' || field === 'invoiceDate') {
      const terms = field === 'paymentTerms' ? value : invoice.paymentTerms;
      const invDate = field === 'invoiceDate' ? value : invoice.invoiceDate;
      if (terms !== 'Custom') {
        updated.dueDate = calculateDueDate(invDate, terms);
      }
    }

    onChange(updated);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateField('senderLogo', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* SENDER & LOGO */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
          Your Details (Sender)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Your Logo
            </label>
            {invoice.senderLogo ? (
              <div className="relative inline-block group">
                <img
                  src={invoice.senderLogo}
                  alt="Business Logo"
                  className="h-16 max-w-[160px] object-contain rounded-lg border border-slate-200 dark:border-slate-700 bg-white p-1"
                />
                <button
                  type="button"
                  onClick={() => updateField('senderLogo', '')}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs text-slate-500 dark:text-slate-400">
                <Upload className="w-4 h-4 text-slate-400" />
                <span>Upload Logo (PNG, JPG)</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Company / Name
            </label>
            <input
              type="text"
              value={invoice.senderName}
              onChange={(e) => updateField('senderName', e.target.value)}
              placeholder="e.g. Acme Studio"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={invoice.senderEmail}
              onChange={(e) => updateField('senderEmail', e.target.value)}
              placeholder="you@company.com"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Phone (Optional)
            </label>
            <input
              type="text"
              value={invoice.senderPhone}
              onChange={(e) => updateField('senderPhone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Address / Tax Info
          </label>
          <textarea
            rows={2}
            value={invoice.senderAddress}
            onChange={(e) => updateField('senderAddress', e.target.value)}
            placeholder="Street address, City, State, Zip"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* RECIPIENT */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
          Client Details (Bill To)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Client Name / Company
            </label>
            <input
              type="text"
              value={invoice.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              placeholder="e.g. Client Inc."
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Client Email
            </label>
            <input
              type="email"
              value={invoice.clientEmail}
              onChange={(e) => updateField('clientEmail', e.target.value)}
              placeholder="billing@client.com"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Client Address
          </label>
          <textarea
            rows={2}
            value={invoice.clientAddress}
            onChange={(e) => updateField('clientAddress', e.target.value)}
            placeholder="Client Street, City, State, Zip"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* INVOICE METADATA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
          Invoice Info & Currency
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Invoice #
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Currency
            </label>
            <select
              value={invoice.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CURRENCY_OPTIONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => updateField('invoiceDate', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Terms
            </label>
            <select
              value={invoice.paymentTerms}
              onChange={(e) => updateField('paymentTerms', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Due on Receipt">Due on Receipt</option>
              <option value="Net 15">Net 15</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 60">Net 60</option>
              <option value="Custom">Custom Date</option>
            </select>
          </div>
        </div>

        {invoice.paymentTerms === 'Custom' && (
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Custom Due Date
            </label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="w-full max-w-xs px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* LINE ITEMS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <LineItemTable
          items={invoice.items}
          currency={invoice.currency}
          onChange={(newItems) => updateField('items', newItems)}
        />
      </div>

      {/* DISCOUNTS & TAX */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
          Discounts & Taxes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Discount
            </label>
            <div className="flex gap-2">
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => updateField('discountType', 'percentage')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    invoice.discountType === 'percentage'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={() => updateField('discountType', 'flat')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    invoice.discountType === 'flat'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  Flat
                </button>
              </div>

              <input
                type="number"
                min="0"
                step="any"
                value={invoice.discountValue || ''}
                onChange={(e) => updateField('discountValue', parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Tax Rate (%)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={invoice.taxRate || ''}
              onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* NOTES & PAYMENT INSTRUCTIONS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
          Notes & Payment Info
        </h3>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Notes / Memo
          </label>
          <textarea
            rows={2}
            value={invoice.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Thank you for your business!"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Payment Instructions (Bank / PayPal details)
          </label>
          <textarea
            rows={2}
            value={invoice.paymentInstructions}
            onChange={(e) => updateField('paymentInstructions', e.target.value)}
            placeholder="Bank Name, Routing #, Account #, PayPal Link, etc."
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
