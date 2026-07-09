import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mailbox, HardHat, FileText } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const worksCount = await prisma.work.count();
  const leadsCount = await prisma.lead.count();
  const proposalsCount = await prisma.ticket.count();
  const totalPosts = await prisma.post.count();
  
  const recentProposals = await prisma.ticket.findMany({
    take: 5,
    include: { citizen: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-blue mb-8">Dashboard General</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Voluntarios Totales</CardTitle>
            <Users className="w-4 h-4 text-brand-green" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">{leadsCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Buzón Ciudadano</CardTitle>
            <Mailbox className="w-4 h-4 text-brand-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">{proposalsCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Obras Registradas</CardTitle>
            <HardHat className="w-4 h-4 text-brand-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">{worksCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Noticias Publicadas</CardTitle>
            <FileText className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-blue">{totalPosts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-brand-blue">Propuestas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProposals.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aún no hay propuestas.</p>
            ) : (
              <div className="space-y-4">
                {recentProposals.map((prop) => (
                  <div key={prop.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm">{prop.topic}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full font-medium">{prop.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Por: {prop.citizen.name}</p>
                    <p className="text-sm line-clamp-2">{prop.initialDescription}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
