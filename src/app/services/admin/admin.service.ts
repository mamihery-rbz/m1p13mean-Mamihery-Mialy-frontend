import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
private apiUrl = 'http://localhost:5000';

constructor(private http: HttpClient) { }

// Loyer services
getTable() {
  return this.http.get(`${this.apiUrl}/admin/tables-metadata`);
}

getLoyerByShop(shopId: string) {
  return this.http.get(`${this.apiUrl}/vue/loyer/${shopId}`);
}

getLoyerNonPayer() {
  return this.http.get(`${this.apiUrl}/vue/loyer-non-payer`);
}

getNombreClient() {
  return this.http.get(`${this.apiUrl}/vue/nombre-client`);
}

// Box Price History CRUD services
createBoxPriceHistory(boxPriceHistory: any) {
  return this.http.post(`${this.apiUrl}/admin/box-price-history`, boxPriceHistory);
}

getBoxPriceHistory() {
  return this.http.get(`${this.apiUrl}/admin/box-price-history`);
}

getBoxPriceHistoryById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/box-price-history/${id}`);
}

updateBoxPriceHistory(id: string, boxPriceHistory: any) {
  return this.http.put(`${this.apiUrl}/admin/box-price-history/${id}`, boxPriceHistory);
}

deleteBoxPriceHistory(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/box-price-history/${id}`);
}

// Orders CRUD services
createOrders(orders: any) {
  return this.http.post(`${this.apiUrl}/admin/orders`, orders);
}

getOrders() {
  return this.http.get(`${this.apiUrl}/admin/orders`);
}

getOrdersById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/orders/${id}`);
}

updateOrders(id: string, orders: any) {
  return this.http.put(`${this.apiUrl}/admin/orders/${id}`, orders);
}

deleteOrders(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/orders/${id}`);
}

// Orders details CRUD services
createOrdersDetails(ordersDetails: any) {
  return this.http.post(`${this.apiUrl}/admin/orders-details`, ordersDetails);
}

getOrdersDetails() {
  return this.http.get(`${this.apiUrl}/admin/orders-details`);
}

getOrdersDetailsById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/orders-details/${id}`);
}

updateOrdersDetails(id: string, ordersDetails: any) {
  return this.http.put(`${this.apiUrl}/admin/orders-details/${id}`, ordersDetails);
}

deleteOrdersDetails(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/orders-details/${id}`);
}


// Categories products CRUD services
createCategoriesProducts(categoriesProducts: any) {
  return this.http.post(`${this.apiUrl}/admin/categories-products`, categoriesProducts);
}

getCategoriesProducts() {
  return this.http.get(`${this.apiUrl}/admin/categories-products`);
}

getCategoriesProductsById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/categories-products/${id}`);
}

updateCategoriesProducts(id: string, categoriesProducts: any) {
  return this.http.put(`${this.apiUrl}/admin/categories-products/${id}`, categoriesProducts);
}

deleteCategoriesProducts(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/categories-products/${id}`);
}

// Products CRUD services
createProducts(products: any) {
  return this.http.post(`${this.apiUrl}/admin/products`, products);
}

getProducts() {
  return this.http.get(`${this.apiUrl}/admin/products`);
}

getProductsById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/products/${id}`);
}

updateProducts(id: string, products: any) {
  return this.http.put(`${this.apiUrl}/admin/products/${id}`, products);
}

deleteProducts(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/products/${id}`);
}

// Products price history CRUD services
createProductsPriceHistory(productsPriceHistory: any) {
  return this.http.post(`${this.apiUrl}/admin/products-price-history`, productsPriceHistory);
}

getProductsPriceHistory() {
  return this.http.get(`${this.apiUrl}/admin/products-price-history`);
}

getProductsPriceHistoryById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/products-price-history/${id}`);
}

updateProductsPriceHistory(id: string, productsPriceHistory: any) {
  return this.http.put(`${this.apiUrl}/admin/products-price-history/${id}`, productsPriceHistory);
}

deleteProductsPriceHistory(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/products-price-history/${id}`);
}

// shops CRUD services
createShops(shops: any) {
  return this.http.post(`${this.apiUrl}/admin/shops`, shops);
}

getShops() {
  return this.http.get(`${this.apiUrl}/admin/shops`);
}

getShopsById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/shops/${id}`);
}

updateShops(id: string, shops: any) {
  return this.http.put(`${this.apiUrl}/admin/shops/${id}`, shops);
}

deleteShops(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/shops/${id}`);
}

// payment histories CRUD services
createPaymentHistories(paymentHistories: any) {
  return this.http.post(`${this.apiUrl}/admin/payment-histories`, paymentHistories);
}

getPaymentHistories() {
  return this.http.get(`${this.apiUrl}/admin/payment-histories`);
}

getPaymentHistoriesById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/payment-histories/${id}`);
}

updatePaymentHistories(id: string, paymentHistories: any) {
  return this.http.put(`${this.apiUrl}/admin/payment-histories/${id}`, paymentHistories);
}

deletePaymentHistories(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/payment-histories/${id}`);
}

// stock movements CRUD services
createStockMovements(stockMovements: any) {
  return this.http.post(`${this.apiUrl}/admin/stock-movements`, stockMovements);
}

getStockMovements() {
  return this.http.get(`${this.apiUrl}/admin/stock-movements`);
}

getStockMovementsById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/stock-movements/${id}`);
}

updateStockMovements(id: string, stockMovements: any) {
  return this.http.put(`${this.apiUrl}/admin/stock-movements/${id}`, stockMovements);
}

deleteStockMovements(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/stock-movements/${id}`);
}

// users CRUD services
createUsers(users: any) {
  return this.http.post(`${this.apiUrl}/admin/users`, users);
}

getUsers() {
  return this.http.get(`${this.apiUrl}/admin/users`);
}

getUsersById(id: string) {
  return this.http.get(`${this.apiUrl}/admin/users/${id}`);
}

updateUsers(id: string, users: any) {
  return this.http.put(`${this.apiUrl}/admin/users/${id}`, users);
}

deleteUsers(id: string) {
  return this.http.delete(`${this.apiUrl}/admin/users/${id}`);
}
}