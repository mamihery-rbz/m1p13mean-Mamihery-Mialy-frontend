import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from "../../atom/header/header.component";
import { SidebarComponent } from "../../atom/sidebar/sidebar.component";
import { FooterComponent } from '../../atom/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  isSidebarOpen = false;
  isSidebarCollapsed = false;
  isMobile = window.innerWidth < 1024;

  userName = 'Jean Dupont';
  userInitials = 'JD';

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isSidebarOpen = true;
    }
  }

  ngOnInit() {
    this.isSidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
