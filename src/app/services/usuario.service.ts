import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  private url = 'http://localhost:8080/usuarios';

  public create(usuario: Usuario): Observable<Usuario | null> {
    return this.http.post<Usuario>(this.url, usuario).pipe(
      catchError((error) => {
        console.error(error);
        // this.toastService.open({
        //   type: 'error',
        //   message: 'Erro ao criar usuário',
        // });
        return of(null);
      })
    );
  }
}
