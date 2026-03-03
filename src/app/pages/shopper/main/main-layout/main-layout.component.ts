import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderShopperComponent } from '../../atom/header-shopper/header-shopper.component';
import { SidebarShopperComponent } from '../../atom/sidebar-shopper/sidebar-shopper.component';
import { FooterShopperComponent } from '../../atom/footer-shopper/footer-shopper.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderShopperComponent,
    SidebarShopperComponent,
    FooterShopperComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
}
