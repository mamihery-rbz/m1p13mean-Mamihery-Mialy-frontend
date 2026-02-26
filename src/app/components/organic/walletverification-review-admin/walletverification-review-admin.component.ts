import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-walletverification-review-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './walletverification-review-admin.component.html',
  styleUrl: './walletverification-review-admin.component.css'
})
export class WalletverificationReviewAdminComponent {
  reviewEmojis = ['😞', '😐', '😑', '🙂', '😊'];
  selectedRating: number | null = null;
    enableVerification(): void {
    console.log('Wallet verification enabled');
  }
  selectRating(index: number): void {
    this.selectedRating = index;
    console.log('Rating selected:', this.reviewEmojis[index]);
  }
}
