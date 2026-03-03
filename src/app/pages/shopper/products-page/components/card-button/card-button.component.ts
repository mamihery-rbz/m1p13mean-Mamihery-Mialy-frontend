import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CartService } from '../../../../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-card-button',
  imports: [CommonModule, CardModalComponent],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.css'
})
export class CardButtonComponent {
  isModalOpen = signal(false);

  constructor(public cartService: CartService) {}

  toggleModal(): void {
    this.isModalOpen.update(open => !open);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
