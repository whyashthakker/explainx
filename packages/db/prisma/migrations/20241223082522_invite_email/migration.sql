/*
  Warnings:

  - A unique constraint covering the columns `[teamId,inviteEmail]` on the table `InfluencerTeamMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "InfluencerTeamMember" DROP CONSTRAINT "InfluencerTeamMember_userId_fkey";

-- AlterTable
ALTER TABLE "InfluencerTeamMember" ADD COLUMN     "inviteEmail" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerTeamMember_teamId_inviteEmail_key" ON "InfluencerTeamMember"("teamId", "inviteEmail");

-- AddForeignKey
ALTER TABLE "InfluencerTeamMember" ADD CONSTRAINT "InfluencerTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
