/*
  Warnings:

  - You are about to drop the column `endereco_id` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `pessoa_id` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_endereco_id_fkey";

-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "pessoa_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "endereco_id";

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
