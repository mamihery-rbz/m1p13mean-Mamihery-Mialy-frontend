import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-stock-movement',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-stock-movement.component.html',
  styleUrl: './form-stock-movement.component.css'
})
export class FormStockMovementComponent {
  @Output() submitMovement = new EventEmitter<any>();

  formData = {
    type: 'IN',
    quantity: 0,
    description: null
  };

  submit() {
    this.submitMovement.emit(this.formData);
  }
}
