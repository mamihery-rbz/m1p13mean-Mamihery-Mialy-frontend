import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../../services/shop/products-management/products-management.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
    @Input() products: Product[] = [];
    @Input() loading = false;
    @Input() errorMessage = '';

    @Output() deleteProduct = new EventEmitter<string>();

    constructor(private router: Router){}

    delete(id: string) {
      const confirmation = confirm("Voulez-vous supprimer ce produit ?");

      if (confirmation) {
        this.deleteProduct.emit(id);
      }
    }

    go_to_Edit(id: string) {
      this.router.navigate(['products-management-shop/edit', id]);
    }

    go_to_Add() {
      this.router.navigate(['products-management-shop/add']);
    }
}
