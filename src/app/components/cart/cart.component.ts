import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  loading = true;
  placingOrder = false;
  orderPlaced = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId()!;
    this.cartService.getCart(userId).subscribe({
      next: (items) => { this.items = items; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  onQuantityChange(item: CartItem): void {
    if (item.quantity < 1) { item.quantity = 1; }
    this.cartService.updateQuantity(item.id, item.quantity).subscribe();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
  }

  placeOrder(): void {
    if (this.items.length === 0) return;
    const userId = this.authService.getUserId()!;
    this.placingOrder = true;

    const order = {
      userId:userId,
      total: this.total,
      status: 'pending' as const,
      date: new Date().toISOString(),
      items: this.items.map(i => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity
      }))
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        // Remove all cart items
        const deletes = this.items.map(i => this.cartService.removeFromCart(i.id).subscribe());
        this.items = [];
        this.cartService.updateCartCount(0);
        this.placingOrder = false;
        this.orderPlaced = true;
        setTimeout(() => this.router.navigate(['/orders']), 2000);
      },
      error: () => { this.placingOrder = false; }
    });
  }
}
