import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ColorSelector } from '../../../utils/ColorSelector';
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

  colors: string[] = [];

  ngOnInit() {
    this.labels = this.ruas.map((rua) => rua.nome);
    this.ruas.map((rua, index) => {
      this.data.push(
        rua.dadosTrafego!.reduce((total, dados) => total + dados.fluxo!, 0)
      );
      this.colors.push(ColorSelector(index));
    });
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
            backgroundColor: this.colors,
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
