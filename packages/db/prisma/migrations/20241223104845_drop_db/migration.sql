-- DropForeignKey
ALTER TABLE "Influencer" DROP CONSTRAINT "Influencer_userId_fkey";

-- DropForeignKey
ALTER TABLE "InfluencerTeam" DROP CONSTRAINT "InfluencerTeam_influencerId_fkey";

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerTeam" ADD CONSTRAINT "InfluencerTeam_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
