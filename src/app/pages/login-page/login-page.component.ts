import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, UsuarioFormComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor(private authService: AuthService) {}

  handleLogin(event: { email: string | null; senha: string | null }) {
    this.authService
      .login({ email: event.email!, senha: event.senha! })
      .subscribe();
  }
}
