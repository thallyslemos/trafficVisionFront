import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of } from 'rxjs';
import { Rua } from '../models/rua.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RuaService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private url = environment.apiUrl + '/ruas';

  getAll(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.url).pipe(
      catchError((error) => {
        let message = error.error.message || 'Erro ao carregar dados';
        this.toastr.error(message);
        console.error(error);
        return of([]);
      })
    );
  }

  getAllWithData(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.url + '/dados').pipe(
      catchError((error) => {
        let message = error.error.message || 'Erro ao carregar dados';
        this.toastr.error(message);
        console.error(error);
        return of([]);
      })
    );
  }
  create(rua: Rua): Observable<Rua | null> {
    return this.http.post<Rua>(this.url, { nome: rua.nome }).pipe(
      catchError((error) => {
        let message = error.error.message || 'Erro ao criar dados';
        this.toastr.error(message);
        console.error(error);
        return of(null);
      })
    );
  }

  update(rua: Rua): Observable<Rua | null> {
    return this.http.put<Rua>(this.url + '/' + rua.id, { nome: rua.nome }).pipe(
      catchError((error) => {
        let message = error.error.message || 'Erro ao autualizar dados';
        this.toastr.error(message);
        console.error(error);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<Rua | null> {
    return this.http.delete<Rua>(this.url + '/' + id).pipe(
      catchError((error) => {
        console.error(error);
        let message = error.error.message || 'Erro ao deletar dados';
        this.toastr.error(message);
        return of(null);
      })
    );
  }
}
