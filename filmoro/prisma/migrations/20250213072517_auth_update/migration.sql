/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_accessToken_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "accessToken" DROP NOT NULL;
