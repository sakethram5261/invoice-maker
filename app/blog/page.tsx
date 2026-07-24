import Link from 'next/link';
import { BookOpen, ArrowRight, Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'Invoicing & Small Business Guides — InvoiceFree Blog',
  description: 'Learn how to bill clients, create professional invoice templates, choose payment terms, and get paid faster as a freelancer.',
};

export default function BlogIndexPage() {
  const posts = [
    {
      slug: 'how-to-create-an-invoice',
      title: 'How to Create a Professional Invoice in 2026 (Free Guide)',
      description: 'Step-by-step tutorial on crafting professional invoices that get paid on time. Includes essential fields, legal requirements, and best practices.',
      date: 'July 20, 2026',
      author: 'Finance Team',
      readTime: '6 min read',
    },
    {
      slug: 'freelancer-invoice-template',
      title: 'Freelancer Invoice Template: The Ultimate Guide for Contractors',
      description: 'Everything freelancers need to know about setting up clean, client-ready invoice templates. Avoid payment delays and handle tax requirements.',
      date: 'July 15, 2026',
      author: 'Alex Morgan',
      readTime: '5 min read',
    },
    {
      slug: 'invoice-payment-terms-explained',
      title: 'Net 30 vs Net 60: Invoice Payment Terms Explained',
      description: 'Demystifying business payment terms. Understand Net 15, Net 30, Net 60, Due on Receipt, and how to choose terms that protect your cash flow.',
      date: 'July 10, 2026',
      author: 'Sarah Jenkins',
      readTime: '7 min read',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Invoicing & Business Guides
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Actionable advice on billing clients, setting payment terms, and managing your freelance finances.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 transition-all hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 block"
          >
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {post.title}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.description}
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 pt-2">
              <span>Read article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
