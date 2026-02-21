import { Component } from '@angular/core';
import { Product, ProductsManagementService } from '../../../../services/shop/products-management/products-management.service';
import { ListProductsComponent } from '../components/list-products/list-products.component';
import { Router } from '@angular/router';
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";

@Component({
  standalone: true,
  selector: 'app-products-management-page',
  imports: [ListProductsComponent, MainLayoutComponent],
  templateUrl: './products-management-page.component.html',
  styleUrl: './products-management-page.component.css'
})
export class ProductsManagementPageComponent {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(private productService: ProductsManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load_products();
  }

  load_products() {
    this.loading = true;

    this.productService.get_shop_products().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur chargement';
        this.loading = false;
      }
    });
  }

  delete_product(id: string) {
    this.productService.delete_product(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== id);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
