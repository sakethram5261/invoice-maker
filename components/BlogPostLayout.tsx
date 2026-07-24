import Link from 'next/link';
import { ArrowLeft, Calendar, User, FileText } from 'lucide-react';

interface BlogPostLayoutProps {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  readTime: string;
  children: React.ReactNode;
}

export default function BlogPostLayout({
  title,
  description,
  publishDate,
  author,
  readTime,
  children,
}: BlogPostLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Blog</span>
      </Link>

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{publishDate}</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {readTime}
          </div>
        </div>
      </header>

      {/* Article content */}
      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-2xl">
        {children}
      </article>

      {/* CTA Box at bottom of article */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl mt-12">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto text-white">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold">Ready to create your invoice?</h3>
        <p className="text-sm text-indigo-100 max-w-md mx-auto">
          Create professional, beautiful PDF invoices in under 60 seconds. Free, instant, and no sign-up required.
        </p>
        <Link
          href="/"
          className="inline-block py-3 px-6 text-sm font-bold text-indigo-600 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
        >
          Create Free Invoice Now →
        </Link>
      </div>
    </div>
  );
}
