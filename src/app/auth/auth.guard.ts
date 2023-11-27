import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn() !== true) {
      this.toastr.warning('Faça login para acessar essa páina!');
      this.router.navigate(['login']);
    }
    return true;
  }
}
