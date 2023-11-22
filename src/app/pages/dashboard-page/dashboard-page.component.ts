import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuaService } from '../../services/rua.service';
import { Rua } from '../../models/rua.model';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, BarChartComponent, LineChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  constructor(private ruaService: RuaService) { }

  public ruas: Rua[] = [];

  ngOnInit(): void {
    this.ruaService.getRuas().subscribe((ruas: Rua[]) => {
      this.ruas = ruas;
    })
  }

}
