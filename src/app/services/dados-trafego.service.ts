import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { DadosTrafego } from '../models/rua.model';

@Injectable({
  providedIn: 'root',
})
export class DadosTrafegoService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private url = environment.apiUrl + '/dados-trafego';

  getByRuaId(id: number): Observable<DadosTrafego[]> {
    return this.http.get<DadosTrafego[]>(this.url + '/rua/' + id).pipe(
      catchError((error) => {
        let message = error.error.message || 'Erro ao carregar dados';
        this.toastr.error(message);
        console.error(error);
        return of([]);
      })
    );
  }

  create(dadosTrafego: DadosTrafego): Observable<DadosTrafego | null> {
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
          let message = error.error.message || 'Erro ao criar dados';
          this.toastr.error(message);
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
          let message = error.error.message || 'Erro ao atualizar dados';
          this.toastr.error(message);
          console.error(error);
          return of(null);
        })
      );
  }

  delete(id: number): Observable<DadosTrafego | null> {
    return this.http.delete<DadosTrafego>(this.url + '/' + id).pipe(
      catchError((error) => {
        console.error(error);
        let message = error.error.message || 'Erro ao deletar dados';
        this.toastr.error(message);
        return of(null);
      })
    );
  }
}
