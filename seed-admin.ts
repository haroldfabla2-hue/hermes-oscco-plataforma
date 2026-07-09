import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@robertomunoz.pe' },
    update: {},
    create: {
      email: 'admin@robertomunoz.pe',
      password: hash,
      name: 'Administrador',
      role: 'ADMIN'
    }
  });
  console.log('Admin seeded successfully');
}

main().catch(console.error).finally(() => prisma.$disconnect());
