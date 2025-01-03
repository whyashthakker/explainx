-- CreateEnum
CREATE TYPE "ActivePortal" AS ENUM ('BRAND', 'INFLUENCER');

-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'BOTH';

-- DropIndex
DROP INDEX "Brand_userId_key";

-- DropIndex
DROP INDEX "Influencer_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activePortal" "ActivePortal";

-- CreateIndex
CREATE INDEX "Brand_userId_idx" ON "Brand"("userId");

-- CreateIndex
CREATE INDEX "Influencer_userId_idx" ON "Influencer"("userId");
