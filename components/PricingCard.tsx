import Link from 'next/link';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
}

export default function PricingCard({
  title,
  price,
  period = '',
  description,
  features,
  ctaText,
  ctaHref,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
        popular
          ? 'bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10'
          : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800'
      }`}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{price}</span>
          {period && <span className="text-xs text-slate-500 font-medium">{period}</span>}
        </div>

        <ul className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6 text-sm text-slate-700 dark:text-slate-300">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link
          href={ctaHref}
          className={`block w-full py-3 px-4 text-center text-sm font-semibold rounded-xl transition-all ${
            popular
              ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
          }`}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
