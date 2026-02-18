import { Routes } from '@angular/router';
import { LoginShopComponent } from './pages/shop/login-shop/login-shop.component';
import { DashboardPageComponent } from './pages/shop/dashboard/dashboard-page/dashboard-page.component';
import { OrderManagementPageComponent } from './pages/shop/order-management/order-management-page/order-management-page.component';
import { OrderDetailPageComponent } from './pages/shop/order-management/order-detail-page/order-detail-page.component';

export const routes: Routes = [
    {path: 'login-shop', component: LoginShopComponent},
    {path: 'dashboard-shop', component: DashboardPageComponent},
    {path: 'order-management-shop', component: OrderManagementPageComponent},
    {path: 'order-management-shop/orders/:id', component: OrderDetailPageComponent }
];
