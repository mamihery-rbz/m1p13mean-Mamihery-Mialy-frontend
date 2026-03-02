import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageAdminComponent } from './pages/admin/home-page-admin/home-page-admin.component';
import { CrudPageAdminComponent } from './pages/admin/crud-page-admin/crud-page-admin.component';
import { HomePageClientComponent } from './pages/shopper/home-page-client/home-page-client.component';
import { PanierPageClientComponent } from './pages/shopper/panier-page-client/panier-page-client.component';

@Component({
  selector: 'app-root',
  imports: [HomePageAdminComponent,CrudPageAdminComponent, RouterOutlet,HomePageClientComponent,PanierPageClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm1p13mean-Mamihery-Mialy-frontend';
}
