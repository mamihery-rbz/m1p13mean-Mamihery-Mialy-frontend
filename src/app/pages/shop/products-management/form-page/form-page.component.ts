import { Component, OnInit } from '@angular/core';
import { Product, ProductsManagementService } from '../../../../services/shop/products-management/products-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProductComponent } from "../components/form-product/form-product.component";
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";

@Component({
  selector: 'app-form-page',
  imports: [FormProductComponent, MainLayoutComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.css'
})
export class FormPageComponent implements OnInit{
  product!: Product;
  categories: any[] = [];
  loading = false;
  edit = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsManagementService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) { // Edit
      this.load_product(id);
    }
    else { // Ajout
      this.product = {
        name: '',
        price: 0,
        category_product: ''
      };
      this.edit = false;
    }

    this.load_category();
  }

  load_product(id: string) {
    this.loading = true;

    this.productService.get_product_ById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur chargement';
        this.loading = false;
      }
    });
  }


  load_category() {
    this.loading = true;

    this.productService.get_all_category().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur chargement';
        this.loading = false;
      }
    });
  }


  update_product(updatedProduct: Product) {
    this.productService.update_product(updatedProduct._id!, updatedProduct)
      .subscribe({
        next: () => {
          this.router.navigate(['/products-management-shop']);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  add_product(addProduct: Product) {
    this.productService.create_shop_product(addProduct)
      .subscribe({
        next: () => {
          this.router.navigate(['/products-management-shop']);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


}
