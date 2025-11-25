/*
  Warnings:

  - Made the column `location` on table `LocalGuide` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LocalGuide" ALTER COLUMN "location" SET NOT NULL;
