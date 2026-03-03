import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ShopperService {

  private apiUrl = `${environment.apiUrl}/shopper`;
  token = localStorage.getItem('token');

  headers = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) {}

  // GET /shops
  getShops(): Observable<any> {
    return this.http.get(`${this.apiUrl}/shops`);
  }

  // GET /shops/:shopId/products
  getProductsByShop(shopId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/shops/${shopId}/products`);
  }


  // GET /orders (auth required)
  getUserOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`, this.headers);
  }

  // POST /orders (auth required)
  createOrder(data: {
    shopId: string,
    items: any[]
  }): Observable<any> {
    console.log('Creating order with data:', data);
    return this.http.post(`${this.apiUrl}/orders`, data, this.headers);
  }

  // GET /orders/:orderId/details (auth required)
  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/orders/${orderId}/details`,
      this.headers
    );
  }

  // POST /orders/:orderId/details (auth required)
  addOrderDetail(orderId: string, data: {
    productId: string,
    quantity: number,
    price: number
  }): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/orders/${orderId}/details`,
      data,
      this.headers
    );
  }

  // PUT /orders/:orderId/details/:detailId (auth required)
  updateOrderDetail(orderId: string, detailId: string, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/orders/${orderId}/details/${detailId}`,
      data,
      this.headers
    );
  }

  // DELETE /orders/:orderId/details/:detailId (auth required)
  deleteOrderDetail(orderId: string, detailId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/orders/${orderId}/details/${detailId}`,
      this.headers
    );
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/orders/${orderId}`,
      this.headers
    );
  }
}
