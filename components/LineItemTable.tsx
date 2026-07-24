'use client';

import { LineItem } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { getCurrencySymbol } from '@/lib/formatCurrency';

interface LineItemTableProps {
  items: LineItem[];
  currency: string;
  onChange: (items: LineItem[]) => void;
}

export default function LineItemTable({ items, currency, onChange }: LineItemTableProps) {
  const symbol = getCurrencySymbol(currency);

  const handleItemChange = (id: string, field: keyof LineItem, val: string | number) => {
    const updated = items.map((item) => {
      if (item.id !== id) return item;
      const newItem = { ...item, [field]: val };
      if (field === 'quantity' || field === 'rate') {
        const qty = field === 'quantity' ? Number(val) : item.quantity;
        const rate = field === 'rate' ? Number(val) : item.rate;
        newItem.amount = (qty || 0) * (rate || 0);
      }
      return newItem;
    });
    onChange(updated);
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    onChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Line Items
        </label>
      </div>

      {/* Table header for desktop */}
      <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-right">Qty</div>
        <div className="col-span-2 text-right">Rate ({symbol})</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Item Rows */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60"
          >
            {/* Description */}
            <div className="sm:col-span-6">
              <input
                type="text"
                placeholder="Item description or service provided..."
                value={item.description}
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Quantity */}
            <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
              <span className="sm:hidden text-xs font-medium text-slate-500">Qty:</span>
              <input
                type="number"
                min="0"
                step="any"
                value={item.quantity === 0 ? '' : item.quantity}
                onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                className="w-20 sm:w-full px-2.5 py-1.5 text-sm text-right bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Rate */}
            <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
              <span className="sm:hidden text-xs font-medium text-slate-500">Rate:</span>
              <input
                type="number"
                min="0"
                step="any"
                value={item.rate === 0 ? '' : item.rate}
                onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                className="w-24 sm:w-full px-2.5 py-1.5 text-sm text-right bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Amount & Delete */}
            <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
              <span className="sm:hidden text-xs font-medium text-slate-500">Amount:</span>
              <div className="text-sm font-semibold text-slate-900 dark:text-white text-right flex-1 sm:flex-none">
                {symbol}
                {(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                disabled={items.length <= 1}
                className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded-lg"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 py-1.5 px-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Line Item</span>
      </button>
    </div>
  );
}
