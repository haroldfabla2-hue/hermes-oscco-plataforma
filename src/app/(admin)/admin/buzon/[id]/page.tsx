import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { addTicketNote } from "@/lib/actions";
import { User, Phone, MapPin, Tag, Calendar, ChevronLeft, Send, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: {
      citizen: true,
      notes: {
        include: { author: true },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!ticket) notFound();

  async function handleAddNote(formData: FormData) {
    'use server';
    await addTicketNote(formData);
    revalidatePath(`/admin/buzon/${params.id}`);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <Link href="/admin/buzon" className="flex items-center text-sm text-gray-500 hover:text-brand-red transition-colors mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Volver a la bandeja de entrada
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={
              ticket.status === 'NEW' ? 'bg-blue-500' :
              ticket.status === 'OPEN' ? 'bg-amber-500' :
              ticket.status === 'RESOLVED' ? 'bg-green-500' : 'bg-gray-500'
            }>
              {ticket.status}
            </Badge>
            <Badge variant="outline">{ticket.priority}</Badge>
            <span className="text-xs text-gray-400">ID: {ticket.id.slice(0, 8)}</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-blue">{ticket.subject}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">Cerrar Caso</Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Marcar como Resuelto
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LADO IZQUIERDO: DETALLES DEL CIUDADANO Y CASO */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-3xl border shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-sm uppercase tracking-wider text-gray-500 font-bold">Datos del Ciudadano</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-brand-red" />
                <div>
                  <div className="font-bold text-brand-blue">{ticket.citizen.name}</div>
                  <div className="text-xs text-gray-400">Ciudadano Identificado</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-red" />
                <div className="text-sm font-medium">{ticket.citizen.phone}</div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-red" />
                <div className="text-sm font-medium">{ticket.citizen.district}</div>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-brand-blue hover:text-brand-red text-xs font-bold">
                  VER HISTORIAL COMPLETO
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-sm uppercase tracking-wider text-gray-500 font-bold">Detalle del Caso</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-brand-red" />
                <div className="text-sm font-medium">{ticket.topic}</div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-brand-red" />
                <div className="text-sm font-medium">{ticket.createdAt.toLocaleString('es-PE')}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* LADO DERECHO: HILO DE NOTAS INTERNAS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="bg-brand-blue p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-bold">Hilo de Seguimiento Interno</span>
              </div>
              <span className="text-xs opacity-70">Solo visible para el equipo</span>
            </div>
            
            {/* ÁREA DE MENSAJES/NOTAS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
              {/* Descripción Inicial */}
              <div className="bg-brand-yellow/10 border-2 border-brand-yellow/20 p-6 rounded-2xl relative">
                <div className="absolute -top-3 left-4 bg-brand-yellow text-brand-blue text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Propuesta Original</div>
                <p className="text-brand-blue font-medium italic">&ldquo;{ticket.initialDescription}&rdquo;</p>
              </div>

              {ticket.notes.map((note) => (
                <div key={note.id} className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 px-2">
                    <span className="font-bold text-sm text-brand-blue">{note.author.name}</span>
                    <span className="text-[10px] text-gray-400">{note.createdAt.toLocaleString('es-PE')}</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border shadow-sm text-sm text-gray-700">
                    {note.content}
                  </div>
                </div>
              ))}
            </div>

            {/* EDITOR DE NOTA */}
            <div className="p-4 bg-white border-t">
              <form action={handleAddNote} className="space-y-3">
                <input type="hidden" name="ticketId" value={ticket.id} />
                <Textarea 
                  name="content"
                  placeholder="Escribe una nota interna sobre el avance de este caso..." 
                  className="min-h-[100px] rounded-2xl border-gray-200 focus:ring-brand-red"
                  required
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-brand-blue">
                      Usar Plantilla
                    </Button>
                  </div>
                  <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white rounded-xl">
                    <Send className="w-4 h-4 mr-2" /> Guardar Nota
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


