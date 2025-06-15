import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private storageKey = 'cart';
  private cart: CartItem[] = [];

  constructor() { 
    this.loadCart();
  }

  private loadCart() {
    const data = localStorage.getItem(this.storageKey);
    this.cart = data ? JSON.parse(data) : [];
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  getCart(): CartItem[] {
    return[...this.cart];
  }

  addToCart(product: any, quantity: number = 1) {
    const index = this.cart.findIndex(item => item.id === product.id);

    if (index > -1) {
      this.cart[index].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(item => item.id === productId);

    if (item) {
      item.quantity = quantity;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}
