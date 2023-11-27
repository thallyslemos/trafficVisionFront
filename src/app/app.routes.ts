import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DadosTrafegoPageComponent } from './pages/dados-trafego/dados-trafego-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RuaPageComponent } from './pages/rua-page/rua-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'signin', component: SigninPageComponent },
      { path: 'auth', canActivate: [AuthGuard], component: HomePageComponent },
      { path: 'auth/dashboard', canActivate: [AuthGuard], component: DashboardPageComponent },
      { path: 'auth/ruas', canActivate: [AuthGuard], component: RuaPageComponent },
      { path: 'auth/ruas/:id', canActivate: [AuthGuard], component: DadosTrafegoPageComponent },
    ],
  },
];
