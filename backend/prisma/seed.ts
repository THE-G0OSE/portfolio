import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env['DATABASE_URL']! }),
});

// placeholders from the design, edit them in the admin panel
const profile = {
  name: '[YOUR NAME]',
  location: '[CITY, COUNTRY]',
  age: 0,
  yearsInIt: 0,
  hatchedYear: '[YEAR]',
  firstCodeYear: '[YEAR]',
  issue: 'Nº 01',
  issueDate: '[MONTH YEAR]',
  totalFlock: '[N]',
};

const stack = [
  {
    label: 'FRONT',
    title: 'FRONTEND',
    sfx: 'ZAP!',
    part: 'I',
    color: 'YELLOW' as const,
    items: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'Next.js', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Redux', level: 3 },
      { name: 'Vite', level: 4 },
    ],
  },
  {
    label: 'BACK',
    title: 'BACKEND',
    sfx: 'BOOM!',
    part: 'II',
    color: 'RED' as const,
    items: [
      { name: 'Node.js', level: 5 },
      { name: 'NestJS', level: 4 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'Redis', level: 3 },
      { name: 'GraphQL', level: 3 },
      { name: 'Python', level: 3 },
    ],
  },
  {
    label: 'INFRA',
    title: 'INFRASTRUCTURE',
    sfx: 'KLANG!',
    part: 'III',
    color: 'BLUE' as const,
    items: [
      { name: 'Docker', level: 5 },
      { name: 'Kubernetes', level: 3 },
      { name: 'GitHub Actions', level: 4 },
      { name: 'Nginx', level: 4 },
      { name: 'AWS', level: 3 },
      { name: 'Terraform', level: 2 },
    ],
  },
  {
    label: 'OTHER',
    title: 'GADGETS & MISC',
    sfx: 'WHOOSH!',
    part: 'IV',
    color: 'WHITE' as const,
    items: [
      { name: 'Git', level: 5 },
      { name: 'Figma', level: 3 },
      { name: 'Jest', level: 4 },
      { name: 'Playwright', level: 3 },
      { name: 'Linux', level: 4 },
      { name: 'Jira', level: 3 },
    ],
  },
];

const jobs = [
  { period: '[YEAR]–NOW', color: 'RED' as const },
  { period: '[YEAR]–[YEAR]', color: 'YELLOW' as const },
  { period: '[YEAR]–[YEAR]', color: 'BLUE' as const },
].map((job, order) => ({
  ...job,
  role: '[ROLE]',
  company: '[COMPANY]',
  impact: '[one line of impact]',
  order,
}));

const projects = [
  { tag: 'Latest release', color: 'YELLOW' as const },
  { tag: 'Side quest', color: 'RED' as const },
].map((project, order) => ({
  ...project,
  name: '[PROJECT NAME]',
  description: '[What it does + your part]',
  tech: ['[tech]', '[tech]', '[tech]'],
  order,
}));

const socials = [
  {
    name: 'GITHUB',
    handle: '@[handle]',
    unit: 'stars',
    href: 'https://github.com/',
    color: 'WHITE' as const,
    tilt: -2,
  },
  {
    name: 'LINKEDIN',
    handle: '/in/[handle]',
    unit: 'followers',
    href: 'https://linkedin.com/',
    color: 'YELLOW' as const,
    tilt: 1.5,
  },
  {
    name: 'TELEGRAM',
    handle: '@[handle]',
    unit: 'subscribers',
    href: 'https://t.me/',
    color: 'YELLOW' as const,
    tilt: -1,
  },
  {
    name: 'X',
    handle: '@[handle]',
    unit: 'followers',
    href: 'https://x.com/',
    color: 'WHITE' as const,
    tilt: 2,
  },
  {
    name: 'YOUTUBE',
    handle: '@[handle]',
    unit: 'subscribers',
    href: 'https://youtube.com/',
    color: 'WHITE' as const,
    tilt: -1.5,
  },
].map((social, order) => ({ ...social, count: '[N]', order }));

// fills only empty tables, so running seed again never overwrites admin edits
async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, ...profile },
  });

  if ((await prisma.stackCategory.count()) === 0) {
    for (const [order, { items, ...category }] of stack.entries()) {
      await prisma.stackCategory.create({
        data: {
          ...category,
          order,
          items: {
            create: items.map((item, i) => ({ ...item, order: i })),
          },
        },
      });
    }
  }

  if ((await prisma.job.count()) === 0)
    await prisma.job.createMany({ data: jobs });
  if ((await prisma.project.count()) === 0)
    await prisma.project.createMany({ data: projects });
  if ((await prisma.social.count()) === 0)
    await prisma.social.createMany({ data: socials });

  console.log('Seed done');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
