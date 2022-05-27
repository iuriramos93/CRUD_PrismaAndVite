import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EnderecoController {
  async ListAllEndereco(req: any, res: any) {
    const get_all_andress = await prisma.endereco.findMany({
      include: { Pessoa: true },
    });

    res.status(200).json({ get_all_andress });
  }

  async GetEnderecosPessoa(req: any, res: any) {
    const pessoa_id = parseInt(req.params.id);
    // const endereco_id = req.query["endereco_id"];
    try {
      const get_andress = await prisma.endereco.findMany({
        where: {
          pessoa_id: pessoa_id,
        },
      });
      res.status(200).json({ Endereços: get_andress });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect;
    }
  }
  async GetEnderecoPessoa(req: any, res: any) {
    const endereco_id = parseInt(req.query["endereco_id"]);

    try {
      const get_andress = await prisma.endereco.findFirst({
        where: {
          id: endereco_id,
        },
        include: { Pessoa: true },
      });
      res.status(200).json({
        Endereço: {
          andress: get_andress?.andress,
          number: get_andress?.number,
          bairro: get_andress?.bairro,
          complemento: get_andress?.complemento,
          cep: get_andress?.cep,
          city: get_andress?.city,
          uf: get_andress?.uf,
          Pessoa: {
            name: get_andress?.Pessoa.name,
            cpf: get_andress?.Pessoa.cpf,
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect;
    }
  }

  async CreateEndereco(req: any, res: any) {
    const id = parseInt(req.body.pessoa.id);
    const endereco = req.body.endereco;

    try {
      const new_endereco = await prisma.endereco.create({
        data: {
          andress: endereco.andress,
          number: endereco.number,
          bairro: endereco.bairro,
          complemento: endereco.complemento,
          cep: endereco.cep,
          city: endereco.city,
          uf: endereco.uf,
          Pessoa: { connect: { id: id } },
        },
        include: { Pessoa: true },
      });

      res.status(200).json({
        message: `Novo Endereço Cadastrado para ${new_endereco.Pessoa.name}`,
        new_endereco,
      });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect;
    }
  }

  async UpdateEndereco(req: { query: any; body: any }, res: any) {
    const id = Number(req.query["id"]);
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
    const id = Number(req.params.id);

    try {
      const delete_endereco = await prisma.endereco.delete({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({ message: `Endereço Deletado`, Endereço: delete_endereco });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect;
    }
  }
}
export default new EnderecoController();
