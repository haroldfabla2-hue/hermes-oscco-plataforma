import { prisma } from "@/lib/prisma";
import { ShieldAlert, Recycle, Map, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import HoverCard from "@/components/animations/HoverCard";

export const dynamic = 'force-dynamic';

const IconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Recycle,
  Map,
  CheckCircle,
};

export default async function PropuestasPage() {
  const proposals = await prisma.proposal.findMany({
    orderBy: { priority: 'desc' }
  });

  return (

    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-brand-blue py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 to-brand-blue z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green rounded-full opacity-20 blur-3xl" />
        <FadeIn direction="up" duration={0.8} className="container mx-auto px-4 relative z-20 text-center space-y-6">
          <Badge className="bg-brand-yellow text-brand-blue hover:bg-brand-yellow font-bold px-4 py-1 text-sm">
            Plan de Gobierno
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Nuestras Propuestas
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Soluciones técnicas, viables y medibles para transformar nuestro distrito. Conoce los ejes de campaña de Hermes Oscco.
          </p>
        </FadeIn>
      </header>

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proposals.map((proposal, idx) => {
              const IconComponent = proposal.icon && IconMap[proposal.icon] ? IconMap[proposal.icon] : CheckCircle;
              return (
                <FadeIn key={proposal.id} direction="up" delay={idx * 0.08} duration={0.5}>
                  <HoverCard yOffset={-8} scale={1.03}>
                    <Card className="overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group rounded-3xl h-full">
                      {proposal.imageUrl ? (
                        <div className="relative h-48 w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                          <Image 
                            src={proposal.imageUrl} 
                            alt={proposal.title}
                            fill
                            className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-100 flex items-center justify-center group-hover:bg-brand-green/10 transition-colors">
                          <IconComponent className="w-16 h-16 text-brand-green group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <CardContent className="p-8 space-y-4 bg-white relative">
                        <Badge variant="outline" className="text-brand-blue border-brand-blue/20">
                          {proposal.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-brand-blue">
                          {proposal.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {proposal.description}
                        </p>
                      </CardContent>
                    </Card>
                  </HoverCard>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </main>
    </div>
  );
}
