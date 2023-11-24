import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rua-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ReactiveFormsModule],
  templateUrl: './rua-form.component.html',
})
export class RuaFormComponent {
  isOpen$ = this.formService.isOpen$;
  data$ = this.formService.data$;
  ruaForm: FormGroup;
  isCreation: boolean = false;
  ruaId: number | null = null;
  @Output() submitForm = new EventEmitter<any>();

  constructor(private formService: FormDataService) {
    this.ruaForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  closeForm() {
    this.formService.close();
  }

  submit() {
    if (this.ruaForm.valid) {
      this.submitForm.emit({
        rua: { nome: this.ruaForm.value.nome, id: this.ruaId },
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
        this.ruaForm.setValue({ nome: data.nome });
        this.isCreation = !data.id;
        console.log(this.isCreation);
        this.ruaId = data.id;
      }
    });
  }
}
