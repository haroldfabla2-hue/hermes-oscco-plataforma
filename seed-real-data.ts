import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de datos reales de la gestión de Hermes Oscco...');

  await prisma.post.deleteMany();
  await prisma.work.deleteMany();
  await prisma.proposal.deleteMany();
  console.log('Datos anteriores limpiados.');

  const noticias = [
    {
      title: 'Inauguración de la nueva infraestructura de la I.E. Bellapampa',
      slug: 'inauguracion-ie-bellapampa',
      content: `El alcalde Hermes Oscco Pinto, en su compromiso con la educación del distrito de Cerro Colorado, inauguró las nuevas instalaciones de la Institución Educativa Bellapampa. 
      
Esta obra beneficia a cientos de estudiantes que ahora cuentan con aulas modernas, áreas recreativas seguras y un entorno propicio para el aprendizaje. "Nuestra prioridad son los niños y jóvenes, ellos son el futuro de Cerro Colorado", destacó el burgomaestre durante la ceremonia.`,
      excerpt: 'El alcalde inauguró modernas instalaciones educativas para beneficio de cientos de estudiantes de Cerro Colorado.',
      featuredImg: '/assets/ie_bellapampa.png',
      category: 'Educación',
      published: true,
      publishedAt: new Date('2024-03-15')
    },
    {
      title: 'Plan de reasfaltado integral en el sector de La Oroya',
      slug: 'reasfaltado-la-oroya',
      content: `Respondiendo a un pedido histórico de los vecinos, la actual gestión inició los trabajos de reasfaltado integral en las principales vías del sector de La Oroya.

Las obras comprenden no solo la colocación de nueva carpeta asfáltica, sino también la mejora de bermas y señalización. El alcalde Oscco Polar inspeccionó personalmente el avance de los trabajos, reafirmando que su gestión es de campo y no de escritorio.`,
      excerpt: 'Se iniciaron los trabajos de mejora vial en La Oroya para garantizar un tránsito seguro y ordenado.',
      featuredImg: '/assets/obra_oroya.png',
      category: 'Infraestructura',
      published: true,
      publishedAt: new Date('2024-05-20')
    },
    {
      title: 'Recuperación de piscinas y espacios recreativos municipales',
      slug: 'recuperacion-espacios-recreativos',
      content: `Con la llegada de la temporada de verano, la Municipalidad Distrital de Cerro Colorado, bajo el liderazgo de Hermes Oscco, ha puesto a disposición de los vecinos las piscinas municipales totalmente remodeladas y con estrictos protocolos de salubridad.

Además de las piscinas, se han intervenido diversos parques del distrito, dotándolos de mejor iluminación, juegos infantiles reparados y mantenimiento de áreas verdes, promoviendo el sano esparcimiento de las familias socabayinas.`,
      excerpt: 'Vecinos de Cerro Colorado ya pueden disfrutar de las piscinas municipales y parques renovados para el verano.',
      featuredImg: '/assets/alcalde_premio.png',
      category: 'Deporte y Recreación',
      published: true,
      publishedAt: new Date('2024-01-10')
    }
  ];

  for (const post of noticias) {
    await prisma.post.create({ data: post });
  }
  console.log('Noticias reales cargadas.');

  const obras = [
    {
      title: 'Mejoramiento Vial en La Oroya',
      slug: 'mejoramiento-vial-oroya',
      location: 'Sector La Oroya, Cerro Colorado',
      status: 'IN_PROGRESS',
      progress: 75,
      beforeImg: '',
      afterImg: '/assets/obra_oroya.png',
      description: 'Reasfaltado integral de las principales vías del sector de La Oroya, incluyendo señalización y mejora de bermas.',
      storytelling: 'Durante años los vecinos sufrieron por los baches y el polvo. Hoy, La Oroya cambia de rostro.',
      results: 'Más de 2000 familias beneficiadas con pistas modernas.',
      gallery: JSON.stringify(['/assets/obra_oroya.png']),
      featured: true
    },
    {
      title: 'Renovación I.E. Bellapampa',
      slug: 'renovacion-ie-bellapampa',
      location: 'Bellapampa, Cerro Colorado',
      status: 'COMPLETED',
      progress: 100,
      beforeImg: '',
      afterImg: '/assets/ie_bellapampa.png',
      description: 'Construcción de nuevas aulas, servicios higiénicos y losa deportiva para la Institución Educativa Bellapampa.',
      storytelling: 'Unimos esfuerzos para entregar a nuestros niños el colegio que siempre merecieron.',
      results: 'Aulas de primer nivel para 500 estudiantes.',
      gallery: JSON.stringify(['/assets/ie_bellapampa.png']),
      featured: true
    },
    {
      title: 'Mantenimiento de Piscinas Municipales',
      slug: 'mantenimiento-piscinas',
      location: 'Complejos Deportivos de Cerro Colorado',
      status: 'COMPLETED',
      progress: 100,
      beforeImg: '',
      afterImg: '/assets/alcalde_premio.png',
      description: 'Mantenimiento integral de los sistemas de recirculación, pintado y acondicionamiento de las piscinas del distrito.',
      storytelling: 'Devolvimos a las familias sus espacios de recreación listos para el verano.',
      results: 'Instalaciones 100% operativas y saludables.',
      gallery: JSON.stringify(['/assets/alcalde_premio.png']),
      featured: false
    }
  ];

  for (const obra of obras) {
    await prisma.work.create({ data: obra });
  }
  console.log('Obras reales cargadas.');

  const propuestas = [
    {
      title: 'Cero Huecos: Plan Integral de Vías',
      slug: 'cero-huecos',
      description: 'Implementaremos cuadrillas permanentes de bacheo rápido y continuaremos con el reasfaltado de las vías principales que han sido olvidadas por gestiones anteriores. Un distrito moderno requiere vías seguras.',
      category: 'Infraestructura',
      icon: 'HardHat',
      imageUrl: '/assets/propuesta_vias.png',
      priority: 1
    },
    {
      title: 'Cerro Colorado Segura 24/7',
      slug: 'socabaya-segura',
      description: 'Potenciaremos el patrullaje integrado entre Serenazgo y la Policía Nacional. Adquisición de nuevas unidades móviles e instalación de cámaras de videovigilancia en puntos críticos del distrito.',
      category: 'Seguridad',
      icon: 'Shield',
      imageUrl: '/assets/propuesta_seguridad.png',
      priority: 2
    },
    {
      title: 'Educación de Primera',
      slug: 'educacion-primera',
      description: 'Continuaremos modernizando la infraestructura de los colegios nacionales de nuestro distrito. Implementaremos programas de apoyo educativo y psicológico para nuestros estudiantes.',
      category: 'Educación',
      icon: 'GraduationCap',
      imageUrl: '/assets/propuesta_educacion.png',
      priority: 3
    },
    {
      title: 'Parques Vivos y Limpios',
      slug: 'parques-vivos',
      description: 'Recuperación progresiva de todos los parques de Cerro Colorado. Mejora del servicio de recolección de residuos sólidos para mantener nuestro distrito limpio y ordenado.',
      category: 'Medio Ambiente',
      icon: 'TreePine',
      imageUrl: '/assets/propuesta_parques.png',
      priority: 4
    }
  ];

  for (const propuesta of propuestas) {
    await prisma.proposal.create({ data: propuesta });
  }
  console.log('Propuestas de gobierno cargadas.');

  console.log('✅ ¡Base de datos poblada exitosamente con información real e imágenes fotorealistas!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
