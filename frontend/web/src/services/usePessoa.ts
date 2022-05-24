import { useState } from "react";
import axios from "axios";
import { Pessoa } from "../@types/";

export default function usePessoa() {
  const baseurl = "http://localhost:5000/";
  const header = {
    headers: {
      "content-type": "aplication/json",
    },
  };

  const [persons, setPessoas] = useState<Pessoa[]>([]);
  async function getAllPessoas() {
    const get_pessoas = await axios.get(`${baseurl}api/person`, {});
    // console.log(get_pessoas);

    setPessoas(get_pessoas.data.pessoas);
  }

  async function DeletePerson(id: number) {
    const delete_person = await axios.delete(`${baseurl}api/person/${id}`, {});

    alert(`${delete_person.data.message}!
    Nome:${delete_person.data.pessoa.name}
    Endereço:${delete_person.data.pessoa.endereco}`);
  }

  return {
    getAllPessoas,
    persons,
  };
}
