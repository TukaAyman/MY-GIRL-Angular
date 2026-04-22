import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId()!;
    this.orderService.getOrders(userId).subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'status-pending',
      processing: 'status-processing',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return map[status] || '';
  }

  getStatusIcon(status: string): string {
    const map: Record<string, string> = {
      pending: '⏳',
      processing: '📦',
      delivered: '✅',
      cancelled: '❌'
    };
    return map[status] || '📋';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
