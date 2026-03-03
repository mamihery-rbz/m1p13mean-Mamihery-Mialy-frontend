import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-header-shopper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-shopper.component.html',
  styleUrl: './header-shopper.component.css'
})
export class HeaderShopperComponent {
  isDropdownOpen = false;
  userName: string = '';
  cartCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.userName = user.name || 'Client';
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login-shopper']);
  }
}
