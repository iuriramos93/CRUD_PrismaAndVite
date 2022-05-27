import { PrismaClient } from "@prisma/client";
import { Id } from "../@types/ID";
import { Pessoa } from "../@types/Pessoa";

const prisma = new PrismaClient();

class PessoaController {
  async ListPessoa(req: any, res: any) {
    const pessoas = await prisma.pessoa.findMany({
      include: { Endereco: true },
    });

    // console.log(pessoas);
    res.status(200).json({ pessoas: pessoas });
  }

  async createPessoa(req: { body: Pessoa }, res: any) {
    const pessoa = req.body;

    try {
      await prisma.pessoa.create({
        data: {
          name: pessoa.name,
          cpf: pessoa.cpf,
          Endereco: {
            create: [
              {
                andress: pessoa.endereco[0].andress,
                number: pessoa.endereco[0].number,
                bairro: pessoa.endereco[0].bairro,
                complemento: pessoa.endereco[0].complemento,
                cep: pessoa.endereco[0].cep,
                city: pessoa.endereco[0].city,
                uf: pessoa.endereco[0].uf,
              },
            ],
          },
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      prisma.$disconnect();
    }
    res.status(200).json({ message: "Person created successfully!!" });
  }
  async UpdatePessoa(req: { params: { id: any }; body: any }, res: any) {
    const id = parseInt(req.params.id);
    const update_pessoa = req.body;

    try {
      await prisma.pessoa.update({
        where: {
          id: id,
        },
        data: {
          name: update_pessoa.name,
        },
      });
      res
        .status(200)
        .json({ message: `Nome atualizado para : ${update_pessoa.name}` });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  }
  async GetPessoa(req: { params: { id: any }; body: Pessoa }, res: any) {
    const id = parseInt(req.params.id);

    try {
      const get_pessoa = await prisma.pessoa.findUnique({
        where: { id: id },
        include: { Endereco: true },
      });
      if (get_pessoa !== null) {
        res.status(200).json({
          pessoa: get_pessoa,
        });
      } else {
        res.status(404).json({ message: "Pessoa não Encontrada" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  }
  async DeletePessoa(req: { params: any }, res: any) {
    const id = Number(req.params.id);

    try {
      const delete_endereco = await prisma.endereco.deleteMany({
        where: { pessoa_id: id },
      });
      const delete_pessoa = await prisma.pessoa.delete({
        where: { id: id },
      });

      res.status(200).json({
        message: "Person Deleted Successfull",
        pessoa: {
          name: delete_pessoa.name,
        },
        endereco: delete_endereco,
      });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  }
}

export default new PessoaController();
