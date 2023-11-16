-- CreateTable
CREATE TABLE "blackListedToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blackListedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blackListedToken_token_idx" ON "blackListedToken"("token");
