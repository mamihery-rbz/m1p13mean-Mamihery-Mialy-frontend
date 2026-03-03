import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {

  private apiUrl = `${environment.apiUrl}/orders_management`;
  token = localStorage.getItem('token');

  headers = {
    headers: { Authorization: 'Bearer ' + this.token }
  }

  constructor(private http: HttpClient) {}

  create_order(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, data);
  }

  get_orders_list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders_list`, this.headers);
  }

  update_order_status(data: {
      idOrder: string,
      status: string,
      dt_payment?: string
    }): Observable<any> {
      return this.http.put(`${this.apiUrl}/update_order_status`, data);
  }


  get_order_details(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/order_details/${orderId}`);
  }

  update_orderDetail_status(data: {
    id: string,
    status: string
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_order_detail_status`, data);
  }


  cancel_order(orderId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel_order/${orderId}`, {});
  }
}
