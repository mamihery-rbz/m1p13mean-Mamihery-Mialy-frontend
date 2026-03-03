import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListStockMovementProductsComponent } from "../components/list-stock-movement-products/list-stock-movement-products.component";
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";
import { StockManagementService } from '../../../../services/shop/stock-management/stock-management.service';
import { FilterStockMovementComponent } from "../components/filter-stock-movement/filter-stock-movement.component";

@Component({
  selector: 'app-stock-movement-history-page',
  imports: [ListStockMovementProductsComponent, MainLayoutComponent, FilterStockMovementComponent],
  templateUrl: './stock-movement-history-page.component.html',
  styleUrl: './stock-movement-history-page.component.css'
})
export class StockMovementHistoryPageComponent {
  productId!: string;
  loading = false;
  productsMovements: any[] = [];
  errorMessage = '';
  product: any = null;

  constructor(private route: ActivatedRoute) {}
  stockService = inject(StockManagementService);

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
    this.loadHistory();
  }


  loadHistory() {
    this.loading = true;
    this.errorMessage = '';

    this.stockService.get_stock_movement_story_byProduct(this.productId).subscribe({
      next: (data) => {
        this.productsMovements = data.history;
        this.product = data.TheProduct;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement';
        this.loading = false;
      }
    });
  }


  applyFilter(filters: any) {

    this.loading = true;

    this.stockService.get_filtered_stock_movement_products(this.productId, filters).subscribe({
          next: (data) => {
            this.productsMovements = data;
            this.loading = false;
          },
          error: (err) => {
            this.errorMessage = err.error?.error || 'Erreur filtre';
            this.loading = false;
          }
        });
  }
}
