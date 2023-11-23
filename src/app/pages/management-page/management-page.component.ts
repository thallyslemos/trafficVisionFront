import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionTableComponent } from '../../components/action-table/action-table.component';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [CommonModule, ActionTableComponent],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

}
