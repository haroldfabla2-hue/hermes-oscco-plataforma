import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ObrasPublicPage() {
  const works = await prisma.work.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER OBRAS */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="bg-brand-yellow text-brand-blue hover:bg-brand-yellow mb-4 font-bold">Gestión con Resultados</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Obras en Socabaya</h1>
            <p className="text-white/70 text-lg">
              Transparencia total en cada proyecto. Consulta el avance, el impacto y la historia de las intervenciones que transforman nuestro distrito.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/10 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* LISTADO DE OBRAS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-3xl border border-dashed">
                Estamos actualizando el listado de obras. Vuelve pronto.
              </div>
            ) : (
              works.map((work) => (
                <Link key={work.id} href={`/obras/${work.slug}`} className="group">
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <Image 
                        src={work.afterImg || work.beforeImg || "/assets/full_body.png"}
                        alt={work.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`font-bold border-none ${
                          work.status === 'COMPLETED' ? 'bg-green-500' : 
                          work.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}>
                          {work.status === 'COMPLETED' ? 'Completado' : 
                           work.status === 'IN_PROGRESS' ? `En ejecución: ${work.progress}%` : 'Planificado'}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-extrabold text-brand-blue mb-4 group-hover:text-brand-red transition-colors">
                        {work.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <MapPin className="w-4 h-4 mr-1 text-brand-red" /> {work.location}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-brand-red font-bold text-sm">Ver Historia y Resultados</span>
                        <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
