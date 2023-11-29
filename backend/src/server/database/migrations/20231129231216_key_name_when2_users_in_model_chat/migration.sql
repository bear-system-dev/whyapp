/*
  Warnings:

  - Added the required column `nameWhen2Users` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "nameWhen2Users" TEXT NOT NULL;
