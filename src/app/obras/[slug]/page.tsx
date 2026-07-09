import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, CheckCircle2, PlayCircle, ChevronLeft, Building2, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ObraDetailPage({ params }: { params: { slug: string } }) {
  const work = await prisma.work.findFirst({
    where: { slug: params.slug }
  });

  if (!work) notFound();

  // Parsing gallery if exists
  let galleryImages: string[] = [];
  try {
    if (work.gallery) {
      galleryImages = JSON.parse(work.gallery);
    }
  } catch (e) {
    console.error("Error parsing gallery", e);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER NAV */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/obras" className="flex items-center text-sm font-bold text-brand-blue hover:text-brand-red transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver a Obras
          </Link>
          <Badge className={
            work.status === 'COMPLETED' ? 'bg-green-500' : 
            work.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-blue-500'
          }>
            {work.status}
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LADO IZQUIERDO: CONTENIDO NARRATIVO */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-widest">
                <Building2 className="w-4 h-4" /> Gestión en Territorio
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue leading-tight">
                {work.title}
              </h1>
              <div className="flex items-center text-gray-500 gap-4">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {work.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {work.createdAt.toLocaleDateString('es-PE')}</span>
              </div>
            </div>

            {/* IMPACTO BOX */}
            <div className="bg-brand-red/5 border-l-4 border-brand-red p-6 rounded-r-2xl space-y-2">
              <h4 className="font-bold text-brand-red flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Resultados e Impacto
              </h4>
              <p className="text-brand-blue/80 font-medium">
                {work.results || "Esta obra mejora la calidad de vida de cientos de vecinos en el sector."}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-brand-blue">La Historia de esta Obra</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {work.storytelling || work.description}
              </p>
            </div>

            {/* VIDEO SECTION IF EXISTS */}
            {work.videoUrl && (
              <div className="pt-8">
                <h3 className="text-xl font-bold text-brand-blue mb-4">Registro de Supervisión</h3>
                <Link href={work.videoUrl} target="_blank">
                  <div className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer border-4 border-brand-yellow/20">
                    <Image 
                      src={work.afterImg || work.beforeImg || ""} 
                      alt="Miniatura Video" 
                      fill 
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-brand-red text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* LADO DERECHO: GALERÍA Y ANTES/DESPUÉS */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Registro Visual
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {/* ANTES / DESPUÉS COMPARISON (Simple stack) */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Estado Final / Actual</span>
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border-2 border-brand-yellow">
                    <Image 
                      src={work.afterImg || "/assets/full_body.png"}
                      alt="Obra Terminada"
                      fill
                      className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {work.beforeImg && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase">Situación Anterior</span>
                    <div className="relative aspect-video rounded-3xl overflow-hidden opacity-80 border-2 border-dashed border-gray-300">
                      <Image 
                        src={work.beforeImg}
                        alt="Obra Antes"
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* GALLERY GRID */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 pt-4">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:ring-2 ring-brand-red transition-all cursor-pointer">
                      <Image src={img} alt={`Galería ${idx}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
