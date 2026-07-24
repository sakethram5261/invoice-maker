import PricingCard from '@/components/PricingCard';
import { HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Pricing & Plans — InvoiceFree Pro',
  description: 'Simple, transparent pricing for InvoiceFree. Use for free or upgrade to Pro for $5/mo for unlimited PDF exports and custom branding.',
};

export default function PricingPage() {
  const faqs = [
    {
      q: 'Is the Free tier really free?',
      a: 'Yes! You can generate up to 3 PDF invoices per month 100% free with no sign-up or credit card required.',
    },
    {
      q: 'How does the Pro plan work?',
      a: 'Pro costs $5/month. Once you subscribe, you get an activation key that unlocks unlimited invoice PDFs, removes the watermark, and lets you save client profiles.',
    },
    {
      q: 'Is my data safe?',
      a: 'Everything is processed directly in your browser. We never store your invoices, client details, or payment info on any backend server.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Absolutely. You can manage or cancel your subscription at any time with one click via our Polar.sh portal.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Simple, Fair Pricing
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Start for free without an account, or upgrade to Pro to unlock unlimited invoices and custom branding.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for occasional freelancers needing a quick invoice."
          features={[
            'Generate up to 3 invoices / month',
            'Download high-quality A4 PDF',
            'All currencies supported',
            'Print directly from browser',
            'Client-side privacy & security',
            'Standard watermark on PDF',
          ]}
          ctaText="Use Free Generator"
          ctaHref="/"
        />

        <PricingCard
          title="Pro"
          price="$5"
          period="/ month"
          description="For busy freelancers & businesses needing unlimited billing power."
          features={[
            'Unlimited PDF generation',
            'Remove InvoiceFree watermark',
            'Save draft templates in browser',
            'Custom logo & accent color',
            'Auto-numbering & payment terms',
            'Priority support & updates',
          ]}
          ctaText="Upgrade to Pro — $5/mo"
          ctaHref="https://polar.sh" // Placeholder link
          popular={true}
        />
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-8 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{faq.q}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
