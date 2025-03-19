-- AlterTable
ALTER TABLE "RealEstateTask" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "RealEstateTask" ADD CONSTRAINT "RealEstateTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
