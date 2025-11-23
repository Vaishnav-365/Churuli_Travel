/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `LocalGuide` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LocalGuide_userId_key" ON "LocalGuide"("userId");
