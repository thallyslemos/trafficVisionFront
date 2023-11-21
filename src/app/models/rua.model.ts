export interface DadosDeTrafego {
  id: number;
  semana: number;
  trafego: number;
  velocidade_media: number;
  incidentes: number;
}

export interface Rua {
  id: number;
  nome: string;
  dados_de_trafego?: DadosDeTrafego[];
}
