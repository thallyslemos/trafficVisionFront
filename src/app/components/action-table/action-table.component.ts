import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuaFormComponent } from '../rua-form/rua-form.component';
import { FormDataService } from '../../services/form-data.service';
import { Rua } from '../../models/rua.model';
import { RuaService } from '../../services/rua.service';
import { LoadingComponent } from '../loading/loading.component';
import { ToastService } from '../../services/toast.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-action-table',
  standalone: true,
  imports: [CommonModule, RuaFormComponent, LoadingComponent],
  templateUrl: './action-table.component.html',
})
export class ActionTableComponent implements OnInit {
  columns: any[] = [];
  rows: any[] = [];
  isLoading: boolean = false;

  constructor(
    private formService: FormDataService,
    private ruaService: RuaService,
    private toastService: ToastService
  ) {}

  openForm(rua?: { nome: string; id: number | null }) {
    this.formService.open(rua);
  }

  handleFormSubmit(event: { rua: Rua; isCreation: boolean }) {
    this.isLoading = true;

    const ruaOperation = event.isCreation
      ? this.ruaService.create(event.rua)
      : this.ruaService.update(event.rua);
    const successMessage = event.isCreation
      ? 'Rua criada com sucesso!'
      : 'Rua atualizada com sucesso!';

    ruaOperation.subscribe((data) => {
      if (data) {
        this.toastService.open({
          message: successMessage,
          type: 'success',
        });
      }
      this.isLoading = false;
      this.formService.close();
      this.loadRuas();
    });
  }

  deleteRua(id: number) {
    this.isLoading = true;

    const ruaOperation = this.ruaService.delete(id);
    const successMessage = 'Rua deletada com sucesso!';

    ruaOperation.subscribe((data) => {
      this.toastService.open({
        message: successMessage,
        type: 'success',
      });
      this.isLoading = false;
      this.formService.close();
      this.loadRuas();
    });
  }

  ngOnInit() {
    this.loadRuas();
    this.columns = ['Nome', 'Ações'];
  }

  loadRuas() {
    this.isLoading = true;
    this.ruaService
      .getAll()

      .subscribe((data) => {
        this.isLoading = false;
        this.rows = data;
      });
  }
}
