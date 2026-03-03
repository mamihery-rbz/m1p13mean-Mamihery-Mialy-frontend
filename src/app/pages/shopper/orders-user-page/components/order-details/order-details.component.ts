import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopperService } from '../../../../../services/shopper/shopper.service';
import { CardProductComponent } from '../../../products-page/components/card-product/card-product.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule, CardProductComponent],
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent {
  @Input() order: any;
  @Input() details: any[] = [];
  @Input() loading = false;
  @Output() close = new EventEmitter<void>();
  @Output() detailsUpdated = new EventEmitter<void>();

  // Pour l'ajout de produit
  showProductSelector = false;
  availableProducts: any[] = [];
  loadingProducts = false;
  selectedProduct: any = null;
  selectedQuantity: number = 1;

  // Pour l'édition
  editingQuantity: { [key: string]: boolean } = {};
  updateLoading: { [key: string]: boolean } = {};
  error: string | null = null;

  constructor(private shopperService: ShopperService) {}

  // Formater le prix
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ar';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'PAID': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800',
      'DELIVERED': 'bg-blue-100 text-blue-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'En attente',
      'PAID': 'Payée',
      'CANCELLED': 'Annulée',
      'DELIVERED': 'Livrée'
    };
    return statusMap[status] || status;
  }

  getTotal(): number {
    return this.details.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Vérifier si la commande peut être modifiée
  canModify(): boolean {
    return this.order?.status === 'PENDING';
  }

  // ========== GESTION DE L'AJOUT DE PRODUIT ==========

  // Charger les produits disponibles
  loadAvailableProducts(): void {
    console.log('Charger les produits disponibles pour la boutique', this.order.shop._id);
    if (!this.order.shop._id) return;

    this.loadingProducts = true;
    this.shopperService.getProductsByShop(this.order.shop._id).subscribe({
      next: (res) => {
        console.log('Produits reçus', res);
        this.availableProducts = Array.isArray(res) ? res : [];
        // Filtrer les produits déjà dans la commande
        const existingProductIds = this.details.map(d => d.product?._id || d.productId);
        this.availableProducts = this.availableProducts.filter(
          p => !existingProductIds.includes(p._id)
        );
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error('Erreur chargement produits', err);
        this.loadingProducts = false;
      }
    });
  }

  // Sélectionner un produit
  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.selectedQuantity = 1;
  }

  // Réinitialiser la sélection
  resetSelection(): void {
    this.selectedProduct = null;
    this.selectedQuantity = 1;
    this.error = null;
  }

  // Fermer le sélecteur
  closeSelector(): void {
    this.showProductSelector = false;
    this.resetSelection();
  }

  // Ajouter le produit sélectionné à la commande
  addSelectedProduct(): void {
    if (!this.canModify()) {
      this.error = 'Impossible de modifier cette commande';
      return;
    }

    if (!this.selectedProduct || this.selectedQuantity < 1) {
      this.error = 'Veuillez sélectionner un produit et une quantité valide';
      return;
    }

    this.updateLoading['add'] = true;
    this.error = null;

    this.shopperService.addOrderDetail(this.order._id, {
      productId: this.selectedProduct._id,
      quantity: this.selectedQuantity,
      price: this.selectedProduct.price
    }).subscribe({
      next: (newDetail) => {
        // Ajouter le nouveau détail à la liste
        this.details = [...this.details, newDetail];
        // Retirer le produit de la liste des disponibles
        this.availableProducts = this.availableProducts.filter(
          p => p._id !== this.selectedProduct._id
        );
        this.updateLoading['add'] = false;
        this.closeSelector();
        this.detailsUpdated.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de l\'ajout du produit';
        this.updateLoading['add'] = false;
      }
    });
  }

  // ========== GESTION DES MODIFICATIONS ==========

  // Activer le mode édition pour un détail
  startEditing(detailId: string): void {
    if (!this.canModify()) return;
    this.editingQuantity[detailId] = true;
  }

  // Annuler l'édition
  cancelEditing(detailId: string): void {
    this.editingQuantity[detailId] = false;
    this.error = null;
  }

  // Mettre à jour la quantité
  updateQuantity(detail: any, newQuantity: number): void {
    if (!this.canModify()) return;

    // Validation
    if (newQuantity < 1) {
      this.error = 'La quantité doit être supérieure à 0';
      return;
    }

    this.updateLoading[detail._id] = true;
    this.error = null;

    this.shopperService.updateOrderDetail(this.order._id, detail._id, {
      quantity: newQuantity,
      price: detail.price
    }).subscribe({
      next: (updatedDetail) => {
        // Mettre à jour la quantité dans la liste
        const index = this.details.findIndex(d => d._id === detail._id);
        if (index !== -1) {
          this.details[index].quantity = newQuantity;
        }
        this.updateLoading[detail._id] = false;
        this.editingQuantity[detail._id] = false;
        this.detailsUpdated.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de la mise à jour';
        this.updateLoading[detail._id] = false;
      }
    });
  }

  // Supprimer un article
  removeItem(detail: any): void {
    if (!this.canModify()) return;

    if (!confirm('Voulez-vous vraiment supprimer cet article de la commande ?')) {
      return;
    }

    this.updateLoading[detail._id] = true;
    this.error = null;

    this.shopperService.deleteOrderDetail(this.order._id, detail._id).subscribe({
      next: () => {
        this.details = this.details.filter(d => d._id !== detail._id);
        this.updateLoading[detail._id] = false;
        this.detailsUpdated.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de la suppression';
        this.updateLoading[detail._id] = false;
      }
    });
  }

  // Fermer le modal
  onClose(): void {
    this.close.emit();
  }
}
