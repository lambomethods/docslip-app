"use client";

export default function AddParticipantButton() {
  return (
    <button 
      onClick={() => alert("Adding custom participants will be enabled in the production release.")}
      className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
    >
      + Add Participant
    </button>
  );
}
