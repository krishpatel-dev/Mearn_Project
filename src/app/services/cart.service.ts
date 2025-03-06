import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = currentItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.cartItems.next(updatedItems);
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl
      };
      this.cartItems.next([...currentItems, newItem]);
    }
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) return;
    
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    this.cartItems.next(updatedItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItems.next(updatedItems);
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => 
      total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}