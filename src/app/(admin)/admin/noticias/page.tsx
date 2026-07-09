import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Globe } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminNoticias() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue">Gestión de Noticias</h1>
        <Link href="/admin/noticias/nueva">
          <Button className="bg-brand-green hover:bg-brand-green/90 text-white rounded-xl">
            <PlusCircle className="w-4 h-4 mr-2" /> Nueva Noticia
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay noticias publicadas aún.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-brand-blue">{post.title}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> /{post.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <Badge variant="outline">{post.category || 'Sin categoría'}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={post.published ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}>
                      {post.published ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {post.createdAt.toLocaleDateString('es-PE')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/noticias/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-blue" title="Ver artículo">
                        <Globe className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/noticias/nueva`}>
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
