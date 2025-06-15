import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartItem, CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  standalone: false
})
export class CartModalComponent {

  cart: CartItem[] = [];
  total: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartService
  ) { 
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  updateQuantity(item: CartItem, event: any) {
    const quantity = +event.detail.value;
    this.cartService.updateQuantity(item.id, quantity);
    this.loadCart();
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.id);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
