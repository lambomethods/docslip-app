import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getShieldedClient } from "@/lib/db";
import ParticipantActions from "./ParticipantActions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !(session.user as any).providerId) {
     return <div>Access Denied</div>;
  }

  // Use the shielded client - this automatically scopes all DB queries
  // to the providerId inside the JWT.
  const shieldedDb = getShieldedClient({
    actorId: (session.user as any).id,
    actorRole: (session.user as any).role,
    providerId: (session.user as any).providerId,
    reason: "Dashboard load"
  });

  const participants = await shieldedDb.docslipParticipant.findMany({
    include: {
      logs: {
        where: { status: "VERIFIED_PRESENT" }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Participants</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and verify court mandate attendance.</p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-0.5 whitespace-nowrap">
          + Add Participant
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <th className="p-5 border-b border-slate-100">Name / Case #</th>
              <th className="p-5 border-b border-slate-100">Program</th>
              <th className="p-5 border-b border-slate-100 hidden md:table-cell">Progress</th>
              <th className="p-5 border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-slate-500 font-medium bg-slate-50/50">
                  <div className="max-w-xs mx-auto py-8">
                     <p className="mb-4">No active participants yet.</p>
                     <p className="text-sm text-slate-400">Add a client to begin timestamping their attendance securely to the immutable ledger.</p>
                  </div>
                </td>
              </tr>
            ) : (
              participants.map(p => {
                const totalHours = p.logs.reduce((sum, log) => sum + log.hoursCredited, 0);
                const percentComplete = Math.min((totalHours / p.programTargetHrs) * 100, 100);

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition border-b border-slate-50">
                    <td className="p-5">
                      <p className="font-bold text-slate-900 text-lg">{p.name}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1">{p.courtCaseNumber || 'File Pending'}</p>
                    </td>
                    <td className="p-5">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        {p.programType}
                      </span>
                    </td>
                    <td className="p-5 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                          <div className={`h-2 rounded-full ${percentComplete >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${percentComplete}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{totalHours}/{p.programTargetHrs} hrs</span>
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <ParticipantActions participantId={p.id} participantName={p.name} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
