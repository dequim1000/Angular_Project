export class CadastroBaseModel {
  dadosEmpresa: DadosEmpresaModel;
  representantesLegais: RepresentanteLegalModel[];
  informacoesFinanceiras: InformacaoFinanceiraModel;
  tipoCadastroTraderContraparte: tipoCadastroTraderContraparteEnum = tipoCadastroTraderContraparteEnum.formulario;
  cadastroTraderContraparteArquivo?: ArquivoModel;
  tradersAutorizados: TraderAutorizadoModel[];
  contrapartesPreAutorizadas: ContrapartePreAutorizadaModel[];
  arquivos: ArquivoModel[];
}

export enum tipoCadastroTraderContraparteEnum {
  formulario = 0,
  planilha = 1,
}
export class DadosEmpresaModel {
  razaoSocial: string;
  idClassificacao: string;
  cnpj: number | null;
  dataConstituicao: Date | null;
  cep: number | null;
  cidade: string;
  estado: string;
  endereco: string;
  numero: string;
  complemento: string;
}

export class RepresentanteLegalModel {
  nomeCompleto: string;
  cpf: number;
  email: string;
}

export class InformacaoFinanceiraModel {
  patrimonioLiquido: number | null;
  dataBase: Date | null;
  responsavel: string;
  email: string;
  telefone: number | null;
}

export class TraderAutorizadoModel {
  nomeCompleto: string;
  cpf: number;
  email: string;
}

export class ContrapartePreAutorizadaModel {
  razaoSocial: string;
  cnpj: number;
  limite: number;
  limiteMeses: number | null;
  limiteVolume: number | null;
}

export class ArquivoModel {
  tipoArquivo: number;
  nome: string;
  dataCriacao: Date;
  bytes: string;
}

export class CadastroModel extends CadastroBaseModel {
  id: string;
  dataCriacao: Date;
}

export class CadastroInputModel extends CadastroBaseModel {}
