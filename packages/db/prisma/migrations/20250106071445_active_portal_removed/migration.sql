/*
  Warnings:

  - You are about to drop the column `activePortal` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activePortal";

-- DropEnum
DROP TYPE "ActivePortal";
