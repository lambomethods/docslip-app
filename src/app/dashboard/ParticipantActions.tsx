"use client";

import { useState } from "react";

export default function ParticipantActions({ participantId, participantName }: { participantId: string, participantName: string }) {
  const [loading, setLoading] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, hoursCredited: 1.0 })
      });
      if (res.ok) {
        setCheckedIn(true);
        // Hard reload to refresh server component data for MVP
        window.location.reload();
      } else {
        alert("Check-in failed. Please try again.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePacket = async () => {
    if (!confirm(`Generate compliance packet for ${participantName}?`)) return;
    
    setGenerating(true);
    try {
      const res = await fetch("/api/packets/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId })
      });
      const data = await res.json();
      if (data.packetUrl) {
        window.open(data.packetUrl, "_blank");
      } else {
        alert("Packet generation failed: " + (data.error || "Unknown"));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <button 
        onClick={handleCheckIn}
        disabled={loading || checkedIn || generating}
        className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-sm font-bold transition disabled:opacity-50"
      >
        {loading ? "..." : checkedIn ? "Checked In ✓" : "Log Check-In"}
      </button>
      <button 
        onClick={handleGeneratePacket}
        disabled={generating}
        className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition shadow-md disabled:opacity-50"
      >
        {generating ? "Generating..." : "Generate Packet"}
      </button>
    </div>
  );
}
