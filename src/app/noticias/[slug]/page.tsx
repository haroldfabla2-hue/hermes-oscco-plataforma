import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Share2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function NoticiaDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findFirst({
    where: { slug: params.slug }
  });

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* HEADER ARTICLE */}
      <header className="container mx-auto px-4 max-w-4xl py-12 md:py-20 space-y-6">
        <Link href="/noticias" className="flex items-center text-sm text-gray-500 hover:text-brand-green transition-colors mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver a Noticias
        </Link>
        
        <div className="space-y-4">
          <Badge className="bg-brand-green text-white hover:bg-brand-green">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-blue leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.createdAt.toLocaleDateString('es-PE')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> 5 min lectura
            </span>
          </div>
        </div>
      </header>

      {/* FEATURED IMAGE */}
      <div className="container mx-auto px-4 max-w-5xl mb-12">
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <Image 
            src={post.featuredImg || "/assets/full_body.png"}
            alt={post.title}
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-blue prose-a:text-brand-green">
          {/* Aquí renderizaríamos Markdown en un sistema real, por ahora usamos el contenido directo */}
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
            {post.content}
          </div>
        </div>

        <div className="mt-12 pt-12 border-t flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-brand-blue uppercase">Compartir:</span>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-blue">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          <Link href="/noticias">
            <Button variant="outline" className="rounded-xl border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              Siguiente Noticia
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
