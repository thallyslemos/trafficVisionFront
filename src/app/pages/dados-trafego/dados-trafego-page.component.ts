import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DadosTrafegoTableComponent } from '../../components/dados-trafego-table/dados-trafego-table.component';

@Component({
  selector: 'app-dados-trafego-page',
  standalone: true,
  imports: [CommonModule, DadosTrafegoTableComponent],
  templateUrl: './dados-trafego-page.component.html',
})
export class DadosTrafegoPageComponent {
  id: number | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    console.log('teste');

  }
}
