import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService) {}
  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  handleLogout() {
    this.authService.logout();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
