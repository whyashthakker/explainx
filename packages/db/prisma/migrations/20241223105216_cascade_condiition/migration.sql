-- DropForeignKey
ALTER TABLE "InfluencerTeamMember" DROP CONSTRAINT "InfluencerTeamMember_userId_fkey";

-- AddForeignKey
ALTER TABLE "InfluencerTeamMember" ADD CONSTRAINT "InfluencerTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
