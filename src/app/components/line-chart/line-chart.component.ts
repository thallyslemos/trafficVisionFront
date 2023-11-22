import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { Rua } from '../../models/rua.model';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent {
  @Input({ required: true })
  ruas: Rua[] = [];

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  label: string = '';

  chart: any = [];

  ngOnInit() {
    console.log(this.ruas);

    const labels = this.ruas.map((rua) => rua.nome);
    const data = this.ruas.map((rua) =>
      rua.dados_de_trafego?.reduce((total, dados) => total + dados.trafego, 0)
    );

    this.chart = new Chart('line-chart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.label,
            data: data,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
      },

      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.title,
          },
          legend: {
            labels: {
              boxWidth: 0,
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,
            min: 500,
          },
        },
      },
    });
  }
}
