import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
   @Input() details: any[] = [];
   @Output() detailStatusChange = new EventEmitter<{
      detailId: string,
      status: string
    }>();

    get_total_price() {
      return this.details.reduce((total, item) => {
        return total + (item.product?.price || 0) * item.quantity;
      }, 0);
    }
    change_detail_status(detailId: string, status: string) {
      this.detailStatusChange.emit({
        detailId,
        status
      });
    }


   get_status_class(status: string) {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
