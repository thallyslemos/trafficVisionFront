import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { Usuario } from '../models/usuario.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {}

  private url = 'http://localhost:8080/auth';

  public login(credenciais: Usuario): Observable<Auth | null> {
    return this.http.post<Auth>(this.url, credenciais).pipe(
      tap((auth) => {
        if (auth !== null) {
          localStorage.setItem('token', auth.token);
          this.router.navigate(['/auth']);
          this.toastService.open({
            type: 'success',
            message: 'Autenticado com sucesso',
          });
        }
      }),
      catchError((error) => {
        console.error(error);
        this.toastService.open({
          type: 'error',
          message: 'Erro ao autenticar',
        });
        return of(null);
      })
    );
  }

  public isLoggedIn(): boolean {
    // Verifica se o token existe no localStorage
    return localStorage.getItem('token') !== null;
  }

  public getToken(): string | null {
    // Retorna o token do localStorage
    return localStorage.getItem('token');
  }

  public logout(): void {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
