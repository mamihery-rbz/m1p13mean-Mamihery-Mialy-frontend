import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CartService } from '../../../../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-card-product',
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();
  @Input() hideActions: boolean = false;
  
  constructor(private cartService: CartService) {}

  onAddToCart() {
    this.cartService.addItem({
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      shopId: this.product.shop,
      shopName: this.product.shopName || 'Boutique',
      image: this.product.image
    });
  }

  // Ajouter une méthode pour vérifier si le produit est dans le panier
  isInCart(): boolean {
    return this.cartService.isInCart(this.product._id);
  }

  // Obtenir la quantité
  getQuantity(): number {
    return this.cartService.getQuantity(this.product._id);
  }

  formatPrice(price: number): string {
    return (price / 100).toFixed(0);
  }

  getInitials(name: string): string {
    if (!name) return 'PR';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // Formater la date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // onAddToCart() {
  //   this.addToCart.emit(this.product);
  // }

  isNewProduct(createdAt: string): boolean {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - creationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Produit créé il y a moins de 7 jours
  }
}
