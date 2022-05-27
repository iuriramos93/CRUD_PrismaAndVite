/*
  Warnings:

  - You are about to drop the column `pessoa_id` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `endereco_id` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_pessoa_id_fkey";

-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "pessoa_id";

-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "endereco_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
