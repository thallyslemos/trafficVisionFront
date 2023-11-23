import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Rua } from '../../models/rua.model';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @Input({ required: true })
  ruas: Rua[] = [];

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  label: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  chart: any = [];

  labels: string[] = [];

  data: number[] = [];

  ngOnInit() {
    this.labels = this.ruas.map((rua) => rua.nome);
    this.data = this.ruas.map((rua) =>
      rua.dados_de_trafego!.reduce((total, dados) => total + dados.trafego, 0)
    );
  }

  ngAfterViewInit(): void {
    this.chart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
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
        maintainAspectRatio: false,
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
          },
        },
      },
    });

    this.cdr.detectChanges();
  }
}
