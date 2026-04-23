"use client";

import { useState } from "react";
import ParticipantActions from "./ParticipantActions";

type Log = {
  id: string;
  timestamp: Date;
  status: string;
  hoursCredited: number;
};

type Participant = {
  id: string;
  name: string;
  courtCaseNumber: string | null;
  programType: string;
  programTargetHrs: number;
  logs: Log[];
};

export default function ParticipantRow({ p }: { p: Participant }) {
  const [expanded, setExpanded] = useState(false);

  const totalHours = p.logs.reduce((sum, log) => sum + log.hoursCredited, 0);
  const percentComplete = Math.min((totalHours / p.programTargetHrs) * 100, 100);

  return (
    <>
      <tr 
        onClick={() => setExpanded(!expanded)}
        className="hover:bg-slate-50 transition border-b border-slate-100 cursor-pointer group"
      >
        <td className="p-5">
           <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition text-xs font-sans">
               {expanded ? '▼' : '▶'}
             </div>
             <div>
               <p className="font-bold text-slate-900 text-lg">{p.name}</p>
               <p className="text-xs text-slate-400 font-mono mt-1">{p.courtCaseNumber || 'File Pending'}</p>
             </div>
           </div>
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
        <td className="p-5 text-right" onClick={(e) => e.stopPropagation()}>
          <ParticipantActions participantId={p.id} participantName={p.name} />
        </td>
      </tr>
      
      {expanded && (
        <tr className="bg-slate-50/50 border-b border-slate-100">
          <td colSpan={4} className="p-6 shadow-inner">
            <div className="max-w-2xl bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Attendance Log History
              </h4>
              <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {p.logs.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">No attendance records found yet.</p>
                ) : (
                  <div className="space-y-3">
                    {p.logs.map((log) => (
                      <div key={log.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                           <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                             {new Date(log.timestamp).toLocaleDateString()}
                           </span>
                           <span className="text-sm text-slate-700 font-mono">
                             {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] px-2 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded font-bold uppercase tracking-wider">Verified Present</span>
                           <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">+{log.hoursCredited} hr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
