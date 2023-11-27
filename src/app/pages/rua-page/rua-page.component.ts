import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionTableComponent } from '../../components/action-table/action-table.component';

@Component({
  selector: 'app-rua-page',
  standalone: true,
  imports: [CommonModule, ActionTableComponent],
  templateUrl: './rua-page.component.html',
})
export class RuaPageComponent {
constructor() {}
}
