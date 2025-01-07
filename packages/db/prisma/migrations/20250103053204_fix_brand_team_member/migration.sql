/*
  Warnings:

  - A unique constraint covering the columns `[teamId,inviteEmail]` on the table `BrandTeamMember` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BrandTeamMember" ADD COLUMN     "inviteEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BrandTeamMember_teamId_inviteEmail_key" ON "BrandTeamMember"("teamId", "inviteEmail");
