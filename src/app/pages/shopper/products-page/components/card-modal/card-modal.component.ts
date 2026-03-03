import { Component, EventEmitter, Output } from '@angular/core';
import { CartItem, CartService } from '../../../../../services/cart-service/cart-service.service';
import { Router } from '@angular/router';
import { ShopperService } from '../../../../../services/shopper/shopper.service';

@Component({
  selector: 'app-card-modal',
  imports: [],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  // État pour la commande en cours
  isCheckingOut = false;
  orderSuccess = false;
  orderError: string | null = null;

  constructor(
    public cartService: CartService,
    public shopperService: ShopperService,
    private router: Router
  ) {}

  // Formatage du prix
  formatPrice(price: number): string {
    return (price / 100).toFixed(2) + ' Ar';
  }

  // Mettre à jour la quantité
  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity >= 1) {
      this.cartService.updateQuantity(item.productId, newQuantity);
    }
  }

  // Supprimer un article
  removeItem(item: CartItem): void {
    if (confirm(`Retirer ${item.name} du panier ?`)) {
      this.cartService.removeItem(item.productId);
    }
  }

  // Vider le panier
  clearCart(): void {
    if (confirm('Vider le panier ?')) {
      this.cartService.clearCart();
    }
  }

  // Passer commande
  checkout(): void {
    const shopId = this.cartService.shopId();
    if (!shopId) {
      this.orderError = 'Aucune boutique sélectionnée';
      return;
    }

    this.isCheckingOut = true;
    this.orderError = null;

    // Ici, vous appellerez votre service pour créer la commande
    this.shopperService.createOrder({
      shopId: shopId,
      items: this.cartService.items().map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    }).subscribe({
      next: (order) => {
        this.orderSuccess = true;
        this.cartService.clearCart();
        setTimeout(() => {
          this.close();
          // this.router.navigate(['/orders', order._id]);
        }, 2000);
      },
      error: (err) => {
        this.orderError = err.error?.error || 'Erreur lors de la commande';
        this.isCheckingOut = false;
      }
    });

    // Simulation pour l'exemple
    setTimeout(() => {
      this.orderSuccess = true;
      this.cartService.clearCart();
      setTimeout(() => {
        this.close();
        this.router.navigate(['/orders/success']);
      }, 1500);
    }, 1000);
  }

  // Fermer le modal
  close(): void {
    this.closeModal.emit();
  }

  // Gérer le clic en dehors du modal
  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
