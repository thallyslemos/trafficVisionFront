import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DadosTrafego } from '../models/rua.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class DadosTrafegoService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  private url = `http://localhost:8080/dados-trafego`;

  getByRuaId(id: number): Observable<DadosTrafego[]> {
    return this.http.get<DadosTrafego[]>(this.url + '/rua/' + id).pipe(
      catchError((error) => {
        this.toastService.open({
          type: 'error',
          message: 'Erro ao carregar dados',
        });
        console.error(error);
        return of([]);
      })
    );
  }

  create(dadosTrafego: DadosTrafego): Observable<DadosTrafego | null> {
    console.log(dadosTrafego);
    const { semana, fluxo, incidentes, velocidadeMedia, rua } = dadosTrafego;
    return this.http
      .post<DadosTrafego>(this.url, {
        semana,
        fluxo,
        incidentes,
        velocidadeMedia,
        ruaId: rua!.id,
      })
      .pipe(
        catchError((error) => {
          this.toastService.open({
            type: 'error',
            message: 'Erro ao criar dados',
          });
          console.error(error);
          return of(null);
        })
      );
  }

  update(dadosTrafego: DadosTrafego): Observable<DadosTrafego | null> {
    return this.http
      .put<DadosTrafego>(this.url + '/' + dadosTrafego.id, { ...dadosTrafego })
      .pipe(
        catchError((error) => {
          this.toastService.open({
            type: 'error',
            message: 'Erro ao atualizar dados',
          });
          console.error(error);
          return of(null);
        })
      );
  }

  delete(id: number): Observable<DadosTrafego | null> {
    return this.http.delete<DadosTrafego>(this.url + '/' + id).pipe(
      catchError((error) => {
        console.error(error);
        this.toastService.open({
          type: 'error',
          message: 'Erro ao deletar dados',
        });
        return of(null);
      })
    );
  }
}
