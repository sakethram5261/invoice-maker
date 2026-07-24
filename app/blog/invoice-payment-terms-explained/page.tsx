import BlogPostLayout from '@/components/BlogPostLayout';

export const metadata = {
  title: 'Net 30 vs Net 60: Invoice Payment Terms Explained',
  description: 'Demystifying business payment terms like Net 15, Net 30, Net 60, and Due on Receipt.',
};

export default function InvoicePaymentTermsPost() {
  return (
    <BlogPostLayout
      title="Net 30 vs Net 60: Invoice Payment Terms Explained"
      description="Demystifying business payment terms. Understand Net 15, Net 30, Net 60, Due on Receipt, and how to choose terms that protect your cash flow."
      publishDate="July 10, 2026"
      author="Sarah Jenkins"
      readTime="7 min read"
    >
      <p>
        Payment terms dictate when a client must pay you after receiving an invoice. Choosing the wrong payment terms can severely impact your business cash flow, leading to unpaid bills and stress.
      </p>

      <h2>Common Payment Terms Defined</h2>

      <h3>1. Due on Receipt</h3>
      <p>
        &quot;Due on Receipt&quot; means the client is required to submit payment immediately upon receiving the invoice. This is common for initial deposits, micro-gigs, or direct B2C services.
      </p>

      <h3>2. Net 15</h3>
      <p>
        Payment is due within 15 calendar days from the invoice date. Net 15 is popular among digital agencies and contractors working on bi-weekly sprints.
      </p>

      <h3>3. Net 30</h3>
      <p>
        The industry standard for corporate and B2B clients. The client has 30 days to process payment.
      </p>

      <h3>4. Net 60</h3>
      <p>
        Payment is due in 60 days. Large enterprises often request Net 60, but freelancers should exercise caution as a 2-month delay can strain small business finances.
      </p>
    </BlogPostLayout>
  );
}
