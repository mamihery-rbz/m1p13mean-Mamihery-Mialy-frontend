import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-stock-movement',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-stock-movement.component.html',
  styleUrl: './filter-stock-movement.component.css'
})
export class FilterStockMovementComponent {
  @Output() filterChange = new EventEmitter<any>();

  filters = {
    dateMin: '',
    dateMax: '',
    quantityMin: null as number | null,
    type: '' // '', 'IN', 'OUT'
  };

  emitFilter() {
    this.filterChange.emit(this.filters);
  }

  reset() {
    this.filters = {
      dateMin: '',
      dateMax: '',
      quantityMin: null,
      type: ''
    };

    this.emitFilter();
  }
}
