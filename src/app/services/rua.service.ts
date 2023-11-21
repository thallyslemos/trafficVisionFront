import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rua } from '../models/rua.model';

@Injectable({
  providedIn: 'root'
})
export class RuaService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/ruas';

  getRuas(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.url);
  }
}
