import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rua-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rua-form.component.html',
})
export class RuaFormComponent {
  @Input() rua: any;
}
