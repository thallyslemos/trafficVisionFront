import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuaFormComponent } from '../rua-form/rua-form.component';
import { FormDataService } from '../../services/form-data.service';
import { Rua } from '../../models/rua.model';
import { RuaService } from '../../services/rua.service';

@Component({
  selector: 'app-action-table',
  standalone: true,
  imports: [CommonModule, RuaFormComponent],
  templateUrl: './action-table.component.html',
})
export class ActionTableComponent implements OnInit {
  columns: any[] = [];
  rows: any[] = [];

  constructor(
    private formService: FormDataService,
    private ruaService: RuaService
  ) {}

  openForm(rua?: { nome: string; id: number | null }) {
    this.formService.open(rua);
  }

  handleFormSubmit(event: { rua: Rua; isCreation: boolean }) {
    console.log(event);
    if (event.isCreation) {
      this.ruaService.create(event.rua).subscribe((data) => {
        this.formService.close();
        this.loadRuas();
      });
    } else {
      this.ruaService.update(event.rua).subscribe((data) => {
        this.formService.close();
        this.loadRuas();
      });
    }
  }

  deleteRua(id: number) {
    // inserir modal de confirmação de deleção
    this.ruaService.delete(id).subscribe((data) => {
      this.formService.close();
      this.loadRuas();
    });
  }

  ngOnInit() {
    this.loadRuas();
    this.columns = ['Nome', 'Ações'];
  }

  loadRuas() {
    this.ruaService.getAll().subscribe((data) => {
      this.rows = data;
    });
  }
}
