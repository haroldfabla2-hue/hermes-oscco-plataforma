import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Eye } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminWorks() {
  const works = await prisma.work.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue">Gestión de Obras</h1>
        <Link href="/admin/obras/nueva">
          <Button className="bg-brand-green hover:bg-brand-green/90 text-white rounded-xl">
            <PlusCircle className="w-4 h-4 mr-2" /> Nueva Obra
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-6 py-4">Obra</th>
              <th className="px-6 py-4">Ubicación</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Progreso</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {works.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay obras registradas.
                </td>
              </tr>
            ) : (
              works.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-blue">{work.title}</td>
                  <td className="px-6 py-4 text-gray-500">{work.location}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold">
                      {work.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-brand-green h-2.5 rounded-full" style={{ width: `${work.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/obras/${work.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-blue" title="Ver página pública">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/obras/nueva`}>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-blue" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
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
