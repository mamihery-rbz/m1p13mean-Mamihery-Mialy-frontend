import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';

export interface Product {
    _id?: string;
    name: string;
    price: number;
    shop?: any;
    category_product: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsManagementService {

  private apiUrl = `${environment.apiUrl}/products_management`;
  token = localStorage.getItem('token');

  headers = {
    headers: { Authorization: 'Bearer ' + this.token }
  }

  constructor(private http: HttpClient) {}

  // 🔹 Produits de la boutique du gestionnaire
  get_shop_products(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/shop/products`, this.headers);
  }

  // 🔹 Créer un produit (gestionnaire)
  create_shop_product(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/shop/products`, product, this.headers);
  }

  // 🔹 Tous les produits (public/admin)
  get_all_products(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  get_all_category(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category_products`);
  }

  // 🔹 Un produit par ID
  get_product_ById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // 🔹 Modifier produit
  update_product(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  delete_product(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  get_filtered_products(filters: any) {

    let params: any = {};

    if (filters.min) params.min = filters.min;
    if (filters.max) params.max = filters.max;
    if (filters.name) params.name = filters.name;
    if (filters.categories?.length) {
      params.categories = filters.categories.join(',');
    }

    return this.http.get<Product[]>(`${this.apiUrl}/shop/products/filter`,
      {
        ...this.headers,
        params
      }
    );
  }
}
