import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.css'
})
export class FilterProductsComponent {
  @Output() filterChange = new EventEmitter<any>();

  filters = {
    name: '',
    min: null as number | null,
    max: null as number | null,
    categories: [] as string[]
  };

  categoriesList: any[] = [];

  toggleCategory(id: string) {
    if (this.filters.categories.includes(id)) {
      this.filters.categories = this.filters.categories.filter(c => c !== id);
    } else {
      this.filters.categories.push(id);
    }

    this.emitFilter();
  }

  emitFilter() {
    this.filterChange.emit(this.filters);
  }

  clearFilters() {
    this.filters = {
      name: '',
      min: null,
      max: null,
      categories: []
    };

    this.emitFilter();
  }
}
