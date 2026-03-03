import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar-shopper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-shopper.component.html',
  styleUrl: './sidebar-shopper.component.css'
})
export class SidebarShopperComponent implements OnInit{
  activeCategory: string = 'tous';
  @Input() userName: string = 'Utilisateur';
  @Input() userInitials: string = 'U';
  user: any = null;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

  ngOnInit(): void {
    const theUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    if (theUser) {
      this.user = theUser;
      this.userName = theUser.name || 'Admin';
      this.userInitials = theUser.name ? theUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AD';
    }

  }

  categories = [
    { id: 'tous', name: 'Tous les produits', icon: '🏠' },
    { id: 'electronique', name: 'Électronique', icon: '📱' },
    { id: 'vetements', name: 'Vêtements', icon: '👗' },
    { id: 'maison', name: 'Maison', icon: '🏠' },
    { id: 'livres', name: 'Livres', icon: '📚' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  selectCategory(id: string) {
    this.activeCategory = id;
  }
}
