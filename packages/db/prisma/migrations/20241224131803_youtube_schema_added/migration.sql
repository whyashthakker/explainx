-- DropForeignKey
ALTER TABLE "InfluencerTeamMember" DROP CONSTRAINT "InfluencerTeamMember_teamId_fkey";

-- CreateTable
CREATE TABLE "YouTubeAccount" (
    "id" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "tokenExpires" TIMESTAMP(3) NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "description" TEXT,
    "subscriberCount" INTEGER NOT NULL DEFAULT 0,
    "videoCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeVideo" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeAnalytics" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "subscriberCount" INTEGER NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "videoCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YouTubeAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeVideoAnalytics" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YouTubeVideoAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeAccount_influencerId_key" ON "YouTubeAccount"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeAccount_channelId_key" ON "YouTubeAccount"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeVideo_videoId_key" ON "YouTubeVideo"("videoId");

-- AddForeignKey
ALTER TABLE "InfluencerTeamMember" ADD CONSTRAINT "InfluencerTeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "InfluencerTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeAccount" ADD CONSTRAINT "YouTubeAccount_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeVideo" ADD CONSTRAINT "YouTubeVideo_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "YouTubeAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeAnalytics" ADD CONSTRAINT "YouTubeAnalytics_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "YouTubeAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeVideoAnalytics" ADD CONSTRAINT "YouTubeVideoAnalytics_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "YouTubeVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
