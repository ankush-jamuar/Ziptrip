import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const now = new Date();
const daysFromNow = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

const todos = [
  {
    title: 'Design system architecture for microservices',
    description:
      'Plan and document the overall architecture for migrating the monolith to a microservices pattern. Include service boundaries, communication protocols, and data ownership.',
    completed: false,
    priority: 'HIGH',
    category: 'Development',
    dueDate: daysFromNow(7),
    completedAt: null,
  },
  {
    title: 'Write unit tests for authentication module',
    description:
      'Achieve at least 90% code coverage for the auth module. Cover login, registration, token refresh, and logout flows.',
    completed: false,
    priority: 'MEDIUM',
    category: 'Development',
    dueDate: daysFromNow(3),
    completedAt: null,
  },
  {
    title: 'Review open pull requests',
    description:
      'Go through the 6 open PRs in the repository. Leave detailed, constructive feedback and approve or request changes where needed.',
    completed: true,
    priority: 'LOW',
    category: 'Review',
    dueDate: null,
    completedAt: daysAgo(1),
  },
  {
    title: 'Set up CI/CD pipeline with GitHub Actions',
    description:
      'Automate test runs, linting, and deployment to staging on every PR merge. Configure separate workflows for backend and frontend.',
    completed: false,
    priority: 'HIGH',
    category: 'DevOps',
    dueDate: daysFromNow(14),
    completedAt: null,
  },
  {
    title: 'Update REST API documentation',
    description:
      'Ensure all endpoints in the Swagger/OpenAPI spec are up to date. Add examples for request and response bodies, and document error codes.',
    completed: true,
    priority: 'MEDIUM',
    category: 'Documentation',
    dueDate: null,
    completedAt: daysAgo(2),
  },
  {
    title: 'Implement rate limiting middleware',
    description:
      'Add per-IP rate limiting to all public API routes using express-rate-limit. Set sensible defaults and return proper 429 responses with Retry-After headers.',
    completed: false,
    priority: 'HIGH',
    category: 'Security',
    dueDate: daysFromNow(5),
    completedAt: null,
  },
  {
    title: 'Conduct weekly team code review session',
    description:
      'Prepare agenda for the weekly sync. Cover recent refactors, upcoming sprint goals, and any architecture decision records (ADRs) that need team consensus.',
    completed: false,
    priority: 'LOW',
    category: 'Review',
    dueDate: daysFromNow(2),
    completedAt: null,
  },
];

async function main() {
  console.log('🌱 Seeding TaskFlow database...\n');

  // Clear existing data for a clean seed
  await prisma.todo.deleteMany();
  console.log('🗑️  Cleared existing todos\n');

  for (const todo of todos) {
    const created = await prisma.todo.create({ data: todo });
    console.log(`✅ Created: [${created.priority}] ${created.title}`);
  }

  console.log(`\n🎉 Seeded ${todos.length} todos successfully.`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
