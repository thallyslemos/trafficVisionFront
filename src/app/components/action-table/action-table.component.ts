import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuaFormComponent } from '../rua-form/rua-form.component';
import { FormDataService } from '../../services/form-data.service';
import { Rua } from '../../models/rua.model';
import { RuaService } from '../../services/rua.service';
import { LoadingComponent } from '../loading/loading.component';
import { ToastService } from '../../services/toast.service';

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
    if (event.isCreation) {
      this.ruaService.create(event.rua).subscribe((data) => {
        this.toastService.close()
        this.toastService.open({
          message: 'Rua criada com sucesso!',
          type: 'success',
        });
        this.isLoading = false;
        this.formService.close();
        this.loadRuas();
      });
    } else {
      this.ruaService.update(event.rua).subscribe((data) => {
        this.toastService.close()
        this.toastService.open({
          message: 'Rua atualizada com sucesso!',
          type: 'success',
        })
        this.isLoading = false;
        this.formService.close();
        this.loadRuas();
      });
    }
  }

  deleteRua(id: number) {
    // inserir modal de confirmação de deleção
    this.isLoading = true;
    this.ruaService.delete(id).subscribe((data) => {
      this.toastService.close()
      this.toastService.open({
        message: 'Rua deletada com sucesso!',
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
    this.ruaService.getAll().subscribe((data) => {
      this.isLoading = false;
      this.rows = data;
    });
  }
}
