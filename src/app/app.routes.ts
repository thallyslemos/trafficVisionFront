import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { RuaPageComponent } from './pages/rua-page/rua-page.component';
import { DadosTrafegoPageComponent } from './pages/dados-trafego/dados-trafego-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'ruas', component: RuaPageComponent },
      { path: 'ruas/:id', component: DadosTrafegoPageComponent },
    ],
  },
];
