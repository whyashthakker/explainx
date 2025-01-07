-- DropForeignKey
ALTER TABLE "BrandTeamMember" DROP CONSTRAINT "BrandTeamMember_userId_fkey";

-- AlterTable
ALTER TABLE "BrandTeamMember" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BrandTeamMember" ADD CONSTRAINT "BrandTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
