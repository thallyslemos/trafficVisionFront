import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {
  @Input() type: 'login' | 'register' = 'login';
  @Output() submitForm = new EventEmitter<{
    email: string | null;
    senha: string | null;
  }>();

  hidePassword = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const { email, senha } = this.form.value;
      this.submitForm.emit({
        email: email !== undefined ? email : null,
        senha: senha !== undefined ? senha : null,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
