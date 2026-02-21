import { Component, OnInit } from '@angular/core';
import { StockManagementService, StockProduct } from '../../../../services/shop/stock-management/stock-management.service';
import { ListStockProductsComponent } from '../components/list-stock-products/list-stock-products.component';
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";

@Component({
  selector: 'app-stock-product-page',
  standalone: true,
  imports: [ListStockProductsComponent, MainLayoutComponent],
  templateUrl: './stock-product-page.component.html',
  styleUrl: './stock-product-page.component.css'
})
export class StockProductPageComponent implements OnInit{

  stocks: StockProduct[] = [];
  loading = false;
  errorMessage = '';

  constructor(private stockService: StockManagementService) {}

  ngOnInit(): void {
    this.load_stocks();
  }

  load_stocks() {
    this.loading = true;

    this.stockService.get_shop_stock().subscribe({
      next: (data) => {
        this.stocks = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur chargement';
        this.loading = false;
      }
    });
  }
}
