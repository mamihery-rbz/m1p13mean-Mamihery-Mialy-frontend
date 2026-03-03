import { Routes } from '@angular/router';
import { LoginShopComponent } from './pages/shop/login-shop/login-shop.component';
import { DashboardPageComponent } from './pages/shop/dashboard/dashboard-page/dashboard-page.component';
import { OrderManagementPageComponent } from './pages/shop/order-management/order-management-page/order-management-page.component';
import { OrderDetailPageComponent } from './pages/shop/order-management/order-detail-page/order-detail-page.component';
import { ProductsManagementPageComponent } from './pages/shop/products-management/products-management-page/products-management-page.component';
import { FormPageComponent } from './pages/shop/products-management/form-page/form-page.component';
import { StockProductPageComponent } from './pages/shop/stock-management/stock-product-page/stock-product-page.component';
import { StockMovementPageComponent } from './pages/shop/stock-management/stock-movement-page/stock-movement-page.component';
import { StockMovementHistoryPageComponent } from './pages/shop/stock-management/stock-movement-history-page/stock-movement-history-page.component';
import { LoginShopperComponent } from './pages/shopper/login-shopper/login-shopper.component';
import { HomePageComponent } from './pages/shopper/home/home-page/home-page.component';
import { ShopPageComponent } from './pages/shopper/shop-page/shop-page/shop-page.component';
import { ProductsPageComponent } from './pages/shopper/products-page/products-page/products-page.component';
import { OrdersUserPageComponent } from './pages/shopper/orders-user-page/orders-user-page/orders-user-page.component';

export const routes: Routes = [
    {path: 'login-shop', component: LoginShopComponent},
    {path: 'dashboard-shop', component: DashboardPageComponent},
    {path: 'order-management-shop', component: OrderManagementPageComponent},
    {path: 'order-management-shop/orders/:id', component: OrderDetailPageComponent },
    {path: 'products-management-shop', component: ProductsManagementPageComponent},
    {path: 'products-management-shop/edit/:id', component: FormPageComponent},
    {path: 'products-management-shop/add', component: FormPageComponent},
    {path: 'stock-products', component: StockProductPageComponent},
    {path: 'stock-products/:productId', component: StockMovementPageComponent},
    {path: 'stock-movement-products/history/:productId', component: StockMovementHistoryPageComponent},

    {path: 'login-shopper', component: LoginShopperComponent},
    {path: 'home-page-shopper', component: HomePageComponent},
    {path: 'shop-page', component: ShopPageComponent},
    {path: 'shop/:shopId/products', component: ProductsPageComponent },
    {path: 'my-orders', component: OrdersUserPageComponent},




];
