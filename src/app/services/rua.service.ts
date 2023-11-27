import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Rua } from '../models/rua.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class RuaService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  private url = `http://localhost:8080/ruas`;

  getAll(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.url).pipe(
      catchError((error) => {
        // this.toastService.open({
        //   type: 'error',
        //   message: 'Erro ao carregar dados',
        // });
        console.error(error);
        return of([]);
      })
    );
  }

  getAllWithData(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.url + '/dados').pipe(
      catchError((error) => {
        // this.toastService.open({
        //   type: 'error',
        //   message: 'Erro ao carregar dados',
        // });
        console.error(error);
        return of([]);
      })
    );
  }
  create(rua: Rua): Observable<Rua | null> {
    return this.http.post<Rua>(this.url, { nome: rua.nome }).pipe(
      catchError((error) => {
        // this.toastService.open({
        //   type: 'error',
        //   message: 'Erro ao criar dados',
        // });
        console.error(error);
        return of(null);
      })
    );
  }

  update(rua: Rua): Observable<Rua | null> {
    return this.http.put<Rua>(this.url + '/' + rua.id, { nome: rua.nome }).pipe(
      catchError((error) => {
        // this.toastService.open({
        //   type: 'error',
        //   message: 'Erro ao atualizar dados',
        // });
        console.error(error);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<Rua | null> {
    return this.http.delete<Rua>(this.url + '/' + id).pipe(
      catchError((error) => {
        console.error(error);
        // this.toastService.open({
        //   type: 'error',
        //   message: 'Erro ao deletar dados',
        // });
        return of(null);
      })
    );
  }
}
