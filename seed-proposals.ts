import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.proposal.createMany({
    data: [
      {
        title: 'Serenazgo Inteligente 24/7',
        slug: 'serenazgo-inteligente',
        description: 'Implementación de un centro de monitoreo C5i con drones tácticos y patrullaje sectorizado. Conexión directa con las juntas vecinales a través de un aplicativo de respuesta en menos de 5 minutos.',
        icon: 'ShieldAlert',
        category: 'Seguridad',
        priority: 10
      },
      {
        title: 'Plan Cerro Colorado Limpia',
        slug: 'socabaya-limpia',
        description: 'Renovación de la flota de recolección de residuos con compactadoras modernas, instalación de contenedores soterrados y un plan de reciclaje formal que beneficie a las asociaciones locales.',
        icon: 'Recycle',
        category: 'Limpieza',
        priority: 9
      },
      {
        title: 'Vías Rápidas y Seguras',
        slug: 'vias-rapidas',
        description: 'Programa intensivo de bacheo y pavimentación en avenidas principales, acompañado de señalización inteligente y reductores de velocidad en zonas escolares para garantizar el tránsito seguro.',
        icon: 'Map',
        category: 'Infraestructura',
        priority: 8
      }
    ]
  });
  console.log('Proposals seeded');
}

main().catch(console.error).finally(() => prisma.$disconnect());
