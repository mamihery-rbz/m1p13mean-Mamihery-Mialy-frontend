import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() userName: string = 'Admin';
  @Input() userInitials: string = 'AD';
  @Input() shopName: string = 'Ma Boutique';

  @Output() toggleSidebarEvent = new EventEmitter<void>();
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const theUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    if (theUser) {
      this.user = theUser;
      this.userName = theUser.name || 'Admin';
      this.userInitials = theUser.name ? theUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AD';
    }
    const theShop = localStorage.getItem('shop') ? JSON.parse(localStorage.getItem('shop')!) : null;
    if (theShop) {
      this.shopName = theShop.name || 'Ma Boutique';
    }
  }

  isProfileMenuOpen = false;

  authService = inject(AuthService);

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login-shop']);
  }
}
