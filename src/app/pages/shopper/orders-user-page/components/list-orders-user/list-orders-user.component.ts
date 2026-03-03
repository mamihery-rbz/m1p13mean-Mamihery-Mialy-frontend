import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-orders-user',
  imports: [],
  templateUrl: './list-orders-user.component.html',
  styleUrl: './list-orders-user.component.css'
})
export class ListOrdersUserComponent {
  @Input() orders: any[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() viewDetails = new EventEmitter<string>();
  @Output() deleteOrder = new EventEmitter<string>();

  onDeleteOrder(orderId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.')) {
      this.deleteOrder.emit(orderId);
    }
  }
  formatPrice(price: number): string {
    return (price / 100).toFixed(2) + ' €';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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

  onViewDetails(orderId: string) {
    this.viewDetails.emit(orderId);
  }
}
