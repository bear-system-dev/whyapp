/*
  Warnings:

  - You are about to drop the column `nameWhen2Users` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "nameWhen2Users",
ADD COLUMN     "fromToByGreaterId" TEXT;
