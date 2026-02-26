import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageAdminComponent } from './pages/home-page-admin/home-page-admin.component';

@Component({
  selector: 'app-root',
  imports: [HomePageAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm1p13mean-Mamihery-Mialy-frontend';
}
