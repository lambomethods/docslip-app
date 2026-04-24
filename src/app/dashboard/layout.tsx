import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import SidebarNav from "./SidebarNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Ensure they have the correct RBAC role
  if ((session.user as any).role !== "PROVIDER_ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
        <div className="font-extrabold text-2xl tracking-widest text-white mb-10">DocSlip Dashboard</div>
        <SidebarNav />
        <div className="pt-6 border-t border-slate-800 text-sm">
           <p className="text-slate-400 font-medium truncate" title={session.user.email || ""}>{session.user.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
