import { Routes } from '@angular/router';
import { HomePageAdminComponent } from './pages/admin/home-page-admin/home-page-admin.component';

export const routes: Routes = [
  { path: '', component: HomePageAdminComponent, pathMatch: 'full' },
  // future pages can be added here as they are developed
  { path: '**', redirectTo: '' }
];
