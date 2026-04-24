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
  const isCompleted = packet.totalHours >= participant.programTargetHrs;
  const status = isCompleted ? "Completed" : "In Progress";
  
  const sortedLogs = participant.logs.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const startDate = sortedLogs.length > 0 ? new Date(sortedLogs[0].timestamp).toLocaleDateString('en-US') : 'N/A';
  const lastDate = sortedLogs.length > 0 ? new Date(sortedLogs[sortedLogs.length - 1].timestamp).toLocaleDateString('en-US') : 'N/A';

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-white p-12 shadow-sm border border-slate-300">
        
        {/* Header (top of page) */}
        <div className="text-center border-b-2 border-black pb-8 mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-6">Program Completion Record</h1>
          <div className="text-sm space-y-1">
            <p className="font-bold text-base">{participant.provider.facilityName}</p>
            <p>123 Compliance Way, Suite 400, Court District, CA 90210</p>
            <p>(555) 123-4567 • {participant.provider.email}</p>
            <p>State License Number: {participant.provider.stateLicense}</p>
          </div>
        </div>

        {/* Participant Information */}
        <div className="mb-8">
           <h2 className="text-sm font-bold border-b border-black pb-1 mb-4 uppercase tracking-wider">Participant Information</h2>
           <div className="grid grid-cols-2 gap-y-3 text-sm">
             <div><span className="font-bold">Participant Name:</span> {participant.name}</div>
             <div><span className="font-bold">Participant ID:</span> P-{participant.id.slice(0, 5).toUpperCase()}</div>
             <div><span className="font-bold">Case/Reference Number:</span> {participant.courtCaseNumber || 'N/A'}</div>
             <div><span className="font-bold">Program Type:</span> {participant.programType}</div>
           </div>
        </div>

        {/* Program Summary */}
        <div className="mb-8">
           <h2 className="text-sm font-bold border-b border-black pb-1 mb-4 uppercase tracking-wider">Program Summary</h2>
           <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
             <div><span className="font-bold">Required Hours:</span> {participant.programTargetHrs.toFixed(1)}</div>
             <div><span className="font-bold">Completed Hours:</span> {packet.totalHours.toFixed(1)}</div>
             <div className="col-span-2"><span className="font-bold">Completion Status:</span> {status}</div>
           </div>
           
           <div className="grid grid-cols-2 gap-y-3 text-sm mt-6">
             <div className="col-span-2 font-bold mb-1">Date Range</div>
             <div><span className="font-bold">Start Date:</span> {startDate}</div>
             <div><span className="font-bold">Last Session Date:</span> {lastDate}</div>
           </div>
        </div>

        {/* Attendance Record */}
        <div className="mb-10">
           <h2 className="text-sm font-bold border-b border-black pb-1 mb-4 uppercase tracking-wider">Attendance Record</h2>
           <table className="w-full text-left text-sm border-collapse">
             <thead>
               <tr className="border-b border-black">
                 <th className="py-2 font-bold w-1/4">Session #</th>
                 <th className="py-2 font-bold w-1/4">Date</th>
                 <th className="py-2 font-bold w-1/4">Time</th>
                 <th className="py-2 font-bold w-1/4">Status</th>
               </tr>
             </thead>
             <tbody>
               {participant.logs.length === 0 ? (
                 <tr><td colSpan={4} className="py-4 italic text-slate-500">No records found.</td></tr>
               ) : (
                 participant.logs.map((log, index) => {
                   const date = new Date(log.timestamp);
                   return (
                     <tr key={log.id} className="border-b border-slate-200">
                       <td className="py-3">{index + 1}</td>
                       <td className="py-3">{date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</td>
                       <td className="py-3">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                       <td className="py-3">Verified (System Logged)</td>
                     </tr>
                   );
                 })
               )}
             </tbody>
           </table>
        </div>

        {/* Certification Statement */}
        <div className="mb-12 border border-slate-300 bg-slate-50 p-4">
           <p className="text-sm leading-relaxed font-medium">
             This record represents a system-generated summary of recorded attendance and participation.
           </p>
        </div>

        {/* Provider Verification */}
        <div className="mb-16">
           <h2 className="text-sm font-bold border-b border-black pb-1 mb-8 uppercase tracking-wider">Provider Verification</h2>
           <div className="flex justify-between items-start text-sm">
             <div className="w-5/12">
               <div className="border-b border-black pb-1 mb-2 font-bold text-base h-8 flex items-end">
                 {participant.provider.facilityName}
               </div>
               <p className="text-xs uppercase tracking-wider text-slate-600">Provider Name / Signature</p>
               <p className="text-xs font-medium mt-1">License Number Confirmation: {participant.provider.stateLicense}</p>
             </div>
             <div className="w-4/12">
               <div className="border-b border-black pb-1 mb-2 font-bold h-8 flex items-end">
                 {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
               </div>
               <p className="text-xs uppercase tracking-wider text-slate-600">Date Issued</p>
             </div>
           </div>
        </div>

        {/* Verification Section (bottom) */}
        <div className="pt-6 border-t border-black text-sm">
           <p className="mb-1"><span className="font-bold">Verification ID:</span> {packet.uniqueHash}</p>
           <p><span className="font-bold">Verify at:</span> docslip.app/verify/{packet.uniqueHash}</p>
        </div>

      </div>
    </div>
  );
}
