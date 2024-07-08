/*
  Warnings:

  - The `favoritCount` column on the `bands` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "bands" DROP COLUMN "favoritCount",
ADD COLUMN     "favoritCount" INTEGER DEFAULT 0;
