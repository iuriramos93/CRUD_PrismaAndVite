import { useState } from "react";

import axios from "axios";

import { EnderecoType } from "../@types";

export default function useEndereco() {
  const baseurl = "http://localhost:5000/";
  const header = {
    headers: {
      "content-type": "aplication/json",
    },
  };

  const [andressPerson, setAndressPerson] = useState<EnderecoType[] | any>([]);
  const [andress, setAndress] = useState<EnderecoType[] | any>([]);
  const [allandress, setAllAndress] = useState<EnderecoType[] | any>([]);

  async function getAllAndress() {
    try {
      const list_andress = await axios.get(`${baseurl}api/enderecos`, {});

      setAllAndress(list_andress.data.get_all_andress);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetAllAndressPerson(id: EnderecoType) {
    try {
      const get_andress_id = await axios.get(
        `${baseurl}api/endereco/${id}`,
        {}
      );

      setAndressPerson(get_andress_id);
    } catch (error) {
      alert(error);
    }
  }

  async function getAndress(id: EnderecoType) {
    const get_andress = await axios.get(`${baseurl}api/endereco/?id=${id}`);
    setAndress(get_andress);
  }
  return {
    // GetAllAndressPerson,
    // getAndress,
    getAllAndress,
    allandress,
    // andress,
    // andressPerson,
  };
}
