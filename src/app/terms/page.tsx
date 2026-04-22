import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-widest text-slate-900 text-lg">DOCSLIP</Link>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600">Return Home</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 pt-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <div className="prose max-w-none space-y-6 text-slate-600 leading-relaxed mt-8">
           <p>DocSlip acts purely as an infrastructural engine for compliance reporting and is a product of COMPLAVION.</p>
           <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Provider Liability</h3>
           <p>As a verified provider using the DocSlip platform, you retain complete legal liability for the accuracy and legitimacy of the attendance records you submit. We provide the cryptographic tracking mechanism, but you verify the physical or virtual presence of your participants.</p>
           <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Service Availability</h3>
           <p>Our commitment is robust uptime for court verification endpoints. However, DocSlip is a documentation platform, not a legal advisory service.</p>
        </div>
      </main>
    </div>
  );
}
