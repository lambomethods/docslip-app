import { getShieldedClient } from '@/lib/db';

export default async function VerifyPacketPage({ params }: { params: Promise<{ hash: string }> }) {
  const resolvedParams = await params;
  
  // We use a strictly restricted System context for verification views.
  // Court clerks viewing this link aren't "users", so they access via READONLY_PUBLIC role.
  const db = getShieldedClient({
    actorId: "PUBLIC_VERIFIER",
    actorRole: "READONLY_PUBLIC",
    providerId: "PUBLIC_VERIFICATION_BYPASS",
    reason: `Viewed public verification link for hash ${resolvedParams.hash}`
  });

  const packet = await db.docslipCompliancePacket.findUnique({
    where: { uniqueHash: resolvedParams.hash },
    include: {
      participant: {
        include: {
          provider: true,
          logs: {
            where: { status: "VERIFIED_PRESENT" },
            orderBy: { timestamp: 'asc' }
          }
        }
      }
    }
  });

  if (!packet || !packet.isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-900 p-6 font-sans">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg border border-red-200 text-center">
          <h1 className="text-2xl font-bold mb-4">Verification Failed</h1>
          <p>This Compliance Packet hash is invalid or has been revoked by the issuer.</p>
        </div>
      </div>
    );
  }

  const { participant } = packet;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl p-12 border border-slate-200">
        
        {/* Certificate Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
          <div>
             <h1 className="text-3xl font-extrabold uppercase tracking-widest text-slate-900">DocSlip</h1>
             <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Official Compliance Packet</p>
          </div>
          <div className="text-right">
             <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 border border-emerald-200 uppercase tracking-widest mb-2">Verified Authentic</div>
             <p className="text-xs text-slate-400 font-mono mb-1">PKT-ID: {packet.id}</p>
             <p className="text-xs text-slate-400 font-mono">HASH: {packet.uniqueHash}</p>
          </div>
        </div>

        {/* Core Subject Data */}
        <section className="mb-10">
           <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase text-slate-800 tracking-wider">1. Participant Completion Record</h2>
           <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded border border-slate-100">
             <div>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Participant Name</p>
               <p className="font-bold text-xl">{participant.name}</p>
             </div>
             <div>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Court Case #</p>
               <p className="font-bold text-xl">{participant.courtCaseNumber || 'N/A'}</p>
             </div>
             <div>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Program Type</p>
               <p className="font-bold text-lg">{participant.programType}</p>
             </div>
             <div>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Verified Hours</p>
               <p className="font-bold text-lg text-blue-700">{packet.totalHours.toFixed(1)} / {participant.programTargetHrs.toFixed(1)}</p>
             </div>
           </div>
        </section>

        {/* Provider Data */}
        <section className="mb-10">
           <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase text-slate-800 tracking-wider">2. Provider Authorization</h2>
           <div className="grid grid-cols-2 gap-6 p-6 border border-slate-100">
             <div>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Facility Name</p>
               <p className="font-bold">{participant.provider.facilityName}</p>
             </div>
             <div>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">State License #</p>
               <p className="font-bold font-mono">{participant.provider.stateLicense}</p>
             </div>
           </div>
        </section>

        {/* Audit Log */}
        <section className="mb-10">
           <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase text-slate-800 tracking-wider">3. Append-Only Attendance Log</h2>
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider">
                 <th className="p-3 border-b border-slate-200">Date/Time</th>
                 <th className="p-3 border-b border-slate-200">Status</th>
                 <th className="p-3 border-b border-slate-200">Hours</th>
                 <th className="p-3 border-b border-slate-200">Location Tag</th>
               </tr>
             </thead>
             <tbody>
               {participant.logs.length === 0 ? (
                 <tr><td colSpan={4} className="p-4 text-center text-slate-500">No verified logs found.</td></tr>
               ) : (
                 participant.logs.map((log) => (
                   <tr key={log.id} className="text-sm font-medium border-b border-slate-50">
                     <td className="p-3 font-mono">{new Date(log.timestamp).toLocaleString()}</td>
                     <td className="p-3 text-emerald-700">{log.status}</td>
                     <td className="p-3">{log.hoursCredited.toFixed(1)}</td>
                     <td className="p-3 text-slate-400 font-mono text-xs">{log.latitude ? `${log.latitude.toFixed(4)}, ${log.longitude?.toFixed(4)}` : 'On-Site Verified'}</td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
        </section>

        {/* Validation Footer */}
        <section className="mt-16 pt-8 border-t-2 border-slate-900 border-dashed text-center">
           <h3 className="font-bold uppercase tracking-widest text-slate-800 mb-2">Statement of Authenticity</h3>
           <p className="text-sm text-slate-500 max-w-lg mx-auto mb-6 leading-relaxed">
             This dynamic document serves as an independently verifiable record of attendance, backed by integrity hashes. The records contained within are appended directly by the authorized provider to this append-only ledger.
           </p>
           <p className="text-xs font-mono bg-slate-50 p-3 rounded text-slate-600 border border-slate-200 inline-block">
             System Verification URL: docslip.com/verify/{packet.uniqueHash}
           </p>
        </section>

      </div>
    </div>
  );
}
