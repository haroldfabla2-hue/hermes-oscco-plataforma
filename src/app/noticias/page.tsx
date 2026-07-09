import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NoticiasPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO NOTICIAS */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-brand-green text-white hover:bg-brand-green mb-4">Actualidad y Territorio</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold">Sala de Prensa</h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg">
            Mantente informado sobre las acciones, gestiones y el trabajo diario que realizamos por Cerro Colorado.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </section>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-3xl border shadow-sm">
              Pronto compartiremos las últimas noticias.
            </div>
          ) : (
            posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/noticias/${post.slug}`}
                className="bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <Image 
                    src={post.featuredImg || "/assets/full_body.png"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-blue text-white">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center text-xs text-gray-400 gap-2">
                    <Calendar className="w-3 h-3" /> {post.createdAt.toLocaleDateString('es-PE')}
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue group-hover:text-brand-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center text-brand-green font-bold text-sm">
                    Leer más <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
