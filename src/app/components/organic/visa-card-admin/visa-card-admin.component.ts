import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Card {
  last4: string;
  monthlyFee: number;
}
@Component({
  selector: 'app-visa-card-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './visa-card-admin.component.html',
  styleUrl: './visa-card-admin.component.css'
})
export class VisaCardAdminComponent {
  card: Card = { last4: '2719', monthlyFee: 25.00 };
  receivePayment(): void {
    console.log('Receive payment clicked');
  }
  sendPayment(): void {
    console.log('Send payment clicked');
  }
}
