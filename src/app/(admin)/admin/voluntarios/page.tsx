import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminVoluntarios() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue">Voluntarios Captados</h1>
        <Button variant="outline" className="rounded-xl border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
          <Download className="w-4 h-4 mr-2" /> Exportar CSV
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Celular (WhatsApp)</th>
              <th className="px-6 py-4">Sector/Barrio</th>
              <th className="px-6 py-4">Fecha de Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No hay voluntarios registrados.
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-blue">{lead.name}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-500">{lead.district}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {lead.createdAt.toLocaleDateString('es-PE')} {lead.createdAt.toLocaleTimeString('es-PE')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
