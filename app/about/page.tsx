import Link from 'next/link';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

export const metadata = {
  title: 'About Us — InvoiceFree',
  description: 'Learn about InvoiceFree: the free, privacy-first online PDF invoice generator built for freelancers.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About InvoiceFree
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Building simple, accessible, privacy-respecting business tools for freelancers and independent creators worldwide.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why We Built This</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Most online invoice generators force you to register an account, sign up for a newsletter, or enter a credit card just to download a simple 1-page PDF. We believed there had to be a better, cleaner way.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          InvoiceFree was created to eliminate the friction. You open the website, type in your details, preview your invoice in real-time, and hit download. No signup, no password resets, no clutter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Instant & Fast</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Generates high-resolution A4 PDFs directly inside your browser using client-side JavaScript.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">100% Private</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Your client names, amounts, and invoice details never leave your device or reach external servers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Built for Creators</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Designed to help freelancers, contractors, and agencies get paid faster with zero hassle.
          </p>
        </div>
      </div>

      <div className="text-center pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
        >
          Create an Invoice Now →
        </Link>
      </div>
    </div>
  );
}
