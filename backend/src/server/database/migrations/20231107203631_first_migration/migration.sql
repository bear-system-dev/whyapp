-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account_status" "AccountStatus" NOT NULL DEFAULT 'INACTIVE',
    "profile_img_path" TEXT,
    "messages" TEXT,
    "chats" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Users_name_email_idx" ON "Users"("name", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_email_key" ON "Users"("name", "email");
