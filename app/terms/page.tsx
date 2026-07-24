export const metadata = {
  title: 'Terms of Service — InvoiceFree',
  description: 'Terms of Service for using the free online invoice generator at InvoiceFree.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last updated: July 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-6 leading-relaxed">
        <h2 className="text-lg font-bold">1. Acceptance of Terms</h2>
        <p>
          By accessing and using InvoiceFree, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
        </p>

        <h2 className="text-lg font-bold">2. Use of Service</h2>
        <p>
          InvoiceFree provides a free tool for generating PDF invoices. You are solely responsible for verifying the accuracy, legality, and tax compliance of all invoices created using this service in your respective jurisdiction.
        </p>

        <h2 className="text-lg font-bold">3. Disclaimer of Warranties</h2>
        <p>
          The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, express or implied. InvoiceFree does not guarantee that the generated invoices meet specific legal or accounting standards for your region.
        </p>

        <h2 className="text-lg font-bold">4. Limitation of Liability</h2>
        <p>
          In no event shall InvoiceFree or its creators be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service.
        </p>
      </div>
    </div>
  );
}
