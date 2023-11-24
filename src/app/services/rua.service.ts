import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rua } from '../models/rua.model';

@Injectable({
  providedIn: 'root',
})
export class RuaService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/ruas';

  getAll(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.url);
  }

  create(rua: Rua): Observable<Rua> {
    return this.http.post<Rua>(this.url, { nome: rua.nome });
  }

  update(rua: Rua): Observable<Rua> {
    return this.http.put<Rua>(this.url + '/' + rua.id, { nome: rua.nome });
  }

  delete(id: number): Observable<Rua> {
    return this.http.delete<Rua>(this.url + '/' + id);
  }
}
