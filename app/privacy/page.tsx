export const metadata = {
  title: 'Privacy Policy — InvoiceFree',
  description: 'Privacy policy for InvoiceFree online invoice generator. All data stays local in your browser.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last updated: July 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-6 leading-relaxed">
        <h2 className="text-lg font-bold">1. Client-Side Data Storage</h2>
        <p>
          InvoiceFree operates strictly as a client-side web application. All invoice information—including sender names, client names, item descriptions, rates, and amounts—is processed exclusively in your browser&apos;s local memory and localStorage.
        </p>
        <p>
          We do not transmit, collect, or store your financial or invoice data on any external server or database.
        </p>

        <h2 className="text-lg font-bold">2. Cookies and Analytics</h2>
        <p>
          We may use minimal, privacy-focused web analytics (such as Cloudflare Web Analytics) to aggregate page view statistics. These analytics tools do not track personal identifiers, financial data, or cross-site browsing habits.
        </p>

        <h2 className="text-lg font-bold">3. Advertising Partners</h2>
        <p>
          Third-party vendors, including Google AdSense, may use cookies to serve ads based on prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google AdSettings.
        </p>

        <h2 className="text-lg font-bold">4. Third-Party Libraries</h2>
        <p>
          PDF generation is powered by open-source JavaScript packages (`jsPDF` and `html2canvas`) executing locally inside your web browser. No document data is sent to third-party APIs during PDF generation.
        </p>

        <h2 className="text-lg font-bold">5. Contact</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact us via our official repository or website links.
        </p>
      </div>
    </div>
  );
}
