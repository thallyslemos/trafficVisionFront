import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, NavBarComponent, RouterOutlet, LoadingComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

}
