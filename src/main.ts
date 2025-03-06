import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { CartComponent } from './app/components/cart/cart.component';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Patel Electronics</h1>
    </header>
    <main>
      <app-product-list></app-product-list>
      <app-cart></app-cart>
    </main>
  `,
  standalone: true,
  imports: [ProductListComponent, CartComponent]
})
export class App {
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});