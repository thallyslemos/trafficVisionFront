export type DadosDeTrafego = {
  id: number;
  semana: number;
  trafego: number;
  velocidade_media: number;
  incidentes: number;
};

export type Rua = {
  id: number;
  nome: string;
  dados_de_trafego?: DadosDeTrafego[];
};
