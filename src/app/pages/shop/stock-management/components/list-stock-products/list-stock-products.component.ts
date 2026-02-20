import { Component, Input } from '@angular/core';
import { StockProduct } from '../../../../../services/shop/stock-management/stock-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-stock-products',
  imports: [],
  templateUrl: './list-stock-products.component.html',
  styleUrl: './list-stock-products.component.css'
})
export class ListStockProductsComponent {
  @Input() stocks: StockProduct[] = [];
  @Input() loading = false;
  @Input() errorMessage = '';

  constructor(private router: Router) {}

  go_to_movement(productId: string) {
    this.router.navigate(['/stock-products', productId]);
  }

  go_to_history(productId: string) {
    this.router.navigate(['/stock-movement-products/history', productId]);
  }
}
