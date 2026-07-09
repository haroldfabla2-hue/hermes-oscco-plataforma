import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Actualizando base de datos con imágenes realistas generadas por IA...');

  // Update Obras
  await prisma.work.update({
    where: { slug: 'mejoramiento-vial-oroya' },
    data: { 
      afterImg: '/assets/obra_oroya.png',
      gallery: JSON.stringify(['/assets/obra_oroya.png'])
    }
  });

  await prisma.work.update({
    where: { slug: 'renovacion-ie-bellapampa' },
    data: { 
      afterImg: '/assets/ie_bellapampa.png',
      gallery: JSON.stringify(['/assets/ie_bellapampa.png'])
    }
  });

  // Update Noticias
  await prisma.post.update({
    where: { slug: 'inauguracion-ie-bellapampa' },
    data: { featuredImg: '/assets/ie_bellapampa.png' }
  });

  await prisma.post.update({
    where: { slug: 'reasfaltado-la-oroya' },
    data: { featuredImg: '/assets/obra_oroya.png' }
  });

  // Example of mayor receiving an award for the third news post
  await prisma.post.update({
    where: { slug: 'recuperacion-espacios-recreativos' },
    data: { featuredImg: '/assets/alcalde_premio.png' }
  });

  console.log('✅ Base de datos actualizada con nuevas imágenes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
