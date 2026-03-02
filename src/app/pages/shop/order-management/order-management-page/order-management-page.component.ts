import { Component } from '@angular/core';
import { OrdersListComponent } from '../components/orders-list/orders-list.component';
import { OrderManagementService } from '../../../../services/shop/order-management/order-management.service';
import { Router } from '@angular/router';
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";

@Component({
  standalone: true,
  selector: 'app-order-management-page',
  imports: [OrdersListComponent, MainLayoutComponent],
  templateUrl: './order-management-page.component.html',
  styleUrl: './order-management-page.component.css'
})
export class OrderManagementPageComponent {
  orders: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private orderService: OrderManagementService
  ) {}

  ngOnInit(): void {
    this.load_orders();
  }

  load_orders() {
    this.loading = true;

    this.orderService.get_orders_list().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur chargement';
        this.loading = false;
      }
    });
  }

  update_status(event: { orderId: string, status: string, dt_payment?: string | null }) {

    const payload: any = {
      idOrder: event.orderId,
      status: event.status,
      dt_payment: event.dt_payment ? new Date(event.dt_payment) : null
    };
    console.log("Payload before adjustments:", payload);
    if (event.status === 'PAID' && !event.dt_payment) {
      payload.dt_payment = new Date();
    }
    if (event.status === 'PENDING' || event.status === 'CANCELLED') {
      payload.dt_payment = null;
    }

    this.orderService.update_order_status(payload).subscribe({
      next: (res) => {
        alert(res.message + "\n" + "Pour la commande " + res.order_status_updated._id);
        this.load_orders();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
