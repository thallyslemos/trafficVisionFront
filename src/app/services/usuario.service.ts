import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private url = 'http://localhost:8080/usuarios';

  public create(usuario: Usuario): Observable<boolean> {
    return this.http
      .post<Usuario>(this.url, usuario, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.status === 201;
        }),
        catchError((error) => {
          console.error(error);
          let message = error.error.message || 'Erro ao cadastrar usuário';
          this.toastr.error(message);
          return of(false);
        })
      );
  }
}
