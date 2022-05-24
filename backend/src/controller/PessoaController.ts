import { PrismaClient } from "@prisma/client";
import { Id } from "../@types/ID";
import { Pessoa } from "../@types/Pessoa";

const prisma = new PrismaClient();

class PessoaController {
  async ListPessoa(req: any, res: any) {
    const pessoas = await prisma.pessoa.findMany({
      include: { endereco: true },
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
          endereco: {
            create: {
              andress: pessoa.andress,
              number: pessoa.number,
              bairro: pessoa.bairro,
              complemento: pessoa.complemento,
              cep: pessoa.cep,
              city: pessoa.city,
              uf: pessoa.uf,
            },
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
        include: { endereco: true },
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
      const delete_pessoa = await prisma.pessoa.delete({
        where: { id: id },
      });

      const delete_endereco = await prisma.endereco.delete({
        where: { id: id },
      });

      res.status(200).json({
        message: "Person Deleted Successfull",
        pessoa: {
          name: delete_pessoa.name,
        },
        endereco: delete_endereco.andress,
      });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  }
}

export default new PessoaController();
