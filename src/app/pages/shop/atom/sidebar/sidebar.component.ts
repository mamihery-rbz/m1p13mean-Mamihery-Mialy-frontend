import { AuthService } from './../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() isOpen = false;
  @Output() closeSidebarEvent = new EventEmitter<void>();
  authService = inject(AuthService);


  isCollapsed = false;
  isMobile = window.innerWidth < 1024;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isOpen = true;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSidebar() {
    if (this.isMobile) {
      this.isOpen = false;
      this.closeSidebarEvent.emit();
    }
  }

  to_dashboard() {
    this.router.navigate(['/dashboard-shop']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login-shop']);
  }
}
