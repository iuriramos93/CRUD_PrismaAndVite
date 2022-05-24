import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EnderecoController {
  async UpdateEndereco(req: { params: { id: any }; body: any }, res: any) {
    const id = Number(req.params.id);
    const update_endereco = req.body;

    try {
      const new_endereco = await prisma.endereco.update({
        where: {
          id: id,
        },
        data: {
          andress: update_endereco.andress,
          number: update_endereco.number,
          bairro: update_endereco.bairro,
          complemento: update_endereco.complemento,
          cep: update_endereco.cep,
          city: update_endereco.city,
          uf: update_endereco.uf,
        },
      });

      res.status(200).json({
        message: "Endereço Atualizado com sucesso",
        new: new_endereco,
      });
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar Endereço!" });
      console.log(error);
    }
  }

  async DeleteEndereco(req: any, res: any) {
    const id = req.params.id;

    try {
    } catch (error) {}
  }
}
export default new EnderecoController();
