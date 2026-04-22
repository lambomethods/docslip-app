import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight text-slate-900">
            DocSlip
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 px-4 transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-blue-600 text-white rounded-lg py-2 px-5 hover:bg-blue-700 transition-colors shadow-sm">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Court-Ready Proof of Attendance <span className="text-blue-600 block sm:inline">— Automatically</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          DocSlip gives court-approved programs instant, verifiable records and completion certificates that courts actually accept.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup" className="text-lg font-semibold bg-blue-600 text-white rounded-xl py-4 px-8 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5">
            Start Free Trial
          </Link>
          <a href="#sample" className="text-lg font-medium text-slate-600 bg-white border-2 border-slate-200 rounded-xl py-3.5 px-8 hover:border-slate-300 hover:text-slate-900 transition-colors">
            See Sample Certificate
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">If your documentation fails, your approval is at risk.</h2>
            <div className="space-y-6 text-slate-600 text-lg">
              <p>Most court-approved programs still rely on:</p>
              <ul className="space-y-3 font-medium text-slate-700">
                <li className="flex items-center gap-3"><span className="text-red-500 font-bold">✕</span> Paper sign-in sheets</li>
                <li className="flex items-center gap-3"><span className="text-red-500 font-bold">✕</span> Spreadsheets</li>
                <li className="flex items-center gap-3"><span className="text-red-500 font-bold">✕</span> Manual certificates</li>
              </ul>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
            <h3 className="font-bold text-red-600 mb-4 text-lg">If records are incomplete or challenged:</h3>
            <ul className="space-y-5 text-slate-700 font-medium">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                Courts reject documentation
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                Probation officers lose trust
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                Your program approval can be revoked
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-12">DocSlip replaces paperwork with court-defensible proof</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-blue-600 font-bold mb-2">01</div>
            <h3 className="font-bold text-lg mb-2">Verified Attendance</h3>
            <p className="text-slate-600">Timestamped + location-backed tracking for every session.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-blue-600 font-bold mb-2">02</div>
            <h3 className="font-bold text-lg mb-2">Automatic Certificates</h3>
            <p className="text-slate-600">Instantly generate personalized completion proof.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-blue-600 font-bold mb-2">03</div>
            <h3 className="font-bold text-lg mb-2">Court Submission Pkts</h3>
            <p className="text-slate-600">One-click bundles ready for court review.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-blue-600 font-bold mb-2">04</div>
            <h3 className="font-bold text-lg mb-2">Tamper-Proof Logs</h3>
            <p className="text-slate-600">Crypto-verified audit trails that hold up under scrutiny.</p>
          </div>
        </div>
      </section>

      {/* Core Feature Section */}
      <section id="sample" className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">Generate a court-ready submission in one click</h2>
            <p className="text-slate-300 text-lg mb-8">When a participant completes your program, DocSlip instantly generates:</p>
            <ul className="space-y-4 text-white font-medium text-lg">
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-400 text-sm">✓</span>
                Completion certificate
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-400 text-sm">✓</span>
                Full attendance log
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-400 text-sm">✓</span>
                Verified timestamps
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-400 text-sm">✓</span>
                Audit-backed proof
              </li>
            </ul>
            <p className="mt-8 text-slate-300 font-medium">Ready to send to courts or probation officers immediately.</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-2xl relative rotate-1 hover:rotate-0 transition-transform duration-500 block">
            {/* Mock Certificate Visual */}
            <div className="text-slate-900 absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 border border-emerald-200 uppercase tracking-wider">Verified Authentic</div>
            <div className="border-b-2 border-slate-100 pb-6 mb-6 pt-4 text-center">
              <h4 className="font-extrabold text-2xl text-slate-800 uppercase tracking-widest">DocSlip</h4>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Official Compliance Packet</p>
            </div>
            <div className="space-y-6 text-slate-800">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Participant</p>
                <p className="font-bold text-lg border-b border-slate-100 pb-2">J. Doe</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Completed Course</p>
                <p className="font-bold text-lg border-b border-slate-100 pb-2">12-Hour DUI Sub-A</p>
              </div>
              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                   <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Verified Hrs</p>
                   <p className="font-bold text-lg border-b border-slate-100 pb-2 text-blue-600">12.0</p>
                </div>
                <div className="w-1/2">
                   <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">State License #</p>
                   <p className="font-bold text-lg border-b border-slate-100 pb-2 font-mono">ST-88229F</p>
                </div>
              </div>
            </div>
            <div className="mt-10 bg-slate-50 rounded-lg p-4 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-mono text-center mb-1">PACKET ID: DOC-992-81A</p>
              <p className="text-[10px] text-slate-400 font-mono text-center">VERIFY: docslip.com/verify/9a4f22fc88b77a0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & ROI Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Built for real court requirements</h2>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">DocSlip is designed for:</p>
            <ul className="space-y-3 font-medium text-slate-800 mb-6">
              <li>• DUI programs</li>
              <li>• Anger management</li>
              <li>• Domestic violence intervention</li>
              <li>• Substance abuse programs</li>
            </ul>
            <p className="text-slate-600 text-sm max-w-xs font-medium border-t border-slate-200 pt-4">
              Every record is structured to meet court and probation expectations.
            </p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Save hours every week on documentation</h2>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
              <div>
                <h4 className="font-bold text-lg mb-1">No more manual certificates</h4>
                <p className="text-slate-600">Stop drafting PDFs and typing names in Word.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
              <div>
                <h4 className="font-bold text-lg mb-1">No more attendance disputes</h4>
                <p className="text-slate-600">Immutable records make "I was there" arguments impossible.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
              <div>
                <h4 className="font-bold text-lg mb-1">No more back-and-forth</h4>
                <p className="text-slate-600">Courts accept DocSlip format instantly without revisions.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 text-center px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Simple monthly pricing</h2>
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mb-8 mt-10">
          <p className="text-slate-500 font-bold tracking-wider uppercase text-sm mb-4">Provider License</p>
          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-6xl font-extrabold tracking-tight text-slate-900">$199</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          <p className="text-slate-600 font-medium text-lg border-t border-slate-100 pt-6">Less than the cost of losing a single court referral.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 text-center max-w-4xl mx-auto">
         <h2 className="text-4xl font-extrabold tracking-tight mb-10 leading-tight">Stop risking your program approval over paperwork</h2>
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup" className="text-lg font-semibold bg-blue-600 text-white rounded-xl py-4 px-10 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-0.5">
            Start Free Trial
          </Link>
          <Link href="/demo" className="text-lg font-medium text-slate-700 bg-white border-2 border-slate-200 rounded-xl py-3.5 px-8 hover:border-slate-300 hover:text-slate-900 transition-colors">
            Book Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p className="font-bold tracking-wider uppercase text-xs mb-2">DocSlip</p>
        <p className="mb-4">Infrastructure for Court-Approved Programs.</p>
        
        <div className="flex justify-center gap-6 mb-6">
          <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          <Link href="/accessibility" className="hover:text-blue-600 transition-colors">Accessibility Statement</Link>
        </div>

        <p className="text-slate-400 font-medium text-xs mb-2">DocSlip is proudly powered by COMPLAVION technology.</p>
        <p className="text-slate-400">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}
