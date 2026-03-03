import { Component, inject, Input } from '@angular/core';
import { StockManagementService } from '../../../../../services/shop/stock-management/stock-management.service';
import { CommonModule } from '@angular/common';
import { FilterStockMovementComponent } from '../filter-stock-movement/filter-stock-movement.component';

@Component({
  selector: 'app-list-stock-movement-products',
  imports: [CommonModule, FilterStockMovementComponent],
  templateUrl: './list-stock-movement-products.component.html',
  styleUrl: './list-stock-movement-products.component.css'
})
export class ListStockMovementProductsComponent {

  @Input() productId!: string;

  private stockService = inject(StockManagementService);

  @Input() movements: any[] = [];
  @Input() product: any = null;
  @Input() errorMessage = '';

  loading = false;

  // ngOnInit() {
  //   this.loadHistory();
  // }

  // loadHistory() {
  //   this.loading = true;
  //   this.errorMessage = '';

  //   this.stockService.get_stock_movement_story_byProduct(this.productId).subscribe({
  //     next: (data) => {
  //       this.movements = data.history;
  //       this.product = data.TheProduct;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error?.message || 'Erreur lors du chargement';
  //       this.loading = false;
  //     }
  //   });
  // }

  getType(movement: any): 'IN' | 'OUT' {
    return movement.in > 0 ? 'IN' : 'OUT';
  }

  getQuantity(movement: any): number {
    return movement.in > 0 ? movement.in : movement.out;
  }


  
}
