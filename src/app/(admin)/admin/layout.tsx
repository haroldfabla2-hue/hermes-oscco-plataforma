"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, HardHat, FileText, Users, Mailbox, LogOut, ClipboardList } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/obras", label: "Obras", icon: HardHat },
  { href: "/admin/noticias", label: "Noticias", icon: FileText },
  { href: "/admin/propuestas", label: "Plan de Gobierno", icon: ClipboardList },
  { href: "/admin/buzon", label: "Buzón Vecinal", icon: Mailbox },
  { href: "/admin/voluntarios", label: "Voluntarios", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-blue text-white flex flex-col shrink-0">
        <div className="p-6 text-center border-b border-white/10">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
            <span className="text-brand-red font-bold text-xl">RM</span>
          </div>
          <h2 className="font-bold text-lg">Panel de Control</h2>
          <p className="text-sm text-gray-400">Equipo Roberto Muñoz</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-white/15 text-white font-semibold" 
                    : "hover:bg-white/10 text-white/80"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-brand-yellow" : "text-white/60"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-500/20 text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
