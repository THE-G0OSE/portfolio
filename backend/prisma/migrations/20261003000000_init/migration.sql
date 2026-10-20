-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ComicColor" AS ENUM ('YELLOW', 'RED', 'BLUE', 'WHITE', 'INK');

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "yearsInIt" INTEGER NOT NULL DEFAULT 0,
    "hatchedYear" TEXT NOT NULL,
    "firstCodeYear" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "issueDate" TEXT NOT NULL,
    "totalFlock" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StackCategory" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sfx" TEXT NOT NULL,
    "part" TEXT NOT NULL,
    "color" "ComicColor" NOT NULL DEFAULT 'YELLOW',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StackCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StackItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "StackItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "period" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "color" "ComicColor" NOT NULL DEFAULT 'RED',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tech" TEXT[],
    "color" "ComicColor" NOT NULL DEFAULT 'YELLOW',
    "liveUrl" TEXT,
    "codeUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "count" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "color" "ComicColor" NOT NULL DEFAULT 'WHITE',
    "tilt" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StackItem" ADD CONSTRAINT "StackItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StackCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
