-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "maxBudget" DECIMAL(65,30),
ADD COLUMN     "minFollowers" INTEGER,
ADD COLUMN     "preferredCategories" TEXT[],
ADD COLUMN     "preferredPlatforms" "Platform"[],
ADD COLUMN     "targetDemographic" TEXT;
