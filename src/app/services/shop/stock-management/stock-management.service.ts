import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';

export interface StockProduct {
  product_id: string;
  product_name: string;
  category: string;
  stock_total: number;
  reserved: number;
  delivered: number;
  stock_available: number;
}


@Injectable({
  providedIn: 'root'
})
export class StockManagementService {

  private apiStockMovement = `${environment.apiUrl}/stock_movement/stock`
  private apiStock = `${environment.apiUrl}/stock`;
  token = localStorage.getItem('token');

  headers = {
    headers: { Authorization: 'Bearer ' + this.token }
  };

  constructor(private http: HttpClient) {}

  get_shop_stock(): Observable<StockProduct[]> {
    return this.http.get<StockProduct[]>(
      `${this.apiStock}/product`,
      this.headers
    );
  }

  get_stock_movement_story_byProduct(productId: string): Observable<any> {
    return this.http.get(`${this.apiStockMovement}/history/${productId}`);
  }

  get_shop_stock_by_IdProduct(productId: string) {
    console.log(`${this.apiStock}/product/${productId}`);
    return this.http.get<any>(
      `${this.apiStock}/product/${productId}`
    );
  }

  stock_in(data: any) {
    return this.http.post(
      `${this.apiStockMovement}/in`,
      data
    );
  }

  stock_out(data: any) {
    return this.http.post(
      `${this.apiStockMovement}/out`,
      data
    );
  }

}
