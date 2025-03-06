import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Our Products</h2>
      <div class="products-grid">
        <div *ngFor="let product of products" class="product-card">
          <img [src]="product.imageUrl" [alt]="product.name">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">{{ product.price | currency }}</p>
          <button (click)="addToCart(product)" class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .product-card {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      background: white;
      transition: transform 0.2s;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .product-card img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .price {
      font-weight: bold;
      color: #2c3e50;
      font-size: 1.2em;
    }
    .add-to-cart-btn {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s;
    }
    .add-to-cart-btn:hover {
      background-color: #2980b9;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => this.products = products
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}