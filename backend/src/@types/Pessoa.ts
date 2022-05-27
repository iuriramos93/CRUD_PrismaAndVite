type Pessoa = {
  name: string;
  cpf: string;
  endereco: [
    {
      andress: string;
      number: string;
      bairro: string;
      complemento: string;
      cep: string;
      city: string;
      uf: string;
    }
  ];
};

export { Pessoa };
