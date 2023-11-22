import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Rua } from '../../models/rua.model';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {
  @Input({ required: true })
  ruas: Rua[] = [];

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  label: string = '';

  chart: any = [];

  ngOnInit() {
    const labels = this.ruas.map((rua) => rua.nome);
    const data = this.ruas.map((rua) =>
      rua.dados_de_trafego?.reduce((total, dados) => total + dados.trafego, 0)
    );

    this.chart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.label,
            data: data,
            borderWidth: 1,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            barThickness: 'flex',
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
