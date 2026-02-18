import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { OrderManagementService } from '../../../../../services/shop/order-management/order-management.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  @Input() orders: any[] = [];
  @Input() loading = false;
  @Input() errorMessage = '';
  @Output() statusChange = new EventEmitter<{
    orderId: string,
    status: string,
    dt_payment?: string | null
  }>();

  router = inject(Router);


  get_status_class(status: string) {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  go_to_details(orderId: string) {
    this.router.navigate(['/order-management-shop/orders', orderId]);
  }

  change_status(orderId: string, newStatus: string, dt_payment: string | null = null) {
    this.statusChange.emit({
      orderId,
      status: newStatus,
      dt_payment
    });
  }

  onStatusChange(event: Event, order: any) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;
    this.change_status(order._id, newStatus, order.dt_payment || null);
  }

  onDateChange(event: Event, order: any) {
    const input = event.target as HTMLInputElement;
    const newDate = input.value ? input.value : null; // '' => null
    const newStatus = newDate ? 'PAID' : 'PENDING';
    console.log("Date modifiée pour la commande " + order._id + ": " + newDate);

    this.change_status(order._id, newStatus, newDate || null);
  }



}
