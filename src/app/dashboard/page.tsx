import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getShieldedClient } from "@/lib/db";
import ParticipantRow from "./ParticipantRow";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (false) {
     return <div>Access Denied</div>;
  }

  // Use the shielded client - this automatically scopes all DB queries
  // to the providerId inside the JWT.
  const shieldedDb = getShieldedClient({
    actorId: (session.user as any).providerId || "unknown",
    actorRole: "PROVIDER_ADMIN",
    providerId: (session.user as any).providerId || "unknown",
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

  const serializedParticipants = JSON.parse(JSON.stringify(participants));

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
            {serializedParticipants.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-slate-500 font-medium bg-slate-50/50">
                  <div className="max-w-xs mx-auto py-8">
                     <p className="mb-4">No active participants yet.</p>
                     <p className="text-sm text-slate-400">Add a client to begin timestamping their attendance securely to the immutable ledger.</p>
                  </div>
                </td>
              </tr>
            ) : (
              serializedParticipants.map((p: any) => (
                <ParticipantRow key={p.id} p={p} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
