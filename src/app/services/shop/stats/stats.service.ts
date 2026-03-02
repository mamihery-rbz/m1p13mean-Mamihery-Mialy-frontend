import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/stat`;

  headers = {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  }
  get_monthly_turnover(): Observable<any> {
    return this.http.get(`${this.apiUrl}/turnover/monthly`, this.headers);
  }

  get_monthly_customers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer/monthly`, this.headers);
  }

  get_orders_KPI(): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-kpi`, this.headers);
  }

}
