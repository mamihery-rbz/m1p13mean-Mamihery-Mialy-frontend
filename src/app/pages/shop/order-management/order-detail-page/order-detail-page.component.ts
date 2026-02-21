import { Component } from '@angular/core';
import { OrderDetailComponent } from '../components/order-detail/order-detail.component';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../../../../services/shop/order-management/order-management.service';
import { MainLayoutComponent } from "../../main/main-layout/main-layout.component";

@Component({
  selector: 'app-order-detail-page',
  imports: [OrderDetailComponent, MainLayoutComponent],
  templateUrl: './order-detail-page.component.html',
  styleUrl: './order-detail-page.component.css'
})
export class OrderDetailPageComponent {
  orderDetails: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderManagementService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadDetails(orderId);
    }
  }

  loadDetails(orderId: string) {
    this.loading = true;

    this.orderService.get_order_details(orderId).subscribe({
      next: (data) => {
        this.orderDetails = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur chargement';
        this.loading = false;
      }
    });
  }



  update_detail_status(event: { detailId: string, status: string }) {

    const payload = {
      id: event.detailId,
      status: event.status
    };

    this.orderService.update_orderDetail_status(payload).subscribe({
      next: (res) => {

        alert("Statut du produit mis à jour !");
        this.loadDetails(this.route.snapshot.paramMap.get('id')!);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
