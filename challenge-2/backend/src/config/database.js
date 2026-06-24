import { PrismaClient } from '@prisma/client';

// Singleton pattern — prevents multiple Prisma Client instances in development
// (Next.js hot-reload pattern, also good practice for Node.js long-running processes)
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
