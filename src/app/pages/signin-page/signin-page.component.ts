import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { ToastService } from '../../services/toast.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [CommonModule, UsuarioFormComponent],
  templateUrl: './signin-page.component.html',
})
export class SigninPageComponent {
  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastService
  ) {}

  handleRegister(event: { email: string | null; senha: string | null }) {
    this.usuarioService
      .create({ email: event.email!, senha: event.senha! })
      .subscribe((usuario) => {
        this.toastService.open({
          type: 'success',
          message: `Usuário criado com sucesso!`,
        });
      });
  }
}
