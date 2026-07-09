import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MessageSquare, Clock, AlertCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminBuzon() {
  const tickets = await prisma.ticket.findMany({
    include: {
      citizen: true,
      _count: {
        select: { notes: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">Buzón Ciudadano (CRM)</h1>
          <p className="text-muted-foreground">Gestión de casos y escucha vecinal activa.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No hay casos registrados aún.</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <Link 
              key={ticket.id} 
              href={`/admin/buzon/${ticket.id}`}
              className="bg-white p-6 rounded-2xl shadow-sm border hover:border-brand-red transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={
                    ticket.status === 'NEW' ? 'bg-blue-500' :
                    ticket.status === 'OPEN' ? 'bg-amber-500' :
                    ticket.status === 'RESOLVED' ? 'bg-green-500' : 'bg-gray-500'
                  }>
                    {ticket.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {ticket.topic}
                  </Badge>
                  {ticket.priority === 'URGENT' && (
                    <Badge variant="destructive" className="animate-pulse">URGENTE</Badge>
                  )}
                </div>
                <h3 className="font-bold text-lg text-brand-blue group-hover:text-brand-red transition-colors">
                  {ticket.subject}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{ticket.citizen.name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ticket.createdAt.toLocaleDateString('es-PE')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {ticket._count.notes} notas
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-brand-red font-bold text-sm">
                Gestionar Caso
                <AlertCircle className="w-4 h-4" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

