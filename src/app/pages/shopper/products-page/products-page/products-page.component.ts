import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopperService } from '../../../../services/shopper/shopper.service';
import { CardProductComponent } from "../components/card-product/card-product.component";
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";
import { CardButtonComponent } from '../components/card-button/card-button.component';

@Component({
  selector: 'app-products-page',
  imports: [CardProductComponent, MainLayoutComponent, CardButtonComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
   shopId: string = '';
  products: any[] = [];
  loading = false;
  error: string | null = null;
  shopName: string = '';

  constructor(
    private route: ActivatedRoute,
    private shopperService: ShopperService
  ) {}

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('shopId') || '';
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.shopperService.getProductsByShop(this.shopId).subscribe({
      next: (res) => {
        this.products = res;
        // Si vous avez le nom de la boutique dans la réponse, vous pouvez le récupérer
        if (res.length > 0 && res[0].shop) {
          this.shopName = res[0].shop.name || 'Boutique';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors du chargement des produits';
        this.loading = false;
      }
    });
  }

  addToCart(product: any): void {
    console.log('Produit ajouté au panier:', product);
    // Implémentez votre logique de panier ici
    // Par exemple, émettre vers un service de panier
  }
}
