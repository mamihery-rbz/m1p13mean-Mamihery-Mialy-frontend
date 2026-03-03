import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockManagementService } from '../../../../services/shop/stock-management/stock-management.service';
import { FormStockMovementComponent } from "../components/form-stock-movement/form-stock-movement.component";
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-movement-page',
  imports: [FormStockMovementComponent, MainLayoutComponent, CommonModule],
  templateUrl: './stock-movement-page.component.html',
  styleUrl: './stock-movement-page.component.css'
})
export class StockMovementPageComponent {

  productId!: string;
  stockData: any;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockManagementService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
    this.load_stock();
  }

  load_stock() {
    this.loading = true;

    this.stockService.get_shop_stock_by_IdProduct(this.productId)
      .subscribe({
        next: (data) => {
          this.stockData = data;
          this.loading = false;
          console.log(this.stockData);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur chargement';
          this.loading = false;
        }
      });
  }

  handleMovement(data: any) {

    const payload: any = {
      productId: this.productId,
      quantity: data.quantity
    };

    if (data.description?.trim()) {
      payload.description = data.description.trim();
    }

    console.log('Handling movement with payload:', payload);

    if (data.type === 'IN') {
      this.stockService.stock_in(payload).subscribe({
        next: () => {
          this.load_stock();
          this.errorMessage = '';
          this.router.navigate(['/stock-movement-products/history', this.productId]);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur lors de l\'entrée en stock';
        }
      });
    }

    if (data.type === 'OUT') {
      this.stockService.stock_out(payload).subscribe({
        next: () => {
          this.load_stock();
          this.errorMessage = '';
          this.router.navigate(['/stock-movement-products/history', this.productId]);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur lors de la sortie de stock';
        }
      });
    }
  }
}
