"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
  const pathname = usePathname();
  
  return (
    <nav className="flex-1 space-y-2">
      <Link 
        href="/dashboard" 
        className={`block px-4 py-3 rounded-lg font-bold transition-colors ${pathname === '/dashboard' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'}`}
      >
        Participants
      </Link>
      <Link 
        href="/dashboard/packets" 
        className={`block px-4 py-3 rounded-lg font-bold transition-colors ${pathname === '/dashboard/packets' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'}`}
      >
        Compliance Packets
      </Link>
      <Link 
        href="/dashboard/logs" 
        className={`block px-4 py-3 rounded-lg font-bold transition-colors ${pathname === '/dashboard/logs' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'}`}
      >
        Audit Logs
      </Link>
    </nav>
  );
}
