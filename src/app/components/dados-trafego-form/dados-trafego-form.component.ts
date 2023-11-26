import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  closeForm() {
    this.formService.close();
  }

  submit() {
    if (this.dadosForm.valid) {
      this.submitForm.emit({
        rua: { nome: this.dadosForm.value.nome, id: this.dadosId },
        isCreation: this.isCreation,
      });
      this.formService.close();
    } else {
      // tratar caso de validação falhar...
    }
  }

  ngOnInit() {
    this.data$.subscribe((data) => {
      if (data) {
        this.dadosForm.setValue({ nome: data.nome });
        this.isCreation = !data.id;
        console.log(this.isCreation);
        this.dadosId = data.id;
      }
    });
  }
}
