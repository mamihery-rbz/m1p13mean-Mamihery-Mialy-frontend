import { Component } from '@angular/core';
import { ListProductsComponent } from "../../../shop/products-management/components/list-products/list-products.component";
import { ListShopComponent } from "../components/list-shop/list-shop.component";
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";
import { ShopperService } from '../../../../services/shopper/shopper.service';

@Component({
  selector: 'app-shop-page',
  imports: [RouterModule, ListShopComponent, MainLayoutComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {
  shops: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private shopperService: ShopperService) {}

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops(): void {
    this.loading = true;
    this.shopperService.getShops().subscribe({
      next: (res) => {
        this.shops = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors du chargement';
        this.loading = false;
      }
    });
  }
}
