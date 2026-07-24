'use client';

import Link from 'next/link';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            You're on a roll! 🎉
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            You've generated 3 invoices this month. Upgrade to Pro for unlimited PDF generation, custom branding, and saved templates.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Unlimited invoice generation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Remove InvoiceFree watermark</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Save drafts & client profiles</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href="https://buy.polar.sh/polar_cl_Bo6Ub3Vde9NypHuaWFaxD3032b443gVfeLebB4Rjb2h"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full py-3 px-4 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            Upgrade to Pro — $5/mo
          </a>
          <button
            onClick={onClose}
            className="block w-full py-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Maybe later (Continue using free tier)
          </button>
        </div>
      </div>
    </div>
  );
}
