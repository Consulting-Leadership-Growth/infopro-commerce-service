-- CreateTable
CREATE TABLE "Prompts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "contentBackup" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Prompts_pkey" PRIMARY KEY ("id")
);
