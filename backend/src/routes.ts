import { Router } from "express";
import EnderecoController from "./controller/EnderecoController";
import PessoaController from "./controller/PessoaController";
const router = Router();

var version = {
  api_name: "Teste Anvali",
  version: "1.0",
  author: "Iuri Ramos",
};

router.get("/api/", function (req, res) {
  res.send(JSON.stringify(version));
});
// Routes Person
router.get("/api/person", PessoaController.ListPessoa); //Listar todas pessoas
router.post("/api/person", PessoaController.createPessoa); //Criar Pessoa
router.get("/api/person/find/:id", PessoaController.GetPessoa); //Pegar Pessoa pelo id
router.put("/api/person/:id", PessoaController.UpdatePessoa); //Atualizar nome Pessoa
router.delete("/api/person/:id", PessoaController.DeletePessoa); //Deletar Pessoa

// Routes Endereço
router.get("/api/endereco/", EnderecoController.GetEnderecoPessoa); //Pegar endereço único pelo id
router.get("/api/endereco/:id", EnderecoController.GetEnderecosPessoa); //Pegar endereço da Pessoa pelo id
router.get("/api/enderecos", EnderecoController.ListAllEndereco); //Listar todos endereços
router.post("/api/endereco", EnderecoController.CreateEndereco); //Cadastro Novo endereço pessoa
router.put("/api/endereco/", EnderecoController.UpdateEndereco); //Atualizar endereço pelo id
router.delete("/api/endereco/:id", EnderecoController.DeleteEndereco); //Deletar Endereço pelo id

export { router };
