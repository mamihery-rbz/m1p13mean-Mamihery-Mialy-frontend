import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
Chart.register(...registerables);

interface UnpaidShop {
  name: string;
  dueDate: string;
  amount: number;
}

interface RentShop {
  name: string;
  rent: number;
  paid: boolean;
}

interface PaymentForm {
  shop: string;
  amount: number | null;
  date: string;
}import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],

})
export class HomePageAdminComponent implements OnInit {
constructor(private adminService: AdminService) {}
showPaymentModal = false;
  selectedShop = '';

  paymentForm: PaymentForm = {
    shop: '',
    amount: null,
    date: '',
  };

  paymentDifferenceData = {
    labels: ['Boutique A', 'Boutique B', 'Boutique C', 'Boutique D', 'Boutique E'],
    data: [12, 3, 7, 0, 21],
  };

  buyersData = {
    labels: ['Boutique A', 'Boutique B', 'Boutique C', 'Boutique D', 'Boutique E'],
    data: [340, 210, 480, 125, 290],
  };

  unpaidShops: UnpaidShop[] = [
    { name: 'Boutique A', dueDate: '28 Février 2025', amount: 5000 },
    { name: 'Boutique C', dueDate: '01 Mars 2025', amount: 3200 },
    { name: 'Boutique E', dueDate: '15 Février 2025', amount: 7800 },
  ];

  rentShops: RentShop[] = [
    { name: 'Boutique E', rent: 7800, paid: false },
    { name: 'Boutique B', rent: 6000, paid: true },
    { name: 'Boutique A', rent: 5000, paid: false },
    { name: 'Boutique D', rent: 4200, paid: true },
    { name: 'Boutique C', rent: 3200, paid: false },
  ];

  ngOnInit(): void {
    // this.loadLoyerData();
    this.initPaymentDifferenceChart();
    this.initBuyersChart();
  }
  initPaymentDifferenceChart(): void {
    const ctx = document.getElementById('paymentDifferenceChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.paymentDifferenceData.labels,
        datasets: [
          {
            label: 'Jours de retard',
            data: this.paymentDifferenceData.data,
            backgroundColor: this.paymentDifferenceData.data.map(v =>
              v === 0 ? '#10b981' : v < 7 ? '#f59e0b' : '#ef4444'
            ),
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.y} jour(s) de retard`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { stepSize: 5 },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  initBuyersChart(): void {
    const ctx = document.getElementById('buyersChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.buyersData.labels,
        datasets: [
          {
            data: this.buyersData.data,
            backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, usePointStyle: true, pointStyleWidth: 10 },
          },
        },
      },
    });
  }

  openPaymentModal(shop: string): void {
    this.selectedShop = shop;
    this.paymentForm.shop = shop;
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.paymentForm = { shop: '', amount: null, date: '' };
  }

  submitPayment(): void {
    console.log('Paiement soumis:', this.paymentForm);
    // Remove shop from unpaid list
    this.unpaidShops = this.unpaidShops.filter(s => s.name !== this.paymentForm.shop);
    // Update rent list
    const shop = this.rentShops.find(s => s.name === this.paymentForm.shop);
    if (shop) shop.paid = true;
    this.closePaymentModal();
  }

  // loadLoyerData() {
  //   this.adminService.getUsers().subscribe({
  //     next: (users) => console.log('Users:', users),
  //     error: (error) => console.error('Error fetching users:', error)
  //   });
  // }
}