import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-dados-trafego-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dados-trafego-form.component.html',
})
export class DadosTrafegoFormComponent {
  isOpen$ = this.formService.isOpen$;
  data$ = this.formService.data$;
  dadosForm: FormGroup;
  isCreation: boolean = false;
  dadosId: number | null = null;
  @Output() submitForm = new EventEmitter<any>();

  constructor(private formService: FormDataService) {
    this.dadosForm = new FormGroup({
      semana: new FormControl(0, [Validators.required, Validators.min(0)]),
      fluxo: new FormControl(0, [Validators.required, Validators.min(0)]),
      velocidadeMedia: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      incidentes: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  closeForm() {
    this.formService.close();
  }

  submit() {
    if (this.dadosForm.valid) {
      const { semana, fluxo, incidentes, velocidadeMedia } =
        this.dadosForm.value;
      this.submitForm.emit({
        dados: { semana, fluxo, incidentes, velocidadeMedia, id: this.dadosId },
        isCreation: this.isCreation,
      });
      this.formService.close();
    } else {
      this.dadosForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.data$.subscribe((dados) => {
      console.log(dados);
      if (dados) {
        this.dadosForm.setValue({
          semana: dados.semana,
          fluxo: dados.fluxo,
          incidentes: dados.incidentes,
          velocidadeMedia: dados.velocidadeMedia,
        });
        this.isCreation = !!dados;
        this.dadosId = dados.id;
      }
    });
  }
}
