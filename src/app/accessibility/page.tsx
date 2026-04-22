import React from 'react';
import Link from 'next/link';

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-widest text-slate-900 text-lg">DOCSLIP</Link>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600">Return Home</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 pt-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Accessibility Statement</h1>
        <div className="prose max-w-none space-y-6 text-slate-600 leading-relaxed mt-8">
           <p>DocSlip is built on the Complavion infrastructure, recognizing that public and court tools must be accessible to everyone, regardless of ability or demographic.</p>
           <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">WCAG Alignment</h3>
           <p>Our platform designs—specifically the public Verification endpoint interfaces parsed by judges and court clerks—are crafted in alignment with WCAG 2.1 AA parameters.</p>
           <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Assistive Technologies</h3>
           <p>We actively ensure that the verification artifacts output by DocSlip offer high contrast, proper semantic HTML structuring, and compatibility with standard screen reader applications utilized in government and legal environments.</p>
        </div>
      </main>
    </div>
  );
}
