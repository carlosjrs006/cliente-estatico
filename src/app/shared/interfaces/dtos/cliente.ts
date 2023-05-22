export class ClienteRequest {

    nome!: string;
    cpfOrCnpj!: string;
    rgOrIe!: string;
    situacao!: string;
    tipoPublico!: string;
    telefones!: string[];
}

export class ClienteResponse {
  codCliente!: number;
  nome!: string;
  cpfOrCnpj!: string;
  rgOrIe!: string;
  situacao!: string;
  tipoPublico!: string;
  telefones!: string[];
}



