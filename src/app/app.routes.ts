import { Routes } from '@angular/router';
import { LoginShopComponent } from './pages/shop/login-shop/login-shop.component';
import { DashboardPageComponent } from './pages/shop/dashboard/dashboard-page/dashboard-page.component';

export const routes: Routes = [
    {path: 'login-shop', component: LoginShopComponent},
    {path: 'dashboard-shop', component: DashboardPageComponent}
];
