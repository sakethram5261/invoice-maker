'use client';

import { useState, useEffect } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import PaywallModal from '@/components/PaywallModal';
import {
  DEFAULT_INVOICE,
  getStoredInvoice,
  saveStoredInvoice,
  isProUser,
  getMonthlyUsageCount,
  incrementMonthlyUsageCount,
} from '@/lib/invoiceStore';
import { InvoiceData } from '@/lib/types';
import { downloadInvoicePDF } from '@/lib/generatePDF';
import { Download, Printer, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [invoice, setInvoice] = useState<InvoiceData>(DEFAULT_INVOICE);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [showPaywallModal, setShowPaywallModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    setInvoice(getStoredInvoice());
    setIsPro(isProUser());
  }, []);

  const handleInvoiceChange = (updated: InvoiceData) => {
    setInvoice(updated);
    saveStoredInvoice(updated);
  };

  const handleReset = () => {
    if (confirm('Reset invoice form to default values?')) {
      setInvoice(DEFAULT_INVOICE);
      saveStoredInvoice(DEFAULT_INVOICE);
    }
  };

  const handleDownload = async () => {
    try {
      setIsGeneratingPDF(true);

      // Trigger PDF download
      await downloadInvoicePDF('invoice-preview-capture', invoice.invoiceNumber, isPro);

      // Increment count & check usage limit if not pro
      if (!isPro) {
        const count = incrementMonthlyUsageCount();
        if (count >= 3) {
          setShowPaywallModal(true);
        }
      }

      setSuccessMessage('Invoice PDF generated & downloaded!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Invoice Generator',
    description: 'Create professional PDF invoices instantly in your browser with zero sign-up.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* HERO BANNER */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free & Client-Side Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create PDF Invoices Instantly
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Fill in the details below, watch the live preview, and download your ready-to-send PDF. Zero account required.
          </p>
        </div>

        {/* PRO BANNER (if not pro) */}
        {!isPro && (
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Upgrade to InvoiceFree Pro</h4>
                <p className="text-xs text-indigo-200">
                  Unlimited PDF generation, remove watermark, save client templates for $5/month.
                </p>
              </div>
            </div>
            <a
              href="/pricing"
              className="px-4 py-2 text-xs font-bold text-indigo-900 bg-white hover:bg-slate-100 rounded-xl shrink-0 transition-all shadow-md"
            >
              See Pro Plans →
            </a>
          </div>
        )}

        {/* ACTIONS BAR */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-20 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
              title="Reset form"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Form</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isGeneratingPDF}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* SUCCESS NOTIFICATION */}
        {successMessage && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* MAIN WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Invoice Details</span>
            </h2>
            <InvoiceForm invoice={invoice} onChange={handleInvoiceChange} />
          </div>

          {/* Right Column: Live Paper Preview */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-36">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Live Preview
              </h2>
              <span className="text-xs text-slate-400 font-medium">Real-time render</span>
            </div>
            <InvoicePreview invoice={invoice} isPro={isPro} />
          </div>
        </div>
      </div>

      {/* PAYWALL MODAL */}
      <PaywallModal isOpen={showPaywallModal} onClose={() => setShowPaywallModal(false)} />
    </>
  );
}
