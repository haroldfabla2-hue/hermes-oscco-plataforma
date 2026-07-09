import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function VideoblogPage() {
  const videos = await prisma.videoBlog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* HERO VIDEO */}
      <section className="py-20 bg-gradient-to-b from-brand-blue to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center space-y-4">
          <Badge className="bg-brand-red text-white hover:bg-brand-red">Roberto Muñoz TV</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold">Videoblog de Gestión</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            La cámara no miente. Acompáñanos en cada supervisión, cada reunión vecinal y cada avance que estamos logrando.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 rounded-3xl border border-white/10">
              <Video className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Próximamente subiremos contenido en video.</p>
            </div>
          ) : (
            videos.map((video) => (
              <Link key={video.id} href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank" className="group">
                <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-brand-yellow transition-all">
                  <div className="relative aspect-video">
                    <Image 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-brand-yellow group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg group-hover:text-brand-yellow transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {video.description}
                    </p>
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
