import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-extrabold text-2xl tracking-tight text-slate-900 mb-6">
            DocSlip
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Provider Login</h1>
          <p className="text-slate-500 mt-2 font-medium">Access your compliance dashboard.</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email Address</label>
               <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="director@facility.com" required />
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Password</label>
               <input type="password" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="••••••••" required />
             </div>
          </div>

          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 mt-4">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-600 font-medium">
          Need an account? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Start free trial</Link>
        </p>
      </div>
    </div>
  );
}
