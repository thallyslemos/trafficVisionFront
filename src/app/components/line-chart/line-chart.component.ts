import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { Rua } from '../../models/rua.model';
import { ColorSelector } from '../../../utils/ColorSelector';

type DataType = 'incidentes' | 'trafego' | 'velocidade';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input({ required: true })
  ruas: Rua[] = [];

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  type: DataType = 'incidentes';

  @Input({ required: true })
  chart_id: string = 'line-chart';

  constructor(private cdr: ChangeDetectorRef) {}

  chart: any = [];

  labels: string[] = [];

  datasets: any[] = [];

  ngOnInit() {
    this.labels = this.ruas[0].dadosTrafego!.map(
      (dado) => `Semana ${dado.semana}`
    );

    this.datasets = this.ruas.map((rua, index) => {
      return {
        label: rua.nome,
        data: rua.dadosTrafego?.map((dado) => {
          switch (this.type) {
            case 'incidentes':
              return dado.incidentes;
            case 'trafego':
              return dado.fluxo;
            case 'velocidade':
              return dado.velocidadeMedia;
          }
        }),
        fill: false,
        borderColor: ColorSelector(index),
        backgroundColor: ColorSelector(index),
        yAxisID: 'y',
      };
    });
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.chart_id, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: this.title,
          },
          legend: {
            fullSize: true,
            labels: {
              boxWidth: 4,
              boxHeight: 4,
            },
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
        },
      },
    });

    this.cdr.detectChanges();
  }
}
