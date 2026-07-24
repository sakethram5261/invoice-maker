'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Key, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { getProKey, setProKey } from '@/lib/invoiceStore';

export default function ProPage() {
  const [keyInput, setKeyInput] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const existing = getProKey();
    if (existing) {
      setActiveKey(existing);
      setKeyInput(existing);
    }
  }, []);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput || keyInput.trim().length < 5) {
      setMessage({ type: 'error', text: 'Please enter a valid license key.' });
      return;
    }

    setProKey(keyInput.trim());
    setActiveKey(keyInput.trim());
    setMessage({ type: 'success', text: 'Pro status activated! Watermark removed & unlimited exports unlocked.' });
  };

  const handleRemove = () => {
    setProKey('');
    setActiveKey(null);
    setKeyInput('');
    setMessage({ type: 'success', text: 'Pro license key removed.' });
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Key className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Activate Pro License
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Enter your license key sent via email after purchasing on Polar.sh to unlock Pro features.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {message && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
              message.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {activeKey ? (
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Pro Member Active</span>
              </div>
              <p className="text-xs text-slate-500 font-mono break-all">{activeKey}</p>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="w-full py-2.5 px-4 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
            >
              Deactivate / Remove Key
            </button>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                License Key
              </label>
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="e.g. inv_pro_8fa0948b-..."
                className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
            >
              Activate Key
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          Don&apos;t have a key yet?{' '}
          <Link href="/pricing" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Upgrade to Pro for $5/mo
          </Link>
        </div>
      </div>
    </div>
  );
}
