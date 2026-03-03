import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ShopperService } from '../../../../../services/shopper/shopper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-shop',
  imports: [RouterModule,CommonModule],
  templateUrl: './list-shop.component.html',
  styleUrl: './list-shop.component.css'
})
export class ListShopComponent {
  @Input() shops: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private shopperService: ShopperService) {}

  // ngOnInit(): void {
  //   this.loadShops();
  // }

  // loadShops(): void {
  //   this.loading = true;
  //   this.shopperService.getShops().subscribe({
  //     next: (res) => {
  //       this.shops = res;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       this.error = err.error?.error || 'Erreur lors du chargement';
  //       this.loading = false;
  //     }
  //   });
  // }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

   getInitials(name: string): string {
    if (!name) return 'SH';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
