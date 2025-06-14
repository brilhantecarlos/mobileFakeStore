import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Métodos de Produtos
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/category/${category}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/categories`);
  }

  // Métodos de Usuários
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  // Carrinho
  getCarts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carts`);
  }

  getCartById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/carts/${id}`);
  }

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/carts/user/${userId}`);
  }

  addToCart(cart: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/carts`, cart);
  }

}
