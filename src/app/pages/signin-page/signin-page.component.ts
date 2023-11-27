import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
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
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleRegister(event: { email: string | null; senha: string | null }) {
    this.usuarioService
      .create({ email: event.email!, senha: event.senha! })
      .subscribe((usuario) => {
        console.log('usuario');
        console.log(usuario);
        if (usuario) {
          this.toastr.success('Usuário cadastrado com sucesso!');
          this.router.navigate(['/login']);
        }
      });
  }
}
