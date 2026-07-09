import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle, MapPin, CheckCircle, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/public/LeadForm";
import { ProposalForm } from "@/components/public/ProposalForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredWorks = await prisma.work.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-brand-green relative">
              <Image 
                src="/assets/logo.png" 
                alt="Arequipa Avancemos Logo" 
                fill 
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-brand-blue uppercase">
              Hermes Oscco
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#inicio" className="hover:text-brand-green transition-colors">Inicio</a>
            <Link href="/propuestas" className="hover:text-brand-green transition-colors font-bold">Plan de Gobierno</Link>
            <a href="#obras" className="hover:text-brand-green transition-colors">Obras</a>
            <Link href="/noticias" className="hover:text-brand-green transition-colors">Noticias</Link>
            <a href="#unete">
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white rounded-xl">
                Únete al equipo
              </Button>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="inicio" className="relative w-full overflow-hidden bg-brand-blue">
          {/* Background Overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
             <Image
              src="/assets/full_body.png"
              alt="Background pattern"
              fill
              className="object-cover blur-sm opacity-20 grayscale"
              sizes="100vw"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col-reverse md:flex-row items-center py-16 md:py-24 gap-8">
            <div className="flex-1 text-center md:text-left space-y-6">
              <Badge className="bg-brand-yellow text-brand-blue hover:bg-brand-yellow font-bold text-sm px-4 py-1">
                Arequipa Avancemos
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Gestión técnica <br className="hidden md:block"/> para Cerro Colorado.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-lg mx-auto md:mx-0">
                Obras que se ven, orden que se siente. El distrito necesita un equipo que resuelva los problemas con capacidad, no con promesas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link href="/obras">
                  <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl text-lg h-14 px-8">
                    Ver Obras y Resultados
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/propuestas">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold rounded-xl text-lg h-14 px-8">
                    <PlayCircle className="mr-2 w-5 h-5" />
                    Conoce Nuestro Plan
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-md mx-auto aspect-square md:aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent z-10 rounded-3xl" />
              <Image
                src="/assets/portrait.png"
                alt="Hermes Oscco Pinto"
                fill
                className="object-cover rounded-3xl border-4 border-white/10 shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="bg-brand-yellow w-full py-8 border-y-4 border-brand-green">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-brand-blue">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <div>
                <div className="font-extrabold text-3xl">50+</div>
                <div className="text-sm font-semibold uppercase tracking-wider">Intervenciones</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <div>
                <div className="font-extrabold text-3xl">85%</div>
                <div className="text-sm font-semibold uppercase tracking-wider">Ejecución</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 opacity-80" />
              <div>
                <div className="font-extrabold text-3xl">10k</div>
                <div className="text-sm font-semibold uppercase tracking-wider">Vecinos Atendidos</div>
              </div>
            </div>
          </div>
        </section>

        {/* OBRAS Y RESULTADOS */}
        <section id="obras" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue">
                Resultados, no promesas.
              </h2>
              <p className="text-muted-foreground text-lg">
                Nuestra mejor campaña es el trabajo territorial. Conoce el estado de los proyectos que están transformando nuestros barrios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredWorks.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500 py-12">
                  Pronto actualizaremos nuestras obras recientes.
                </div>
              ) : (
                featuredWorks.map((work) => (
                  <Link key={work.id} href={`/obras/${work.slug}`} className="group">
                    <Card className="overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-3xl">
                      <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                        <Image
                          src={work.afterImg || work.beforeImg || "/assets/full_body.png"}
                          alt={work.title}
                          fill
                          className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`border-none font-bold ${
                            work.status === 'COMPLETED' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                            work.status === 'IN_PROGRESS' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 
                            'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}>
                            {work.status === 'COMPLETED' ? 'Completado' : 
                             work.status === 'IN_PROGRESS' ? `En ejecución: ${work.progress}%` : 
                             'Planificado'}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4 bg-white">
                        <h3 className="font-bold text-xl text-brand-blue line-clamp-2 group-hover:text-brand-green transition-colors">
                          {work.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" /> {work.location}
                        </div>
                        <div className="w-full text-center py-2 rounded-xl border border-brand-green text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors font-medium text-sm">
                          Ver detalles
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* VIDEOLOG & TERRITORY */}
        <section id="noticias" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <Badge className="bg-brand-green text-white hover:bg-brand-green font-bold">Roberto en tu barrio</Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue">
                  Caminando el territorio, escuchando a los vecinos.
                </h2>
                <p className="text-lg text-muted-foreground">
                  No gobernamos desde el escritorio. Entendemos que las soluciones nacen de caminar las calles, escuchar de primera mano y ejecutar con velocidad técnica.
                </p>
                <Link href="/videoblog">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl">
                    Ver videoblog completo
                  </Button>
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer border-4 border-brand-yellow/20">
                  <Image
                    src="/assets/full_body.png"
                    alt="Videoblog miniatura"
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <PlayCircle className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESCUCHA VECINAL (NUEVO) */}
        <section id="escucha" className="py-20 bg-gray-100 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <Badge className="bg-brand-blue text-white hover:bg-brand-blue font-bold text-sm px-4 py-1">Buzón Ciudadano</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue">
                El alcalde te escucha.
              </h2>
              <p className="text-muted-foreground text-lg">
                La gestión técnica empieza por entender el problema. Déjanos tu propuesta o alerta sobre un tema urgente en tu barrio y nuestro equipo lo priorizará.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <ProposalForm />
            </div>
          </div>
        </section>

        {/* ÚNETE AL EQUIPO (FOHOULARIO) */}
        <section id="unete" className="py-20 bg-brand-blue text-white relative overflow-hidden">
          {/* Accent Shapes */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-green rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow rounded-full opacity-10 blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-brand-blue">
              <div className="flex-1 p-10 md:p-12 flex flex-col justify-center bg-gray-50 border-r border-gray-100">
                <h2 className="text-3xl font-extrabold mb-4">El cambio necesita equipo.</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Si crees en la gestión técnica y las obras bien hechas, súmate a la red de voluntarios de Cerro Colorado.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5" />
                    <span className="font-medium">Participa en mesas técnicas de tu barrio.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5" />
                    <span className="font-medium">Difunde los avances reales.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5" />
                    <span className="font-medium">Sé parte del equipo de fiscalización.</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-10 md:p-12 bg-white">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-blue text-white pt-16 pb-8 border-t-[16px] border-brand-green">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-brand-green relative">
                  <Image 
                    src="/assets/logo.png" 
                    alt="Arequipa Avancemos Logo" 
                    fill 
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="font-bold text-2xl tracking-tight text-white uppercase">
                  Hermes Oscco
                </span>
              </div>
              <p className="text-white/70 max-w-sm">
                Plataforma oficial de campaña. Promovemos la gestión técnica, la transparencia y el desarrollo urbano para Cerro Colorado y Arequipa.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-brand-yellow">Enlaces</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                <li><Link href="/propuestas" className="hover:text-white transition-colors">Plan de Gobierno</Link></li>
                <li><a href="#obras" className="hover:text-white transition-colors">Obras y Resultados</a></li>
                <li><a href="#escucha" className="hover:text-white transition-colors">Buzón Ciudadano</a></li>
                <li><a href="#unete" className="hover:text-white transition-colors">Voluntariado</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-brand-yellow">Contacto</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Calle San Martín L-12, Cerro Colorado
                </li>
                <li>Prensa: prensa@hermesoscco.pe</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm flex flex-col md:flex-row items-center justify-between">
            <p>© 2026 Movimiento Regional Arequipa Avancemos. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">Diseñado para la gestión y el territorio.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
