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
router.get("/api/person", PessoaController.ListPessoa);
router.post("/api/person", PessoaController.createPessoa);
router.get("/api/person/find/:id", PessoaController.GetPessoa);
router.put("/api/person/:id", PessoaController.UpdatePessoa);
router.delete("/api/person/:id", PessoaController.DeletePessoa);

// Routes Endereço

router.put("/api/endereco/:id", EnderecoController.UpdateEndereco);

export { router };
