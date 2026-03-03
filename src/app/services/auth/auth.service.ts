import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/auth/api`;

  login(name: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      name,
      password,
      role
    });
  }


  logout() {
    localStorage.removeItem('token');
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  saveShop(shop: any) {
    localStorage.setItem('shop', JSON.stringify(shop));
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
