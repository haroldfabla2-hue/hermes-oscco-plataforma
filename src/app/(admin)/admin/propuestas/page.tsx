import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function PropuestasPage() {
  const proposals = await prisma.proposal.findMany({
    orderBy: { priority: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Plan de Gobierno</h1>
          <p className="text-muted-foreground">Gestiona los ejes de campaña y propuestas técnicas.</p>
        </div>
        <Link href="/admin/propuestas/nueva">
          <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Eje
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-xl border border-dashed">
            No hay propuestas registradas. Comienza agregando los ejes de campaña.
          </div>
        ) : (
          proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-brand-yellow/20 rounded-xl">
                    <FileText className="w-6 h-6 text-brand-blue" />
                  </div>
                  <Badge variant="secondary">{proposal.category}</Badge>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-brand-blue line-clamp-1">{proposal.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {proposal.description}
                  </p>
                </div>
                <div className="pt-4 flex gap-2">
                  <Link href={`/admin/propuestas/nueva`} className="w-full">
                    <Button variant="outline" className="w-full" size="sm">Editar</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
