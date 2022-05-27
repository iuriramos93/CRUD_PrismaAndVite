
type Pessoa = {
    id: number
    name: string
    cpf: string
    Endereco: [{
        andress: string
        number: string
        bairro: string
        complemento: string
        cep: string
        city: string
        uf: string
    }]
}

type EnderecoType = {
    id: number
    andress: string
    number: string
    bairro: string
    complemento: string
    cep: string
    city: string
    uf: string
    Pessoa: {
        name: string

    }
}

export type { Pessoa, EnderecoType }