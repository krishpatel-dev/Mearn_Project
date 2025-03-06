import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container" [class.open]="isOpen">
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button class="close-btn" (click)="toggleCart()" aria-label="Close cart">×</button>
      </div>
      
      <div class="cart-items">
        <div *ngIf="(cartItems$ | async)?.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
          <button class="continue-shopping" (click)="toggleCart()">Continue Shopping</button>
        </div>
        
        <div *ngFor="let item of cartItems$ | async" class="cart-item">
          <img [src]="item.imageUrl" [alt]="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h4>{{ item.name }}</h4>
            <div class="quantity-controls">
              <button 
                class="quantity-btn" 
                (click)="updateQuantity(item, -1)"
                [disabled]="item.quantity <= 1">−</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button 
                class="quantity-btn" 
                (click)="updateQuantity(item, 1)">+</button>
            </div>
            <p class="item-price">{{ item.price * item.quantity | currency }}</p>
          </div>
          <button class="remove-btn" (click)="removeItem(item.id)">
            <span class="remove-icon">×</span>
          </button>
        </div>
      </div>

      <div class="cart-footer" *ngIf="(cartItems$ | async)?.length">
        <div class="cart-summary">
          <p class="subtotal">Subtotal: {{ getTotal() | currency }}</p>
          <p class="tax">Tax (10%): {{ getTotal() * 0.1 | currency }}</p>
          <p class="total">Total: {{ getTotal() * 1.1 | currency }}</p>
        </div>
        <button class="checkout-btn" (click)="checkout()">
          Proceed to Checkout
        </button>
      </div>
    </div>

    <button class="cart-toggle" (click)="toggleCart()">
      <span class="cart-icon">🛒</span>
      <span class="cart-count">{{ (cartItems$ | async)?.length || 0 }}</span>
    </button>
  `,
  styles: [`
    .cart-container {
      position: fixed;
      top: 0;
      right: -400px;
      width: 400px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }

    .cart-container.open {
      transform: translateX(-400px);
    }

    .cart-header {
      padding: 20px;
      background: #2c3e50;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .cart-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0 8px;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 0.8;
    }

    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .empty-cart {
      text-align: center;
      padding: 40px 20px;
      color: #666;
    }

    .continue-shopping {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 15px;
    }

    .cart-item {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
      position: relative;
    }

    .cart-item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 15px;
    }

    .cart-item-details {
      flex: 1;
    }

    .cart-item-details h4 {
      margin: 0 0 8px 0;
      font-size: 1rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 10px 0;
    }

    .quantity-btn {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .quantity-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity {
      font-weight: 500;
    }

    .item-price {
      font-weight: 500;
      color: #2c3e50;
      margin: 5px 0 0 0;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #e74c3c;
      cursor: pointer;
      padding: 8px;
      position: absolute;
      right: 10px;
      top: 10px;
      transition: color 0.2s;
    }

    .remove-btn:hover {
      color: #c0392b;
    }

    .remove-icon {
      font-size: 18px;
      font-weight: bold;
    }

    .cart-footer {
      padding: 20px;
      background: #f8f9fa;
      border-top: 1px solid #eee;
    }

    .cart-summary {
      margin-bottom: 15px;
    }

    .cart-summary p {
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
    }

    .total {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2c3e50;
      border-top: 1px solid #dee2e6;
      padding-top: 10px;
      margin-top: 10px;
    }

    .checkout-btn {
      width: 100%;
      padding: 12px;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }

    .checkout-btn:hover {
      background: #27ae60;
    }

    .cart-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      background:rgb(193, 243, 255);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background-color 0.2s;
    }

    .cart-toggle:hover {
      background: #2980b9;
    }

    .cart-icon {
      font-size: 1.2rem;
    }

    .cart-count {
      background: #e74c3c;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 0.8rem;
      min-width: 20px;
      text-align: center;
    }
  `]
})
export class CartComponent {
  cartItems$ = this.cartService.cartItems$;
  isOpen = false;

  constructor(private cartService: CartService) {}

  toggleCart() {
    this.isOpen = !this.isOpen;
  }

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item.id, item.quantity + change);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout() {
    if (this.cartService.getTotal() > 0) {
      alert('Thank you for your purchase! This is a demo checkout.');
      this.cartService.clearCart();
      this.isOpen = false;
    }
  }
}