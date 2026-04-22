import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

 getOrders(userId: string): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.baseUrl}/orders?userId=${userId}`);
}
  placeOrder(order: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }
}
