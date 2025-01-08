-- CreateEnum
CREATE TYPE "RoadmapItemStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'PLANNED');

-- CreateEnum
CREATE TYPE "RoadmapCategory" AS ENUM ('CORE_PLATFORM', 'AI_FEATURES', 'ANALYTICS', 'INTEGRATION', 'USER_EXPERIENCE', 'MOBILE', 'PERFORMANCE');

-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RoadmapItem" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "status" "RoadmapItemStatus" NOT NULL,
    "description" TEXT NOT NULL,
    "category" "RoadmapCategory" NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "implementationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapItem_pkey" PRIMARY KEY ("id")
);
