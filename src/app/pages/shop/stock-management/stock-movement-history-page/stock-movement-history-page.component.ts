import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListStockMovementProductsComponent } from "../components/list-stock-movement-products/list-stock-movement-products.component";

@Component({
  selector: 'app-stock-movement-history-page',
  imports: [ListStockMovementProductsComponent],
  templateUrl: './stock-movement-history-page.component.html',
  styleUrl: './stock-movement-history-page.component.css'
})
export class StockMovementHistoryPageComponent {
  productId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
  }


}
