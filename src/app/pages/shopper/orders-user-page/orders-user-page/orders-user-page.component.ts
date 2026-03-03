import { Component } from '@angular/core';
import { ShopperService } from '../../../../services/shopper/shopper.service';
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";
import { ListOrdersUserComponent } from "../components/list-orders-user/list-orders-user.component";
import { OrderDetailsComponent } from "../components/order-details/order-details.component";

@Component({
  selector: 'app-orders-user-page',
  imports: [MainLayoutComponent, ListOrdersUserComponent, OrderDetailsComponent],
  templateUrl: './orders-user-page.component.html',
  styleUrl: './orders-user-page.component.css'
})
export class OrdersUserPageComponent {
   orders: any[] = [];
  loading = false;
  error: string | null = null;

  // Pour les détails
  selectedOrder: any = null;
  orderDetails: any[] = [];
  loadingDetails = false;
  showDetails = false;

  constructor(private shopperService: ShopperService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.shopperService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = Array.isArray(res) ? res : [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors du chargement des commandes';
        this.loading = false;
      }
    });
  }

  loadOrderDetails(orderId: string): void {
    this.loadingDetails = true;
    this.showDetails = true;

    // Trouver la commande sélectionnée
    this.selectedOrder = this.orders.find(o => o._id === orderId);

    this.shopperService.getOrderDetails(orderId).subscribe({
      next: (res) => {
        this.orderDetails = Array.isArray(res) ? res : [];
        this.loadingDetails = false;
      },
      error: (err) => {
        console.error('Erreur chargement détails', err);
        this.orderDetails = [];
        this.loadingDetails = false;
      }
    });
  }

    // Ajoutez cette méthode
  deleteOrder(orderId: string): void {
    this.shopperService.deleteOrder(orderId).subscribe({
      next: () => {
        this.loadOrders();
        console.log('Commande supprimée avec succès');
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de la suppression';
      }
    });
  }

  refreshAfterUpdate(): void {
    // Recharger la liste des commandes pour mettre à jour les totaux
    this.loadOrders();

    if (this.selectedOrder) {
      const currentOrderId = this.selectedOrder._id;
      this.shopperService.getOrderDetails(currentOrderId).subscribe({
        next: (res) => {
          this.orderDetails = Array.isArray(res) ? res : [];
          // Mettre à jour la commande sélectionnée avec les nouvelles données
          const updatedOrder = this.orders.find(o => o._id === currentOrderId);
          if (updatedOrder) {
            this.selectedOrder = updatedOrder;
          }
        },
        error: (err) => {
          console.error('Erreur rechargement détails', err);
        }
      });
    }
  }


  closeDetails(): void {
    this.showDetails = false;
    this.selectedOrder = null;
    this.orderDetails = [];
  }
}
