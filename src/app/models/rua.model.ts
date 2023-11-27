export type DadosTrafego = {
  id?: number;
  semana?: number;
  fluxo?: number;
  velocidadeMedia?: number;
  incidentes?: number;
  rua?: { id: number; nome: string };
};

export type Rua = {
  id: number;
  nome: string;
  dadosTrafego?: DadosTrafego[];
};
