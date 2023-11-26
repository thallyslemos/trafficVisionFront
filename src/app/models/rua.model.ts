export type DadosTrafego = {
  id: number;
  semana: number;
  fluxo: number;
  velocidadeMedia: number;
  incidentes: number;
};

export type Rua = {
  id: number;
  nome: string;
  dadosTrafego?: DadosTrafego[];
};
