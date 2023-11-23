import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuaFormComponent } from '../rua-form/rua-form.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-action-table',
  standalone: true,
  imports: [CommonModule, RuaFormComponent, ModalComponent],
  templateUrl: './action-table.component.html',
  styleUrl: './action-table.component.css',
})
export class ActionTableComponent implements OnInit {
  columns: any[] = [];
  rows: any[] = [];

  ngOnInit() {
    this.rows = [
      {
        name: 'Tiger Nixon',
        id: 1,
      },
      {
        name: 'Garrett Winters',
        id: 2,
      },
      {
        name: 'Ashton Cox',
        id: 3,
      },
    ];
    this.columns = ['Rua', 'Ações'];
  }
}
